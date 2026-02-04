<!-- components/Events/EventList.vue -->
<template>
  <nuxt-layout name="landing-layout">
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-r from-blue-900 via-white to-blue-900">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="relative container mx-auto px-4 py-24">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Inspiring Events
            </h1>
            <p class="text-xl text-gray-200 mb-10">
              Join top GRC professionals at conferences, workshops, and networking sessions that shape the industry.
            </p>
            
            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  v-model="searchQuery"
                  @input="handleSearch"
                  type="text"
                  placeholder="Search events, topics, or speakers..."
                  class="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <!-- <div class="absolute top-0 left-0 w-64 h-64 bg-cyan-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div> -->
        <!-- <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div> -->
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-12">
        <!-- Filter Bar -->
        <div class="mb-12">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100">
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Browse Events</h2>
              <p class="text-gray-600">Filter by type to find exactly what you're looking for</p>
            </div>
            
            <div class="flex flex-wrap items-center gap-4">
              <!-- Event Type Filter -->
              <div class="relative">
                <select 
                  v-model="selectedType"
                  @change="filterByType"
                  class="appearance-none bg-white pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  <option value="">All Event Types</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="networking">Networking</option>
                  <option value="meeting">Meeting</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <!-- Status Filter -->
              <div class="flex items-center space-x-2">
                <button 
                  v-for="status in statusFilters"
                  :key="status.value"
                  @click="toggleStatusFilter(status.value)"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    activeStatusFilters.includes(status.value) 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ status.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <p class="mt-6 text-lg text-gray-600 font-medium">Loading inspiring events...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="max-w-md mx-auto text-center py-20">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.772-.833-2.544 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">Unable to Load Events</h3>
          <p class="text-gray-600 mb-8">{{ error }}</p>
          <button 
            @click="fetchEvents"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredEvents.length === 0" class="max-w-md mx-auto text-center py-20">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">No Events Found</h3>
          <p class="text-gray-600">We couldn't find any events matching your criteria.</p>
          <p class="text-gray-500 mt-2">Try adjusting your filters or check back soon for new events!</p>
          <button 
            @click="resetFilters"
            class="mt-8 px-6 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-900 transition-all duration-200"
          >
            Reset Filters
          </button>
        </div>

        <!-- Featured Events Section -->
        <div v-else>
          <section v-if="featuredEvents.length > 0" class="mb-16">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  Featured Events
                </h2>
                <p class="text-gray-600 mt-2">Curated selection of must-attend industry events</p>
              </div>
              <div class="hidden md:block">
                <div class="flex space-x-2">
                  <button @click="scrollFeaturedLeft" class="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="scrollFeaturedRight" class="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div ref="featuredContainer" class="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide scroll-smooth">
              <div 
                v-for="event in featuredEvents" 
                :key="event.id" 
                class="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <EventCard :event="event" :is-featured="true" />
              </div>
            </div>
          </section>

          <!-- All Events Section -->
          <section>
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800">All Events</h2>
              <p class="text-gray-600 mt-1">Discover {{ filteredEvents.length }} events matching your criteria</p>
            </div>

            <!-- Events Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                v-for="event in paginatedEvents" 
                :key="event.id" 
                class="h-full"
              >
                <EventCard :event="event" />
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="pagination.last_page > 1" class="mt-16">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div class="text-gray-600">
                  Showing <span class="font-semibold text-gray-800">{{ showingFrom }}-{{ showingTo }}</span> of 
                  <span class="font-semibold text-gray-800">{{ pagination.total }}</span> events
                </div>
                
                <div class="flex items-center space-x-2">
                  <button 
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    :class="[
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                      pagination.current_page === 1
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  <div class="flex items-center space-x-1">
                    <button 
                      v-for="page in visiblePages" 
                      :key="page"
                      @click="changePage(page)"
                      :class="[
                        'w-10 h-10 rounded-lg font-medium transition-all duration-200',
                        page === pagination.current_page
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                          : 'text-gray-700 hover:bg-gray-100'
                      ]"
                    >
                      {{ page }}
                    </button>
                  </div>
                  
                  <button 
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    :class="[
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                      pagination.current_page === pagination.last_page
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                    ]"
                  >
                    Next
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Stats Section -->
        <div v-if="!loading && !error && filteredEvents.length > 0" class="mt-24">
          <div class="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div v-for="stat in stats" :key="stat.label" class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">{{ stat.value }}</div>
                <div class="text-gray-300">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter CTA -->
        <div class="mt-24 text-center">
          <div class="max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Never Miss an Event</h3>
            <p class="text-gray-600 mb-8">Subscribe to get notified about upcoming conferences, workshops, and networking opportunities</p>
            <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                class="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
              <button class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5">
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
    
    if (selectedType.value) {
        filtered = filtered.filter(event => event?.type === selectedType.value);
    }
    
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

watch(searchQuery, (newQuery) => {
    if (!newQuery.trim() && !selectedType.value && activeStatusFilters.value.length === 0) {
        fetchEvents();
    }
});

watch(activeStatusFilters, () => {
    if (!searchQuery.value.trim() && !selectedType.value && activeStatusFilters.value.length === 0) {
        fetchEvents();
    }
}, { deep: true });
</script>

<style scoped>
/* Custom CSS utilities */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scroll-smooth {
    scroll-behavior: smooth;
}

/* Container utilities for responsiveness */
.container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 1rem;
    padding-left: 1rem;
}

@media (min-width: 640px) {
    .container {
        max-width: 640px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
    }
}

@media (min-width: 1280px) {
    .container {
        max-width: 1280px;
    }
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

.mix-blend-multiply {
    mix-blend-mode: multiply;
}

.filter {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.blur-3xl {
    --tw-blur: blur(64px);
}
</style>