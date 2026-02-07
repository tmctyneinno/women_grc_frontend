<template>
    <nuxt-layout name="landing-layout">

        <div class="container">
            <div class="min-vh-100 d-flex justify-content-center align-items-center">
                <div class="col-lg-8 col-12  mx-auto">
                    <div class="text-center">
                        <NuxtImg src="/images/auth/congrats.png" width="100" alt="" />
                    </div> 
                    <div class="fw-bold text-center fs-2">
                        Registration Confirmed!
                    </div>
                    <div class="text-center text-muted">
                        Thank you for joining Women in GRC & Financial Crime Prevention Initiative. We're currently
                        setting up your member dashboard and onboarding experience.
                    </div>

                    <div class="mt-3 text-center ">
                        <nuxt-link to="/">Back to Home</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>


</template>