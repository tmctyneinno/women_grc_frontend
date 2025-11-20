<template>
    <NuxtLayout name="account-layout">

        <div class="container">

            <div class="card border-0">
                <div class="card-body">

                    <div class="fw-semibold">Welcome, Sarah!</div>
                    <div class="mb-3">
                        Your registration was successful.
                    </div>

                    <div class="card border-0 bg-account">
                        <div class="card-body">
                            <div class="fw-medium text-center">
                                Your account is awaiting verification.
                            </div>
                            <div class="my-2 text-center">
                                <span class="badge rounded-pill text-secondary bg-secondary-subtle">
                                    <i class="bi bi-circle-fill"></i> Pending Verification
                                </span>
                            </div>

                            <div class="my-2 text-center">
                                An administrator is reviewing your membership. Once verified, you'll gain access to
                                events, courses, mentorship, and the community forum.
                            </div>

                            <div class="my-2 text-center text-muted">
                                You’ll receive an email once your account is approved
                            </div>

                        </div>
                    </div>

                </div>
            </div>



            <div class="card border-0 h-100 mt-4">
                <div class="card-body">
                    <div class="row g-3 justify-content-center">
                        <div class="col-12">
                            <div class="fw-semibold text-center">
                                What’s waiting for you
                            </div>
                        </div>
                        <div v-for="(event, index) in waitingEvents" :key="index" class="col-lg-4">
                            <div class="card h-100 border-0 position-relative">
                                <i class="bi bi-lock lock-icon"></i>
                                <img class="card-img-top" :src="event.img"></img>
                                <div class="card-body">
                                    <div class="badge rounded-pill text-bg-light fw-semibold text-muted">
                                        {{ event.type }}
                                    </div>

                                    <div class="mt-3 fw-medium text-muted">
                                        {{ event.title }}
                                    </div>


                                    <div class="mt-2 text-muted fw-normal small">
                                        {{ event.text }}
                                    </div>
                                </div>
                                <div class="card-footer border-0 bg-transparent">
                                    <button class="btn btn-secondary btn-sm" disabled>Locked</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    </NuxtLayout>

</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'account-route-middleware'
})

const authStore = useAuthStore()

onMounted(() => {
    authStore.isGuest = true
})

onBeforeRouteLeave(() => {
    authStore.isGuest = false
})



const waitingEvents = ref<{ img: string, type: string, title: string, text: string }[]>([
    { img: '/images/account/dashboard/women_in_leadership.png', type: 'Upcoming Event', title: 'Women in Leadership', text: 'Join industry leaders for insights on advancing your career in governance, risk, and compliance.', },
    { img: '/images/account/dashboard/grc_fundamentals.png', type: 'Featured Course', title: 'GRC Fundamentals', text: 'Master the essential concepts of governance risk management, and compliance in this detailed course', },
])
</script>

<style scoped>
.lock-icon {
    position: absolute;
    right: 0;
    margin: 10px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}


/* .text-muted-bold {
    color: #8E8E8E !important;
}

.text-muted {
    color: #ADADAD !important;
} */
</style>