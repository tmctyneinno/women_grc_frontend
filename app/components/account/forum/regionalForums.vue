<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">

            <div class="card-header fw-semibold bg-transparent border-0 ps-0">
                Regional Forums
            </div>

            <div class="row g-3">
                <div v-for="forum in regionalForums" class="col-md-6">
                    <div class="card forum-card">
                        <div class="card-body">
                            <div class="col">
                                <div class="fw-medium">{{ forum.region }}

                                    <span class="badge rounded-pill bg-warning-subtle text-dark float-end small">
                                        {{ forum.forums }} forums
                                    </span>

                                </div>
                            </div>
                            <div class="text-muted small mt-3">
                                {{ forum.info }}
                            </div>
                        </div>
                        <div class="card-footer border-0 bg-transparent pt-0">
                            <button @click="selectedRegion = forum.region" data-bs-toggle="modal"
                                data-bs-target="#regionalForumModal"
                                class="btn btn-link fw-medium text-theme hover-tiltX p-0 border-0 text-decoration-none">
                                View Regional Forums <i class="bi bi-arrow-right "></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



    <div class="modal fade" id="regionalForumModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        {{ selectedRegion }} Forums
                    </h5>
                    <button ref="closeRegionalForumModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="choice in forumChoices" class="mb-3 cursor-pointer hover-tiltX"
                        @click="joinForum(choice.title)">
                        <div class="d-flex justify-content-start align-items-center gap-2">
                            <div class="forum-choice-icon" :style="{ backgroundColor: choice.color }">
                                <i :class="choice.icon"></i>
                            </div>
                            <div>
                                <div class="fw-medium">{{ choice.title }}</div>
                                <div class="text-muted small">{{ digitDisplay(choice.members) }} members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">


const { digitDisplay } = useFxn
const { swalConfirm, swalSuccess } = sweetAlerts

const regionalForums = ref([
    { id: 1, region: 'Africa', forums: '20', info: 'GRC discussions specific to African markets and regulations' },
    { id: 2, region: 'Europe', forums: '30', info: 'European regulatory landscape and GDPR compliance discussions' },
    { id: 3, region: 'America', forums: '67', info: 'North and South American GRC frameworks and best practices' },
    { id: 4, region: 'Asia-Pacific', forums: '20', info: 'Asia-Pacific GRC trends and emerging market regulations' },
])


const forumChoices = ref([
    { icon: 'bi bi-shield-check', color: '#DAE6F2', title: 'Cybersecurity', members: 1234 },
    { icon: 'bi bi-file-earmark-text', color: '#E3F5E8', title: 'Audit & Control', members: 874 },
    { icon: 'bi bi-hammer', color: '#FEF3E0', title: 'Legal Updates', members: 567 },
])


const selectedRegion = ref<string>('')



function joinForum(forumName: string) {
    swalConfirm(`Join ${forumName} in ${selectedRegion.value}`, ``, `Join Forum`, `question`)
        .then((confirm) => {
            if (confirm.value) {
                swalSuccess(`Thank you for showing interest!`, `An admin or moderator will approve your request to join the forum shortly`, `Close`, `success`)
                    .then((confirm2) => {
                        if (confirm2) {
                            closeRegionalForumModal.value?.click()
                        }
                    })
            }
        })
}






const closeRegionalForumModal = ref<any>(null)
onBeforeRouteLeave(() => {
    closeRegionalForumModal.value?.click()
})

</script>

<style scoped>
.forum-card {
    background-color: #F5F7FD;
    border: none;
}



.forum-choice-icon {
    height: 40px;
    width: 40px;
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>