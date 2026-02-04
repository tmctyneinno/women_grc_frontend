<!-- pages/events/[slug].vue -->
<template>
  <nuxt-layout name="landing-layout">
    <!-- Loading State -->
    <div v-if="loading" class="fixed pt-5 inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 border-t-cyan-500 mb-4"></div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Loading Event Details</h3>
        <p class="text-gray-600">Fetching the latest event information...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div class="text-center max-w-md px-6">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-50 mb-6">
          <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.772-.833-2.544 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Event Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="$router.back()"
            class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-200"
          >
            ← Go Back
          </button>
          <button 
            @click="$router.push('/events')"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Browse All Events
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="event">
      <!-- Hero Section with Regular Image -->
      <section class="relative bg-gradient-to-br from-gray-800 to-gray-900">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent opacity-50"></div>
        <!-- Navigation Bar -->
        <nav class="relative z-10">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
              <!-- Back Button -->
              <button 
                @click="$router.back()"
                class="group flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span class="font-medium">Back</span>
              </button>
              
              <!-- Share Button -->
              <button 
                @click="shareEvent"
                class="group flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span class="font-medium">Share</span>
              </button>
            </div>
          </div>
        </nav>

        <!-- Hero Content -->
        <div class="relative z-10 py-12">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl">
              <!-- Event Type Badge -->
              <div class="inline-flex items-center gap-3 mb-8">
                <span class="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/30">
                  {{ formattedType }}
                </span>
                <span v-if="event.is_online" class="flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-blue-400/30">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                  Online Event
                </span>
                <span v-if="event.is_featured" class="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-md text-yellow-300 text-sm font-semibold rounded-full border border-yellow-400/30">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>

              <!-- Event Title -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {{ event.title }}
              </h1>

              <!-- Event Description -->
              <p v-if="event.short_description" class="text-xl text-white mb-10 max-w-3xl leading-relaxed">
                {{ event.short_description }}
              </p>

              <!-- Event Meta Info -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <!-- Date & Time -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border border-white/20">
                      <div class="text-2xl font-bold text-white">{{ formattedDay }}</div>
                      <div class="text-xs font-semibold text-white/80 uppercase tracking-wider">{{ formattedMonth }}</div>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-2">Date & Time</h3>
                    <p class="text-white">{{ formattedDateTime }}</p>
                    <p v-if="eventDuration" class="text-white text-sm mt-1">Duration: {{ formattedTime }}</p>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-2">Location</h3>
                    <p class="text-white">{{ event.venue }}</p>
                    <p v-if="event.city || event.country" class="text-white text-sm mt-1">
                      {{ [event.city, event.state, event.country].filter(Boolean).join(', ') }}
                    </p>
                  </div>
                </div>

                <!-- Price & Capacity -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-2">Details</h3>
                    <p class="text-2xl font-bold text-white mb-1">{{ eventPrice }}</p>
                    <p v-if="event.capacity" class="text-white text-sm">
                      {{ event.registered_count || 0 }} of {{ event.capacity }} spots filled
                    </p>
                    <div v-if="event.capacity && event.registered_count > 0" class="mt-2">
                      <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          :style="{ width: `${Math.min(100, ((event.registered_count || 0) / event.capacity) * 100)}%` }"
                          class="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              <!-- Call to Action -->
              <div class="flex flex-wrap gap-4">
                <button 
                  v-if="!event.is_past && event.has_capacity"
                  @click="addToMeetingLink"
                  :disabled="isFullyBooked"
                  :class="[
                    'group border border-white/20  relative px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1',
                    isFullyBooked
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-cyan-500/30'
                  ]"
                >
                  <span class="flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Register Today
                  </span>
                </button>
                
                <button 
                  v-if="!isFullyBooked && !event.is_past"
                  @click="addToCalendar"
                  class="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span class="flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add to Calendar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Image Section (NOT as background) -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto">
            <!-- Image Container -->
            <div class="relative rounded-3xl overflow-hidden shadow-2xl">
              <!-- Loading State -->
              <div v-if="!imageLoaded && !imageError" class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Error State -->
              <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center p-8">
                  <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-gray-500 text-lg">Event image not available</p>
                </div>
              </div>

              <!-- Main Image -->
              <img 
                :src="eventImageUrl"
                :alt="event.title"
                class="w-full h-[300px] md:h-[400px] object-contain transition-opacity duration-700"
                :class="{
                  'opacity-0': !imageLoaded || imageError,
                  'opacity-100': imageLoaded && !imageError
                }"
                @load="onImageLoad"
                @error="onImageError"
                crossorigin="anonymous"
              />

              <!-- Status Badge -->
              <div class="absolute top-6 right-6">
                <div :class="[
                  'px-6 py-3 rounded-full text-sm font-semibold shadow-lg',
                  statusClass
                ]">
                  {{ formattedStatus }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Main Content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- About Section -->
              <div class="bg-white rounded-3xl shadow-xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">About This Event</h2>
                <div class="prose prose-lg max-w-none">
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                    {{ plainDescription }}
                  </p>
                </div>
              </div>

              <!-- Speakers Section -->
              <div v-if="event.speakers && event.speakers.length > 0" class="bg-white rounded-3xl shadow-xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Featured Speakers</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    v-for="speaker in event.speakers" 
                    :key="speaker.id"
                    class="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-cyan-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-cyan-200 hover:shadow-lg"
                  >
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0">
                        <div class="relative">
                          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden ring-4 ring-white shadow-lg">
                            <img 
                              v-if="speaker.avatar" 
                              :src="speaker.avatar" 
                              :alt="speaker.name"
                              class="w-full h-full object-cover"
                            />
                            <div v-else class="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                              {{ speaker.name.charAt(0) }}
                            </div>
                          </div>
                          <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-bold text-gray-800 mb-1">{{ speaker.name }}</h3>
                        <p v-if="speaker.title" class="text-cyan-600 font-medium mb-2">{{ speaker.title }}</p>
                        <p v-if="speaker.company" class="text-gray-600 text-sm mb-3">{{ speaker.company }}</p>
                        <p v-if="speaker.bio" class="text-gray-500 text-sm line-clamp-2">{{ speaker.bio }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Agenda Section -->
              <div v-if="event.agenda && event.agenda.length > 0" class="bg-white rounded-3xl shadow-xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Event Agenda</h2>
                <div class="space-y-4">
                  <div 
                    v-for="(item, index) in event.agenda" 
                    :key="index"
                    class="group p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-cyan-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-cyan-200"
                  >
                    <div class="flex gap-6">
                      <div class="flex-shrink-0">
                        <div class="text-center">
                          <div class="text-2xl font-bold text-cyan-600">{{ formatTime(item.start_time) }}</div>
                          <div class="text-sm text-gray-500 mt-1">to {{ formatTime(item.end_time) }}</div>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold text-gray-800 mb-2">{{ item.title }}</h4>
                        <p v-if="item.description" class="text-gray-600 mb-3">{{ item.description }}</p>
                        <div v-if="item.speaker" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                          <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                          </svg>
                          <span class="text-sm font-medium text-gray-700">{{ item.speaker }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location Details -->
              <div v-if="!event.is_online && event.venue" class="bg-white rounded-3xl shadow-xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Location Details</h2>
                <div class="flex items-start gap-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-purple-50 flex items-center justify-center">
                      <svg class="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ event.venue }}</h3>
                    <p v-if="event.address" class="text-gray-600 mb-2">{{ event.address }}</p>
                    <p v-if="event.city || event.country" class="text-gray-600">
                      {{ [event.city, event.state, event.country].filter(Boolean).join(', ') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Online Event Details -->
              <div v-if="event.meeting_link" class="bg-white rounded-3xl shadow-xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Online Event Details</h2>
                <div class="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6">
                  <div class="flex items-start gap-6">
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                        <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-gray-800 mb-2">Virtual Event</h3>
                      <p class="text-gray-600 mb-4">This event will be hosted online. Join from anywhere!</p>
                      <a 
                        :href="event.meeting_link"
                        target="_blank"
                        class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                        Join Meeting
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Sidebar -->
            <div class="space-y-8">
              <!-- Event Status Card -->
              <div class="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
                <div class="mb-8">
                  <div :class="[
                    'inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold',
                    statusClass
                  ]">
                    <div class="w-3 h-3 rounded-full animate-pulse"></div>
                    {{ formattedStatus }}
                  </div>
                </div>

                <!-- Event Details -->
                <div class="space-y-6">
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Event Type</span>
                    <span class="font-semibold text-gray-800">{{ formattedType }}</span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Date & Time</span>
                    <span class="font-semibold text-gray-800 text-right">{{ formattedDateTime }} </span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Venue</span>
                    <span class="font-semibold text-gray-800 text-right">{{ event.venue }}</span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Format</span>
                    <span class="font-semibold text-gray-800">{{ event.is_online ? 'Virtual' : 'In-Person' }}</span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Price</span>
                    <span class="font-semibold text-gray-800">{{ eventPrice }}</span>
                  </div>
                </div>

                <!-- Registration Progress -->
                <div v-if="event.capacity" class="mt-8 pt-8 border-t border-gray-100">
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-gray-700 font-medium">Registration Progress</span>
                    <span class="text-cyan-600 font-bold text-lg">{{ bookingPercentage }}%</span>
                  </div>
                  <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      :style="{ width: `${bookingPercentage}%` }"
                      class="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000"
                    ></div>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500 mt-3">
                    <span>{{ event.registered_count || 0 }} registered</span>
                    <span>{{ event.capacity }} total</span>
                  </div>
                </div>

                <!-- Share Buttons -->
                <div class="mt-8 pt-8 border-t border-gray-100">
                  <h4 class="font-semibold text-gray-800 mb-4">Share this event</h4>
                  <div class="grid grid-cols-3 gap-3">
                    <button 
                      @click="shareOnFacebook"
                      class="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center text-blue-600"
                    >
                      <svg class="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span class="text-xs font-medium">Facebook</span>
                    </button>
                    <button 
                      @click="shareOnTwitter"
                      class="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center text-blue-400"
                    >
                      <svg class="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span class="text-xs font-medium">Twitter</span>
                    </button>
                    <button 
                      @click="shareOnLinkedIn"
                      class="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center text-blue-700"
                    >
                      <svg class="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span class="text-xs font-medium">LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>

             
              <!-- Sponsorship Contact (Minimal Version) -->
              <div class="bg-white rounded-3xl shadow-xl p-8 border-l-4 border-amber-500">
                <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sponsor This Event
                </h4>
                <p class="text-gray-600 text-sm mb-4">
                  For sponsorship and partnership opportunities
                </p>
                <a 
                  href="mailto:enquiries@wgrcfp.com"
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm inline-flex items-center gap-2 group"
                >
                  Contact: enquiries@wgrcfp.com
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
          

              <!-- Organizer Info -->
              <!-- <div v-if="event.organizer" class="bg-white rounded-3xl shadow-xl p-8"> -->
              <div class="bg-white rounded-3xl shadow-xl p-8">
                <h3 class="text-xl font-bold text-gray-800 mb-6">Organized By</h3>
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden ring-4 ring-white shadow-lg">
                      <NuxtImg src="/images/WGRC-logo.png" width="45" alt="site_logo" />
                      <img 
                        :src="e"
                        class="w-full h-full object-cover"
                      />
                      <div class="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                        The Morgans
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800 text-lg">The Morgans</h4>
                    
                    <a 
                      :href="'https://morgansconsortium.com'"
                      target="_blank"
                      class="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium text-sm mt-3 group"
                    >
                      Visit Website
                      <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <!-- Related Events Section -->
      <section v-if="relatedEvents.length > 0" class="py-20 bg-gradient-to-b from-white to-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">You Might Also Like</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Explore other events that match your interests</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Related events would be rendered here -->
          </div>
        </div>
      </section>
    </div>
  </nuxt-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug

// State
const loading = ref(true)
const error = ref(null)
const event = ref(null)
const imageLoaded = ref(false)
const imageError = ref(false)
const relatedEvents = ref([])

// Computed properties
const eventImageUrl = computed(() => {
  if (!event.value?.featured_image) {
    return '/images/event-placeholder.jpg'
  }
  
  const imgPath = event.value.featured_image
  
  // Already a full URL
  if (imgPath.startsWith('http')) {
    return imgPath
  }
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
  
  // Use the proxy route for CORS
  return `${baseUrl}/images/proxy/${cleanPath}`
})

const formattedType = computed(() => {
  if (!event.value?.type) return 'Event'
  return event.value.type.charAt(0).toUpperCase() + event.value.type.slice(1)
})

const formattedDay = computed(() => {
  if (!event.value?.start_date) return '--'
  try {
    const date = new Date(event.value.start_date)
    return date.getDate().toString().padStart(2, '0')
  } catch {
    return '--'
  }
})

const plainDescription = computed(() => {
  if (!event.value?.description) return ''
  
  // Remove HTML tags
  return event.value.description.replace(/<[^>]*>/g, '')
})

const formattedMonth = computed(() => {
  if (!event.value?.start_date) return '---'
  try {
    const date = new Date(event.value.start_date)
    return date.toLocaleString('default', { month: 'short' }).toUpperCase()
  } catch {
    return '---'
  }
})

const formattedTime = computed(() => {
    if (!event.value?.start_time) return '';
    try {
        const timeString = event.value?.start_time;
        
        const timeWithoutSeconds = timeString.split(':').slice(0, 2).join(':');
        
        const [hours, minutes] = timeWithoutSeconds.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; 
        
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch {
        return event.value?.start_time || ''; 
    }
});

const formattedDateTime = computed(() => {
  if (!event.value?.start_date) return ''
  
  try {
    const startDate = new Date(event.value.start_date)
    const endDate = event.value.end_date ? new Date(event.value.end_date) : null
    
    const timeOptions = { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }
    return `${startDate.toLocaleDateString()}`
  } catch {
    return 'Date information not available'
  }
})

const eventDuration = computed(() => {
  if (!event.value?.start_date || !event.value?.end_date) return ''
  
  try {
    const start = new Date(event.value.start_date)
    const end = new Date(event.value.end_date)
    const durationMs = end - start
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`
    }
  } catch {
    return ''
  }
})

const formattedStatus = computed(() => {
  if (event.value?.is_cancelled) return 'Cancelled'
  if (event.value?.is_upcoming) return 'Upcoming'
  if (event.value?.is_ongoing) return 'Live Now'
  if (event.value?.is_past) return 'Completed'
  return 'Scheduled'
})

const statusClass = computed(() => {
  if (event.value?.is_cancelled) return 'bg-red-100 text-red-800 border border-red-200'
  if (event.value?.is_upcoming) return 'bg-green-100 text-green-800 border border-green-200'
  if (event.value?.is_ongoing) return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
  if (event.value?.is_past) return 'bg-gray-100 text-gray-800 border border-gray-200'
  return 'bg-blue-100 text-blue-800 border border-blue-200'
})

const eventPrice = computed(() => {
  if (!event.value?.price || event.value.price === 0) return 'Free'
  return `$${parseFloat(event.value.price).toFixed(2)}`
})

const bookingPercentage = computed(() => {
  if (!event.value?.capacity || event.value.capacity === 0) return 0
  const percentage = Math.min(100, Math.round(((event.value.registered_count || 0) / event.value.capacity) * 100))
  return percentage
})

const isFullyBooked = computed(() => {
  return event.value?.capacity && (event.value.registered_count || 0) >= event.value.capacity
})

const registerButtonText = computed(() => {
  if (event.value?.is_cancelled) return 'Cancelled'
  if (isFullyBooked.value) return 'Sold Out'
  if (event.value?.is_past) return 'Event Ended'
  if (event.value?.registration_deadline) {
    const deadline = new Date(event.value.registration_deadline)
    const now = new Date()
    if (deadline < now) return 'Registration Closed'
  }
  return 'Register Now'
})

// Helper methods
const formatTime = (timeString) => {
  if (!timeString) return ''
  try {
    const date = new Date(`2000-01-01T${timeString}`)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  } catch {
    return timeString
  }
}

// Image handlers
const onImageLoad = () => {
  console.log('✅ Image loaded successfully')
  imageLoaded.value = true
  imageError.value = false
}

const onImageError = () => {
  console.error('❌ Image failed to load')
  imageError.value = true
  imageLoaded.value = true
}

// Event actions
const registerForEvent = () => {
  if (isFullyBooked.value || event.value?.is_cancelled || event.value?.is_past) {
    return
  }
  
  // Check registration deadline
  if (event.value?.registration_deadline) {
    const deadline = new Date(event.value.registration_deadline)
    const now = new Date()
    if (deadline < now) {
      alert('Registration deadline has passed')
      return
    }
  }
  
  if (event.value?.slug) {
    router.push(`/events/${event.value.slug}/register`)
  } else if (event.value?.id) {
    router.push(`/events/${event.value.id}/register`)
  }
}

const addToMeetingLink= () => {
  if (!event.value) return
  
  try {
   
    
    const googleCalendarUrl = `${ event.value.meeting_link}`
    
    window.open(googleCalendarUrl, '_blank')
  } catch (error) {
    console.error('Error creating calendar event:', error)
    alert('Unable to create calendar event')
  }
}

const addToCalendar = () => {
  if (!event.value) return
  
  try {
    const startDate = new Date(event.value.start_date)
    const endDate = event.value.end_date ? new Date(event.value.end_date) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
    
    const calendarEvent = {
      title: event.value.title,
      description: event.value.description || '',
      location: event.value.venue || (event.value.is_online ? 'Online' : ''),
      start: startDate.toISOString().replace(/-|:|\.\d+/g, ''),
      end: endDate.toISOString().replace(/-|:|\.\d+/g, '')
    }
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`
    
    window.open(googleCalendarUrl, '_blank')
  } catch (error) {
    console.error('Error creating calendar event:', error)
    alert('Unable to create calendar event')
  }
}

const shareEvent = async () => {
  const url = window.location.href
  const title = event.value?.title || 'Check out this event!'
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: event.value?.short_description || '',
        url: url
      })
    } catch (err) {
      console.log('Share cancelled:', err)
    }
  } else {
    try {
      await navigator.clipboard.writeText(url)
      alert('Event link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}

const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnTwitter = () => {
  const text = `Check out "${event.value?.title}" event`
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// Fetch event data
const fetchEvent = async () => {
  try {
    loading.value = true
    imageLoaded.value = false
    imageError.value = false
    
    console.log('Fetching event with slug:', slug)
    
    const response = await fetch(`http://localhost:8000/api/v1/events/${slug}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found')
      }
      throw new Error(`Failed to fetch event: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success && result.data) {
      event.value = result.data
      console.log('Event data loaded:', event.value)
      
      // Set SEO meta
      useSeoMeta({
        title: `${event.value.title} | Event Details`,
        description: event.value.short_description || event.value.description?.substring(0, 160) || 'Event details',
        ogTitle: event.value.title,
        ogDescription: event.value.short_description || event.value.description?.substring(0, 160) || 'Event details',
        ogImage: event.value.featured_image,
        ogUrl: window.location.href,
        twitterCard: 'summary_large_image'
      })
    } else {
      throw new Error(result.message || 'Event not found')
    }
  } catch (err) {
    console.error('Error fetching event:', err)
    error.value = err.message || 'An error occurred while loading the event'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchEvent()
})

// Watch for slug changes
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await fetchEvent()
  }
})
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
  margin-bottom: 1.5em;
  line-height: 1.8;
}

.prose-lg p {
  font-size: 1.125rem;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sticky sidebar */
.sticky {
  position: sticky;
}

/* Image loading animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-pulse {
  background: linear-gradient(90deg, #1f2937 0%, #374151 50%, #1f2937 100%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>