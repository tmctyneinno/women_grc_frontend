<!-- pages/events/[slug].vue -->
<template>
  <nuxt-layout name="landing-layout">
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-500 mb-4"></div>
          <p class="text-gray-600">Loading event details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center min-h-screen">
        <div class="text-center max-w-md p-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.772-.833-2.544 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <div class="flex gap-4 justify-center">
            <button 
              @click="$router.back()"
              class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button 
              @click="$router.push('/events')"
              class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="event" class="pb-20">
        <!-- Hero Section -->
        <div class="relative">
          <!-- Event Image -->
          <div class="relative h-96 md:h-[500px] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img 
              :src="eventImageUrl" 
              :alt="event.title"
              class="w-full h-full object-cover transition-transform duration-700"
              :class="{ 'scale-105': imageLoaded }"
              @load="imageLoaded = true"
            />
            
            <!-- Back Button -->
            <div class="absolute top-4 left-4 z-20">
              <button 
                @click="$router.back()"
                class="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>

            <!-- Event Info Overlay -->
            <div class="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 text-white">
              <div class="container mx-auto px-4">
                <div class="max-w-4xl">
                  <!-- Event Type Badge -->
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <span class="text-sm font-medium">{{ formattedType }}</span>
                    <span v-if="event.is_online" class="flex items-center gap-1 text-sm">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                      </svg>
                      Online
                    </span>
                  </div>

                  <!-- Event Title -->
                  <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{{ event.title }}</h1>

                  <!-- Event Meta -->
                  <div class="flex flex-wrap items-center gap-4 text-white/90">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ formattedDate }}</span>
                    </div>
                    <!-- ... rest of your template ... -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug

// State
const loading = ref(true)
const error = ref(null)
const event = ref(null)
const imageLoaded = ref(false)

// Computed properties
const eventImageUrl = computed(() => {
  if (!event.value?.featured_image) {
    return '/images/event-placeholder.jpg'
  }
  
  const imagePath = event.value.featured_image
  
  console.log('🖼️ Image Debug:')
  console.log('Original path:', imagePath)
  
  // Already a full URL
  if (imagePath.startsWith('http')) {
    console.log('Using full URL:', imagePath)
    return imagePath
  }
  
  // Data URL
  if (imagePath.startsWith('data:')) {
    return imagePath
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  
  // For your path: "events/featured/lY9LS369d0nAHGgfy1UIAYGSTOtgt5jtunJLjPkz.jpg"
  // The correct URL should be: http://localhost:8000/storage/events/featured/lY9LS369d0nAHGgfy1UIAYGSTOtgt5jtunJLjPkz.jpg
  
  // Remove leading slash if present
  let cleanPath = imagePath
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1)
  }
  
  console.log('Clean path:', cleanPath)
  
  // Build the correct URL
  const fullUrl = `${baseUrl}/storage/${cleanPath}`
  
  console.log('Final URL:', fullUrl)
  console.log('---')
  
  return fullUrl
})

const formattedType = computed(() => {
  if (!event.value?.type) return 'Event'
  return event.value.type.charAt(0).toUpperCase() + event.value.type.slice(1)
})

const formattedDate = computed(() => {
  if (!event.value?.start_date) return ''
  
  const startDate = new Date(event.value.start_date)
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  
  return startDate.toLocaleDateString('en-US', options)
})

// Fetch event data
onMounted(async () => {
  try {
    loading.value = true
    console.log('Fetching event with slug:', slug)
    
    // Call your API
    const response = await fetch(`http://localhost:8000/api/v1/events/slug/${slug}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      event.value = result.data
      console.log('Event data loaded:', event.value)
      
      // Set page title
      useHead({
        title: `${event.value.title} | Event Details`
      })
    } else {
      throw new Error(result.message || 'Event not found')
    }
  } catch (err) {
    console.error('Error fetching event:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>