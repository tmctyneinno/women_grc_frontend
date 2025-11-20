<template>
  <!-- <vue3-progress-bar v-if="mounted" /> -->
  <NuxtLoadingIndicator />
  <NuxtPage />
</template>

<script setup lang="ts">
const mounted = ref(false)
onMounted(async () => {
  await nextTick()
  mounted.value = true
})
</script>