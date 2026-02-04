<!-- components/Events/EventList.vue -->
<template>
    <nuxt-layout name="landing-layout">
        <div class="tw-min-h-screen tw-bg-gradient-to-br tw-from-gray-50 tw-to-white">
            <!-- Hero Section -->
            <div class="tw-relative tw-overflow-hidden tw-bg-gradient-to-r tw-from-purple-900 tw-via-indigo-800 tw-to-purple-900">
                <div class="tw-absolute tw-inset-0 tw-bg-black/20"></div>
                <div class="tw-relative tw-container tw-mx-auto tw-px-4 tw-py-24">
                    <div class="tw-max-w-3xl tw-mx-auto tw-text-center">
                        <h1 class="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-font-bold tw-text-white tw-mb-6">
                            Discover <span class="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-purple-400">Inspiring</span> Events
                        </h1>
                        <p class="tw-text-xl tw-text-gray-200 tw-mb-10">
                            Join top GRC professionals at conferences, workshops, and networking sessions that shape the industry.
                        </p>
                        
                        <!-- Search Bar -->
                        <div class="tw-max-w-2xl tw-mx-auto">
                            <div class="tw-relative">
                                <div class="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-pointer-events-none">
                                    <i class="bi bi-search tw-h-5 tw-w-5 tw-text-gray-400"></i>
                                </div>
                                <input 
                                    v-model="searchQuery"
                                    @input="handleSearch"
                                    type="text"
                                    placeholder="Search events, topics, or speakers..."
                                    class="tw-w-full tw-pl-12 tw-pr-4 tw-py-4 tw-rounded-xl tw-bg-white/10 tw-backdrop-blur-sm tw-border tw-border-white/20 tw-text-white placeholder:tw-text-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-cyan-400 focus:tw-border-transparent tw-transition-all tw-duration-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decorative elements -->
                <div class="tw-absolute tw-top-0 tw-left-0 tw-w-64 tw-h-64 tw-bg-cyan-500 tw-rounded-full tw-mix-blend-multiply tw-filter tw-blur-3xl tw-opacity-20 tw-animate-pulse"></div>
                <div class="tw-absolute tw-bottom-0 tw-right-0 tw-w-64 tw-h-64 tw-bg-purple-500 tw-rounded-full tw-mix-blend-multiply tw-filter tw-blur-3xl tw-opacity-20 tw-animate-pulse"></div>
            </div>

            <!-- Main Content -->
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-12">
                <!-- Filter Bar -->
                <div class="tw-mb-12">
                    <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-gap-6 tw-p-6 tw-bg-white tw-rounded-2xl tw-shadow-lg tw-shadow-gray-200/50 tw-border tw-border-gray-100">
                        <div>
                            <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">Browse Events</h2>
                            <p class="tw-text-gray-600">Filter by type to find exactly what you're looking for</p>
                        </div>
                        
                        <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
                            <!-- Event Type Filter -->
                            <div class="tw-relative">
                                <select 
                                    v-model="selectedType"
                                    @change="filterByType"
                                    class="tw-appearance-none tw-bg-white tw-pl-4 tw-pr-10 tw-py-3 tw-rounded-xl tw-border tw-border-gray-200 tw-text-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-cyan-500 focus:tw-border-transparent tw-transition-all tw-duration-200 tw-cursor-pointer"
                                >
                                    <option value="">All Event Types</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="networking">Networking</option>
                                    <option value="meeting">Meeting</option>
                                </select>
                                <div class="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3 tw-pointer-events-none">
                                    <i class="bi bi-chevron-down tw-h-5 tw-w-5 tw-text-gray-400"></i>
                                </div>
                            </div>
                            
                            <!-- Status Filter -->
                            <div class="tw-flex tw-items-center tw-space-x-2">
                                <button 
                                    v-for="status in statusFilters"
                                    :key="status.value"
                                    @click="toggleStatusFilter(status.value)"
                                    :class="[
                                        'tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium tw-transition-all tw-duration-200',
                                        activeStatusFilters.includes(status.value) 
                                            ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-shadow-lg tw-shadow-cyan-500/25' 
                                            : 'tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200'
                                    ]"
                                >
                                    {{ status.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-20">
                    <div class="tw-relative">
                        <div class="tw-w-16 tw-h-16 tw-border-4 tw-border-cyan-200 tw-border-t-cyan-500 tw-rounded-full tw-animate-spin"></div>
                        <div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                            <div class="tw-w-8 tw-h-8 tw-bg-gradient-to-r tw-from-cyan-400 tw-to-purple-400 tw-rounded-full tw-animate-ping"></div>
                        </div>
                    </div>
                    <p class="tw-mt-6 tw-text-lg tw-text-gray-600 tw-font-medium">Loading inspiring events...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="tw-max-w-md tw-mx-auto tw-text-center tw-py-20">
                    <div class="tw-inline-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-bg-red-100 tw-mb-6">
                        <i class="bi bi-exclamation-triangle tw-w-10 tw-h-10 tw-text-red-500"></i>
                    </div>
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-3">Unable to Load Events</h3>
                    <p class="tw-text-gray-600 tw-mb-8">{{ error }}</p>
                    <button 
                        @click="fetchEvents"
                        class="tw-px-6 tw-py-3 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-font-medium tw-rounded-full hover:tw-shadow-lg hover:tw-shadow-cyan-500/25 tw-transition-all tw-duration-200 tw-transform hover:tw--translate-y-0.5"
                    >
                        Try Again
                    </button>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredEvents.length === 0" class="tw-max-w-md tw-mx-auto tw-text-center tw-py-20">
                    <div class="tw-inline-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-100 tw-mb-6">
                        <i class="bi bi-calendar tw-w-10 tw-h-10 tw-text-gray-400"></i>
                    </div>
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-3">No Events Found</h3>
                    <p class="tw-text-gray-600">We couldn't find any events matching your criteria.</p>
                    <p class="tw-text-gray-500 tw-mt-2">Try adjusting your filters or check back soon for new events!</p>
                    <button 
                        @click="resetFilters"
                        class="tw-mt-8 tw-px-6 tw-py-3 tw-bg-gray-800 tw-text-white tw-font-medium tw-rounded-full hover:tw-bg-gray-900 tw-transition-all tw-duration-200"
                    >
                        Reset Filters
                    </button>
                </div>

                <!-- Featured Events Section -->
                <div v-else>
                    <section v-if="featuredEvents.length > 0" class="tw-mb-16">
                        <div class="tw-flex tw-items-center tw-justify-between tw-mb-8">
                            <div>
                                <h2 class="tw-text-3xl tw-font-bold tw-text-gray-800 tw-flex tw-items-center tw-gap-3">
                                    <span class="tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500">
                                        <i class="bi bi-star-fill tw-w-5 tw-h-5 tw-text-white"></i>
                                    </span>
                                    Featured Events
                                </h2>
                                <p class="tw-text-gray-600 tw-mt-2">Curated selection of must-attend industry events</p>
                            </div>
                            <div class="tw-hidden md:tw-block">
                                <div class="tw-flex tw-space-x-2">
                                    <button @click="scrollFeaturedLeft" class="tw-p-3 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200 tw-transition-colors">
                                        <i class="bi bi-chevron-left tw-w-5 tw-h-5 tw-text-gray-700"></i>
                                    </button>
                                    <button @click="scrollFeaturedRight" class="tw-p-3 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200 tw-transition-colors">
                                        <i class="bi bi-chevron-right tw-w-5 tw-h-5 tw-text-gray-700"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div ref="featuredContainer" class="tw-flex tw-overflow-x-auto tw-pb-8 tw-space-x-6 tw-scrollbar-hide tw-scroll-smooth">
                            <div 
                                v-for="event in featuredEvents" 
                                :key="event.id" 
                                class="tw-flex-shrink-0 tw-w-full md:tw-w-[calc(50%-12px)] lg:tw-w-[calc(33.333%-16px)]"
                            >
                                <EventCard :event="event" :is-featured="true" />
                            </div>
                        </div>
                    </section>

                    <!-- All Events Section -->
                    <section>
                        <div class="tw-mb-8">
                            <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800">All Events</h2>
                            <p class="tw-text-gray-600 tw-mt-1">Discover {{ filteredEvents.length }} events matching your criteria</p>
                        </div>

                        <!-- Events Grid -->
                        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
                            <EventCard 
                                v-for="event in paginatedEvents" 
                                :key="event.id" 
                                :event="event" 
                            />
                        </div>

                        <!-- Pagination -->
                        <div v-if="pagination.last_page > 1" class="tw-mt-16">
                            <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-justify-between tw-gap-6">
                                <div class="tw-text-gray-600">
                                    Showing <span class="tw-font-semibold tw-text-gray-800">{{ showingFrom }}-{{ showingTo }}</span> of 
                                    <span class="tw-font-semibold tw-text-gray-800">{{ pagination.total }}</span> events
                                </div>
                                
                                <div class="tw-flex tw-items-center tw-space-x-2">
                                    <button 
                                        @click="changePage(pagination.current_page - 1)"
                                        :disabled="pagination.current_page === 1"
                                        :class="[
                                            'tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-transition-all tw-duration-200',
                                            pagination.current_page === 1
                                                ? 'tw-text-gray-400 tw-cursor-not-allowed tw-bg-gray-100'
                                                : 'tw-text-gray-700 tw-bg-white tw-border tw-border-gray-200 hover:tw-bg-gray-50 hover:tw-shadow-md'
                                        ]"
                                    >
                                        <i class="bi bi-chevron-left tw-w-4 tw-h-4"></i>
                                        Previous
                                    </button>
                                    
                                    <div class="tw-flex tw-items-center tw-space-x-1">
                                        <button 
                                            v-for="page in visiblePages" 
                                            :key="page"
                                            @click="changePage(page)"
                                            :class="[
                                                'tw-w-10 tw-h-10 tw-rounded-lg tw-font-medium tw-transition-all tw-duration-200',
                                                page === pagination.current_page
                                                    ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-shadow-lg tw-shadow-cyan-500/25'
                                                    : 'tw-text-gray-700 hover:tw-bg-gray-100'
                                            ]"
                                        >
                                            {{ page }}
                                        </button>
                                    </div>
                                    
                                    <button 
                                        @click="changePage(pagination.current_page + 1)"
                                        :disabled="pagination.current_page === pagination.last_page"
                                        :class="[
                                            'tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-transition-all tw-duration-200',
                                            pagination.current_page === pagination.last_page
                                                ? 'tw-text-gray-400 tw-cursor-not-allowed tw-bg-gray-100'
                                                : 'tw-text-gray-700 tw-bg-white tw-border tw-border-gray-200 hover:tw-bg-gray-50 hover:tw-shadow-md'
                                        ]"
                                    >
                                        Next
                                        <i class="bi bi-chevron-right tw-w-4 tw-h-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Stats Section -->
                <div v-if="!loading && !error && filteredEvents.length > 0" class="tw-mt-24">
                    <div class="tw-bg-gradient-to-r tw-from-gray-900 tw-to-black tw-rounded-3xl tw-p-8 md:tw-p-12">
                        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-8">
                            <div v-for="stat in stats" :key="stat.label" class="tw-text-center">
                                <div class="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-white tw-mb-2">{{ stat.value }}</div>
                                <div class="tw-text-gray-300">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Newsletter CTA -->
                <div class="tw-mt-24 tw-text-center">
                    <div class="tw-max-w-2xl tw-mx-auto">
                        <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">Never Miss an Event</h3>
                        <p class="tw-text-gray-600 tw-mb-8">Subscribe to get notified about upcoming conferences, workshops, and networking opportunities</p>
                        <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-max-w-md tw-mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                class="tw-flex-1 tw-px-6 tw-py-3 tw-rounded-full tw-border tw-border-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-cyan-500 focus:tw-border-transparent tw-transition-all tw-duration-200"
                            />
                            <button class="tw-px-8 tw-py-3 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-font-medium tw-rounded-full hover:tw-shadow-lg hover:tw-shadow-cyan-500/25 tw-transition-all tw-duration-200 tw-transform hover:tw--translate-y-0.5">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import EventCard from '@/components/Events/EventCard.vue';

// Store
const eventStore = useEventStore();

// State
const searchQuery = ref('');
const selectedType = ref('');
const activeStatusFilters = ref([]);
const debounceTimeout = ref(null);
const featuredContainer = ref(null);

// Status filters
const statusFilters = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'past', label: 'Past' }
];

// Computed
const events = computed(() => eventStore.formattedEvents || []);
const featuredEvents = computed(() => eventStore.featuredEvents || []);
const loading = computed(() => eventStore.loading || false);
const error = computed(() => eventStore.error || null);
const pagination = computed(() => eventStore.pagination || {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
});

// Filter events based on search, type, and status
const filteredEvents = computed(() => {
    let filtered = events.value;
    
    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(event => 
            event?.title?.toLowerCase().includes(query) ||
            event?.description?.toLowerCase().includes(query) ||
            event?.venue?.toLowerCase().includes(query) ||
            (Array.isArray(event?.speakers) && event.speakers.some(speaker => 
                typeof speaker === 'object' 
                    ? speaker?.name?.toLowerCase().includes(query)
                    : speaker?.toLowerCase().includes(query)
            ))
        );
    }
    
    // Filter by type
    if (selectedType.value) {
        filtered = filtered.filter(event => event?.type === selectedType.value);
    }
    
    // Filter by status
    if (activeStatusFilters.value.length > 0) {
        filtered = filtered.filter(event => {
            if (activeStatusFilters.value.includes('upcoming') && event?.is_upcoming) return true;
            if (activeStatusFilters.value.includes('ongoing') && event?.is_ongoing) return true;
            if (activeStatusFilters.value.includes('past') && event?.is_past) return true;
            return false;
        });
    }
    
    return filtered;
});

// Paginated events
const paginatedEvents = computed(() => {
    const start = (pagination.value.current_page - 1) * pagination.value.per_page;
    const end = start + pagination.value.per_page;
    return filteredEvents.value.slice(start, end);
});

const visiblePages = computed(() => {
    const totalPages = Math.ceil(filteredEvents.value.length / pagination.value.per_page);
    const currentPage = pagination.value.current_page;
    
    if (totalPages <= 1) return [1];
    
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

const showingFrom = computed(() => {
    return ((pagination.value.current_page - 1) * pagination.value.per_page) + 1;
});

const showingTo = computed(() => {
    return Math.min(pagination.value.current_page * pagination.value.per_page, filteredEvents.value.length);
});

const stats = computed(() => {
    const totalEvents = filteredEvents.value.length;
    const upcoming = filteredEvents.value.filter(e => e?.is_upcoming).length;
    const featured = featuredEvents.value.length;
    const cities = [...new Set(filteredEvents.value.map(e => e?.city).filter(Boolean))].length;
    
    return [
        { value: totalEvents, label: 'Total Events' },
        { value: upcoming, label: 'Upcoming' },
        { value: featured, label: 'Featured' },
        { value: cities, label: 'Cities' }
    ];
});

// Methods
const fetchEvents = async (page = 1) => {
    await eventStore.fetchEvents(page);
};

const fetchFeaturedEvents = async () => {
    await eventStore.fetchFeaturedEvents();
};

const fetchUpcomingEvents = async () => {
    await eventStore.fetchUpcomingEvents();
};

const handleSearch = () => {
    clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
        if (searchQuery.value.trim()) {
            eventStore.searchEvents(searchQuery.value.trim(), selectedType.value);
        } else {
            fetchEvents();
        }
    }, 500);
};

const filterByType = () => {
    if (searchQuery.value.trim()) {
        eventStore.searchEvents(searchQuery.value.trim(), selectedType.value);
    } else {
        // Reset to page 1 when filtering
        fetchEvents(1);
    }
};

const toggleStatusFilter = (status) => {
    const index = activeStatusFilters.value.indexOf(status);
    if (index > -1) {
        activeStatusFilters.value.splice(index, 1);
    } else {
        activeStatusFilters.value.push(status);
    }
};

const resetFilters = () => {
    searchQuery.value = '';
    selectedType.value = '';
    activeStatusFilters.value = [];
    fetchEvents(1);
};

const changePage = (page) => {
    const totalPages = Math.ceil(filteredEvents.value.length / pagination.value.per_page);
    if (page >= 1 && page <= totalPages) {
        eventStore.pagination.current_page = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const scrollFeaturedLeft = () => {
    if (featuredContainer.value) {
        featuredContainer.value.scrollBy({ left: -400, behavior: 'smooth' });
    }
};

const scrollFeaturedRight = () => {
    if (featuredContainer.value) {
        featuredContainer.value.scrollBy({ left: 400, behavior: 'smooth' });
    }
};

// Lifecycle
onMounted(async () => {
    await Promise.all([
        fetchEvents(),
        fetchFeaturedEvents(),
        fetchUpcomingEvents()
    ]);
    
    // Set up featured container scrolling
    await nextTick();
    if (featuredContainer.value) {
        featuredContainer.value.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                featuredContainer.value.scrollLeft += e.deltaY;
            }
        });
    }
});

// Watch for search query changes
watch(searchQuery, (newQuery) => {
    if (!newQuery.trim() && !selectedType.value && activeStatusFilters.value.length === 0) {
        fetchEvents();
    }
});

// Watch for status filter changes
watch(activeStatusFilters, () => {
    if (!searchQuery.value.trim() && !selectedType.value && activeStatusFilters.value.length === 0) {
        fetchEvents();
    }
}, { deep: true });
</script>

<style scoped>
/* Custom CSS utilities that might not be in Tailwind CDN */

/* Hide scrollbar */
.tw-scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.tw-scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Smooth scrolling */
.tw-scroll-smooth {
    scroll-behavior: smooth;
}

/* Custom animations */
@keyframes tw-float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.tw-animate-float {
    animation: tw-float 3s ease-in-out infinite;
}

/* Ensure Bootstrap icons work properly */
.bi {
    display: inline-block;
    vertical-align: -.125em;
}

/* Container utilities for responsiveness */
.tw-container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 1rem;
    padding-left: 1rem;
}

@media (min-width: 640px) {
    .tw-container {
        max-width: 640px;
    }
}

@media (min-width: 768px) {
    .tw-container {
        max-width: 768px;
    }
}

@media (min-width: 1024px) {
    .tw-container {
        max-width: 1024px;
    }
}

@media (min-width: 1280px) {
    .tw-container {
        max-width: 1280px;
    }
}

/* Backdrop blur utility */
.tw-backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

/* Mix blend mode */
.tw-mix-blend-multiply {
    mix-blend-mode: multiply;
}

/* Filter blur */
.tw-filter {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.tw-blur-3xl {
    --tw-blur: blur(64px);
}

/* Custom placeholder color */
.placeholder\:tw-text-gray-300::placeholder {
    color: #d1d5db;
}
</style>