<template>
    <nuxt-layout name="landing-layout">
        <div class="hero animate__animated animate__fadeIn"> Advisory Board </div>

        <section class="py-5 container">
            <div data-aos="fade-up">
                <div class="header1 text-center">The Board of Advisory</div>
                <div class="text-center">
                    Women in GRC and Fincrime Prevention
                </div>
            </div>
            <div class="row g-3 mt-3">
                <div v-for="(member, index) in pageContents.board" :key="index" data-aos="fade-up"
                    class="col-lg-3 col-md-4">
                    <landing-profile-card-component :member />
                </div>
            </div>
        </section>

        <div class="container py-5">
            <landing-subscribe-component />
        </div>


    </nuxt-layout>

    <landing-modal-profile-info />

</template>

<script setup lang="ts">
import pageContents from '~/stores/pageContents/advisory.json'

</script>

<style scoped>
.hero {
    min-height: 100vh;
    background: url('/images/about/advisory.webp') center/cover no-repeat;
    /* This will make the image start from the top */
    background-position: center top !important;
    overflow: hidden;

    display: flex;
    justify-content: center;
    /* align-items: flex-end; */
    align-items: center;

    color: #fff;
    font-size: 64px;
    font-weight: 600;
}

.header1 {
    font-size: 40px;
    color: #333;
}
</style>
