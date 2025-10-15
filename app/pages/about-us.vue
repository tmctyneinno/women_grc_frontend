<template>
    <nuxt-layout name="landing-layout">
        <div class="hero animate__animated animate__fadeIn"> Who We Are </div>

        <section data-aos="fade-up" class=" py-5 container">
            <div class="row g-3 justify-content-lg-between">
                <div class="col-lg-3 col-md-12">
                    <div class="text-after-line text-muted2">
                        About Us
                    </div>
                    <div class="header1">About Us</div>
                </div>

                <div class="col-lg-6" style="font-size: 18px; text-align: justify;">
                    {{ pageContents.$about.regularText }}
                </div>

                <div class="col-12 mt-5">
                    <img src="/images/about/about-img2.webp" style="width: 100%;" alt="">
                </div>

            </div>
        </section>


        <section data-aos="fade-up" class=" py-5 container">
            <div class="row g-3 justify-content-lg-between">
                <div class="col-lg-3 col-md-12">
                    <div class="text-after-line text-muted2">
                        Vision
                    </div>
                    <div class="header1">Vision Statement</div>
                </div>

                <div class="col-lg-6" style="font-size: 18px; text-align: justify;">
                    {{ pageContents.$about.vision }}
                </div>

            </div>

        </section>


        <section data-aos="fade-up" class=" py-5 container">
            <div class="row g-3 g-lg-5 justify-content-lg-between align-items-lg-center">
                <div class="col-lg-4">
                    <div class="text-after-line text-muted2">
                        Advancing Women in Leadership
                    </div>
                    <div class="header1">Purpose Statement</div>
                </div>

                <div class="col-lg-6"></div>

                <div class="col-lg-6" style="font-size: 18px; text-align: justify;">
                    {{ pageContents.$about.purpose }}
                </div>

                <div class="col-lg-6">
                    <img src="/images/about/about-purpose.webp" style="width: 100%;" alt="">
                </div>

            </div>
        </section>




        <section data-aos="fade-up" class=" py-5 container">
            <div class="row g-3 g-lg-5 justify-content-center align-items-center">
                <div class="col-lg-6 order-1 order-lg-2">
                    <div class="text-after-line text-muted2">
                        Mission
                    </div>
                    <div class="header1 mb-3">Mission Statement</div>

                    <div class="text-muted text-justify">
                        To advance the role of women in GRC and financial crime prevention by:
                        <ul>
                            <li v-for="(statement, index) in pageContents.$about.missionStatements" :key="index">
                                {{ statement }}
                            </li>
                        </ul>
                        This initiative will serve as a beacon of excellence, nurturing a community of empowered women
                        who make meaningful contributions to their organizations, industries, and societies.
                    </div>
                </div>

                <div class="col-lg-6 order-2 order-lg-1">
                    <img src="/images/about/about-statement.webp" style="width: 100%;" alt="">
                </div>

            </div>
        </section>

        <section data-aos="fade-up" class="py-5 container">
            <div class="header1 text-center">What We Do</div>
            <div class="row g-3 mt-3">
                <div v-for="({ title, text, img }, index) in pageContents.$about.whatWeDo" class="col-lg-4 col-md-6">
                    <div class="card h-100 border-0">
                        <div class="card-body">
                            <div class="text-center my-3">
                                <img :src="img" alt="image" width="100">
                            </div>
                            <div class="text-center fw-bold mb-2">
                                {{ title }}
                            </div>
                            <div class="text-center">
                                {{ text }}
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

</template>

<script setup lang="ts">
import pageContents from '~/stores/pageContents.json'

</script>

<style scoped>
.hero {
    min-height: 100vh;
    background: url('/images/about/about-img1.webp') center/cover no-repeat;
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
</style>
