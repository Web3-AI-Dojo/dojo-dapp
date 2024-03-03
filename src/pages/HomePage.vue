<script setup>
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import GetAccessToken from '../components/GetAccessToken'
import store from '../vuex'
import pkg from '../../package.json'

const { connected, ready, readyState, disconnect } = useWallet()
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
                    <img class="img" src="/images/fighter.png" alt="AI Dojo Fighter" />
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
                    <h2>Magna primis lobortis<br />
                    sed ullamcorper</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec hendrerit imperdiet. Mauris eleifend fringilla nullam aenean mi ligula.</p>
                </div>
            </section>
            <section class="spotlight">
                <div class="image"><img src="images/pic02.jpg" alt="" /></div><div class="content">
                    <h2>Tortor dolore feugiat<br />
                    elementum magna</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec hendrerit imperdiet. Mauris eleifend fringilla nullam aenean mi ligula.</p>
                </div>
            </section>
            <section class="spotlight">
                <div class="image"><img src="images/pic03.jpg" alt="" /></div><div class="content">
                    <h2>Augue eleifend aliquet<br />
                    sed condimentum</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec hendrerit imperdiet. Mauris eleifend fringilla nullam aenean mi ligula.</p>
                </div>
            </section>
        </section>

        <!-- Three -->
        <section id="three" class="wrapper style3 special">
            <div class="inner">
                <header class="major">
                    <h2>Accumsan mus tortor nunc aliquet</h2>
                    <p>Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet eleifend<br />
                    fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper.</p>
                </header>
                <ul class="features">
                    <li class="icon fa-paper-plane">
                        <h3>Arcu accumsan</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon solid fa-laptop">
                        <h3>Ac Augue Eget</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon solid fa-code">
                        <h3>Mus Scelerisque</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon solid fa-headphones-alt">
                        <h3>Mauris Imperdiet</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon fa-heart">
                        <h3>Aenean Primis</h3>
                        <p>Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem tincidunt nullam amet leo Aenean ligula consequat consequat.</p>
                    </li>
                    <li class="icon fa-flag">
                        <h3>Tortor Ut</h3>
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
