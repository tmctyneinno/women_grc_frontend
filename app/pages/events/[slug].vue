<!-- pages/events/[slug].vue -->
<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Event Details Page</h1>
    <p class="text-lg">Slug: {{ slug }}</p>
    
    <!-- Debug info -->
    <div class="mt-8 p-4 bg-gray-100 rounded-lg">
      <h2 class="font-bold mb-2">Debug Info:</h2>
      <p>Route Path: {{ $route.fullPath }}</p>
      <p>Slug Param: {{ $route.params.slug }}</p>
    </div>
  </div>
</template>

<script setup>
// For Nuxt 3, you can also use definePageMeta
definePageMeta({
  middleware: [], // Add middleware if needed
  layout: 'default' // Specify layout
})

// Access route through useRoute()
const route = useRoute()
const slug = route.params.slug

console.log('=== EVENT DETAIL PAGE LOADED ===')
console.log('Slug:', slug)
console.log('Route params:', route.params)
</script>