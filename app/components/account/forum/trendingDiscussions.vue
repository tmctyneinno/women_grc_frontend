<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">

            <div class="card-header fw-semibold bg-transparent border-0 ps-0">
                Trending Discussions
            </div>

            <div v-for="i in 3" class="d-flex gap-0 mb-4">
                <div class="col text-center">
                    <NuxtImg src="/images/advisory/chinelo.png" />
                </div>
                <div class="col-10 col-lg-11 small">
                    <div class="fw-semibold small">
                        John Doe
                        <span class="xsmall text-muted">
                            2 days ago
                        </span>
                    </div>

                    <div class="fw-semibold">
                        AI-Driven ESG Reporting: Game Changer or Compliance Risk?
                    </div>

                    <div>
                        Has anyone implemented AI tools for ESG data collection and reporting? I'm seeing mixed results
                        in accuracy...
                    </div>
                    <div class="d-flex gap-2">

                        <span class="bi bi-chat"></span>
                        <span>23 Replies</span>

                        <span class="bi bi-heart"></span>
                        <span>123 Likes</span>

                        <span class="bi bi-eye"></span>
                        <span>48 Views</span>
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