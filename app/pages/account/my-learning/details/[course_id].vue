<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="video-card">
                <i class="bi bi-play-circle cursor-pointer hover-tiltY text-white" style="font-size: 6rem;"></i>
            </div>

            <div class="fw-semibold mt-3">
                Introduction
            </div>

            <div class="d-flex gap-2 text-muted">
                <div class="small">
                    A course by Jane Yery
                </div>

                <i class="bi bi-dot"></i>

                <div class="fw-medium small">
                    4.8
                </div>

                <div class="small">
                    <i v-for="i in 2" class="bi bi-star-fill text-warning me-1 "></i>
                    123 Ratings
                </div>

                <i class="bi bi-dot"></i>

                <div class="small">
                    <i class="bi bi-person"></i> 123 Learners
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
                <CourseContentClient v-if="selectedTab == 'course_content'" />
                <overviewClient v-if="selectedTab == 'overview'" />
            </div>


        </div>
    </NuxtLayout>

</template>

<script setup lang="ts">

const option = ref(null)

definePageMeta({
    middleware: 'account-route-middleware'
})

import CourseContentClient from './tab-components/courseContent.client.vue'
import overviewClient from './tab-components/overview.client.vue'

const route = useRoute()

type TabOptionType = 'course_content' | 'overview' | 'reviews' | 'QandA' | 'certifications'

const tabs: { title: string, value: TabOptionType }[] = [
    { title: 'Course Content', value: 'course_content' },
    { title: 'Overview', value: 'overview' },
    { title: 'Reviews', value: 'reviews' },
    { title: 'Q&A', value: 'QandA' },
    { title: 'Certifications', value: 'certifications' },
]

const selectedTab = ref<TabOptionType>('course_content')
</script>

<style scoped>
.video-card {
    min-height: 75vh;
    background-color: var(--bs-secondary-bg-subtle);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10px;
}
</style>