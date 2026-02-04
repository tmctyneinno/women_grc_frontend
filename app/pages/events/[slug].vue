<!-- pages/events/[slug].vue -->
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
const imageError = ref(false)

// Computed image URL - Use the proxy endpoint
const eventImageUrl = computed(() => {
  if (!event.value?.featured_image) {
    // Use a placeholder from your public folder
    return '/placeholder-event.jpg'
  }
  
  const imgPath = event.value.featured_image
  
  console.log('Image path:', imgPath)
  
  // If API already returns image_url, use it
  if (event.value?.image_url) {
    return event.value.image_url
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
  
  // Use the proxy route you created
  return `${baseUrl}/images/proxy/${cleanPath}`
})

// Image handlers
const onImageLoad = () => {
  console.log('✅ Image loaded successfully:', eventImageUrl.value)
  imageLoaded.value = true
  imageError.value = false
}

const onImageError = (e) => {
  console.error('❌ Image failed to load')
  console.error('URL:', eventImageUrl.value)
  imageError.value = true
  imageLoaded.value = true
  
  // Try fallback to direct storage URL (some browsers may load it despite CORS)
  if (event.value?.featured_image) {
    const imgPath = event.value.featured_image
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
    const fallbackUrl = `${baseUrl}/storage/${cleanPath}?t=${Date.now()}`
    
    console.log('Trying fallback URL:', fallbackUrl)
    
    // Create a test image to see if it loads
    const testImg = new Image()
    testImg.onload = () => {
      console.log('✅ Fallback URL worked!')
      // Update the main image src
      const imgEl = document.querySelector('.event-main-image')
      if (imgEl) {
        imgEl.src = fallbackUrl
        imageError.value = false
      }
    }
    testImg.onerror = () => {
      console.error('❌ Fallback also failed')
    }
    testImg.src = fallbackUrl
  }
}

// Fetch event data
const fetchEvent = async () => {
  try {
    loading.value = true
    imageLoaded.value = false
    imageError.value = false
    
    console.log('Fetching event with slug:', slug)
    
    // Use the correct API endpoint
    const apiUrl = `http://localhost:8000/api/v1/events/${slug}`
    console.log('API URL:', apiUrl)
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found')
      }
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
      
      // Test the image URL
      if (event.value.featured_image) {
        console.log('Testing image URL:', eventImageUrl.value)
        
        // Test if image loads
        const testImg = new Image()
        testImg.onload = () => console.log('✅ Image should load successfully')
        testImg.onerror = () => console.warn('⚠️ Image may have issues loading')
        testImg.src = eventImageUrl.value
      }
      
    } else {
      throw new Error(result.message || 'Event not found')
    }
  } catch (err) {
    console.error('Error fetching event:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchEvent()
})
</script>

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
          <div class="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
            <!-- Image loading state -->
            <!-- <div v-if="!imageLoaded && !imageError" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-white/20 border-t-white/60 mb-3"></div>
                <p class="text-white/70 text-sm">Loading event image...</p>
              </div>
            </div> -->
            
            <!-- Image error state -->
            <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-white/70 text-sm">Event image not available</p>
              </div>
            </div>
            
            <!-- Main image -->
            <img 
              class="event-main-image w-full h-full object-cover transition-opacity duration-500"
              :src="eventImageUrl"
              :alt="event.title"
              @load="onImageLoad"
              @error="onImageError"
              crossorigin="anonymous"
             
            />
            
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
            
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
                    <span class="text-sm font-medium">{{ event.type || 'Event' }}</span>
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
                      <span>{{ new Date(event.start_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) }}</span>
                    </div>
                    
                    <div v-if="event.venue" class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ event.venue }}</span>
                      <span v-if="event.city" class="text-white/70">, {{ event.city }}</span>
                    </div>
                    
                    <div v-if="event.capacity" class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span>{{ event.registered_count || 0 }} / {{ event.capacity }} registered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Rest of your event details content here -->
      </div>
    </div>
  </nuxt-layout>
</template>