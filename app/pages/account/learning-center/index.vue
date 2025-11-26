<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="mb-3">
                <infoClient />
            </div>

            <div class="mb-3">
                <myLearningClient />
            </div>

            <div class="mb-3">
                <mostPopularClient />
            </div>

            <div class="mb-3">
                <courseCatalogClient />
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})

import infoClient from './includes/info.client.vue';
import myLearningClient from './includes/myLearning.client.vue';
import mostPopularClient from './includes/mostPopular.client.vue';
import courseCatalogClient from './includes/courseCatalog.client.vue';

</script>