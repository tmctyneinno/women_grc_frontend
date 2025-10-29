<template>
    <nuxt-layout name="landing-layout">

        <section class="hero">
            <div class="container animate__animated animate__slideInUp">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="row justify-content-center">
                        <div class="col-md-3 col-6">
                            <div class="text-center text-after-line">
                                Resource
                            </div>
                        </div>
                        <div class="col-12 hero-header text-center">
                            Facilitators
                        </div>
                        <div class="col-lg-10 text-center mt-2">
                            The Event Facilitators Scheme is an integral part of the Women in Governance, Risk,
                            Compliance (GRC), and Financial Crime, Fraud Prevention Initiative. This scheme is designed
                            to empower members with opportunities to lead, organize, and facilitate impactful events
                            that align with the initiative's mission of advancing gender diversity and
                            professional development within the industry.
                        </div>
                        <div class="col-12 row justify-content-center g-3 mt-1">
                            <div class="col-lg-2 col-md-6">
                                <nuxt-link class="btn btn-theme float-lg-end w-100" to="/auth/register">
                                    Apply now
                                </nuxt-link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Objectives of the Scheme</div>
                <div class="text-center">
                    Building a stronger community through leadership and collaboration
                </div>
                <div class="row g-3 mt-3">
                    <div v-for="(obj, index) in pageContents.objectives" :key="index" class="col ">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class="circled-icon text-white" :class="`${obj.icon}`"
                                        :style="{ backgroundColor: obj.iconBg }"></i>

                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ obj.title }}
                                </div>
                                <div class="text-center">
                                    {{ obj.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Roles of Facilitators</div>
                <div class="text-center">
                    What Our Facilitators do to Drive Success
                </div>

                <div class="row g-3 justify-content-center align-items-center mt-3">
                    <div class="col-6 d-none d-lg-block">
                        <img src="/images/resources/facilitators.webp" alt=""></img>
                    </div>
                    <div class="col-lg-6">
                        <ul class="list-group list-group-flush">
                            <li v-for="(role, index) in pageContents.rolesOfFacilitators" :key="index"
                                class="list-group-item border-0 d-flex">
                                <div class="col-1">
                                    <i class="bi bi-check-circle-fill text-theme"></i>
                                </div>
                                <div class="col">
                                    <div class="fw-bold">{{ role.title }}</div>
                                    <div class="text-muted">{{ role.text }}</div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Types of Events</div>
                <div class="row justify-content-center g-3 mt-3">
                    <div v-for="(type, index) in pageContents.typesOfEvents" :key="index" class="col-lg-4 col-md-6">
                        <div class="card border-0 h-100" :style="{ backgroundColor: type.backgroundColor }">
                            <div class="card-body">
                                <i :class="type.icon + ' fs-4'" :style="{ color: type.iconColor }"></i>
                                <div class=" fw-medium">{{ type.title }}</div>
                                <div>
                                    {{ type.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Eligibility Requirement</div>

                <div class="row justify-content-center g-3 mt-2">
                    <div class="col-md-7">
                        <div class="card bg-secondary-subtle border-0">
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li v-for="(req, index) in pageContents.eligibilityRequirement" :key="index"
                                        class="list-group-item bg-transparent border">
                                        <i class="bi bi-check-circle-fill me-2"></i>
                                        <span>{{ req }}</span>
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
                <div class="text-center fw-bold fs-4">Application Process</div>



                <!--  -->
                <!-- <div class="container py-5">
                    <div class="row">
                        <div class="col-md-10 col-lg-8 mx-auto">

                            <h2 class="text-center mb-5">Application process</h2>

                            <div class="position-relative">

                                <div class="position-absolute top-0 bottom-0"
                                    style="left: 19px; width: 2px; background-color: #e0e0e0;">
                                </div>

                                <div class="d-flex align-items-start mb-5 position-relative">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-info rounded-circle text-info fw-bold"
                                        style="width: 40px; height: 40px; background-color: #fff; z-index: 1;">
                                        1
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="fw-bold">Submit Application</h5>
                                        <p class="text-muted">Complete the online form with your experience and
                                            motivation</p>
                                        <a href="#" class="text-decoration-none fw-semibold">
                                            Access Application Form <i class="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>

                                <div class="d-flex align-items-start mb-5 position-relative">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-dark rounded-circle text-dark fw-bold"
                                        style="width: 40px; height: 40px; background-color: #fff; z-index: 1;">
                                        2
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="fw-bold">Review & Approval</h5>
                                        <p class="text-muted">Our team reviews applications and conduct brief interviews
                                        </p>
                                    </div>
                                </div>

                                <div class="d-flex align-items-start position-relative">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-primary rounded-circle text-primary fw-bold"
                                        style="width: 40px; height: 40px; background-color: #fff; z-index: 1;">
                                        3
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="fw-bold">Orientation</h5>
                                        <p class="text-muted mb-0">Welcome session and training on facilitation best
                                            practices</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> -->


                <div class="container py-5">
                    <div class="row">
                        <div class="col-lg-10 col-xl-8 mx-auto">

                            <div class="timeline-wrapper">

                                <div class="timeline-line"></div>

                                <div class="row g-0 position-relative mb-5">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-info rounded-circle text-info fw-bold
                                    timeline-marker">
                                        1
                                    </div>

                                    <div class="col-md-6 text-md-end 
                                    timeline-content timeline-content-left">
                                        <h5 class="fw-bold">Submit Application</h5>
                                        <p class="text-muted">Complete the online form with your experience and
                                            motivation</p>
                                        <nuxt-link class="text-decoration-none fw-semibold text-theme" to="#">
                                            Access Application Form <i class="bi bi-arrow-right"></i>
                                        </nuxt-link>
                                    </div>
                                </div>

                                <div class="row g-0 position-relative mb-5">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-dark rounded-circle text-dark fw-bold
                                    timeline-marker">
                                        2
                                    </div>

                                    <div class="col-md-6 offset-md-6 
                                    timeline-content timeline-content-right">
                                        <h5 class="fw-bold">Review & Approval</h5>
                                        <p class="text-muted">Our team reviews applications and conduct brief interviews
                                        </p>
                                    </div>
                                </div>

                                <div class="row g-0 position-relative">
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0 
                                    border border-3 border-primary rounded-circle text-primary fw-bold
                                    timeline-marker">
                                        3
                                    </div>

                                    <div class="col-md-6 text-md-end 
                                    timeline-content timeline-content-left">
                                        <h5 class="fw-bold">Orientation</h5>
                                        <p class="text-muted mb-0">Welcome session and training on facilitation best
                                            practices</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Support for Facilitators</div>
                <div class="row g-3 mt-3">
                    <div v-for="(obj, index) in pageContents.supportForFacilitators" :key="index" class="col ">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <i class="circled-icon text-white bg-theme" :class="`${obj.icon}`"></i>
                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ obj.title }}
                                </div>
                                <div class="text-center">
                                    {{ obj.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Key Benefits</div>
                <div class="row g-3 mt-3">
                    <div v-for="(obj, index) in pageContents.keyBenefits" :key="index" class="col ">
                        <div class="card border-0 bg-transparent h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-center mb-3">
                                    <img :src="obj.image" alt="">

                                </div>
                                <div class="fw-bold my-2 text-center">
                                    {{ obj.title }}
                                </div>
                                <div class="text-center">
                                    {{ obj.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <section>
            <div data-aos="fade-up" class="py-5 container">
                <div class="text-center fw-bolder fs-4">Facilitators' Guidelines</div>

                <div class="row justify-content-center g-3 mt-2">
                    <div class="col-md-9">
                        <div class="card bg-secondary-subtle border-0">
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li v-for="(guildline, index) in pageContents.facilitatorsGuidelines" :key="index"
                                        class="list-group-item bg-transparent border">
                                        <i class="bi bi-check-circle-fill me-2 text-theme"></i>
                                        <span class="fw-semibold">{{ guildline.title }}: </span>
                                        <span>{{ guildline.text }}</span>
                                    </li>

                                </ul>

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
import pageContents from '~/stores/pageContents/facilititors.json'

</script>

<style scoped>
.hero {
    min-height: 50vh;
    /* background: url('/images/mentorship/mentorship-hero.webp') center/cover no-repeat; */
    background-position: center top !important;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 120px;

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
    width: 40px;
    height: 40px;
    border-radius: 50%;
}



/* ######################### */
.timeline-wrapper {
    position: relative;
}

/* 1. The Vertical Line */
.timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #e0e0e0;

    /* --- Mobile-first: line on the left --- */
    /* 19px = 40px (marker width) / 2 - 1px (line width) / 2 */
    left: 19px;
    transform: translateX(0);
}

/* 2. The Markers */
.timeline-marker {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #fff;
    z-index: 1;

    /* --- Mobile-first: markers on the left --- */
    left: 0;
    transform: translateX(0);
}

/* 3. The Content */
.timeline-content {
    /* --- Mobile-first: padding to avoid the left-side marker --- */
    padding-left: 60px;
    /* 40px marker + 20px space */
}

/* --- Desktop (md) and up: Switch to alternating layout --- */
@media (min-width: 768px) {

    /* 1. Center the line */
    .timeline-line {
        left: 50%;
        transform: translateX(-50%);
    }

    /* 2. Center the markers */
    .timeline-marker {
        left: 50%;
        transform: translateX(-50%);
    }

    /* 3. Reset content padding for all */
    .timeline-content {
        padding-left: 0;
    }

    /* 4. Add padding for the alternating content */
    .timeline-content-left {
        padding-right: 30px;
        /* Space from center line */
    }

    .timeline-content-right {
        padding-left: 30px;
        /* Space from center line */
    }
}

/* ######################### */
</style>
