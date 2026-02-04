<!-- pages/EventDetailPage.vue -->
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
        <div class="relative h-96 md:h-[500px] overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <img 
            :src="eventImageUrl" 
            :alt="event.title"
            class="w-full h-full object-cover transition-transform duration-700"
            :class="{ 'scale-105': imageLoaded }"
            @load="imageLoaded = true"
          />
          
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
                  <span class="text-sm font-medium">{{ formattedType }}</span>
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
                    <span>{{ formattedDate }}</span>
                  </div>
                  <div class="flex items-center gap-2">
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

      <!-- Main Content -->
      <div class="container mx-auto px-4 -mt-12 relative z-30">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Event Details -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <!-- Price & Action Buttons -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <div class="text-3xl font-bold text-gray-800">{{ eventPrice }}</div>
                  <div class="text-gray-600 mt-1">Per person</div>
                </div>
                <div class="flex gap-4">
                  <button 
                    v-if="!event.is_past && event.has_capacity"
                    @click="registerForEvent"
                    :disabled="isFullyBooked"
                    :class="[
                      'px-8 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2',
                      isFullyBooked
                        ? 'bg-red-50 text-red-700 border border-red-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-xl hover:shadow-cyan-500/30'
                    ]"
                  >
                    <svg v-if="!isFullyBooked" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16 7.5a2.5 2.5 0 01-4.5 1.5A2.5 2.5 0 019 5.5 2.5 2.5 0 0111.5 3h2A2.5 2.5 0 0116 5.5V7.5zM14 6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V6z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M6 3a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1H6zm4 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1h-1z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M4 10a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" clip-rule="evenodd" />
                    </svg>
                    {{ registerButtonText }}
                  </button>
                  <button 
                    v-if="!isFullyBooked && !event.is_past"
                    @click="addToCalendar"
                    class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Calendar
                  </button>
                </div>
              </div>

              <!-- Description -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                <div class="prose max-w-none">
                  <p class="text-gray-600 whitespace-pre-line">{{ event.description }}</p>
                </div>
              </div>

              <!-- Speakers Section -->
              <div v-if="event.speakers && event.speakers.length > 0" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Featured Speakers</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    v-for="speaker in event.speakers" 
                    :key="speaker.id"
                    class="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden">
                        <img 
                          v-if="speaker.avatar" 
                          :src="speaker.avatar" 
                          :alt="speaker.name"
                          class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                          {{ speaker.name.charAt(0) }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800">{{ speaker.name }}</h3>
                      <p v-if="speaker.title" class="text-sm text-gray-600 mb-2">{{ speaker.title }}</p>
                      <p v-if="speaker.company" class="text-sm text-gray-500">{{ speaker.company }}</p>
                      <p v-if="speaker.bio" class="text-sm text-gray-600 mt-2 line-clamp-2">{{ speaker.bio }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Agenda Section -->
              <div v-if="event.agenda && event.agenda.length > 0" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Event Agenda</h2>
                <div class="space-y-4">
                  <div 
                    v-for="(item, index) in event.agenda" 
                    :key="index"
                    class="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div class="flex-shrink-0 w-24">
                      <div class="text-sm font-semibold text-cyan-600">{{ formatTime(item.start_time) }}</div>
                      <div class="text-sm text-gray-500">to {{ formatTime(item.end_time) }}</div>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">{{ item.title }}</h4>
                      <p v-if="item.description" class="text-gray-600 mt-1">{{ item.description }}</p>
                      <div v-if="item.speaker" class="mt-2 text-sm text-gray-500">
                        <span class="font-medium">Speaker:</span> {{ item.speaker }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location Details -->
              <div v-if="!event.is_online" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Location Details</h2>
                <div class="bg-gray-50 rounded-2xl p-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <svg class="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">{{ event.venue }}</h3>
                      <p v-if="event.address" class="text-gray-600 mt-1">{{ event.address }}</p>
                      <p v-if="event.city || event.country" class="text-gray-600">
                        {{ [event.city, event.state, event.country].filter(Boolean).join(', ') }}
                      </p>
                      <a 
                        v-if="event.location_url"
                        :href="event.location_url"
                        target="_blank"
                        class="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mt-2"
                      >
                        <span>Get directions</span>
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Online Event Details -->
              <div v-if="event.is_online" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Online Event Details</h2>
                <div class="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">Virtual Event</h3>
                      <p class="text-gray-600 mt-2">This event will be hosted online. Join from anywhere in the world!</p>
                      <div v-if="event.meeting_url" class="mt-4">
                        <a 
                          :href="event.meeting_url"
                          target="_blank"
                          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                          </svg>
                          Join Meeting
                        </a>
                      </div>
                      <div v-if="event.meeting_details" class="mt-4 text-gray-600">
                        <h4 class="font-medium text-gray-800 mb-2">Meeting Details:</h4>
                        <p class="whitespace-pre-line">{{ event.meeting_details }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Sidebar -->
          <div class="lg:col-span-1">
            <!-- Event Status Card -->
            <div class="bg-white rounded-3xl shadow-xl p-6 mb-6 sticky top-6">
              <div class="mb-6">
                <div :class="[
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold',
                  statusClass
                ]">
                  <div class="w-2 h-2 rounded-full animate-pulse"></div>
                  {{ formattedStatus }}
                </div>
              </div>

              <!-- Event Stats -->
              <div class="space-y-4">
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-600">Date & Time</span>
                  <span class="font-semibold text-gray-800">{{ formattedDateTime }}</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-600">Duration</span>
                  <span class="font-semibold text-gray-800">{{ eventDuration }}</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-600">Type</span>
                  <span class="font-semibold text-gray-800">{{ formattedType }}</span>
                </div>
                <div v-if="event.category" class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-600">Category</span>
                  <span class="font-semibold text-gray-800">{{ event.category }}</span>
                </div>
              </div>

              <!-- Registration Progress -->
              <div v-if="event.capacity" class="mt-8">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Registration</span>
                  <span class="font-semibold">{{ bookingPercentage }}% booked</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    :style="{ width: `${bookingPercentage}%` }"
                    class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                  ></div>
                </div>
                <div class="text-center text-sm text-gray-500 mt-2">
                  {{ event.registered_count || 0 }} of {{ event.capacity }} spots filled
                </div>
              </div>

              <!-- Share Event -->
              <div class="mt-8">
                <h4 class="font-semibold text-gray-800 mb-4">Share this event</h4>
                <div class="flex gap-3">
                  <button 
                    v-for="platform in sharePlatforms"
                    :key="platform.name"
                    @click="shareEvent(platform.name)"
                    class="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <component :is="platform.icon" class="w-6 h-6" :class="platform.color" />
                    <span class="text-xs mt-1 text-gray-600">{{ platform.name }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Organizer Info -->
            <div v-if="event.organizer" class="bg-white rounded-3xl shadow-xl p-6">
              <h3 class="font-bold text-gray-800 text-lg mb-4">Organizer</h3>
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden">
                    <img 
                      v-if="event.organizer.logo" 
                      :src="event.organizer.logo" 
                      :alt="event.organizer.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">{{ event.organizer.name }}</h4>
                  <p v-if="event.organizer.description" class="text-sm text-gray-600 mt-1 line-clamp-2">
                    {{ event.organizer.description }}
                  </p>
                  <a 
                    v-if="event.organizer.website"
                    :href="event.organizer.website"
                    target="_blank"
                    class="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm mt-2"
                  >
                    Visit website
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </nuxt-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '@/stores/eventStore';

// Icons for sharing
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import TwitterIcon from '@/components/icons/TwitterIcon.vue';
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue';
import LinkIcon from '@/components/icons/LinkIcon.vue';

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();

const loading = ref(true);
const error = ref(null);
const imageLoaded = ref(false);

// Fetch event based on ID or slug
const event = computed(() => eventStore.currentEvent);

onMounted(async () => {
  try {
    loading.value = true;
    const identifier =  route.params.slug;
    await eventStore.fetchEvent(identifier);
    
    if (!event.value) {
      throw new Error('Event not found');
    }
    
    // Update page title
    document.title = `${event.value.title} | Event Details`;
  } catch (err) {
    error.value = err.message;
    console.error('Error loading event:', err);
  } finally {
    loading.value = false;
  }
});

// Computed properties
const eventImageUrl = computed(() => {
  if (!event.value?.featured_image) return '/images/event-placeholder.jpg';
  
  if (event.value.featured_image.startsWith('http')) {
    return event.value.featured_image;
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return `${baseUrl}/storage/${event.value.featured_image}`;
});

const formattedType = computed(() => {
  if (!event.value?.type) return 'Event';
  return event.value.type.charAt(0).toUpperCase() + event.value.type.slice(1);
});

const formattedDate = computed(() => {
  if (!event.value?.start_date) return '';
  
  const startDate = new Date(event.value.start_date);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return startDate.toLocaleDateString('en-US', options);
});

const formattedDateTime = computed(() => {
  if (!event.value?.start_date) return '';
  
  const startDate = new Date(event.value.start_date);
  const endDate = event.value.end_date ? new Date(event.value.end_date) : null;
  
  const timeOptions = { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  };
  
  const timeStr = startDate.toLocaleTimeString('en-US', timeOptions);
  
  if (endDate) {
    const endTimeStr = endDate.toLocaleTimeString('en-US', timeOptions);
    return `${timeStr} - ${endTimeStr}`;
  }
  
  return timeStr;
});

const eventDuration = computed(() => {
  if (!event.value?.start_date || !event.value?.end_date) return '';
  
  const start = new Date(event.value.start_date);
  const end = new Date(event.value.end_date);
  const durationMs = end - start;
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
});

const formattedStatus = computed(() => {
  if (event.value?.is_upcoming) return 'Upcoming';
  if (event.value?.is_ongoing) return 'Live Now';
  if (event.value?.is_past) return 'Completed';
  return 'Scheduled';
});

const statusClass = computed(() => {
  if (event.value?.is_upcoming) return 'bg-green-100 text-green-800';
  if (event.value?.is_ongoing) return 'bg-yellow-100 text-yellow-800';
  if (event.value?.is_past) return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
});

const eventPrice = computed(() => {
  if (!event.value?.price || event.value.price === 0) return 'Free';
  return `$${event.value.price.toFixed(2)}`;
});

const bookingPercentage = computed(() => {
  if (!event.value?.capacity || event.value.capacity === 0) return 0;
  const percentage = Math.min(100, Math.round(((event.value.registered_count || 0) / event.value.capacity) * 100));
  return percentage;
});

const isFullyBooked = computed(() => {
  return event.value?.capacity && (event.value.registered_count || 0) >= event.value.capacity;
});

const registerButtonText = computed(() => {
  if (isFullyBooked.value) return 'Sold Out';
  if (event.value?.is_past) return 'Event Ended';
  if (!event.value?.has_capacity) return 'Register Now';
  return 'Register Now';
});

const sharePlatforms = computed(() => [
  { name: 'Facebook', icon: FacebookIcon, color: 'text-blue-600' },
  { name: 'Twitter', icon: TwitterIcon, color: 'text-blue-400' },
  { name: 'LinkedIn', icon: LinkedinIcon, color: 'text-blue-700' },
  { name: 'Copy Link', icon: LinkIcon, color: 'text-gray-600' }
]);

// Helper methods
const formatTime = (timeString) => {
  if (!timeString) return '';
  const date = new Date(`2000-01-01T${timeString}`);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const registerForEvent = () => {
  if (isFullyBooked.value || event.value?.is_past || !event.value?.has_capacity) {
    return;
  }
  
  // Navigate to registration page
  if (event.value?.slug) {
    router.push(`/events/${event.value.slug}/register`);
  } else {
    router.push(`/events/${event.value?.id}/register`);
  }
};

const addToCalendar = () => {
  if (!event.value) return;
  
  const startDate = new Date(event.value.start_date);
  const endDate = event.value.end_date ? new Date(event.value.end_date) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  
  // Create calendar event
  const calendarEvent = {
    title: event.value.title,
    description: event.value.description,
    location: event.value.venue,
    start: startDate.toISOString().replace(/-|:|\.\d+/g, ''),
    end: endDate.toISOString().replace(/-|:|\.\d+/g, '')
  };
  
  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`;
  
  window.open(googleCalendarUrl, '_blank');
};

const shareEvent = (platform) => {
  const url = window.location.href;
  const title = event.value?.title || 'Check out this event!';
  const text = event.value?.description || '';
  
  if (platform === 'Copy Link') {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
    return;
  }
  
  let shareUrl = '';
  
  switch (platform) {
    case 'Facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'Twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    case 'LinkedIn':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prose {
  color: #4b5563;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.6;
}

.sticky {
  position: sticky;
}
</style>