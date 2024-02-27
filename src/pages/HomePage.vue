<script setup>
import GetAccessToken from '../components/GetAccessToken';
import store from '../vuex'
import pkg from '../../package.json';
</script>

<template>
    <div class="md:hero mx-auto p-4">
        <div class="md:hero-content flex flex-col">
            <h1 class="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                Join the AI Dojo
            </h1>
            <h4 class="md:w-full text-center text-slate-300 my-2">
                <p class="mb-2">Join with <em>Solana USDC</em> or via <em>Credit/Debit Card.</em></p>
                <p class="mb-2">A Solana wallet holds your access token and belt NFT.</p>
                <p class="mb-2">Need a Solana wallet? Create a web-wallet with Torus.</p>
            </h4>
            <div class="text-center">
                <get-access-token></get-access-token>
            </div>
        </div>
    </div>
</template>
