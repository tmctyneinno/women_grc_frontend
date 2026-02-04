<!-- pages/events/[slug].vue -->
<template>
  <nuxt-layout name="landing-layout">
    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 border-t-cyan-500 mb-4"></div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Loading Event Details</h3>
        <p class="text-gray-600">Fetching the latest event information...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="fixed inset-0  z-50 flex items-center justify-center">
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
      <!-- Hero Section - Full width image with content overlay -->
      <section class="relative">
        <!-- Background image with gradient overlay -->
        <div class="absolute inset-0 z-0">
          <div class="relative h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
            <!-- Image Loading State -->
            <div v-if="!imageLoaded && !imageError" class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse"></div>
            
            <!-- Image Error State -->
            <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div class="text-center p-8">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm mb-6">
                  <svg class="w-10 h-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-white/70 text-lg">Featured image not available</p>
              </div>
            </div>
            
            <!-- Main Image -->
            <img 
              :src="eventImageUrl"
              :alt="event.title"
              class="w-full h-full object-cover transition-all duration-700"
              :class="{
                'opacity-0': !imageLoaded || imageError,
                'opacity-100': imageLoaded && !imageError,
                'scale-110': imageLoaded && !imageError
              }"
              @load="onImageLoad"
              @error="onImageError"
              crossorigin="anonymous"
              loading="eager"
            />
            
            <!-- Gradient Overlays -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-50"></div>
          </div>
        </div>

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
        <div class="relative z-10 pt-12 pb-24">
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
              <p v-if="event.short_description" class="text-xl text-white/90 mb-10 max-w-3xl leading-relaxed">
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
                    <p class="text-white/90">{{ formattedDateTime }}</p>
                    <p v-if="eventDuration" class="text-white/70 text-sm mt-1">Duration: {{ eventDuration }}</p>
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
                    <p class="text-white/90">{{ event.venue }}</p>
                    <p v-if="event.city || event.country" class="text-white/70 text-sm mt-1">
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
                    <p v-if="event.capacity" class="text-white/70 text-sm">
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
                  @click="registerForEvent"
                  :disabled="isFullyBooked"
                  :class="[
                    'group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1',
                    isFullyBooked
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-cyan-500/30'
                  ]"
                >
                  <span class="flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ registerButtonText }}
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

      <!-- Content Section -->
      <section class="relative -mt-20 z-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Main Content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- About Section -->
              <div class="bg-white rounded-3xl shadow-2xl p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">About This Event</h2>
                <div class="prose prose-lg max-w-none">
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
                </div>
              </div>

              <!-- Speakers Section -->
              <div v-if="event.speakers && event.speakers.length > 0" class="bg-white rounded-3xl shadow-2xl p-8">
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
              <div v-if="event.agenda && event.agenda.length > 0" class="bg-white rounded-3xl shadow-2xl p-8">
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
            </div>

            <!-- Right Column - Sidebar -->
            <div class="space-y-8">
              <!-- Event Status Card -->
              <div class="bg-white rounded-3xl shadow-2xl p-8 sticky top-8">
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
                    <span class="font-semibold text-gray-800 text-right">{{ formattedDateTime }}</span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Venue</span>
                    <span class="font-semibold text-gray-800 text-right">{{ event.venue }}</span>
                  </div>
                  <div class="flex items-center justify-between py-4 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Format</span>
                    <span class="font-semibold text-gray-800">{{ event.is_online ? 'Virtual' : 'In-Person' }}</span>
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
              </div>

              <!-- Organizer Info -->
              <div v-if="event.organizer" class="bg-white rounded-3xl shadow-2xl p-8">
                <h3 class="text-xl font-bold text-gray-800 mb-6">Organized By</h3>
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden ring-4 ring-white shadow-lg">
                      <img 
                        v-if="event.organizer.logo" 
                        :src="event.organizer.logo" 
                        :alt="event.organizer.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                        {{ event.organizer.name.charAt(0) }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800 text-lg">{{ event.organizer.name }}</h4>
                    <p v-if="event.organizer.description" class="text-gray-600 text-sm mt-1 line-clamp-2">
                      {{ event.organizer.description }}
                    </p>
                    <a 
                      v-if="event.organizer.website"
                      :href="event.organizer.website"
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
            <!-- You can add EventCard components here -->
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

const formattedMonth = computed(() => {
  if (!event.value?.start_date) return '---'
  try {
    const date = new Date(event.value.start_date)
    return date.toLocaleString('default', { month: 'short' }).toUpperCase()
  } catch {
    return '---'
  }
})

const formattedDateTime = computed(() => {
  if (!event.value?.start_date) return ''
  
  const startDate = new Date(event.value.start_date)
  const endDate = event.value.end_date ? new Date(event.value.end_date) : null
  
  const timeOptions = { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }
  
  const timeStr = startDate.toLocaleTimeString('en-US', timeOptions)
  
  if (endDate) {
    const endTimeStr = endDate.toLocaleTimeString('en-US', timeOptions)
    return `${startDate.toLocaleDateString()} • ${timeStr} - ${endTimeStr}`
  }
  
  return `${startDate.toLocaleDateString()} • ${timeStr}`
})

const eventDuration = computed(() => {
  if (!event.value?.start_date || !event.value?.end_date) return ''
  
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
})

const formattedStatus = computed(() => {
  if (event.value?.is_upcoming) return 'Upcoming'
  if (event.value?.is_ongoing) return 'Live Now'
  if (event.value?.is_past) return 'Completed'
  return 'Scheduled'
})

const statusClass = computed(() => {
  if (event.value?.is_upcoming) return 'bg-green-100 text-green-800 border border-green-200'
  if (event.value?.is_ongoing) return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
  if (event.value?.is_past) return 'bg-red-100 text-red-800 border border-red-200'
  return 'bg-gray-100 text-gray-800 border border-gray-200'
})

const eventPrice = computed(() => {
  if (!event.value?.price || event.value.price === 0) return 'Free'
  return `$${event.value.price.toFixed(2)}`
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
  if (isFullyBooked.value) return 'Sold Out'
  if (event.value?.is_past) return 'Event Ended'
  if (!event.value?.has_capacity) return 'Register Now'
  return 'Register Now'
})

// Helper methods
const formatTime = (timeString) => {
  if (!timeString) return ''
  const date = new Date(`2000-01-01T${timeString}`)
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
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
  if (isFullyBooked.value || event.value?.is_past || !event.value?.has_capacity) {
    return
  }
  
  if (event.value?.slug) {
    router.push(`/events/${event.value.slug}/register`)
  } else {
    router.push(`/events/${event.value?.id}/register`)
  }
}

const addToCalendar = () => {
  if (!event.value) return
  
  const startDate = new Date(event.value.start_date)
  const endDate = event.value.end_date ? new Date(event.value.end_date) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
  
  const calendarEvent = {
    title: event.value.title,
    description: event.value.description,
    location: event.value.venue,
    start: startDate.toISOString().replace(/-|:|\.\d+/g, ''),
    end: endDate.toISOString().replace(/-|:|\.\d+/g, '')
  }
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`
  
  window.open(googleCalendarUrl, '_blank')
}

const shareEvent = () => {
  const url = window.location.href
  const title = event.value?.title || 'Check out this event!'
  
  if (navigator.share) {
    navigator.share({
      title: title,
      text: event.value?.short_description || '',
      url: url
    })
  } else {
    navigator.clipboard.writeText(url)
    alert('Event link copied to clipboard!')
  }
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      event.value = result.data
      console.log('Event data loaded:', event.value)
      
      useHead({
        title: `${event.value.title} | Event Details`
      })
    } else {
      throw new Error(result.message || 'Event not found')
    }
  } catch (err) {
    console.error('Error fetching event:', err)
    error.value = err.message
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
/* Custom styles for better UX */
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

/* Scrollbar styling for agenda */
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