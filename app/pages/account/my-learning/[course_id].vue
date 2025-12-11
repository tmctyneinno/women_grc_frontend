<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="video-card">
                <span class=" open-canvas bi bi-arrow-left" data-bs-toggle="offcanvas" data-bs-target="#contentCanvas"
                    aria-controls="contentCanvas"></span>
                <i class="bi bi-play-circle cursor-pointer hover-tiltY text-white" style="font-size: 6rem;"></i>
            </div>

            <div class="fw-semibold mt-3">
                Introduction
            </div>

            <div class="d-flex gap-2 text-muted">
                <div class="small">
                    A course by {{ course.author }}
                </div>

                <i class="bi bi-dot"></i>

                <div class="fw-medium small">
                    4.8
                </div>

                <div class="small">
                    <i v-for="i in 2" class="bi bi-star-fill text-warning me-1 "></i>
                    {{ course.total_ratings }} Ratings
                </div>

                <i class="bi bi-dot"></i>

                <div class="small">
                    <i class="bi bi-person"></i>
                    {{ course.learners }} Learners
                </div>

            </div>

            <ul class="nav nav-tabs nav-tabs-v1 mt-4" id="myTab" role="tablist">
                <li v-for="tab in tabs" class="nav-item" role="presentation">
                    <button @click="selectedTab = tab.value" class="nav-link"
                        :class="{ 'active': selectedTab == tab.value }" :id="tab.value + '-tab'" data-bs-toggle="tab"
                        type="button" role="tab" aria-selected="true">
                        {{ tab.title }}
                    </button>
                </li>

            </ul>

            <div class="tab-content p-3 min-vh-50 bg-white mt-3 rounded-3">

                <!-- courseContent -->
                <AccountMyLearningCourseContentTab v-if="selectedTab == 'courseContent'" />

                <!-- overview -->
                <AccountMyLearningOverviewTab v-if="selectedTab == 'overview'" />

                <!-- reviews -->
                <AccountMyLearningReviewsTab v-if="selectedTab == 'reviews'" />
            </div>


        </div>




        <!-- offcanvas -->
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="contentCanvas"
            aria-labelledby="Enable both scrolling & backdrop">
            <div class="offcanvas-header">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <AccountMyLearningCourseContentTab />
            </div>
        </div>

    </NuxtLayout>

</template>

<script setup lang="ts">

const myLearningStore = useMyLearningStore()
const { course } = storeToRefs(myLearningStore)


definePageMeta({
    middleware: 'account-route-middleware'
})

type TabOptionType = 'courseContent' | 'overview' | 'reviews' | 'QandA' | 'certifications'

interface TabInterface {
    title: string;
    value: TabOptionType;
    icon?: string; // Optional icon property
    disabled?: boolean; // Optional disabled state
}

const tabs: TabInterface[] = [
    { title: 'Course Content', value: 'courseContent' },
    { title: 'Overview', value: 'overview' },
    { title: 'Reviews', value: 'reviews' },
    { title: 'Q&A', value: 'QandA' },
    { title: 'Certifications', value: 'certifications' },
]

const selectedTab = ref<TabOptionType>('courseContent')


</script>

<style scoped>
.video-card {
    min-height: 75vh;
    background-color: var(--bs-secondary-bg-subtle);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10px;
    position: relative;
}

.open-canvas {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0px;
    margin-top: 20px;
    padding: 10px 30px;
    background-color: #293567;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
</style>