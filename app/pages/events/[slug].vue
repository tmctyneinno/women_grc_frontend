<!-- pages/events/[slug].vue -->
<template>
  <div>
    <h1>Event Details Page</h1>
    <p>Slug: {{ slug }}</p>
  </div>
</template>

<script setup>
// Get the slug from route params
const route = useRoute()
const slug = route.params.slug

console.log('Slug from route:', slug)
</script>