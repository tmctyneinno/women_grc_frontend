<template>
    <Head>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      />
      <!-- Script configuration -->
      <script>
        // Configure Tailwind to avoid conflicts with Bootstrap
        tailwind.config = {
          prefix: 'tw-',
          important: '.tw-tailwind-container',
          corePlugins: {
            preflight: false,
          }
        }
      </script>
    </Head>
    <landing-navbar-component />
    <div class="min-vh-100 pb-5 overflow-hidden">
        <slot />
    </div>
    <landing-footer-component />
</template>

<script setup lang="ts">
const route = useRoute()

const title = computed(() => {
    const path = route.path.replace(/^\/+|\/+$/g, '')

    if (!path) return 'Women in GRCFP | Home'

    const formattedPath = path
        .split(/[-\/]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

    return `Women in GRCFP | ${formattedPath}`
})

useSeoMeta({
    title
})
</script>