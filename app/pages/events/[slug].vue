<template>
  <nuxt-layout name="landing-layout">
    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-500 mb-4"></div>
        <p class="text-gray-600">Loading event details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div class="text-center max-w-md px-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.772-.833-2.544 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Event Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="$router.back()"
            class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            ← Go Back
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
    <div v-else-if="event" class="min-h-screen bg-white">
      <!-- Navigation -->
      <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <button 
              @click="$router.back()"
              class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Events
            </button>
            <div class="flex items-center gap-4">
              <button 
                @click="shareEvent"
                class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
          <!-- Event Image -->
          <div class="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
            <!-- Loading State -->
            <div v-if="!imageLoaded && !imageError" class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Error State -->
            <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div class="text-center p-8">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-500">Event image not available</p>
              </div>
            </div>

            <!-- Image -->
            <img 
              :src="eventImageUrl"
              :alt="event.title"
              class="w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-500"
              :class="{
                'opacity-0': !imageLoaded || imageError,
                'opacity-100': imageLoaded && !imageError
              }"
              @load="onImageLoad"
              @error="onImageError"
              crossorigin="anonymous"
            />

            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 border border-white/20">
                {{ formattedType }}
              </div>
              <div v-if="event.is_featured" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </div>
              <div v-if="event.is_online" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                Online Event
              </div>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <div :class="[
                'px-4 py-2 rounded-full text-sm font-semibold',
                statusClass
              ]">
                {{ formattedStatus }}
              </div>
            </div>
          </div>

          <!-- Main Content Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Main Content -->
            <div class="lg:col-span-2">
              <!-- Event Header -->
              <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
                
                <!-- Organizer -->
                <div v-if="event.organizer" class="flex items-center gap-3 mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden">
                      <img 
                        v-if="event.organizer.logo" 
                        :src="event.organizer.logo" 
                        :alt="event.organizer.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-white font-bold">
                        {{ event.organizer.name.charAt(0) }}
                      </div>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Hosted by</p>
                      <p class="font-semibold text-gray-800">{{ event.organizer.name }}</p>
                    </div>
                  </div>
                </div>

                <!-- Quick Info -->
                <div class="flex flex-wrap gap-4 mb-6">
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ formattedDate }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ event.venue }}</span>
                    <span v-if="event.city" class="text-gray-500">, {{ event.city }}</span>
                  </div>
                  <div v-if="event.capacity" class="flex items-center gap-2 text-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>{{ event.registered_count || 0 }}/{{ event.capacity }} spots</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4 mb-8">
                  <button 
                    v-if="!event.is_past && event.has_capacity"
                    @click="registerForEvent"
                    :disabled="isFullyBooked"
                    :class="[
                      'px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3',
                      isFullyBooked
                        ? 'bg-red-100 text-red-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ registerButtonText }}
                  </button>
                  
                  <button 
                    v-if="!isFullyBooked && !event.is_past"
                    @click="addToCalendar"
                    class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-3"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add to Calendar
                  </button>
                  
                  <button 
                    @click="toggleSaveEvent"
                    class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-purple-500 hover:text-purple-600 transition-colors flex items-center gap-3"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>

              <!-- About Section -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                <div class="prose max-w-none">
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
                </div>
              </div>

              <!-- Speakers Section -->
              <div v-if="event.speakers && event.speakers.length > 0" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Featured Speakers</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    v-for="speaker in event.speakers" 
                    :key="speaker.id"
                    class="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div class="flex items-start gap-4">
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
              </div>

              <!-- Agenda Section -->
              <div v-if="event.agenda && event.agenda.length > 0" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Event Agenda</h2>
                <div class="space-y-4">
                  <div 
                    v-for="(item, index) in event.agenda" 
                    :key="index"
                    class="p-6 bg-gray-50 rounded-xl"
                  >
                    <div class="flex gap-6">
                      <div class="flex-shrink-0 w-32">
                        <div class="text-sm font-semibold text-cyan-600">{{ formatTime(item.start_time) }}</div>
                        <div class="text-sm text-gray-500">to {{ formatTime(item.end_time) }}</div>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-800">{{ item.title }}</h4>
                        <p v-if="item.description" class="text-gray-600 mt-2">{{ item.description }}</p>
                        <div v-if="item.speaker" class="mt-3 text-sm text-gray-500">
                          <span class="font-medium">Speaker:</span> {{ item.speaker }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location Details -->
              <div v-if="!event.is_online && event.venue" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                <div class="bg-gray-50 rounded-xl p-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <svg class="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">{{ event.venue }}</h3>
                      <p v-if="event.address" class="text-gray-600 mt-2">{{ event.address }}</p>
                      <p v-if="event.city || event.country" class="text-gray-600 mt-1">
                        {{ [event.city, event.state, event.country].filter(Boolean).join(', ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Online Event Details -->
              <div v-if="event.is_online && event.meeting_link" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Online Event Details</h2>
                <div class="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">Virtual Event</h3>
                      <p class="text-gray-600 mt-2">This event will be hosted online. Join from anywhere!</p>
                      <a 
                        :href="event.meeting_link"
                        target="_blank"
                        class="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
            <div class="lg:col-span-1">
              <!-- Event Details Card -->
              <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm sticky top-24">
                <!-- Price -->
                <div class="mb-6">
                  <div class="text-3xl font-bold text-gray-900 mb-2">{{ eventPrice }}</div>
                  <div class="text-gray-600">Per person</div>
                </div>

                <!-- Registration Progress -->
                <div v-if="event.capacity && event.registered_count > 0" class="mb-6">
                  <div class="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Registration Progress</span>
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

                <!-- Event Details -->
                <div class="space-y-4 mb-6">
                  <div class="flex items-center justify-between py-3 border-b border-gray-100">
                    <span class="text-gray-600">Date & Time</span>
                    <span class="font-semibold text-gray-800 text-right">{{ formattedDateTime }}</span>
                  </div>
                  <div class="flex items-center justify-between py-3 border-b border-gray-100">
                    <span class="text-gray-600">Duration</span>
                    <span class="font-semibold text-gray-800">{{ eventDuration }}</span>
                  </div>
                  <div class="flex items-center justify-between py-3 border-b border-gray-100">
                    <span class="text-gray-600">Type</span>
                    <span class="font-semibold text-gray-800">{{ formattedType }}</span>
                  </div>
                  <div class="flex items-center justify-between py-3 border-b border-gray-100">
                    <span class="text-gray-600">Format</span>
                    <span class="font-semibold text-gray-800">{{ event.is_online ? 'Online' : 'In-Person' }}</span>
                  </div>
                </div>

                <!-- Share Buttons -->
                <div>
                  <h4 class="font-semibold text-gray-800 mb-4">Share this event</h4>
                  <div class="flex gap-3">
                    <button 
                      @click="shareOnFacebook"
                      class="flex-1 p-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors text-blue-700 flex flex-col items-center"
                    >
                      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span class="text-xs">Facebook</span>
                    </button>
                    <button 
                      @click="shareOnTwitter"
                      class="flex-1 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-500 flex flex-col items-center"
                    >
                      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span class="text-xs">Twitter</span>
                    </button>
                    <button 
                      @click="shareOnLinkedIn"
                      class="flex-1 p-3 rounded-lg bg-blue-200 hover:bg-blue-300 transition-colors text-blue-800 flex flex-col items-center"
                    >
                      <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span class="text-xs">LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Organizer Info -->
              <div v-if="event.organizer" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
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