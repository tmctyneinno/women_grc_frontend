<template>
    <NuxtLayout name="account-layout">

        <div class="container">

            <div class="card border-0">
                <div class="card-body">

                    <div class="fw-semibold">Welcome, Sarah!</div>
                    <div>
                        Let’s get you started on your growth journey. Here, you can join events, connect with
                        mentors, learn, and grow in Governance, Risk, and Compliance.
                    </div>

                    <div class="card border-0" :style="{ backgroundColor: templateStore.themeColors.accountBg }">
                        <div class="card-body">
                            <div class="fw-medium">
                                <i class="bi bi-lightbulb text-warning-emphasis"></i>
                                Complete your profile to unlock more opportunities
                            </div>

                            <div class="d-md-flex gap-2 mt-2">
                                <div class="text-theme cursor-pointer hover-tiltY">Add Certifications</div>
                                <div class="text-theme cursor-pointer hover-tiltY">Update Skills</div>
                                <div class="text-theme cursor-pointer hover-tiltY">Set Learning Goals</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>





            <div class="row g-3 mt-2">
                <div class="col-lg-6">
                    <div class="card h-100 border-0">
                        <div class="card-body">
                            <div class="fw-medium mb-2">
                                Getting Started
                                <span class="badge rounded-pill bg-theme float-end fw-normal small">25% complete</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-theme" role="progressbar" style="width: 25%;"
                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>

                            <div class="mt-3">
                                <ul class="list-group list-group-flush">

                                    <li v-for="(line, index) in getStartedTimelines" :key="index"
                                        class="list-group-item border- ps-0 py-3 d-lg-flex gap-2">
                                        <div class="fw-medium col-lg-8">
                                            <span class=" cursor-pointer" @click="line.ischecked = !line.ischecked">
                                                <i v-if="!line.ischecked" class="bi bi-square text-theme me-2"></i>
                                                <i v-else class="bi  bi-check-square-fill text-theme me-2"></i>
                                            </span>
                                            {{ line.title }}
                                            <span v-if="line.percent" class="xsmall text-muted">
                                                ({{ line.percent }})
                                            </span>
                                        </div>

                                        <div class="col">
                                            <div class="float-end small hover-tiltX cursor-pointer text-theme">
                                                {{ line.action }}
                                                <i class="bi bi-arrow-right"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card h-100 border-0">
                        <div class="card-header bg-transparent border-0 fw-medium">
                            Recommended for You
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="card border-0"
                                        :style="{ backgroundColor: templateStore.themeColors.accountBg }">
                                        <div class="card-body">
                                            <span class="badge text-danger bg-danger-subtle fw-normal">
                                                <i class="bi bi-calendar3"></i> Upcoming Event
                                            </span>
                                            <span class="float-end">Nov 8</span>

                                            <div class="mt-3">
                                                <div class="fw-medium">Women Leading in Compliance</div>
                                                <p class="small">
                                                    Join industry leaders as they share insights on navigating
                                                    compliance
                                                    challenges and building successful careers in GRC. Featuring Sarah
                                                    Chen, VP
                                                    of Compliance at TechCorp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card border-0"
                                        :style="{ backgroundColor: templateStore.themeColors.accountBg }">
                                        <div class="card-body">
                                            <span class="badge text-success bg-success-subtle fw-normal">
                                                <i class="bi bi-book"></i> Beginner
                                            </span>
                                            <span class="float-end">2h 30m</span>

                                            <div class="mt-3">
                                                <div class="fw-medium">Introduction to GRC</div>
                                                <p class="small">
                                                    Master the fundamentals of Governance, Risk, and Compliance. Perfect
                                                    for those new to the field or looking to strengthen their
                                                    foundation.
                                                </p>

                                                <div class="fw-medium mb-2">
                                                    Progess
                                                    <span class=" float-end fw-normal small">25%
                                                        complete</span>
                                                </div>
                                                <div class="progress" style="height: 10px;">
                                                    <div class="progress-bar bg-theme" role="progressbar"
                                                        style="width: 25%;" aria-valuenow="25" aria-valuemin="0"
                                                        aria-valuemax="100">
                                                    </div>
                                                </div>
                                            </div>

                                            <button class="btn btn-theme w-100 mt-4">
                                                <i class="bi bi-play-circle"></i> Continue Learning
                                            </button>

                                        </div>
                                    </div>


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
const templateStore = useTemplateStore()


const getStartedTimelines = ref<{ title: string, action: string, percent?: string, ischecked?: Boolean }[]>([
    { title: 'Complete your profile', action: 'Complete profile', percent: '40% complete', ischecked: false },
    { title: 'Join your first event', action: 'Join an event', ischecked: true },
    { title: 'Enroll in a learning module', action: 'Continue Learning', ischecked: true },
    { title: 'Introduce yourself in the forum', action: 'Visit Comunity', ischecked: false },
    { title: 'Connect with a mentor', action: 'Find Mentors', ischecked: true },
])
</script>