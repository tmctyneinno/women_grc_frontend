<template>
    <NuxtLayout name="account-layout">
        <div class="container">
            <div class="row g-3">
                <section class="col-12">
                    <AccountForumHeadCardWithSearch />
                </section>

                <section class="col-12">
                    <div class="row g-3">
                        <div class="col-lg-8">
                            <div class="row g-3">
                                <section class="col-12">
                                    <AccountForumJoinedForums />
                                </section>

                                <section class="col-12">
                                    <AccountForumRegionalForums />
                                </section>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="row g-3">
                                <section class="col-12">
                                    <AccountForumMyActivity />
                                </section>

                                <section class="col-12">
                                    <AccountForumTopContributors />
                                </section>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})



</script>
