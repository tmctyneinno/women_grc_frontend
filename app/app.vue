<template>
  <vue3-progress-bar v-if="mounted" />
  <NuxtPage />
</template>

<script setup lang="ts">
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>