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
                <div v-for="(member, index) in pageContents.$advisory.board" :key="index" data-aos="fade-up"
                    class="col-lg-3 col-md-4">
                    <div @click="landingModalStore.advisoryInfoSwitch(member)"
                        class="card h-100 border-0 cursor-pointer hover-tiltY advisory-card">
                        <div class="card-header border-0 pb-0 bg-transparent">
                            <span>&nbsp;</span>
                            <span class="text-theme float-end">
                                <div class="small text-theme read-more-icon">
                                    <i class="bi bi-chevron-right"></i>
                                </div>
                            </span>
                        </div>

                        <div class="card-body">
                            <div class="text-center my-3">
                                <img :src="member.image" alt="image" width="60">
                            </div>
                            <div class="text-center fw-bold">
                                {{ member.name }}
                            </div>
                            <div class="text-center">
                                {{ member.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="container py-5">
            <landing-subscribe-component />
        </div>

    </nuxt-layout>

    <landing-modals-advisory-info :info="'Emeka'" />

</template>

<script setup lang="ts">
import pageContents from '~/stores/pageContents.json'
import { useLandingModalStore } from '~/components/landing/modals/useLandingModalStore'

const landingModalStore = useLandingModalStore()

function showInfo() {

}


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
    padding-bottom: 40px;

    color: #fff;
    font-size: 64px;
    font-weight: 600;
}

.header1 {
    font-size: 32px;
    color: #333;
}

.advisory-card {
    background-color: var(--bs-light);
}

.read-more-icon {
    display: none;
}

.advisory-card:hover .read-more-icon {
    display: block;
}

.advisory-card:hover {
    background-color: var(--bs-secondary-bg-subtle);
}
</style>
