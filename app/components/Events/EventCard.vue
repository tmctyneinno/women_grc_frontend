<!-- components/Events/EventCard.vue -->
<template>
  <div class="event-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 transform-gpu">
    <!-- Featured Ribbon -->
    <div v-if="isFeatured" class="absolute top-4 left-4 z-10">
      <div class="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-yellow-500/25">
        <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Featured
      </div>
    </div>

    <!-- Status Badge -->
    <div class="absolute top-4 right-4 z-10">
      <div :class="[
        'px-3 py-1 rounded-full text-xs font-semibold border border-opacity-20',
        statusClass
      ]">
        {{ formattedStatus }}
      </div>
    </div>

    <!-- Event Image Section -->
    <div class="relative h-48 overflow-hidden group-hover:shadow-inner">
      <!-- Loading State -->
      <div v-if="!imageLoaded && !imageError" class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
        <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Error State -->
      <div v-if="imageError" class="absolute inset-0  flex items-center justify-center">
        <div class="text-center">
          <svg class="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-500 text-xs">Image not available</p>
        </div>
      </div>
      
      <!-- Actual Image -->
      <img 
        ref="eventImage"
        :src="eventImageUrl" 
        :alt="event.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :class="{'opacity-0': !imageLoaded || imageError, 'opacity-100': imageLoaded && !imageError}"
        @load="onImageLoad"
        @error="onImageError"
        crossorigin="anonymous"
      />
      <!-- Type Badge -->
      <div class="absolute bottom-4 left-4">
        <div class="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue/50 to-blue/30 backdrop-blur-md border border-white/20 shadow-xl">
          <span class="bg-gradient-to-r from-black to-gray-200 bg-clip-text text-transparent">
            {{ formattedType }}
          </span>
        </div>
      </div>
      
      
      <!-- Online Badge -->
      <div v-if="event.is_online" class="absolute bottom-4 right-4">
        <div class="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
          <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          Online
        </div>
      </div>
    </div>

    <!-- Event Content -->
    <div class="p-2">
      <!-- Date & Location -->
      <div class="flex items-center gap-4 mb-2">
        <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl flex flex-col items-center justify-center border border-gray-100">
          <div class="text-2xl font-bold text-gray-800 leading-none">{{ formattedDay }}</div>
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">{{ formattedMonth }}</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm text-gray-600 flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span class="truncate">{{ formattedTime }}</span>
          </div>
          <div class="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="truncate" :title="event.venue">{{ event.venue }}</span>
          </div>
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-200">
        {{ event.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ event.short_description || truncateDescription(event.description) }}
      </p>

      <!-- Price & Capacity -->
      <div class="flex items-center justify-between mb-6">
        <div class="text-xl font-bold text-gray-800">
          {{ event.formatted_price || 'Free' }}
          <span v-if="event.formatted_price !== 'Free'" class="text-sm text-gray-500 font-normal">per person</span>
        </div>
        <div v-if="event.capacity" class="text-sm text-gray-600 flex items-center">
          <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span>{{ event.registered_count || 0 }}/{{ event.capacity }}</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div v-if="event.capacity && event.registered_count > 0" class="mb-6">
        <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            :style="{ width: `${Math.min(100, ((event.registered_count || 0) / event.capacity) * 100)}%` }"
            class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>Booked</span>
          <span class="font-semibold">{{ bookingPercentage }}%</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <button 
          @click="viewDetails"
          class="btn-detail flex-1 px-4 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 group-hover:border-gray-300"
          :title="`View details for ${event.meeting_link}`"
        >
          <svg class="w-5 h-5 text-gray-500 group-hover:text-cyan-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          Details
        </button>
        <button 
          v-if="event.has_capacity && !event.is_past"
          @click="registerEvent"
          :disabled="!event.has_capacity || event.is_past || isFullyBooked"
          :class="[
            'btn-register flex-1 px-4 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border',
            isFullyBooked
              ? 'bg-red-50 text-red-700 border-red-200 cursor-not-allowed'
              : event.has_capacity && !event.is_past
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 border-transparent hover:from-cyan-600 hover:to-purple-600'
                : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
          ]"
          :title="registerButtonTitle"
        >
          <svg :class="[
            'w-5 h-5',
            isFullyBooked ? 'text-red-600' : 'text-white'
          ]" fill="currentColor" viewBox="0 0 20 20">
            <path v-if="isFullyBooked" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            <path v-else fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6-4a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V7a1 1 0 00-1-1h-.01zM9 9a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V10a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          {{ registerButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    event: {
        type: Object,
        required: true,
        validator: (value) => {
            return value && typeof value === 'object' && value.title;
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();
const eventImage = ref(null);
const imageLoaded = ref(false);
const imageError = ref(false);

// Image URL computed property - FIXED VERSION
const eventImageUrl = computed(() => {
  if (!props.event?.featured_image) {
    return '/images/event-placeholder.jpg';
  }
  
  const imgPath = props.event.featured_image;
  
  // Already a full URL
  if (imgPath.startsWith('http')) {
    return imgPath;
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  
  // Use the proxy route for CORS
  return `${baseUrl}/images/proxy/${cleanPath}`;
});

// Image handlers - UPDATED TO USE eventImageUrl
const onImageLoad = () => {
    console.log('✅ Image loaded successfully:', eventImageUrl.value);
    imageLoaded.value = true;
    imageError.value = false;
};

const onImageError = (error) => {
    console.error('❌ Image failed to load:', eventImageUrl.value, error);
    imageLoaded.value = true;
    imageError.value = true;
    
    // Try to load placeholder if original failed
    if (eventImage.value && eventImageUrl.value !== '/images/event-placeholder.jpg') {
        eventImage.value.src = '/images/event-placeholder.jpg';
    }
};

// Text helper
const truncateDescription = (description, maxLength = 100) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
};

// Computed properties
const formattedType = computed(() => {
    if (!props.event.type) return 'Event';
    return props.event.type.charAt(0).toUpperCase() + props.event.type.slice(1);
});

const typeClass = computed(() => {
    const types = {
        conference: 'bg-purple-600/90',
        workshop: 'bg-emerald-600/90',
        seminar: 'bg-blue-600/90',
        networking: 'bg-pink-600/90',
        meeting: 'bg-amber-600/90',
        webinar: 'bg-indigo-600/90',
        training: 'bg-teal-600/90'
    };
    return types[props.event.type] || 'bg-gray-700/90';
});

const formattedDay = computed(() => {
    if (!props.event.start_date) return '--';
    try {
        const date = new Date(props.event.start_date);
        return date.getDate().toString().padStart(2, '0');
    } catch {
        return '--';
    }
});

const formattedMonth = computed(() => {
    if (!props.event.start_date) return '---';
    try {
        const date = new Date(props.event.start_date);
        return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    } catch {
        return '---';
    }
});

const formattedTime = computed(() => {
    if (!props.event.start_date) return '';
    try {
        const date = new Date(props.event.start_date);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    } catch {
        return '';
    }
});

const formattedStatus = computed(() => {
    if (props.event.is_upcoming) return 'Upcoming';
    if (props.event.is_ongoing) return 'Live Now';
    if (props.event.is_past) return 'Completed';
    return 'Scheduled';
});

const statusClass = computed(() => {
    if (props.event.is_upcoming) return 'bg-green-100 text-green-800 border-green-200';
    if (props.event.is_ongoing) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (props.event.is_past) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
});

const bookingPercentage = computed(() => {
    if (!props.event.capacity || props.event.capacity === 0) return 0;
    const percentage = Math.min(100, Math.round(((props.event.registered_count || 0) / props.event.capacity) * 100));
    return percentage;
});

const isFullyBooked = computed(() => {
    return props.event.capacity && (props.event.registered_count || 0) >= props.event.capacity;
});

const registerButtonText = computed(() => {
    if (isFullyBooked.value) return 'Sold Out';
    if (props.event.is_past) return 'Event Ended';
    if (!props.event.has_capacity) return 'Register';
    return 'Register Now';
});

const registerButtonTitle = computed(() => {
    if (isFullyBooked.value) return 'This event is fully booked';
    if (props.event.is_past) return 'This event has already ended';
    if (!props.event.has_capacity) return 'Register for this event';
    return `Register for ${props.event.title}`;
});

// Methods
const viewDetails = () => {
    if (props.event.slug) {
        router.push(`/events/${props.event.slug}`);
    } else {
        router.push(`/events/${props.event.id}`);
    }
}; 

const registerEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isFullyBooked.value || props.event.is_past || !props.event.has_capacity) {
        return;
    }
    
    console.log('Registering for event:', props.event.id);
    
    emit('register', props.event);
    
    if (props.event.slug) {
        router.push(`/events/${props.event.slug}/register`);
    } else {
        router.push(`/events/${props.event.id}/register`);
    }
};

const emit = defineEmits(['register', 'view-details']);

onMounted(() => {
    if (eventImage.value && eventImage.value.complete) {
        onImageLoad();
    }
});

defineExpose({
    viewDetails,
    registerEvent
});
</script>

<style scoped>
.event-card {
    will-change: transform, box-shadow;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-detail:hover {
    transform: translateY(-1px);
}

.btn-register:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.event-card * {
    transform: translateZ(0);
    backface-visibility: hidden;
}
</style>