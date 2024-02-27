import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import idl from '@/config/dojo.json'

const preflightCommitment = "processed";
const commitment = "confirmed"
const programID = new PublicKey(idl.metadata.address)

let workspace = null
export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl('devnet'), commitment)
    const provider = computed(() => new AnchorProvider(connection, wallet.value, {
        preflightCommitment,
        commitment,
    }))
    const program = computed(() => new Program(idl, programID, provider.value))

    workspace = {
        wallet,
        connection,
        provider,
        program,
    }
}