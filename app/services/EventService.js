// plugins/event.service.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  // Get runtime config
  const config = useRuntimeConfig();
  
  // Base URL from config
  const baseURL = config.public.apiUrl || 'http://localhost:8000/api/v1';
  
  // Create axios instance with better defaults
  const api = axios.create({
    baseURL,
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 15000, // 15 second timeout
    withCredentials: false,
    validateStatus: function (status) {
      return status >= 200 && status < 500; // Resolve only if status code < 500
    }
  });

  // Add request interceptor for logging (dev only)
  if (process.dev) {
    api.interceptors.request.use(
      (config) => {
        console.log(`🔄 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Add response interceptor for error handling
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (process.dev) {
        console.error('❌ API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message
        });
      }
      return Promise.reject(error);
    }
  );

  // Event Service implementation
  const eventService = {
    // Public properties
    baseURL,
    config,
    
    /**
     * Get all published events with pagination
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise}
     */
    async getEvents(page = 1, perPage = 10) {
      try {
        const response = await api.get('/events', {
          params: { 
            page, 
            per_page: perPage 
          }
        });
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Get featured events
     * @returns {Promise}
     */
    async getFeaturedEvents() {
      try {
        const response = await api.get('/events/featured');
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Get upcoming events
     * @returns {Promise}
     */
    async getUpcomingEvents() {
      try {
        const response = await api.get('/events/upcoming');
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Get single event by ID
     * @param {number|string} id - Event ID
     * @returns {Promise}
     */
    async getEvent(id) {
      try {
        const response = await api.get(`/events/${id}`);
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Get single event by slug
     * @param {string} slug - Event slug
     * @returns {Promise}
     */
    async getEventBySlug(slug) {
      try {
        const response = await api.get(`/events/slug/${slug}`);
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Search events
     * @param {string} query - Search term
     * @param {string|null} type - Event type filter
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise}
     */
    async searchEvents(query, type = null, page = 1, perPage = 10) {
      try {
        const params = { 
          search: query,
          page,
          per_page: perPage
        };
        
        if (type) params.type = type;
        
        const response = await api.get('/events', { params });
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Get events by category
     * @param {string} category - Category slug
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise}
     */
    async getEventsByCategory(category, page = 1, perPage = 10) {
      try {
        const response = await api.get(`/events/category/${category}`, {
          params: { page, per_page: perPage }
        });
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Register for an event
     * @param {number|string} eventId - Event ID
     * @param {Object} data - Registration data
     * @returns {Promise}
     */
    async registerForEvent(eventId, data) {
      try {
        const response = await api.post(`/events/${eventId}/register`, data);
        return response.data;
      } catch (error) {
        return this.handleError(error);
      }
    },

    /**
     * Test API connection
     * @returns {Promise}
     */
    async testConnection() {
      try {
        const response = await api.get('/health', { timeout: 5000 });
        return {
          success: true,
          status: response.status,
          data: response.data
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          status: error.response?.status,
          baseURL: this.baseURL
        };
      }
    },

    /**
     * Handle API errors
     * @param {Error} error - Axios error
     */
    handleError(error) {
      // Custom error handling
      const errorInfo = {
        message: 'An error occurred',
        status: null,
        data: null
      };

      if (error.response) {
        // Server responded with error
        errorInfo.status = error.response.status;
        errorInfo.data = error.response.data;
        errorInfo.message = error.response.data?.message || 
                           error.response.data?.error || 
                           `Server error: ${error.response.status}`;
      } else if (error.request) {
        // No response received
        errorInfo.message = 'No response from server. Check your connection.';
      } else {
        // Request setup error
        errorInfo.message = error.message || 'Request configuration error';
      }

      // Log error in development
      if (process.dev) {
        console.error('EventService Error:', errorInfo);
      }

      // Throw formatted error
      throw {
        ...errorInfo,
        originalError: error,
        isApiError: true,
        timestamp: new Date().toISOString()
      };
    }
  };

  // Provide the service to the app
  return {
    provide: {
      eventService
    }
  };
});