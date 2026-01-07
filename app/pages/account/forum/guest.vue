<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="row g-3">
                <section class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">

                            <div class="fw-semibold fs-5">
                                Community Forums
                            </div>

                            <div class="small text-muted">
                                Connect with fellow GRC professionals, share insights, and advance your expertise
                                together
                            </div>

                            <div class="mt-3">
                                <CustomInputSearch />
                            </div>
                        </div>
                    </div>
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
