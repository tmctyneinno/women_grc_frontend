<template>
    <nuxt-layout name="landing-layout">
        <div class="container">
            <div class="hero animate__animated animate__fadeIn row g-3 justify-content-center align-items-center">
                <div class="col-lg-6 order-2 order-lg-1">
                    <div style="font-size: 24px; font-weight: 500;">
                        WGRCFP membership is designed to foster professional growth, visibility, and impact for women
                        working in or aspiring to lead within the fields of governance, risk management, compliance
                        (GRC), financial crime prevention, fraud, cyber risk, and ESG.
                    </div>
                    <div>
                        Our plans are tailored to meet the needs of individuals at different stages of their career and
                        organisations committed to gender equity in risk and compliance leadership.
                    </div>
                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <div class="text-center heroImage">
                        <img class="float-lg-end " src="/images/membership/header.png" style="width: 80%;" alt=""></img>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5 container">

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
}

@media (max-width: 767px) {
    .heroImage {
        padding-top: 100px;
    }
}

.header1 {
    font-size: 40px;
    color: #333;
}
</style>
