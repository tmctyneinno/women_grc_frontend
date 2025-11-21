<template>
    <NuxtLayout name="account-layout">
        <div class="container">
            <div class="video-card">
                <i class="bi bi-play-circle cursor-pointer hover-tiltY fs-1"></i>
            </div>






        </div>
    </NuxtLayout>

</template>

<script setup lang="ts">

const route = useRoute()

</script>

<style scoped>
.video-card {
    min-height: 70vh;
    background-color: var(--bs-secondary-bg-subtle);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10px;
}
</style>