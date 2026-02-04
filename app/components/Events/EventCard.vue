<!-- components/Events/EventCard.vue -->
<template>
    <div class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
        <!-- Featured Ribbon -->
        <div v-if="isFeatured" class="absolute top-4 left-4 z-10">
            <div class="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                <i class="bi bi-star-fill mr-1"></i> Featured
            </div>
        </div>

        <!-- Status Badge -->
        <div class="absolute top-4 right-4 z-10">
            <div :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                statusClass
            ]">
                {{ formattedStatus }}
            </div>
        </div>

        <!-- Event Image -->
        <div class="relative h-48 overflow-hidden">
            <p>{{ event.featured_image }}</p>
            <img 
             
                :src='public/event/isFeatured/lY9LS369d0nAHGgfy1UIAYGSTOtgt5jtunJLjPkz.jpg'
                :alt="event.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            <!-- Type Badge -->
            <div class="absolute bottom-4 left-4">
                <div :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm',
                    typeClass
                ]">
                    {{ formattedType }}
                </div>
            </div>
            
            <!-- Online Badge -->
            <div v-if="event.is_online" class="absolute bottom-4 right-4">
                <div class="px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold">
                    <i class="bi bi-camera-video mr-1"></i> Online
                </div>
            </div>
        </div>

        <!-- Event Content -->
        <div class="p-6">
            <!-- Date -->
            <div class="flex items-center gap-3 mb-4">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl flex flex-col items-center justify-center">
                    <div class="text-2xl font-bold text-gray-800">{{ formattedDay }}</div>
                    <div class="text-xs font-semibold text-gray-500 uppercase">{{ formattedMonth }}</div>
                </div>
                <div class="flex-1">
                    <div class="text-sm text-gray-600 flex items-center gap-2">
                        <i class="bi bi-clock"></i>
                        {{ formattedTime }}
                    </div>
                    <div class="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <i class="bi bi-geo-alt"></i>
                        <span class="truncate">{{ event.venue }}</span>
                    </div>
                </div>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                {{ event.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ event.short_description || event.description.substring(0, 100) + '...' }}
            </p>

            <!-- Price & Capacity -->
            <div class="flex items-center justify-between mb-6">
                <div class="text-2xl font-bold text-gray-800">
                    {{ event.formatted_price || 'Free' }}
                </div>
                <div v-if="event.capacity" class="text-sm text-gray-600">
                    <i class="bi bi-people mr-1"></i>
                    {{ event.registered_count || 0 }}/{{ event.capacity }}
                </div>
            </div>

            <!-- Progress Bar (if capacity exists) -->
            <div v-if="event.capacity" class="mb-6">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        :style="{ width: `${Math.min(100, ((event.registered_count || 0) / event.capacity) * 100)}%` }"
                        class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1 text-right">
                    {{ Math.min(100, Math.round(((event.registered_count || 0) / event.capacity) * 100)) }}% booked
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
                <button 
                    @click="viewDetails"
                    class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <i class="bi bi-info-circle"></i>
                    Details
                </button>
                <button 
                    v-if="event.has_capacity && !event.is_past"
                    @click="registerEvent"
                    :disabled="!event.has_capacity || event.is_past"
                    :class="[
                        'flex-1 px-4 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2',
                        event.has_capacity && !event.is_past
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    ]"
                >
                    <i class="bi bi-ticket-perforated"></i>
                    Register
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    event: {
        type: Object,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();

// Computed properties
const formattedType = computed(() => {
    return props.event.type?.charAt(0).toUpperCase() + props.event.type?.slice(1) || 'Event';
});

const typeClass = computed(() => {
    const types = {
        conference: 'bg-purple-600/80',
        workshop: 'bg-emerald-600/80',
        seminar: 'bg-blue-600/80',
        networking: 'bg-pink-600/80',
        meeting: 'bg-amber-600/80'
    };
    return types[props.event.type] || 'bg-gray-600/80';
});

const formattedDay = computed(() => {
    if (!props.event.start_date) return '';
    const date = new Date(props.event.start_date);
    return date.getDate().toString().padStart(2, '0');
});

const formattedMonth = computed(() => {
    if (!props.event.start_date) return '';
    const date = new Date(props.event.start_date);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
});

const formattedTime = computed(() => {
    if (!props.event.start_date) return '';
    const date = new Date(props.event.start_date);
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
});

const formattedStatus = computed(() => {
    if (props.event.is_upcoming) return 'Upcoming';
    if (props.event.is_ongoing) return 'Ongoing Now';
    if (props.event.is_past) return 'Completed';
    return 'Scheduled';
});

const statusClass = computed(() => {
    if (props.event.is_upcoming) return 'bg-green-100 text-green-800';
    if (props.event.is_ongoing) return 'bg-yellow-100 text-yellow-800';
    if (props.event.is_past) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
});

// Methods
const viewDetails = () => {
    router.push(`/events/${props.event.id}/${props.event.slug}`);
};

const registerEvent = () => {
    if (props.event.has_capacity && !props.event.is_past) {
        // Handle registration
        console.log('Register for event:', props.event.id);
        // You could emit an event or navigate to registration page
        router.push(`/events/${props.event.id}/register`);
    }
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar for featured container */
.featured-container::-webkit-scrollbar {
    height: 6px;
}

.featured-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.featured-container::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #06b6d4, #8b5cf6);
    border-radius: 3px;
}

.featured-container::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #0891b2, #7c3aed);
}
</style>