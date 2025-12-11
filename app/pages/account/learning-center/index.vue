<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="mb-3">
                <!-- info -->
                <AccountLearningCenterInfo />
            </div>

            <div class="mb-3">
                <!-- my-learning -->
                <AccountLearningCenterMyLearning />
            </div>

            <div class="mb-3">
                <!-- most-popular -->
                <AccountLearningCenterMostPopular />
            </div>

            <div class="mb-3">
                <!-- course-catalog -->
                <AccountLearningCenterCourseCatalog />
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})
</script>