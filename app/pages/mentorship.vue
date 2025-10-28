<template>
    <nuxt-layout name="landing-layout">
        <section class="hero">
            <div class="container animate__animated animate__slideInUp">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="row justify-content-center">
                        <div class="col-md-3">
                            <div class="text-center text-after-line">Resource
                            </div>
                        </div>
                        <div class="col-12 hero-header text-center">
                            Mentorship
                        </div>
                        <div class="col-lg-10 text-center mt-2">
                            The Mentorship Programme under the Women in Governance, Risk, Compliance (GRC), and
                            Financial Crime, Fraud Prevention Initiative is designed to empower, guide, and support
                            women professionals. By fostering meaningful mentor-mentee relationships, the program aims
                            to accelerate career growth, enhance skills, and create a collaborative community dedicated
                            to advancing diversity and excellence in the industry.
                        </div>
                        <div class="col-12 row justify-content-center g-3 mt-1">
                            <div class="col-lg-2 col-md-6">
                                <nuxt-link class="btn btn-theme float-lg-end w-100" to="/auth/register">
                                    Become a member
                                </nuxt-link>
                            </div>
                            <div class="col-lg-2 col-md-6">
                                <nuxt-link class="btn btn-outline-light w-100" to="/auth/register">
                                    Apply as a Mentee
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section data-aos="fade-up" class="py-5 container">
            <div class="col-lg-4 my-2">
                <div class="text-after-line">
                    Objectives
                </div>
            </div>
            <div class="col-12 text-theme fw-bold fs-4">
                Our Programme Objectives
            </div>
            <div class="row g-2 mt-3">
                <div v-for="(obj, index) in pageContents.programObjectives" :key="index" class="col">
                    <div class="card bg-theme text-white small h-100 border-0">
                        <div class="card-body">
                            <i class="bi bi-box fs-4"></i>
                            <div class="fw-bolder mb-2">{{ obj.title }}</div>
                            <div class="">
                                {{ obj.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section class="bg-light">
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Programme Overview</div>
                <div class="text-center">
                    Designed to foster growth, leadership and professional development for Women in GRC
                </div>

                <div class="row g-3 justify-content-center mt-3">
                    <div class="col-md-6 col-lg-3">
                        <div class="card border-0 bg-theme2 text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class="circled-icon bi bi-alarm-fill bg-white text-theme2"></i>
                                </div>
                                <div class="fw-bold my-2 text-center">
                                    6 - 12 months
                                </div>
                                <div class="text-center">
                                    Virtual and in-person mentorship sessions tailored to your schedule and preferences
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="card border-0 bg-theme text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class="circled-icon bi bi-heart-fill bg-white text-theme"></i>
                                </div>
                                <div class="fw-bold my-2 text-center">
                                    Open to All Women
                                </div>
                                <div class="text-center">
                                    At various career stages with structured mentorship, workshops, and networking
                                    opportunities
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Programme Structure</div>
                <div class="text-center">
                    Your journey through our mentorship programs
                </div>
                <div class="row g-3 mt-3">
                    <div v-for="(structure, index) in pageContents.programStructure" :key="index"
                        class="col-md-6 col-lg-3">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class="circled-icon bi  bg-theme text-white"
                                        :class="`bi-${(index + 1)}-circle`"></i>
                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ structure.title }}
                                </div>
                                <div class="text-center">
                                    {{ structure.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="bg-light">
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Key Benefits</div>
                <div class="text-center">
                    Discover the value of meaningful mentorship — whether you’re guiding others or growing your own
                    career.
                </div>

                <div class="row g-3 justify-content-center mt-3">
                    <div class="col-md-6 col-lg-5">
                        <div class="card border-0 bg-theme2 text-white h-100">
                            <div class="card-body">

                                <div class="fw-bold my-2 text-center">
                                    For Mentees
                                </div>

                                <ul class="list-group list-group-flush">
                                    <li v-for="(val, index) in pageContents.keyBenefits.mentees"
                                        class="list-group-item bg-transparent text-white border-0 d-flex gap-1">
                                        <div class="col-2">
                                            <i class=" circled-icon bg-white text-dark" :class="`${val.icon}`"></i>
                                        </div>
                                        <div>{{ val.title }}
                                            <div class="small">{{ val.text }}</div>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5">
                        <div class="card border-0 bg-theme text-white h-100">
                            <div class="card-body">
                                <div class="fw-bold my-2 text-center">
                                    For Mentors
                                </div>

                                <ul class="list-group list-group-flush">
                                    <li v-for="(val, index) in pageContents.keyBenefits.mentors"
                                        class="list-group-item bg-transparent text-white border-0 d-flex gap-1">
                                        <div class="col-2">
                                            <i class=" circled-icon bg-white text-dark" :class="`${val.icon}`"></i>
                                        </div>
                                        <div>{{ val.title }}
                                            <div class="small">{{ val.text }}</div>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Application Process</div>
                <div class="text-center">
                    Simple steps to join our mentorship community
                </div>
                <div class="row g-3 mt-3">
                    <div v-for="(process, index) in pageContents.applicationProcess" :key="index" class="col-md-4 ">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class=" circled-icon bg-theme text-white" :class="`${process.icon}`"></i>

                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ process.title }}
                                </div>
                                <div class="text-center">
                                    {{ process.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-3 text-center">
                    <nuxt-link class="btn btn-theme" to="/auth/register"> Start Application Now</nuxt-link>
                </div>
            </div>
        </section>





        <section class="bg-light">
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Programme Guidelines</div>
                <div class="text-center">
                    Essential principles for a successful mentorship experience
                </div>
                <div class="row g-3 mt-3">
                    <div v-for="(process, index) in pageContents.programGuidelines" :key="index"
                        class="col-md-6 col-lg-3">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class=" circled-icon bg-secondary-subtle text-dark"
                                        :class="`${process.icon}`"></i>

                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ process.title }}
                                </div>
                                <div class="text-center">
                                    {{ process.text }}
                                </div>
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
import pageContents from '~/stores/pageContents/mentorship.json'

</script>

<style scoped>
.hero {
    min-height: 100vh;
    background: url('/images/mentorship/mentorship-hero.webp') center/cover no-repeat;
    /* This will make the image start from the top */
    background-position: center top !important;
    overflow: hidden;

    display: flex;
    justify-content: center;
    /* align-items: flex-end; */
    align-items: center;
    padding-bottom: 40px;

    color: #fff !important;
}


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

.circled-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
</style>
