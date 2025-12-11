<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="mb-3">
                <AccountLearningCenterMyLearning :is-all="true" />
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})


</script>