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
                            Join top GRC professionals at conferences, workshops, and networking sessions.
                        </p>
                        
                        <!-- Search Bar -->
                        <div class="tw-max-w-2xl tw-mx-auto">
                            <div class="tw-relative">
                                <div class="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-pointer-events-none">
                                    <svg class="tw-h-5 tw-w-5 tw-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
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
            </div>

            <!-- Main Content -->
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-12">
                <!-- Filter Bar -->
                <div class="tw-mb-12">
                    <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-gap-6 tw-p-6 tw-bg-white tw-rounded-2xl tw-shadow-lg tw-border tw-border-gray-100">
                        <div>
                            <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">Browse Events</h2>
                            <p class="tw-text-gray-600">Filter by type to find what you're looking for</p>
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
                                    <svg class="tw-h-5 tw-w-5 tw-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
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
                                            ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-shadow-lg' 
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
                    </div>
                    <p class="tw-mt-6 tw-text-lg tw-text-gray-600 tw-font-medium">Loading events...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="tw-max-w-md tw-mx-auto tw-text-center tw-py-20">
                    <div class="tw-inline-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-bg-red-100 tw-mb-6">
                        <svg class="tw-w-10 tw-h-10 tw-text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-3">Unable to Load Events</h3>
                    <p class="tw-text-gray-600 tw-mb-8">{{ error }}</p>
                    <button 
                        @click="fetchEvents"
                        class="tw-px-6 tw-py-3 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-font-medium tw-rounded-full hover:tw-shadow-lg tw-transition-all tw-duration-200"
                    >
                        Try Again
                    </button>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredEvents.length === 0" class="tw-max-w-md tw-mx-auto tw-text-center tw-py-20">
                    <div class="tw-inline-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-100 tw-mb-6">
                        <svg class="tw-w-10 tw-h-10 tw-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-3">No Events Found</h3>
                    <p class="tw-text-gray-600">We couldn't find any events matching your criteria.</p>
                    <button 
                        @click="resetFilters"
                        class="tw-mt-8 tw-px-6 tw-py-3 tw-bg-gray-800 tw-text-white tw-font-medium tw-rounded-full hover:tw-bg-gray-900 tw-transition-all tw-duration-200"
                    >
                        Reset Filters
                    </button>
                </div>

                <!-- Events Grid -->
                <div v-else>
                    <!-- Featured Events -->
                    <section v-if="featuredEvents.length > 0" class="tw-mb-16">
                        <div class="tw-flex tw-items-center tw-justify-between tw-mb-8">
                            <div>
                                <h2 class="tw-text-3xl tw-font-bold tw-text-gray-800 tw-flex tw-items-center tw-gap-3">
                                    <span class="tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500">
                                        <svg class="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </span>
                                    Featured Events
                                </h2>
                            </div>
                        </div>

                        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                            <div 
                                v-for="event in featuredEvents" 
                                :key="event.id"
                            >
                                <EventCard :event="event" :is-featured="true" />
                            </div>
                        </div>
                    </section>

                    <!-- All Events -->
                    <section>
                        <div class="tw-mb-8">
                            <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800">All Events</h2>
                            <p class="tw-text-gray-600 tw-mt-1">{{ filteredEvents.length }} events found</p>
                        </div>

                        <!-- Events Grid -->
                        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                            <div 
                                v-for="event in paginatedEvents" 
                                :key="event.id"
                            >
                                <EventCard :event="event" />
                            </div>
                        </div>

                        <!-- Pagination -->
                        <div v-if="pagination.last_page > 1" class="tw-mt-12 tw-pt-8 tw-border-t tw-border-gray-200">
                            <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-justify-between tw-gap-4">
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
                                                : 'tw-text-gray-700 tw-bg-white tw-border tw-border-gray-200 hover:tw-bg-gray-50'
                                        ]"
                                    >
                                        <svg class="tw-w-4 tw-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                        </svg>
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
                                                    ? 'tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white'
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
                                                : 'tw-text-gray-700 tw-bg-white tw-border tw-border-gray-200 hover:tw-bg-gray-50'
                                        ]"
                                    >
                                        Next
                                        <svg class="tw-w-4 tw-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Newsletter CTA -->
                <div class="tw-mt-24 tw-text-center">
                    <div class="tw-max-w-2xl tw-mx-auto">
                        <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">Stay Updated</h3>
                        <p class="tw-text-gray-600 tw-mb-8">Get notified about upcoming events</p>
                        <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-max-w-md tw-mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                class="tw-flex-1 tw-px-6 tw-py-3 tw-rounded-full tw-border tw-border-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-cyan-500 focus:tw-border-transparent"
                            />
                            <button class="tw-px-8 tw-py-3 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-purple-500 tw-text-white tw-font-medium tw-rounded-full hover:tw-shadow-lg tw-transition-all tw-duration-200">
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
import { ref, computed, onMounted } from 'vue'
import EventCard from '@/components/Events/EventCard.vue'

// State
const searchQuery = ref('')
const selectedType = ref('')
const activeStatusFilters = ref(['upcoming'])
const loading = ref(false)
const error = ref(null)
const events = ref([])

// Status filters
const statusFilters = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'past', label: 'Past' }
]

// Mock pagination
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0
})

// Mock data for testing
const mockEvents = [
    {
        id: 1,
        title: 'GRC Leadership Conference 2024',
        description: 'Annual conference for GRC leaders and professionals',
        type: 'conference',
        start_date: '2024-12-15T09:00:00',
        venue: 'Convention Center, New York',
        price: 299,
        capacity: 200,
        registered_count: 150,
        is_upcoming: true,
        is_online: false,
        featured_image: '/images/event1.jpg'
    },
    {
        id: 2,
        title: 'Risk Management Workshop',
        description: 'Hands-on workshop for risk management professionals',
        type: 'workshop',
        start_date: '2024-11-20T10:00:00',
        venue: 'Virtual Event',
        price: 149,
        capacity: 50,
        registered_count: 45,
        is_upcoming: true,
        is_online: true,
        featured_image: '/images/event2.jpg'
    }
]

// Computed
const filteredEvents = computed(() => {
    let filtered = events.value
    
    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(event => 
            event?.title?.toLowerCase().includes(query) ||
            event?.description?.toLowerCase().includes(query) ||
            event?.venue?.toLowerCase().includes(query)
        )
    }
    
    // Filter by type
    if (selectedType.value) {
        filtered = filtered.filter(event => event?.type === selectedType.value)
    }
    
    // Filter by status
    if (activeStatusFilters.value.length > 0) {
        filtered = filtered.filter(event => {
            if (activeStatusFilters.value.includes('upcoming') && event?.is_upcoming) return true
            if (activeStatusFilters.value.includes('ongoing') && event?.is_ongoing) return true
            if (activeStatusFilters.value.includes('past') && event?.is_past) return true
            return false
        })
    }
    
    return filtered
})

const featuredEvents = computed(() => {
    return filteredEvents.value.filter(event => event.is_featured || event.id <= 3)
})

const paginatedEvents = computed(() => {
    const start = (pagination.value.current_page - 1) * pagination.value.per_page
    const end = start + pagination.value.per_page
    return filteredEvents.value.slice(start, end)
})

const visiblePages = computed(() => {
    const totalPages = Math.ceil(filteredEvents.value.length / pagination.value.per_page)
    const currentPage = pagination.value.current_page
    
    if (totalPages <= 1) return [1]
    
    const pages = []
    const maxVisible = 5
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    
    return pages
})

const showingFrom = computed(() => {
    return ((pagination.value.current_page - 1) * pagination.value.per_page) + 1
})

const showingTo = computed(() => {
    return Math.min(pagination.value.current_page * pagination.value.per_page, filteredEvents.value.length)
})

// Methods
const fetchEvents = async () => {
    loading.value = true
    error.value = null
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Use mock data for now
        events.value = mockEvents
        pagination.value.total = mockEvents.length
        
    } catch (err) {
        error.value = 'Failed to load events. Please try again.'
        console.error('Error fetching events:', err)
    } finally {
        loading.value = false
    }
}

const handleSearch = () => {
    // Reset to page 1 when searching
    pagination.value.current_page = 1
}

const filterByType = () => {
    pagination.value.current_page = 1
}

const toggleStatusFilter = (status) => {
    const index = activeStatusFilters.value.indexOf(status)
    if (index > -1) {
        activeStatusFilters.value.splice(index, 1)
    } else {
        activeStatusFilters.value.push(status)
    }
    pagination.value.current_page = 1
}

const resetFilters = () => {
    searchQuery.value = ''
    selectedType.value = ''
    activeStatusFilters.value = ['upcoming']
    pagination.value.current_page = 1
}

const changePage = (page) => {
    const totalPages = Math.ceil(filteredEvents.value.length / pagination.value.per_page)
    if (page >= 1 && page <= totalPages) {
        pagination.value.current_page = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Lifecycle
onMounted(() => {
    fetchEvents()
})
</script>

<style scoped>
/* Custom scrollbar hide */
.tw-scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.tw-scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Container utilities */
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

/* Custom animations */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.tw-animate-spin {
    animation: spin 1s linear infinite;
}

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
</style>