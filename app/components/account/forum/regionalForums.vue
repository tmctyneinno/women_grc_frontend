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
                            <button class="btn btn-link fw-medium text-theme hover-tiltX p-0 border-0">
                                View Regional Forums <i class="bi bi-arrow-right "></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const regionalForums = ref([
    { id: 1, region: 'Africa', forums: '20', info: 'GRC discussions specific to African markets and regulations' },
    { id: 2, region: 'Europe', forums: '30', info: 'European regulatory landscape and GDPR compliance discussions' },
    { id: 3, region: 'America', forums: '67', info: 'North and South American GRC frameworks and best practices' },
    { id: 4, region: 'Asia-Pacific', forums: '20', info: 'Asia-Pacific GRC trends and emerging market regulations' },
])
</script>

<style scoped>
.forum-card {
    background-color: #F5F7FD;
    border: none;
}
</style>