// plugins/event-service.js
import eventService from '@/services/EventService';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    
    // Initialize the event service with runtime config
    eventService.initialize({
        baseURL: config.public.apiBaseUrl || 'http://localhost:8000/api/v1',
        // Add other config values as needed
    });
    
    // Make it available globally
    nuxtApp.provide('eventService', eventService);
});