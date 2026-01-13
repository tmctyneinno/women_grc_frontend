<template>

    <div class="card border-0 shadow-sm">
        <div class="card-header fw-semibold border-0 bg-transparent">
            Forum Guidelines
        </div>
        <div class="card-body">

            <ul class="">
                <li v-for="guideline in guidelines.slice(0, 4)" class="small">
                    {{ guideline }}
                </li>
            </ul>

            <button data-bs-toggle="modal" data-bs-target="#dicussionModal"
                class="btn btn-link fw-medium text-theme hover-tiltX p-0 border-0 text-decoration-none">
                Read Full Guidelines <i class="bi bi-box-arrow-up-right"></i>
            </button>

        </div>
    </div>



    <!-- dicussionModal -->
    <div class="modal fade" id="dicussionModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="modalTitleId">
                        Forum Guidelines
                    </h5>
                    <button ref="closeDicussionModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="">
                        <li v-for="guideline in guidelines" class="my-1">
                            {{ guideline }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">

const guidelines = ref([
    `Maintain professional discourse and respect diverse perspectives`,
    `Share knowledge and insights to benefit the community`,
    `Use search before posting to avoid duplicates`,
    `Report inappropriate content to moderators`,
    `Submit a bug report for technical issues`,
    `Request additional features from the development team`,
    `Provide feedback on user experience`,
    `Suggest improvements for design elements`,
    `Participate in user surveys for product enhancement`
])


const closeDicussionModal = ref<any>(null)
onBeforeRouteLeave(() => {
    closeDicussionModal.value?.click()
})

</script>