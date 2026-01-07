<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">

            <div class="card-header fw-semibold bg-transparent border-0 ps-0">
                Joined Forums
            </div>

            <div class="row g-3">
                <div v-for="forum in suggestedForums" class="col-md-6">
                    <AccountForumDisplayCard :forum action="View Forum" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const suggestedForums = ref<ForumInterface[]>([
    { id: 1, title: 'Compliance & Risk Management', discussions: '287', audience: 'private', info: 'A dedicated space for professionals to discuss compliance strategies, risk assessment...' },
    { id: 2, title: 'ESG Strategy', discussions: '342', audience: 'public', info: 'Environmental, social, and governance frameworks and implementation strategies' },
    { id: 3, title: 'Regulatory Updates', discussions: '198', audience: 'public', info: 'Latest regulatory changes and compliance requirements across industries' },
    { id: 4, title: 'Career Development', discussions: '156', audience: 'private', info: 'Professional growth, certifications, and career advancement in GRC' },
])
</script>