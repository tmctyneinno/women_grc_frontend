<!-- components/Events/EventCard.vue -->
<template>
   
        <!-- Event Card Container -->
        <div class="event-card tw-group tw-relative tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-lg hover:tw-shadow-2xl tw-transition-all tw-duration-300 hover:tw--translate-y-2 tw-border tw-border-gray-100 tw-transform-gpu">
            <!-- Featured Ribbon -->
            <div v-if="isFeatured" class="tw-absolute tw-top-4 tw-left-4 tw-z-10">
                <div class="tw-px-4 tw-py-1.5 tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500 tw-text-white tw-text-xs tw-font-bold tw-rounded-full tw-shadow-lg tw-shadow-yellow-500/25">
                    <i class="bi bi-star-fill tw-mr-1 tw-text-xs"></i> Featured
                </div>
            </div>

            <!-- Status Badge -->
            <div class="tw-absolute tw-top-4 tw-right-4 tw-z-10">
                <div :class="[
                    'tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-border tw-border-opacity-20',
                    statusClass
                ]">
                    {{ formattedStatus }}
                </div>
            </div>

            <!-- Event Image Section -->
            <div class="tw-relative tw-h-48 tw-overflow-hidden tw-group-hover:tw-shadow-inner">
                <div class="tw-absolute tw-inset-0 tw-bg-gray-200 tw-animate-pulse" v-if="!imageLoaded"></div>
                <img 
                    ref="eventImage"
                    :src="getImageUrl(event.featured_image)" 
                    :alt="event.title"
                    class="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
                    :class="{'tw-opacity-0': !imageLoaded}"
                    @load="onImageLoad"
                    @error="onImageError"
                />
                <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/60 tw-to-transparent"></div>
                
                <!-- Type Badge -->
                <div class="tw-absolute tw-bottom-4 tw-left-4">
                    <div :class="[
                        'tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-text-white tw-backdrop-blur-sm tw-border tw-border-white/20',
                        typeClass
                    ]">
                        {{ formattedType }}
                    </div>
                </div>
                
                <!-- Online Badge -->
                <div v-if="event.is_online" class="tw-absolute tw-bottom-4 tw-right-4">
                    <div class="tw-px-3 tw-py-1 tw-rounded-full tw-bg-blue-600/90 tw-backdrop-blur-sm tw-text-white tw-text-xs tw-font-semibold tw-border tw-border-white/20">
                        <i class="bi bi-camera-video-fill tw-mr-1"></i> Online
                    </div>
                </div>
            </div>

            <!-- Event Content -->
            <div class="tw-p-6">
                <!-- Date & Location -->
                <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
                    <div class="tw-flex-shrink-0 tw-w-14 tw-h-14 tw-bg-gradient-to-br tw-from-cyan-50 tw-to-purple-50 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-border tw-border-gray-100">
                        <div class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-leading-none">{{ formattedDay }}</div>
                        <div class="tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase tw-tracking-wide tw-mt-1">{{ formattedMonth }}</div>
                    </div>
                    <div class="tw-flex-1 tw-min-w-0">
                        <div class="tw-text-sm tw-text-gray-600 tw-flex tw-items-center tw-gap-2">
                            <i class="bi bi-clock-fill tw-text-gray-400"></i>
                            <span class="tw-truncate">{{ formattedTime }}</span>
                        </div>
                        <div class="tw-text-sm tw-text-gray-600 tw-flex tw-items-center tw-gap-2 tw-mt-1">
                            <i class="bi bi-geo-alt-fill tw-text-gray-400"></i>
                            <span class="tw-truncate" :title="event.venue">{{ event.venue }}</span>
                        </div>
                    </div>
                </div>

                <!-- Title -->
                <h3 class="tw-text-lg tw-font-bold tw-text-gray-800 tw-mb-3 tw-line-clamp-2 group-hover:tw-text-cyan-600 tw-transition-colors tw-duration-200">
                    {{ event.title }}
                </h3>

                <!-- Description -->
                <p class="tw-text-gray-600 tw-text-sm tw-mb-4 tw-line-clamp-2">
                    {{ event.short_description || truncateDescription(event.description) }}
                </p>

                <!-- Price & Capacity -->
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                    <div class="tw-text-xl tw-font-bold tw-text-gray-800">
                        {{ event.formatted_price || 'Free' }}
                        <span v-if="event.formatted_price !== 'Free'" class="tw-text-sm tw-text-gray-500 tw-font-normal">per person</span>
                    </div>
                    <div v-if="event.capacity" class="tw-text-sm tw-text-gray-600 tw-flex tw-items-center">
                        <i class="bi bi-people-fill tw-mr-1 tw-text-gray-400"></i>
                        <span>{{ event.registered_count || 0 }}/{{ event.capacity }}</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div v-if="event.capacity && event.registered_count > 0" class="tw-mb-6">
                    <div class="tw-h-1.5 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                        <div 
                            :style="{ width: `${Math.min(100, ((event.registered_count || 0) / event.capacity) * 100)}%` }"
                            class="tw-h-full tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-rounded-full tw-transition-all tw-duration-500"
                        ></div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-text-xs tw-text-gray-500 tw-mt-1">
                        <span>Booked</span>
                        <span class="tw-font-semibold">{{ bookingPercentage }}%</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="tw-flex tw-gap-3">
                    <button 
                        @click="viewDetails"
                        class="tw-btn-detail tw-flex-1 tw-px-4 tw-py-3 tw-bg-gray-50 tw-text-gray-700 tw-font-semibold tw-rounded-xl hover:tw-bg-gray-100 tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-border tw-border-gray-200 group-hover:tw-border-gray-300"
                        :title="`View details for ${event.title}`"
                    >
                        <i class="bi bi-info-circle-fill tw-text-gray-500 group-hover:tw-text-cyan-500 tw-transition-colors"></i>
                        Details
                    </button>
                    <button 
                        v-if="event.has_capacity && !event.is_past"
                        @click="registerEvent"
                        :disabled="!event.has_capacity || event.is_past || isFullyBooked"
                        :class="[
                            'tw-btn-register tw-flex-1 tw-px-4 tw-py-3 tw-font-semibold tw-rounded-xl tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-border',
                            isFullyBooked
                                ? 'tw-bg-red-50 tw-text-red-700 tw-border-red-200 tw-cursor-not-allowed'
                                : event.has_capacity && !event.is_past
                                    ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white hover:tw-shadow-lg hover:tw-shadow-cyan-500/30 tw-border-transparent hover:tw-from-cyan-600 hover:tw-to-purple-600'
                                    : 'tw-bg-gray-100 tw-text-gray-500 tw-border-gray-200 tw-cursor-not-allowed'
                        ]"
                        :title="registerButtonTitle"
                    >
                        <i :class="[
                            'bi',
                            isFullyBooked ? 'bi-x-circle-fill' : 'bi-ticket-perforated-fill'
                        ]"></i>
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

// Helper function to get image URL
const getImageUrl = (path) => {
    if (!path) return '/images/event-placeholder.jpg';
    
    // If it's already a full URL
    if (path.startsWith('http') || path.startsWith('//')) {
        return path;
    }
    
    // If it's a data URL
    if (path.startsWith('data:')) {
        return path;
    }
    
    // Handle relative paths
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // Clean the path
    let cleanPath = path;
    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }
    
    // Handle different path patterns
    if (cleanPath.includes('storage/')) {
        return `${baseUrl}/${cleanPath}`;
    }
    
    if (cleanPath.includes('events/') || cleanPath.includes('uploads/')) {
        return `${baseUrl}/storage/${cleanPath}`;
    }
    
    return `${baseUrl}/storage/${cleanPath}`;
};

// Image handlers
const onImageLoad = () => {
    imageLoaded.value = true;
    imageError.value = false;
};

const onImageError = () => {
    imageLoaded.value = true;
    imageError.value = true;
    if (eventImage.value) {
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
        conference: 'tw-bg-purple-600/90',
        workshop: 'tw-bg-emerald-600/90',
        seminar: 'tw-bg-blue-600/90',
        networking: 'tw-bg-pink-600/90',
        meeting: 'tw-bg-amber-600/90',
        webinar: 'tw-bg-indigo-600/90',
        training: 'tw-bg-teal-600/90'
    };
    return types[props.event.type] || 'tw-bg-gray-700/90';
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
    if (props.event.is_upcoming) return 'tw-bg-green-100 tw-text-green-800 tw-border-green-200';
    if (props.event.is_ongoing) return 'tw-bg-yellow-100 tw-text-yellow-800 tw-border-yellow-200';
    if (props.event.is_past) return 'tw-bg-red-100 tw-text-red-800 tw-border-red-200';
    return 'tw-bg-gray-100 tw-text-gray-800 tw-border-gray-200';
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
    
    // Emit event for parent component
    emit('register', props.event);
    
    // Or navigate to registration page
    if (props.event.slug) {
        router.push(`/events/${props.event.slug}/register`);
    } else {
        router.push(`/events/${props.event.id}/register`);
    }
};

// Emit events for parent component
const emit = defineEmits(['register', 'view-details']);

// Lifecycle
onMounted(() => {
    // Ensure images are properly loaded
    if (eventImage.value && eventImage.value.complete) {
        onImageLoad();
    }
});

// Expose methods if needed
defineExpose({
    viewDetails,
    registerEvent
});
</script>

<style scoped>
/* Container to scope Tailwind styles */
.tw-tailwind-container {
    isolation: isolate;
}

/* Custom styles that work with Tailwind CDN */
.event-card {
    will-change: transform, box-shadow;
}

/* Line clamp utility */
.tw-line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Smooth transitions */
.tw-transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button hover effects */
.tw-btn-detail:hover {
    transform: translateY(-1px);
}

.tw-btn-register:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Image loading animation */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.tw-animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Ensure Bootstrap icons are properly sized */
.bi {
    font-size: 1em;
    vertical-align: -0.125em;
}

/* Performance optimizations */
.event-card * {
    transform: translateZ(0);
    backface-visibility: hidden;
}
</style>