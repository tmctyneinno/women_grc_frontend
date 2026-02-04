<template>
    <landing-navbar-component />
    <div class="min-vh-100 pb-5 overflow-hidden">
        <slot />
    </div>
    <landing-footer-component />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

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

// Load Tailwind CSS only on client side
const loadTailwind = () => {
    if (typeof window !== 'undefined') {
        // Check if already loaded
        if (window.tailwindLoaded) return
        
        // Load CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        document.head.appendChild(link)
        
        // Load and configure Tailwind script
        const script = document.createElement('script')
        script.src = 'https://cdn.tailwindcss.com'
        script.onload = () => {
            tailwind.config = {
                prefix: 'tw-',
                important: '.tw-tailwind-container',
                corePlugins: {
                    preflight: false,
                }
            }
            window.tailwindLoaded = true
            console.log('Tailwind CSS loaded successfully')
        }
        document.body.appendChild(script)
    }
}

// Load Tailwind when component mounts
onMounted(() => {
    loadTailwind()
})

// Also set SEO
useSeoMeta({
    title
})

// Add to window type
declare global {
    interface Window {
        tailwindLoaded?: boolean
    }
}
</script>