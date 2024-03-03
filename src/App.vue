<script setup>
import { useRoute } from 'vue-router'
import store from './vuex'
import 'solana-wallets-vue/styles.css'
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SlopeWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { initWallet } from 'solana-wallets-vue'
import { initWorkspace } from '@/composables'

const route = useRoute()

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SlopeWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
]

initWallet({ wallets, autoConnect: true})
initWorkspace()
</script>

<template>
    <router-view></router-view>
</template>
