<template>
    <div class="fw-semibold mb-3">
        Your Courses Progress
    </div>

    <div class=" bg-light p-3 py-4 rounded-3">
        <div>
            <span>
                {{ course.progress.percent }}%
            </span>
            <span class="float-end">
                {{ course.progress.completed }}/ {{ course.progress.total }} Lessons
            </span>
        </div>
        <div class="progress" style="height: 10px;">
            <div class="progress-bar bg-theme" role="progressbar" :style="{ width: course.progress.percent + '%' }"
                :aria-valuenow="course.progress.percent" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>
    </div>


    <div class="fw-semibold my-3">
        Course Content
    </div>

    <ul class="list-group list-group-flush">
        <li v-for="content in course.contents" class="list-group-item cursor-pointer">

            <span class="me-2">
                <i v-if="content.isCompleted" class="bi bi-check-circle-fill"></i>
                <i v-else-if="content.type == 'file'" class="bi bi-file-earmark"></i>
                <i v-else class="bi bi-play-circle"></i>
            </span>

            {{ content.title }}

            <span class="float-end">
                {{ content.duration }}
            </span>
        </li>
    </ul>

</template>

<script setup lang="ts">


const route = useRoute()

const myLearningStore = useMyLearningStore()
const { course } = storeToRefs(myLearningStore)


</script>

<style scoped>
.list-group-item:hover {
    background-color: rgb(240, 235, 235);
}
</style>