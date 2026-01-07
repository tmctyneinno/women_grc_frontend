<template>

    <div class="card border-0 shadow-sm">
        <div class="card-header fw-semibold border-0 bg-transparent">
            Top Contributors
        </div>
        <div class="card-body">

            <ul class="list-group list-group-flush">
                <li v-for="contributor in contributors"
                    class="list-group-item d-flex justify-content-center align-items-center small">
                    <div class="col-2">
                        <NuxtImg src="/images/recognition/shlomit.png" />
                    </div>
                    <div class="col">
                        <div class="fw-semibold">{{ contributor.name }}</div>
                        <div class="small text-muted">
                            {{ digitDisplay(contributor.contribution, false) }} contributions
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">

const contributors = ref([
    { name: 'Dr. Angela Thompson', contribution: '1247', },
    { name: 'Michael Chen', contribution: '1087', },
    { name: 'Lisa Rodriguez', contribution: '984', },
])

const { digitDisplay } = useFxn

</script>