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

import infoClient from './components/info.client.vue';
import myLearningClient from './components/myLearning.client.vue';
import mostPopularClient from './components/mostPopular.client.vue';
import courseCatalogClient from './components/courseCatalog.client.vue';

</script>