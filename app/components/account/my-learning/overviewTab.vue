<template>
    <div class="fw-semibold mb-3">
        About the Topic
    </div>

    <div v-html="myLearningStore.course.overview"></div>

</template>


<script setup>

const myLearningStore = useMyLearningStore()

</script>