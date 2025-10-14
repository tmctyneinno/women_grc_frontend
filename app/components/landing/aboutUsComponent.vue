<template>
    <div data-aos="fade-up" class="main-page container">
        <div class="row g-3 justify-content-lg-between">
            <div class="col-lg-3 col-md-12">
                <div class="text-after-line text-muted2">
                    About Us
                </div>
                <div class="header">About Us</div>

                <nuxt-link to="/about-us" class="btn btn-theme mt-3 hover-tiltX">Learn More</nuxt-link>
            </div>

            <div class="col-lg-6" style="font-size: 18px; text-align: justify;">
                Women in Governance, Risk, Compliance, Financial Crime, and Fraud Prevention is a pioneering initiative
                founded by Dr. Foluso Amusa, PhD, dedicated to empowering women professionals in these critical fields.
                Our mission is to foster leadership, inspire innovation, and create a collaborative platform for women
                to thrive, lead, and make a lasting impact across industries.
                We believe in the power of diversity and inclusion to drive ethical practices, enhance profession...
            </div>

            <div class="col-12 mt-5">
                <img src="/images/landing/about.png" style="width: 100%;" alt="">
            </div>

        </div>
    </div>
</template>


<style scoped>
.main-page {
    padding-block: 60px;
    min-height: 100vh;
}

.header {
    font-size: 40px;
    color: #333;
}
</style>