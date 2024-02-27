<script setup>
import store from '../vuex'
import { watch } from 'vue'
import { useWorkspace } from '@/composables'
const { clusterApiUrl, Keypair, Transaction, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = require('@solana/web3.js')
const {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getMint,
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountIdempotentInstruction,
} = require('@solana/spl-token')
const {
    findMasterEditionPda,
    findMetadataPda,
    mplTokenMetadata,
    MPL_TOKEN_METADATA_PROGRAM_ID,
} = require('@metaplex-foundation/mpl-token-metadata')
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults")
const { publicKey } = require("@metaplex-foundation/umi")

const { wallet, program, provider, connection } = useWorkspace()

async function getAccessTokenWithUSDC () {
    console.log('Get access token with USDC')
    const umi = createUmi(clusterApiUrl('devnet'))
    const year = 2025
    var yearBuffer = Buffer.alloc(2)
    yearBuffer.writeUInt16BE(year)
    const prefix = Buffer.from('access_token', 'utf8')
    const dojoTokenData = PublicKey.findProgramAddressSync([prefix, yearBuffer], program.value.programId)[0]
    const dojoAgent = PublicKey.findProgramAddressSync([program.value.programId.toBuffer()], program.value.programId)[0]
    const dojoTokenRecord = await program.value.account.dojoAccessToken.fetch(dojoTokenData)
    const paymentMint = dojoTokenRecord.paymentMint
    const paymentTokenSrc = getAssociatedTokenAddressSync(paymentMint, wallet.value.publicKey)
    const paymentTokenVault = dojoTokenRecord.paymentVault
    const accessTokenMint = dojoTokenRecord.accessTokenMint
    const accessTokenData = await getMint(connection, accessTokenMint)
    const accessTokenDest = getAssociatedTokenAddressSync(accessTokenMint, wallet.value.publicKey)
    const beltMint = Keypair.generate()
    const beltTokenAccount = getAssociatedTokenAddressSync(beltMint.publicKey, wallet.value.publicKey)
    const beltMetadata = findMetadataPda(umi, { mint: publicKey(beltMint.publicKey) })[0]
    const beltMasterEdition = findMasterEditionPda(umi, { mint: publicKey(beltMint.publicKey) })[0]
    const tx = new Transaction()
    tx.add(createAssociatedTokenAccountIdempotentInstruction(
        wallet.value.publicKey,
        accessTokenDest,
        wallet.value.publicKey,
        accessTokenMint
    ))
    tx.add(await program.value.instruction.purchaseAccessToken({
        accounts: {
            dojoAccessToken: dojoTokenData,
            dojoAgent: dojoAgent,
            paymentTokenAuthority: provider.value.wallet.publicKey,
            paymentTokenSrc: paymentTokenSrc,
            paymentTokenVault: paymentTokenVault,
            paymentTokenMint: paymentMint,
            accessTokenMint: accessTokenMint,
            accessTokenDest: accessTokenDest,
            feePayer: wallet.value.publicKey,
            beltOwner: wallet.value.publicKey,
            beltMint: beltMint.publicKey,
            beltTokenAccount: beltTokenAccount,
            beltMetadata: new PublicKey(beltMetadata),
            beltMasterEdition: new PublicKey(beltMasterEdition),
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        },
        signers: [beltMint],
    }))
    const res = await provider.value.sendAndConfirm(tx, [beltMint], {skipPreflight: true})
    console.log(res)
}

async function getAccessTokenWithCard () {
    console.log('Get access token with card')
}

</script>

<template>
    <div>
        <button
            class="px-8 m-2 btn bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
            @click="getAccessTokenWithUSDC"
        >
            <span>
                Buy With USDC
            </span>
        </button>
        <button
            class="px-8 m-2 btn bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
            @click="getAccessTokenWithCard"
        >
            <span>
                Buy With Card
            </span>
        </button>
    </div>
</template>