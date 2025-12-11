<template>
    <div>
        <button ref="modalOpen" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#newReviewModal">
        </button>

        <div class="modal fade" id="newReviewModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
            aria-hidden="true">
            <div class="modal-dialog  modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                <div class="modal-content  " id="modal-content">
                    <div class="modal-header border-0 bg-light">
                        <h5 class="modal-title fw-medium" id="modalTitleId">

                            Give Rating </h5>
                        <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-label">Select Rating </div>

                                <CustomInputSelect v-model="selectedRating" :options="ratingOptions">
                                    <template #option="option">
                                        <i v-for="i in option.label" class="bi bi-star-fill text-warning xsmall"></i>
                                    </template>

                                    <template #selected-option="option">
                                        <i v-for="i in option.label" class="bi bi-star-fill text-warning xsmall"></i>
                                    </template>
                                </CustomInputSelect>

                            </div>

                            <div class="col-12">
                                <div class="form-label">
                                    Give Review
                                </div>
                                <textarea class="form-control" style="height: 100px;"
                                    placeholder="add your feedback.." />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-theme btn-sm">
                            Give Rating
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
const myLearningStore = useMyLearningStore()
const templateStore = useTemplateStore()


const ratingOptions = ref([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
])
const selectedRating = ref<any>(null)

const modalOpen = ref<any>(null)
const modalClose = ref<any>(null)

watch(() => myLearningStore.newReview.modal, () => {
    modalOpen.value?.click()
})

onBeforeRouteLeave(() => {
    modalClose.value?.click()
})


</script>