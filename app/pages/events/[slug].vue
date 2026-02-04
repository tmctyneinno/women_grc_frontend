<template>
  <!-- Event Image Section -->
  <div class="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
    
    <!-- Loading State -->
    <div v-if="!imageLoaded && !imageError" class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-500 mb-4"></div>
        <p class="text-white/80">Loading image...</p>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div class="text-center p-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 mb-4">
          <svg class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-white/80">Image failed to load</p>
        <button 
          @click="retryImageLoad"
          class="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    </div>
    
    <!-- Actual Image -->
    <img 
      ref="imageElement"
      :src="eventImageUrl" 
      :alt="event?.title || 'Event image'"
      class="w-full h-full object-cover transition-opacity duration-500"
      :class="{
        'opacity-0': !imageLoaded || imageError,
        'opacity-100': imageLoaded && !imageError
      }"
      @load="onImageLoad"
      @error="onImageError"
      crossorigin="anonymous"
      loading="lazy"
    />
    
    <!-- Gradient Overlay (always visible) -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    
    <!-- ... rest of your overlay content (Back button, event info, etc.) -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// Refs
const imageElement = ref(null)
const imageLoaded = ref(false)
const imageError = ref(false)

// Computed image URL (your existing code is correct)
const eventImageUrl = computed(() => {
  if (!event.value?.featured_image) {
    return '/images/event-placeholder.jpg'
  }
  
  const imgPath = event.value.featured_image
  
  // Already a full URL
  if (imgPath.startsWith('http')) {
    return imgPath
  }
  
  // Data URL
  if (imgPath.startsWith('data:')) {
    return imgPath
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  
  // Remove leading slash if present
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
  
  // Your URL pattern is correct
  const fullUrl = `${baseUrl}/storage/${cleanPath}`
  
  console.log('📸 Image URL:', fullUrl)
  
  return fullUrl
})

// Image handlers
const onImageLoad = () => {
  console.log('✅ Image loaded successfully')
  imageLoaded.value = true
  imageError.value = false
}

const onImageError = (e) => {
  console.error('❌ Image error:', e)
  console.error('Image URL:', eventImageUrl.value)
  imageError.value = true
  imageLoaded.value = true
}

const retryImageLoad = () => {
  if (imageElement.value) {
    imageLoaded.value = false
    imageError.value = false
    
    // Force reload by changing src (add timestamp to bypass cache)
    const currentSrc = imageElement.value.src
    imageElement.value.src = currentSrc.split('?')[0] + '?t=' + Date.now()
  }
}

// Force image load check on mount
onMounted(() => {
  nextTick(() => {
    if (imageElement.value) {
      // Check if image is already loaded (cached)
      if (imageElement.value.complete) {
        onImageLoad()
      }
      
      // Test if image is accessible
      console.log('🔍 Testing image accessibility...')
      fetch(eventImageUrl.value, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
          console.log('✅ Image is accessible (HEAD request succeeded)')
        })
        .catch(err => {
          console.warn('⚠️ HEAD request failed (may be CORS issue):', err)
          // Try a full fetch to see detailed error
          fetch(eventImageUrl.value)
            .then(res => {
              console.log(`Image fetch status: ${res.status} ${res.statusText}`)
              if (!res.ok) {
                console.error('Image fetch failed with status:', res.status)
              }
            })
            .catch(fetchErr => {
              console.error('Full fetch error:', fetchErr)
            })
        })
    }
  })
})
</script>