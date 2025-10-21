<template>
    <div class=" bg-danger-subtle">
        <div class="min-vh-100 d-flex justify-content-center align-items-center">
            <div class="text-center">
                <h1 class="text-danger">{{ error?.statusCode }}</h1>
                <h2 class="text-center text-danger">
                    {{ error?.statusMessage }}
                </h2>
                <button class="btn btn-theme" @click="handleError">
                    Back to home
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>