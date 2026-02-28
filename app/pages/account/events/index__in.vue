<template>
    <NuxtLayout name="account-layout">
        <div class="container py-4">
            <!-- Header Section -->
            <div class="container mx-auto px-4 py-8">
                
                <!-- Header Section -->
                <div class="mb-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-theme">
                                Events Dashboard
                            </h1>
                            <p class="text-gray-500 mt-1">Manage and explore all registered events</p>
                        </div>
                        
                        <!-- Search & Filter Bar -->
                        <div class="flex flex-col sm:flex-row gap-3">
                            <div class="relative">
                                <input 
                                    v-model="searchQuery"
                                    type="text" 
                                    placeholder="Search events..."
                                    class="w-full sm:w-64 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
                                />
                                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            <!-- View Toggle -->
                            <div class="flex bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <button 
                                    @click="viewMode = 'grid'"
                                    :class="[
                                        'px-4 py-3 transition-all duration-200',
                                        viewMode === 'grid' ? 'bg-theme text-white' : 'text-gray-500 hover:bg-gray-50'
                                    ]"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button 
                                    @click="viewMode = 'list'"
                                    :class="[
                                        'px-4 py-3 transition-all duration-200',
                                        viewMode === 'list' ? 'bg-theme text-white' : 'text-gray-500 hover:bg-gray-50'
                                    ]"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Total Events</p>
                                <p class="text-2xl font-bold text-gray-800">{{ filteredEvents.length }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Upcoming</p>
                                <p class="text-2xl font-bold text-gray-800">{{ upcomingCount }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Ongoing</p>
                                <p class="text-2xl font-bold text-gray-800">{{ ongoingCount }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Completed</p>
                                <p class="text-2xl font-bold text-gray-800">{{ completedCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Events List -->
                <div v-if="loading" class="flex items-center justify-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
                
                <div v-else-if="filteredEvents.length === 0" class="text-center py-20">
                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
                    <p class="text-gray-500">Try adjusting your search or filters</p>
                </div>
                
                <div v-else :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'">
                    <div 
                        v-for="event in filteredEvents" 
                        :key="event.id"
                        :class="[
                            'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group',
                            viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                        ]"
                    >
                        <!-- Event Image -->
                        <div :class="[
                            'relative overflow-hidden',
                            viewMode === 'list' ? 'md:w-72 h-48 md:h-auto' : 'h-48'
                        ]">
                            <img 
                                :src="event.featured_image || '/images/event-placeholder.jpg'" 
                                :alt="event.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <!-- Status Badge -->
                            <div class="absolute top-4 left-4">
                                <span :class="[
                                    'px-3 py-1 rounded-full text-xs font-semibold',
                                    event.status === 'upcoming' ? 'bg-green-500 text-white' :
                                    event.status === 'ongoing' ? 'bg-yellow-500 text-white' :
                                    'bg-gray-500 text-white'
                                ]">
                                    {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                                </span>
                            </div>
                            <!-- Type Badge -->
                            <div class="absolute top-4 right-4">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200">
                                    {{ event.type }}
                                </span>
                            </div>
                            <!-- Date Badge -->
                            <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                <div class="text-center">
                                    <div class="text-xl font-bold text-indigo-600">{{ formatDay(event.start_date) }}</div>
                                    <div class="text-xs text-gray-500 uppercase font-medium">{{ formatMonth(event.start_date) }}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Event Content -->
                        <div class="flex-1 p-6">
                            <div class="flex items-start justify-between gap-4 mb-3">
                                <h3 class="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                    {{ event.title }}
                                </h3>
                            </div>
                            
                            <p class="text-gray-500 text-sm mb-4 line-clamp-2">
                                {{ event.short_description || event.description }}
                            </p>
                            
                            <!-- Event Meta -->
                            <div class="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ formatTime(event.start_time) }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="truncate max-w-[150px]">{{ event.venue || 'Online' }}</span>
                                </div>
                            </div>
                            
                            <!-- Speakers Section -->
                            <div class="border-t border-gray-100 pt-4 mt-4">
                                <div class="flex items-center justify-between mb-3">
                                    <h4 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Speakers ({{ event.speakers?.length || 0 }})
                                    </h4>
                                    <button 
                                        v-if="event.speakers?.length > 4"
                                        @click="toggleExpand(event.id)"
                                        class="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        {{ expandedEvents.includes(event.id) ? 'Show Less' : 'View All' }}
                                    </button>
                                </div>
                                
                                <!-- Speakers Grid -->
                                <div :class="[
                                    'flex gap-3',
                                    viewMode === 'grid' ? 'flex-wrap' : 'flex-nowrap overflow-x-auto pb-2'
                                ]">
                                    <div 
                                        v-for="(speaker, idx) in getDisplaySpeakers(event)" 
                                        :key="speaker.id"
                                        class="flex items-center gap-3 bg-gray-50 rounded-xl p-2 pr-4 hover:bg-theme transition-colors cursor-pointer"
                                    >
                                        <img 
                                            :src="speaker.avatar || speaker.image_url || '/images/avatar-placeholder.jpg'"
                                            :alt="speaker.name"
                                            class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        <div class="min-w-0">
                                            <p class="text-sm font-semibold text-gray-800 truncate">{{ speaker.name }}</p>
                                            <p class="text-xs text-gray-500 truncate">{{ speaker.title }}</p>
                                        </div>
                                    </div>
                                    
                                    <div v-if="!event.speakers?.length" class="text-sm text-gray-400 italic">
                                        No speakers assigned yet
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                                <button class="flex-1 px-4 py-2.5 bg-theme text-white font-semibold rounded-xl hover:bg-theme transition-colors flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Details
                                </button>
                                <button class="px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div v-if="filteredEvents.length > 0" class="flex justify-center mt-8">
                    <div class="flex items-center gap-2">
                        <button 
                            :disabled="currentPage === 1"
                            @click="currentPage--"
                            class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        <div class="flex gap-1">
                            <button 
                                v-for="page in totalPages" 
                                :key="page"
                                @click="currentPage = page"
                                :class="[
                                    'w-10 h-10 rounded-lg font-medium transition-colors',
                                    currentPage === page 
                                        ? 'bg-theme text-white' 
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>
                        
                        <button 
                            :disabled="currentPage === totalPages"
                            @click="currentPage++"
                            class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
    middleware: 'account-route-middleware'
})

// State
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const loading = ref(false)
const expandedEvents = ref<number[]>([])



// Dummy data with speakers
const events = ref([
    {
        id: 1,
        title: 'Women in Leadership Summit 2024',
        slug: 'women-leadership-summit-2024',
        description: 'Join us for an inspiring summit featuring industry leaders discussing the future of women in leadership roles. Network with professionals and gain valuable insights.',
        short_description: 'Inspiring summit featuring industry leaders discussing the future of women in leadership.',
        featured_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        start_date: '2024-03-15',
        end_date: '2024-03-17',
        start_time: '09:00:00',
        end_time: '17:00:00',
        venue: 'Grand Convention Center',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        type: 'Conference',
        status: 'upcoming',
        capacity: 500,
        registered_count: 342,
        price: 299,
        currency: 'USD',
        is_featured: true,
        is_online: false,
        speakers: [
            { id: 1, name: 'Dr. Sarah Johnson', title: 'CEO, TechVision Inc', brief: 'Leading tech entrepreneur with 20+ years experience', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
            { id: 2, name: 'Maria Garcia', title: 'Founder, WomenRise', brief: 'Advocate for women empowerment', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
            { id: 3, name: 'Jennifer Williams', title: 'VP Operations, GlobalCorp', brief: 'Operations expert specializing in scaling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
            { id: 4, name: 'Emily Chen', title: 'Director, Innovation Lab', brief: 'Innovation and strategy consultant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
            { id: 5, name: 'Amanda Brown', title: 'Author & Speaker', brief: 'Bestselling author on leadership', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200' },
        ]
    },
    {
        id: 2,
        title: 'GRC Compliance Workshop',
        slug: 'grc-compliance-workshop',
        description: 'A comprehensive workshop on Governance, Risk, and Compliance practices for modern organizations.',
        short_description: 'Comprehensive workshop on GRC practices.',
        featured_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        start_date: '2024-02-20',
        end_date: '2024-02-21',
        start_time: '10:00:00',
        end_time: '16:00:00',
        venue: 'Virtual Event',
        address: '',
        city: '',
        state: '',
        country: '',
        type: 'Workshop',
        status: 'ongoing',
        capacity: 200,
        registered_count: 156,
        price: 149,
        currency: 'USD',
        is_featured: false,
        is_online: true,
        meeting_link: 'https://zoom.us/j/123456789',
        speakers: [
            { id: 6, name: 'Robert Miller', title: 'Chief Compliance Officer', brief: 'Expert in regulatory compliance', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
            { id: 7, name: 'Lisa Anderson', title: 'Risk Management Director', brief: 'Specializing in enterprise risk', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' },
            { id: 8, name: 'David Thompson', title: 'GRC Consultant', brief: '15 years in governance consulting', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
        ]
    },
    {
        id: 3,
        title: 'Annual Networking Gala',
        slug: 'annual-networking-gala-2024',
        description: 'Connect with professionals from various industries at our annual networking gala. Enjoy an evening of meaningful connections.',
        short_description: 'Connect with professionals at our annual networking gala.',
        featured_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        start_date: '2024-01-10',
        end_date: '2024-01-10',
        start_time: '18:00:00',
        end_time: '22:00:00',
        venue: 'The Grand Ballroom',
        address: '456 Luxury Lane',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        type: 'Networking',
        status: 'completed',
        capacity: 300,
        registered_count: 287,
        price: 75,
        currency: 'USD',
        is_featured: true,
        is_online: false,
        speakers: [
            { id: 9, name: 'Michelle Davis', title: 'Event Host', brief: 'Professional emcee and speaker', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200' },
            { id: 10, name: 'Kevin Wilson', title: 'MC', brief: 'Entertainment industry veteran', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200' },
        ]
    },
    {
        id: 4,
        title: 'Digital Transformation Forum',
        slug: 'digital-transformation-forum',
        description: 'Explore the latest trends in digital transformation and how they are reshaping business operations.',
        short_description: 'Explore latest trends in digital transformation.',
        featured_image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
        start_date: '2024-04-05',
        end_date: '2024-04-06',
        start_time: '09:30:00',
        end_time: '17:30:00',
        venue: 'Tech Hub Conference Center',
        address: '789 Innovation Blvd',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        type: 'Forum',
        status: 'upcoming',
        capacity: 400,
        registered_count: 198,
        price: 199,
        currency: 'USD',
        is_featured: true,
        is_online: false,
        speakers: [
            { id: 11, name: 'Alex Rivera', title: 'CTO, FutureTech', brief: 'Digital transformation leader', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200' },
            { id: 12, name: 'Sophia Martinez', title: 'Digital Strategist', brief: 'Expert in digital strategy', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
            { id: 13, name: 'James Lee', title: 'AI Researcher', brief: 'AI and machine learning expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
            { id: 14, name: 'Rachel Kim', title: 'Cloud Architect', brief: 'Cloud infrastructure specialist', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
        ]
    },
    {
        id: 5,
        title: 'Cybersecurity Awareness Training',
        slug: 'cybersecurity-awareness-training',
        description: 'Essential cybersecurity training for professionals. Learn to protect your organization from cyber threats.',
        short_description: 'Essential cybersecurity training for professionals.',
        featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        start_date: '2024-02-28',
        end_date: '2024-02-28',
        start_time: '14:00:00',
        end_time: '17:00:00',
        venue: 'Online Webinar',
        address: '',
        city: '',
        state: '',
        country: '',
        type: 'Training',
        status: 'upcoming',
        capacity: 150,
        registered_count: 89,
        price: 0,
        currency: 'USD',
        is_featured: false,
        is_online: true,
        speakers: [
            { id: 15, name: 'Chris Patterson', title: 'Security Analyst', brief: 'Cybersecurity expert', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200' },
            { id: 16, name: 'Nina Foster', title: 'Ethical Hacker', brief: 'Penetration testing specialist', avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200' },
        ]
    },
    {
        id: 6,
        title: 'Mentorship Program Kickoff',
        slug: 'mentorship-program-kickoff',
        description: 'Launch event for our annual mentorship program. Connect with mentors and mentees.',
        short_description: 'Launch event for our annual mentorship program.',
        featured_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        start_date: '2024-03-01',
        end_date: '2024-03-01',
        start_time: '11:00:00',
        end_time: '13:00:00',
        venue: 'Community Center',
        address: '100 Mentor Street',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        type: 'Meeting',
        status: 'upcoming',
        capacity: 100,
        registered_count: 67,
        price: 0,
        currency: 'USD',
        is_featured: false,
        is_online: false,
        speakers: [
            { id: 17, name: 'Patricia Moore', title: 'Program Director', brief: 'Running mentorship programs for 10+ years', avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200' },
        ]
    },
])

// Computed
const filteredEvents = computed(() => {
    let result = events.value
    
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query) ||
            event.venue?.toLowerCase().includes(query) ||
            event.type.toLowerCase().includes(query) ||
            event.speakers?.some((s: any) => s.name.toLowerCase().includes(query))
        )
    }
    
    return result
})

const upcomingCount = computed(() => events.value.filter(e => e.status === 'upcoming').length)
const ongoingCount = computed(() => events.value.filter(e => e.status === 'ongoing').length)
const completedCount = computed(() => events.value.filter(e => e.status === 'completed').length)
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / 6))

// Methods
const formatDay = (dateStr: string) => {
    if (!dateStr) return '--'
    const date = new Date(dateStr)
    return date.getDate().toString().padStart(2, '0')
}

const formatMonth = (dateStr: string) => {
    if (!dateStr) return '---'
    const date = new Date(dateStr)
    return date.toLocaleString('default', { month: 'short' }).toUpperCase()
}

const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
}

const getDisplaySpeakers = (event: any) => {
    const isExpanded = expandedEvents.value.includes(event.id)
    if (isExpanded || !event.speakers) return event.speakers || []
    return event.speakers.slice(0, 4)
}

const toggleExpand = (eventId: number) => {
    const index = expandedEvents.value.indexOf(eventId)
    if (index > -1) {
        expandedEvents.value.splice(index, 1)
    } else {
        expandedEvents.value.push(eventId)
    }
}

// Lifecycle
onMounted(() => {
    loading.value = true
    // Simulate API call
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar for speaker list in list view */
.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}
</style>
