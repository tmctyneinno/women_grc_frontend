<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="fw-semibold mb-3">
            Learners Feedback
        </div>

        <div>
            <button @click="myLearningStore.toggleNewReviewModal" class="btn btn-theme btn-sm">Give Rating</button>
        </div>

    </div>

    <!-- modal -->
    <AccountMyLearningNewReviewModal />

</template>


<script setup>

const myLearningStore = useMyLearningStore()
const templateStore = useTemplateStore()

</script>