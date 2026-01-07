<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="row g-3">

                <section class="col-12">
                    <AccountForumHeadCardWithSearch />
                </section>


                <section class="col-12">
                    <AccountForumSuggestedForums />
                </section>

                <section class="col-12">
                    <AccountForumRegionalForums />
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
