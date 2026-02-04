<!-- components/Events/EventCard.vue -->
<template>
    <div class="tw-group tw-relative tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-lg hover:tw-shadow-2xl tw-transition-all tw-duration-300 hover:tw--translate-y-2 tw-border tw-border-gray-100">
        <!-- Featured Ribbon -->
        <div v-if="isFeatured" class="tw-absolute tw-top-4 tw-left-4 tw-z-10">
            <div class="tw-px-4 tw-py-1.5 tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500 tw-text-white tw-text-xs tw-font-bold tw-rounded-full tw-shadow-lg">
                <i class="bi bi-star-fill tw-mr-1"></i> Featured
            </div>
        </div>

        <!-- Status Badge -->
        <div class="tw-absolute tw-top-4 tw-right-4 tw-z-10">
            <div :class="[
                'tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold',
                statusClass
            ]">
                {{ formattedStatus }}
            </div>
        </div>

        <!-- Event Image -->
        <div class="tw-relative tw-h-48 tw-overflow-hidden">
            <img 
                :src="getImageUrl(event.featured_image)" 
                :alt="event.title"
                class="tw-w-full tw-object-cover tw-transition-all"
                style="height: 200px;"
            />
            <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/50 tw-to-transparent"></div>
            
            <!-- Type Badge -->
            <div class="tw-absolute tw-bottom-4 tw-left-4">
                <div :class="[
                    'tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-text-white tw-backdrop-blur-sm',
                    typeClass
                ]">
                    {{ formattedType }}
                </div>
            </div>
            
            <!-- Online Badge -->
            <div v-if="event.is_online" class="tw-absolute tw-bottom-4 tw-right-4">
                <div class="tw-px-3 tw-py-1 tw-rounded-full tw-bg-blue-500/80 tw-backdrop-blur-sm tw-text-white tw-text-xs tw-font-semibold">
                    <i class="bi bi-camera-video tw-mr-1"></i> Online
                </div>
            </div>
        </div>

        <!-- Event Content -->
        <div class="tw-p-6">
            <!-- Date -->
            <div class="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                <div class="tw-flex-shrink-0 tw-w-14 tw-h-14 tw-bg-gradient-to-br tw-from-cyan-50 tw-to-purple-50 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center">
                    <div class="tw-text-2xl tw-font-bold tw-text-gray-800">{{ formattedDay }}</div>
                    <div class="tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase">{{ formattedMonth }}</div>
                </div>
                <div class="tw-flex-1">
                    <div class="tw-text-sm tw-text-gray-600 tw-flex tw-items-center tw-gap-2">
                        <i class="bi bi-clock"></i>
                        {{ formattedTime }}
                    </div>
                    <div class="tw-text-sm tw-text-gray-600 tw-flex tw-items-center tw-gap-2 tw-mt-1">
                        <i class="bi bi-geo-alt"></i>
                        <span class="tw-truncate">{{ event.venue }}</span>
                    </div>
                </div>
            </div>

            <!-- Title -->
            <h3 class="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-3 tw-line-clamp-2 group-hover:tw-text-cyan-600 tw-transition-colors">
                {{ event.title }}
            </h3>

            <!-- Description -->
            <p class="tw-text-gray-600 tw-text-sm tw-mb-4 tw-line-clamp-2">
                {{ event.short_description || event.description.substring(0, 100) + '...' }}
            </p>

            <!-- Price & Capacity -->
            <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                <div class="tw-text-2xl tw-font-bold tw-text-gray-800">
                    {{ event.formatted_price || 'Free' }}
                </div>
                <div v-if="event.capacity" class="tw-text-sm tw-text-gray-600">
                    <i class="bi bi-people tw-mr-1"></i>
                    {{ event.registered_count || 0 }}/{{ event.capacity }}
                </div>
            </div>

            <!-- Progress Bar (if capacity exists) -->
            <div v-if="event.capacity" class="tw-mb-6">
                <div class="tw-h-2 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                    <div 
                        :style="{ width: `${Math.min(100, ((event.registered_count || 0) / event.capacity) * 100)}%` }"
                        class="tw-h-full tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-rounded-full"
                    ></div>
                </div>
                <div class="tw-text-xs tw-text-gray-500 tw-mt-1 tw-text-right">
                    {{ Math.min(100, Math.round(((event.registered_count || 0) / event.capacity) * 100)) }}% booked
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="tw-flex tw-gap-3">
                <button 
                    @click="viewDetails"
                    class="tw-flex-1 tw-px-4 tw-py-3 tw-bg-gray-100 tw-text-gray-700 tw-font-semibold tw-rounded-xl hover:tw-bg-gray-200 tw-transition-colors tw-duration-200 tw-flex tw-items-center tw-justify-center tw-gap-2"
                >
                    <i class="bi bi-info-circle"></i>
                    Details
                </button>
                <button 
                    v-if="event.has_capacity && !event.is_past"
                    @click="registerEvent"
                    :disabled="!event.has_capacity || event.is_past"
                    :class="[
                        'tw-flex-1 tw-px-4 tw-py-3 tw-font-semibold tw-rounded-xl tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center tw-gap-2',
                        event.has_capacity && !event.is_past
                            ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white hover:tw-shadow-lg hover:tw-shadow-cyan-500/25'
                            : 'tw-bg-gray-200 tw-text-gray-500 tw-cursor-not-allowed'
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
        conference: 'tw-bg-purple-600/80',
        workshop: 'tw-bg-emerald-600/80',
        seminar: 'tw-bg-blue-600/80',
        networking: 'tw-bg-pink-600/80',
        meeting: 'tw-bg-amber-600/80'
    };
    return types[props.event.type] || 'tw-bg-gray-600/80';
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
    if (props.event.is_upcoming) return 'tw-bg-green-100 tw-text-green-800';
    if (props.event.is_ongoing) return 'tw-bg-yellow-100 tw-text-yellow-800';
    if (props.event.is_past) return 'tw-bg-red-100 tw-text-red-800';
    return 'tw-bg-gray-100 tw-text-gray-800';
});

// Methods
const viewDetails = () => {
    router.push(`/events/${props.event.id}/${props.event.slug}`);
};

const registerEvent = () => {
    if (props.event.has_capacity && !props.event.is_past) {
        router.push(`/events/${props.event.id}/register`);
    }
};
</script>

<style scoped>
/* Import Tailwind only for this component */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Override prefix if needed */
.tw-group {
  /* Custom styles */
}

.tw-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure Bootstrap icons are styled properly */
.bi {
  display: inline-block;
  vertical-align: -.125em;
}
</style>