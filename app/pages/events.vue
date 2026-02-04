<!-- components/Events/EventList.vue -->
<template>
    <nuxt-layout name="landing-layout">
        <div class="min-vh-100 bg-light">
            <!-- Hero Section -->
            <div class="position-relative overflow-hidden bg-primary">
                <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-20"></div>
                <div class="position-relative container px-4 py-24">
                    <div class="max-w-3xl mx-auto text-center">
                        <h1 class="display-4 display-md-3 display-lg-2 fw-bold text-white mb-4">
                            Discover <span class="text-gradient-cyan-purple">Inspiring</span> Events
                        </h1>
                        <p class="fs-4 text-white-50 mb-5">
                            Join top GRC professionals at conferences, workshops, and networking sessions that shape the industry.
                        </p>
                        
                        <!-- Search Bar -->
                        <div class="max-w-2xl mx-auto">
                            <div class="position-relative">
                                <div class="position-absolute top-50 start-0 translate-middle-y ps-3 d-flex align-items-center">
                                    <i class="bi bi-search text-body-tertiary"></i>
                                </div>
                                <input 
                                    v-model="searchQuery"
                                    @input="handleSearch"
                                    type="text"
                                    placeholder="Search events, topics, or speakers..."
                                    class="form-control ps-5 py-3 rounded-3 bg-white bg-opacity-10 backdrop-filter-blur border border-white border-opacity-20 text-white placeholder-white-50 focus-outline-cyan"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decorative elements -->
                <div class="position-absolute top-0 start-0 w-64 h-64 bg-info rounded-circle opacity-20 blur-3 animate-pulse"></div>
                <div class="position-absolute bottom-0 end-0 w-64 h-64 bg-purple rounded-circle opacity-20 blur-3 animate-pulse"></div>
            </div>

            <!-- Main Content -->
            <div class="container px-4 py-5">
                <!-- Filter Bar -->
                <div class="mb-5">
                    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4 p-4 bg-white rounded-3 shadow border">
                        <div>
                            <h2 class="h1 fw-bold text-dark mb-2">Browse Events</h2>
                            <p class="text-secondary">Filter by type to find exactly what you're looking for</p>
                        </div>
                        
                        <div class="d-flex flex-wrap align-items-center gap-3">
                            <!-- Event Type Filter -->
                            <div class="position-relative">
                                <select 
                                    v-model="selectedType"
                                    @change="filterByType"
                                    class="form-select pe-4 py-2 rounded-3 border focus-outline-cyan cursor-pointer"
                                    style="appearance: none; min-width: 180px;"
                                >
                                    <option value="">All Event Types</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="networking">Networking</option>
                                    <option value="meeting">Meeting</option>
                                </select>
                                <div class="position-absolute top-50 end-0 translate-middle-y pe-3">
                                    <i class="bi bi-chevron-down text-body-tertiary"></i>
                                </div>
                            </div>
                            
                            <!-- Status Filter -->
                            <div class="d-flex align-items-center gap-2">
                                <button 
                                    v-for="status in statusFilters"
                                    :key="status.value"
                                    @click="toggleStatusFilter(status.value)"
                                    :class="[
                                        'btn btn-sm px-3 py-2 rounded-pill fw-medium transition-all',
                                        activeStatusFilters.includes(status.value) 
                                            ? 'bg-gradient-cyan-purple text-white shadow-lg' 
                                            : 'btn-light text-secondary hover-light'
                                    ]"
                                >
                                    {{ status.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="d-flex flex-column align-items-center justify-content-center py-5">
                    <div class="position-relative">
                        <div class="spinner-border text-primary border-4 border-top-0 border-end-0 border-bottom-0" style="width: 4rem; height: 4rem;" role="status"></div>
                        <div class="position-absolute top-50 start-50 translate-middle">
                            <div class="bg-gradient-cyan-purple rounded-circle animate-ping" style="width: 2rem; height: 2rem;"></div>
                        </div>
                    </div>
                    <p class="mt-4 fs-5 text-secondary fw-medium">Loading inspiring events...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="max-w-md mx-auto text-center py-5">
                    <div class="d-inline-flex align-items-center justify-content-center w-5 h-5 rounded-circle bg-danger bg-opacity-10 mb-4">
                        <i class="bi bi-exclamation-triangle-fill text-danger fs-2"></i>
                    </div>
                    <h3 class="h2 fw-bold text-dark mb-3">Unable to Load Events</h3>
                    <p class="text-secondary mb-4">{{ error }}</p>
                    <button 
                        @click="fetchEvents"
                        class="btn bg-gradient-cyan-purple text-white fw-medium rounded-pill px-4 py-2 hover-lift transition-all"
                    >
                        Try Again
                    </button>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredEvents.length === 0" class="max-w-md mx-auto text-center py-5">
                    <div class="d-inline-flex align-items-center justify-content-center w-5 h-5 rounded-circle bg-light mb-4">
                        <i class="bi bi-calendar text-body-secondary fs-2"></i>
                    </div>
                    <h3 class="h2 fw-bold text-dark mb-3">No Events Found</h3>
                    <p class="text-secondary">We couldn't find any events matching your criteria.</p>
                    <p class="text-body-tertiary mt-2">Try adjusting your filters or check back soon for new events!</p>
                    <button 
                        @click="resetFilters"
                        class="btn btn-dark text-white fw-medium rounded-pill px-4 py-2 mt-4 transition-all"
                    >
                        Reset Filters
                    </button>
                </div>

                <!-- Featured Events Section -->
                <div v-else>
                    <section v-if="featuredEvents.length > 0" class="mb-5">
                        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
                            <div>
                                <h2 class="h1 fw-bold text-dark d-flex align-items-center gap-3 mb-0">
                                    <span class="d-inline-flex align-items-center justify-content-center w-3 h-3 rounded-circle bg-gradient-warning">
                                        <i class="bi bi-star-fill text-white"></i>
                                    </span>
                                    Featured Events
                                </h2>
                                <p class="text-secondary mt-2">Curated selection of must-attend industry events</p>
                            </div>
                            <div class="d-none d-md-block">
                                <div class="d-flex gap-2">
                                    <button @click="scrollFeaturedLeft" class="btn btn-light rounded-circle p-2 hover-light">
                                        <i class="bi bi-chevron-left text-dark"></i>
                                    </button>
                                    <button @click="scrollFeaturedRight" class="btn btn-light rounded-circle p-2 hover-light">
                                        <i class="bi bi-chevron-right text-dark"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div ref="featuredContainer" class="d-flex overflow-auto pb-3 gap-4 scrollbar-hide scroll-smooth" style="scroll-snap-type: x mandatory;">
                            <div 
                                v-for="event in featuredEvents" 
                                :key="event.id" 
                                class="flex-shrink-0"
                                :style="{ width: '100%', maxWidth: 'calc(100% - 1rem)' }"
                                style="scroll-snap-align: start;"
                            >
                                <div class="d-md-none">
                                    <EventCard :event="event" :is-featured="true" />
                                </div>
                                <div class="d-none d-md-block d-lg-none">
                                    <EventCard :event="event" :is-featured="true" />
                                </div>
                                <div class="d-none d-lg-block">
                                    <EventCard :event="event" :is-featured="true" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- All Events Section -->
                    <section>
                        <div class="mb-4">
                            <h2 class="h2 fw-bold text-dark">All Events</h2>
                            <p class="text-secondary mt-1">Discover {{ filteredEvents.length }} events matching your criteria</p>
                        </div>

                        <!-- Events Grid -->
                        <div class="row g-4">
                            <div 
                                v-for="event in paginatedEvents" 
                                :key="event.id" 
                                class="col-12 col-md-6 col-lg-4"
                            >
                                <EventCard :event="event" />
                            </div>
                        </div>

                        <!-- Pagination -->
                        <div v-if="pagination.last_page > 1" class="mt-5">
                            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-4">
                                <div class="text-secondary">
                                    Showing <span class="fw-semibold text-dark">{{ showingFrom }}-{{ showingTo }}</span> of 
                                    <span class="fw-semibold text-dark">{{ pagination.total }}</span> events
                                </div>
                                
                                <div class="d-flex align-items-center gap-2">
                                    <button 
                                        @click="changePage(pagination.current_page - 1)"
                                        :disabled="pagination.current_page === 1"
                                        :class="[
                                            'btn d-flex align-items-center gap-2 px-3 py-2 rounded transition-all',
                                            pagination.current_page === 1
                                                ? 'text-body-tertiary bg-light cursor-not-allowed'
                                                : 'btn-outline-secondary hover-light'
                                        ]"
                                    >
                                        <i class="bi bi-chevron-left"></i>
                                        Previous
                                    </button>
                                    
                                    <div class="d-flex align-items-center gap-1">
                                        <button 
                                            v-for="page in visiblePages" 
                                            :key="page"
                                            @click="changePage(page)"
                                            :class="[
                                                'btn px-3 py-2 rounded fw-medium transition-all',
                                                page === pagination.current_page
                                                    ? 'bg-gradient-cyan-purple text-white shadow'
                                                    : 'text-dark hover-light'
                                            ]"
                                        >
                                            {{ page }}
                                        </button>
                                    </div>
                                    
                                    <button 
                                        @click="changePage(pagination.current_page + 1)"
                                        :disabled="pagination.current_page === pagination.last_page"
                                        :class="[
                                            'btn d-flex align-items-center gap-2 px-3 py-2 rounded transition-all',
                                            pagination.current_page === pagination.last_page
                                                ? 'text-body-tertiary bg-light cursor-not-allowed'
                                                : 'btn-outline-secondary hover-light'
                                        ]"
                                    >
                                        Next
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Stats Section -->
                <div v-if="!loading && !error && filteredEvents.length > 0" class="mt-5">
                    <div class="bg-gradient-dark rounded-3 p-4 p-md-5">
                        <div class="row g-4">
                            <div v-for="stat in stats" :key="stat.label" class="col-6 col-md-3 text-center">
                                <div class="display-6 fw-bold text-white mb-2">{{ stat.value }}</div>
                                <div class="text-white-50">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Newsletter CTA -->
                <div class="mt-5 text-center">
                    <div class="max-w-2xl mx-auto">
                        <h3 class="h2 fw-bold text-dark mb-3">Never Miss an Event</h3>
                        <p class="text-secondary mb-4">Subscribe to get notified about upcoming conferences, workshops, and networking opportunities</p>
                        <div class="d-flex flex-column flex-sm-row gap-3 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                class="form-control flex-grow-1 px-4 py-2 rounded-pill focus-outline-cyan"
                            />
                            <button class="btn bg-gradient-cyan-purple text-white fw-medium rounded-pill px-4 py-2 hover-lift transition-all">
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
/* Custom CSS for Bootstrap enhancements */
.text-gradient-cyan-purple {
    background: linear-gradient(to right, #0dcaf0, #6f42c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.bg-gradient-cyan-purple {
    background: linear-gradient(to right, #0dcaf0, #6f42c1);
}

.bg-gradient-warning {
    background: linear-gradient(to right, #ffc107, #fd7e14);
}

.bg-gradient-dark {
    background: linear-gradient(to right, #212529, #000);
}

.bg-purple {
    background-color: #6f42c1;
}

.backdrop-filter-blur {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.focus-outline-cyan:focus {
    outline: none;
    border-color: #0dcaf0 !important;
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25) !important;
}

.blur-3 {
    filter: blur(3rem);
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.hover-light:hover {
    background-color: rgba(248, 249, 250, 0.8) !important;
}

.hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(13, 202, 240, 0.25) !important;
}

.transition-all {
    transition: all 0.2s ease;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Custom animations */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
}

@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

/* Responsive display classes */
.display-md-3 {
    font-size: calc(1.3rem + 3.6vw);
}

@media (min-width: 768px) {
    .display-md-3 {
        font-size: 2.5rem;
    }
}

.display-lg-2 {
    font-size: calc(1.3rem + 3.6vw);
}

@media (min-width: 992px) {
    .display-lg-2 {
        font-size: 3rem;
    }
}

/* Spacing utilities */
.max-w-2xl {
    max-width: 42rem;
}

.max-w-3xl {
    max-width: 48rem;
}

.max-w-md {
    max-width: 28rem;
}

.w-64 {
    width: 16rem;
}

.h-64 {
    height: 16rem;
}

.w-5 {
    width: 3rem;
}

.h-5 {
    height: 3rem;
}

.w-3 {
    width: 2.5rem;
}

.h-3 {
    height: 2.5rem;
}

/* Border utilities */
.border-top-0 {
    border-top: 0 !important;
}

.border-end-0 {
    border-right: 0 !important;
}

.border-bottom-0 {
    border-bottom: 0 !important;
}

/* Text color utilities */
.text-white-50 {
    color: rgba(255, 255, 255, 0.5);
}

.placeholder-white-50::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.border-white {
    border-color: rgba(255, 255, 255, 0.2) !important;
}

.border-opacity-20 {
    border-opacity: 0.2;
}

.bg-opacity-10 {
    background-opacity: 0.1;
}
</style>