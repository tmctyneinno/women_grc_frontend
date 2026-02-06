<template>
    <nuxt-layout name="landing-layout">
        <div class="container animate__animated animate__slideInUp">
            <div class="min-vh-50 pt-5 d-flex justify-content-center align-items-center">
                <div class="col-lg-6 mt-5">
                    <div class="text-center text-after-line">Recognizing Leaders
                    </div>
                    <div class="hero-header text-center">
                        Recognizing Excellence
                    </div>
                    <div class="text-muted text-center mt-2">
                        Recognizing Top Women who have contributed greatly to Governance, Risk & Compliance
                    </div>
                </div>
            </div>
        </div>
 
        <section class="py-5 container">

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
import pageContents from '~/stores/pageContents/recognition.json'

</script> 

<style scoped>
.hero-header {
    font-size: 50px;
    font-weight: 600;
    line-height: 1;
}

@media (max-width: 767px) {
    .hero-header {
        font-size: 34px;
    }
}
</style>
