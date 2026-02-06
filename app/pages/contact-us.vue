<template>
    <nuxt-layout name="landing-layout">
        <div class="container animate__animated animate__slideInUp">
            <div class="min-vh-50 pt-5 d-flex justify-content-center align-items-center">
                <div class="row justify-content-center ">
                    <div class="col-lg-8">
                        <div class="text-center text-after-line">
                            Contact us
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="hero-header text-center">
                            We'd love to hear from you
                        </div>
                        <div class="text-muted text-center mt-2">
                            We have offices and teams all around the world.
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <section data-aos="fade-up" class=" container">

            <div class="mapouter">
                <div class="gmap_canvas"><iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no"
                        marginheight="0" marginwidth="0"
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=85 Great Portland Street First Floor London W1W, 7LT, United Kingdom&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                    <!-- <a href="https://nicemail.cc">nicemail</a> -->
                </div>

            </div>

        </section>

        <section class="py-5 container">

            <div class="row g-3">
                <div v-for="(details, index) in addressDetails" :key="index" class="col-md-4">
                    <div class="card border-0 h-100 bg-light-subtle shadow-sm">
                        <div class="card-body">
                            <div class="text-center fw-bold">{{ details.title }}</div>
                            <div class="mt-3 text-center small">
                                {{ details.info }}
                            </div>
                        </div>
                        <div class="card-footer border-0 bg-transparent">
                            <div class="fw-bold small text-center">{{ details.footer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="py-5 container">

            <div class="row g-3 justify-content-center">
                <div class="col-lg-5 col-12">

                    <div class="text-center fw-bold fs-4">
                        Contact Us
                    </div>
                    <div class="text-muted text-center">
                        Our friendly team would love to hear from you.
                    </div>


                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-label">First Name:</div>
                            <custom-input-text placeholder="first name" />
                        </div>
                        <div class="col-md-6">
                            <div class="form-label">Last Name:</div>
                            <custom-input-text placeholder="last name" />
                        </div>
                        <div class="col-md-12">
                            <div class="form-label">Email:</div>
                            <custom-input-text type="email" placeholder="email" />
                        </div>

                        <div class="col-md-12">
                            <div class="form-label">Phone Number:</div>
                            <custom-input-phone placeholder="phone number" />
                        </div>

                        <div class="col-md-12">
                            <div class="form-label">Message:</div>
                            <textarea class="form-control" placeholder="enter message"
                                style="height: 130px;"></textarea>
                        </div>

                        <div class="col-md-12 cursor-pointer">
                            <i class="bi bi-square me-2"></i>
                            You agree to our friendly
                            <a href="#" class="text-theme">privacy policy</a>.
                        </div>

                        <div class="col-md-12">
                            <button class="btn btn-theme w-100">
                                Send Message
                            </button>
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



const addressDetails = [
    { title: "Address", info: "85 Great Portland Street First Floor London W1W, 7LT, United Kingdom.", footer: "enquiries@wgrcfp.org" },
    { title: "Email", info: "Questions or queries? Get in touch!", footer: "enquiries@wgrcfp.org" },
    { title: "Phone", info: "Mon-Fri from 8am to 5pm.", footer: "+44 2078560149" },
]


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

<style>
.mapouter {
    position: relative;
    text-align: right;
    width: 100%;
    height: 400px;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    width: 100%;
    height: 500px;
}

.gmap_iframe {
    height: 400px !important;
}
</style>
