<script setup>
import { ref, inject } from 'vue'
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { useWorkspace } from '@/composables'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Legend,
    Filler,
    Tooltip,
    BarElement,
    LinearScale,
    LineElement,
    PointElement,
    CategoryScale,
} from 'chart.js'
import GetAccessToken from '../components/GetAccessToken'
import store from '../vuex'
import pkg from '../../package.json'

const axios = inject('axios')
const { PublicKey } = require('@solana/web3.js')
const { program } = useWorkspace()
const { readyState } = useWallet()
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler)

async function getAccessTokenData () {
    const year = 2025
    var yearBuffer = Buffer.alloc(2)
    yearBuffer.writeUInt16BE(year)
    const prefix = Buffer.from('access_token', 'utf8')
    const dojoTokenData = PublicKey.findProgramAddressSync([prefix, yearBuffer], program.value.programId)[0]
    const res = await axios.post("https://aidojo.us/dojo_access_token", {
        account: dojoTokenData.toString(),
    })
    if (res.status === 200) {
        return res.data
    } else {
        return false
    }
}

function joinPrice(i) {
    var j = ((i/256) * ((2500 + (1225 / 256)) - (640 * 2))) + 640
    j = j * 100
    j = Math.round(j)
    return j / 100
}

function generateChartData(current) {
    var labels = []
    var datasets = []
    var price
    var i
    var j
    if (current == null && current > 0) {
        var data = []
        for (i = 0; i <= 256; i++) {
            price = joinPrice(i)
            labels.push(i)
            data.push(price)
        }
        datasets.push({
            label: 'Price',
            backgroundColor: '#f87979',
            data: data,
        })
    } else {
        var data1 = []
        var data2 = []
        for (i = 0; i <= current - 1; i++) {
            price = joinPrice(i)
            labels.push(i)
            data1.push([i, price])
        }
        for (i = current; i <= 255; i++) {
            price = joinPrice(i)
            labels.push(i)
            data2.push([i, price])
        }
        datasets.push({
            label: 'Sold',
            backgroundColor: '#ff0000',
            data: data1,
            fill: 'origin',
        })
        datasets.push({
            label: 'Available',
            backgroundColor: '#0000ff',
            data: data2,
        })

    }
    return {
        labels: labels,
        datasets: datasets,
    }
}

var currentPrice = ref('')
var chartData = ref(generateChartData(null))
var chartOpts = {
    responsive: true,
}

getAccessTokenData().then((data) => {
    currentPrice.value = '$' + joinPrice(data.sequence)
    chartData.value = generateChartData(data.sequence)
    //console.log('Got Token Data:')
    //console.log(data)
})

</script>

<template>
    <div id="page-wrapper">
        <!-- Header -->
        <header id="header">
            <nav id="nav">
                <ul>
                    <li class="mr-5" v-if="readyState === 'Loadable' || readyState === 'NotDetected'"><a @click="disconnect">Disconnect</a></li>
                    <li><wallet-multi-button></wallet-multi-button></li>
                </ul>
            </nav>
        </header>

        <!-- Banner -->
        <section id="banner">
            <div style="display: flex; justify-content: center;">
                <div>
                    <img class="img" src="/images/fighter.png" alt="AI Dojo Fighter"/>
                    <br/>
                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <div>
                    <img class="img" src="/images/logo.png"/>
                </div>
            </div>
            <div class="inner">
                <p style="margin-bottom: 10px; font-style: italic; font-size: 110%;">
                    Escape Virtual Reality
                </p>
                <p>
                    Club For AI &amp; Blockchain
                </p>
                <p style="margin-bottom: 10px;">
                    Builders in San Francisco
                </p>
                <get-access-token></get-access-token>
            </div>
        </section>

        <section>
            <h1 class="text-center mb-3">2024 + 2025</h1>
            <h1 class="text-center">Access Token Price: {{ currentPrice }}</h1>
            <div class="m-10" style="background-color: white; border-radius: 5px;">
                <Line :data="chartData" :options="chartOps" style="height: 500px; width: 100%;"/>
            </div>
        </section>
    
        <!-- One -->
        <section id="one" class="wrapper style1 special">
            <div class="inner">
                <header class="major">
                    <h2>Arcu aliquet vel lobortis ata nisl<br />
                    eget augue amet aliquet nisl cep donec</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet eleifend<br />
                    fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper.</p>
                </header>
                <ul class="icons major">
                    <li><span class="icon fa-gem major style1"><span class="label">Lorem</span></span></li>
                    <li><span class="icon fa-heart major style2"><span class="label">Ipsum</span></span></li>
                    <li><span class="icon solid fa-code major style3"><span class="label">Dolor</span></span></li>
                </ul>
            </div>
        </section>

        <!-- Two -->
        <section id="two" class="wrapper alt style2">
            <section class="spotlight">
                <div class="image"><img src="images/pic01.jpg" alt="" /></div><div class="content">
                    <h2>Dojo Location</h2>
                    <p><em>Exit the Matrix:</em> A home base where members can hang out.<br/>Delegate associates to join your missions.</p>
                </div>
            </section>
            <section class="spotlight">
                <div class="image"><img src="images/pic02.jpg" alt="" /></div><div class="content">
                    <h2>Belt Rankings<br/>via NFT</h2>
                    <p>Level up your belt ranking by completing missions:<br/>1. Red, 2. Blue, 3. Green, 4. Cyan, 5. Magenta, 6. Yellow, and 7. Key</p>
                </div>
            </section>
            <section class="spotlight">
                <div class="image"><img src="images/pic03.jpg" alt="" /></div><div class="content">
                    <h2>Post-modern salon</h2>
                    <p>The cross-roads of cool: technology, business, and dialogue.<br/>Pooling code, data, and knowledge for the greater good.</p>
                </div>
            </section>
        </section>

        <!-- Three -->
        <section id="three" class="wrapper style3 special">
            <div class="inner">
                <header class="major">
                    <h2>Network with elite builders</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet eleifend<br />
                    fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper.</p>
                </header>
                <ul class="features">
                    <li class="icon fa-paper-plane">
                        <h3>Exclusive SF Club</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon solid fa-laptop">
                        <h3>Build AGI</h3>
                        <p>See the latest techniques and best practices for building with AI and blockchain.</p>
                    </li>
                    <li class="icon solid fa-code">
                        <h3>Startup Launchpad</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon solid fa-headphones-alt">
                        <h3>Demo Scene</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon fa-heart">
                        <h3>DAO Community</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon fa-flag">
                        <h3>Airdrop List</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                </ul>
            </div>
        </section>
        <p class="text-center mt-5 pb-5">
            &copy; AI Dojo, LLC.
        </p>
    </div>
</template>
