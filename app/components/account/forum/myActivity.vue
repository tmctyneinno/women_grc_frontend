<template>

    <div class="card border-0 shadow-sm">
        <div class="card-header fw-semibold border-0 bg-transparent">
            My Activity
        </div>
        <div class="card-body">
            <div v-for="activity in activities" class="card border-0 bg-account mb-3">
                <div class="card-body">
                    <div class="fw-semibold">
                        {{ activity.title }}
                        <span class="float-end fw-semibold">
                            {{ activity.figure }}
                        </span>
                    </div>
                    <div class="text-muted">
                        {{ activity.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

const activities = ref([
    { title: 'Forums Joined', figure: '12', description: 'Active in 7 discussions' },
    { title: 'Posts', figure: '48', description: 'This Month' },
    { title: 'Replies', figure: '133', description: 'This Month' },
])

</script>