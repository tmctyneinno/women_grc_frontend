// stores/eventStore.js (Using Pinia)
import { defineStore } from 'pinia';
import EventService from '@/services/EventService';

// Helper function for time calculation
const calculateTimeRemaining = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - now;
    
    if (diffTime <= 0) return 'Starting soon';
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
        return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
        return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
        return 'Starting soon';
    }
};

export const useEventStore = defineStore('events', {
    state: () => ({
        events: [],
        featuredEvents: [],
        upcomingEvents: [],
        currentEvent: null,
        loading: false,
        error: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0
        }
    }),

    getters: {
        // Get event by ID
        getEventById: (state) => (id) => {
            return state.events.find(event => event.id === id) || state.currentEvent;
        },

        // Filter events by type
        getEventsByType: (state) => (type) => {
            return state.events.filter(event => event.type === type);
        },

        // Check if events are loading
        isLoading: (state) => state.loading,

        // Get formatted events with additional computed properties
        formattedEvents: (state) => {
            return state.events.map(event => ({
                ...event,
                // Format date
                formattedDate: new Date(event.start_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                // Time remaining
                timeRemaining: event.is_upcoming 
                    ? calculateTimeRemaining(event.start_date)
                    : null,
                // Short description
                excerpt: event.short_description 
                    ? event.short_description.substring(0, 120) + '...'
                    : (event.description ? event.description.substring(0, 120) + '...' : '')
            }));
        },

        // Get formatted featured events
        formattedFeaturedEvents: (state) => {
            return state.featuredEvents.map(event => ({
                ...event,
                formattedDate: new Date(event.start_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                timeRemaining: event.is_upcoming 
                    ? calculateTimeRemaining(event.start_date)
                    : null,
                excerpt: event.short_description 
                    ? event.short_description.substring(0, 100) + '...'
                    : (event.description ? event.description.substring(0, 100) + '...' : '')
            }));
        },

        // Get formatted upcoming events
        formattedUpcomingEvents: (state) => {
            return state.upcomingEvents.map(event => ({
                ...event,
                formattedDate: new Date(event.start_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                timeRemaining: event.is_upcoming 
                    ? calculateTimeRemaining(event.start_date)
                    : null,
                excerpt: event.short_description 
                    ? event.short_description.substring(0, 100) + '...'
                    : (event.description ? event.description.substring(0, 100) + '...' : '')
            }));
        }
    },

    actions: {
        // Fetch all events
        async fetchEvents(page = 1) {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await EventService.getEvents(page);
                
                if (response.success) {
                    this.events = response.data.data || response.data;
                    
                    // Handle pagination if available
                    if (response.data.current_page) {
                        this.pagination = {
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            per_page: response.data.per_page,
                            total: response.data.total
                        };
                    }
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error fetching events:', error);
            } finally {
                this.loading = false;
            }
        },

        // Fetch featured events
        async fetchFeaturedEvents() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await EventService.getFeaturedEvents();
                
                if (response.success) {
                    this.featuredEvents = response.data;
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error fetching featured events:', error);
            } finally {
                this.loading = false;
            }
        },

        // Fetch upcoming events
        async fetchUpcomingEvents() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await EventService.getUpcomingEvents();
                
                if (response.success) {
                    this.upcomingEvents = response.data;
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error fetching upcoming events:', error);
            } finally {
                this.loading = false;
            }
        },

        // Fetch single event
        async fetchEvent(identifier) {
            this.loading = true;
            this.error = null;
            
            try {
                // Check if it's a slug or ID
                const isSlug = isNaN(identifier);
                
                let response;
                if (isSlug) {
                    response = await EventService.getEventBySlug(identifier);
                } else {
                    response = await EventService.getEventById(identifier);
                }
                
                if (response.success) {
                    this.currentEvent = response.data;
                } else {
                    throw new Error('Event not found');
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error fetching event:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Search events
        async searchEvents(query, type = null) {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await EventService.searchEvents(query, type);
                
                if (response.success) {
                    this.events = response.data.data || response.data;
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error searching events:', error);
            } finally {
                this.loading = false;
            }
        },

        // Clear events
        clearEvents() {
            this.events = [];
            this.currentEvent = null;
        },

        // Clear error
        clearError() {
            this.error = null;
        }
    }
});