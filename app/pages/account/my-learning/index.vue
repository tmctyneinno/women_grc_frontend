<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="mb-3">
                <myLearningClient :is-all="true" />
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})

import myLearningClient from '../learning-center/components/myLearning.client.vue';

</script>