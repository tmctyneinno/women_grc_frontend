// composables/useEventService.js
import axios from 'axios';

export const useEventService = () => {
  const config = useRuntimeConfig();
  
  // Base URL from Nuxt runtime config
  const baseURL = config.public.apiUrl || 'http://localhost:8000/api/v1';
  
  // Create axios instance
  const api = axios.create({
    baseURL,
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 10000, // 10 second timeout
    withCredentials: false // Set to true if using cookies/sessions
  });

  // Error handler
  const handleError = (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const message = data?.message || data?.error || `Request failed with status ${status}`;
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error);
      throw new Error('No response received from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  };

  /**
   * Get all published events with pagination
   * @param {number} page - Page number
   * @param {number} perPage - Items per page
   * @returns {Promise<Array>}
   */
  const getEvents = async (page = 1, perPage = 10) => {
    try {
      const response = await api.get('/events', {
        params: { 
          page, 
          per_page: perPage 
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Get featured events
   * @returns {Promise<Array>}
   */
  const getFeaturedEvents = async () => {
    try {
      const response = await api.get('/events/featured');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Get upcoming events
   * @returns {Promise<Array>}
   */
  const getUpcomingEvents = async () => {
    try {
      const response = await api.get('/events/upcoming');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Get single event by ID
   * @param {number|string} id - Event ID
   * @returns {Promise<Object>}
   */
  const getEvent = async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Get single event by slug
   * @param {string} slug - Event slug
   * @returns {Promise<Object>}
   */
  const getEventBySlug = async (slug) => {
    try {
      const response = await api.get(`/events/slug/${slug}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Search events
   * @param {string} query - Search term
   * @param {string|null} type - Event type filter
   * @param {number} page - Page number
   * @param {number} perPage - Items per page
   * @returns {Promise<Object>}
   */
  const searchEvents = async (query, type = null, page = 1, perPage = 10) => {
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
      return handleError(error);
    }
  };

  /**
   * Get events by category
   * @param {string} category - Category slug or ID
   * @param {number} page - Page number
   * @param {number} perPage - Items per page
   * @returns {Promise<Array>}
   */
  const getEventsByCategory = async (category, page = 1, perPage = 10) => {
    try {
      const response = await api.get('/events/category', {
        params: { 
          category,
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Get event categories
   * @returns {Promise<Array>}
   */
  const getEventCategories = async () => {
    try {
      const response = await api.get('/events/categories');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  /**
   * Register for an event
   * @param {number|string} eventId - Event ID
   * @param {Object} registrationData - Registration form data
   * @returns {Promise<Object>}
   */
  const registerForEvent = async (eventId, registrationData) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, registrationData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    // Base URL for debugging
    baseURL,
    
    // Core methods
    getEvents,
    getFeaturedEvents,
    getUpcomingEvents,
    getEvent,
    getEventBySlug,
    searchEvents,
    getEventsByCategory,
    getEventCategories,
    registerForEvent,
    
    // Helper method to test connection
    testConnection: async () => {
      try {
        const response = await api.get('/health');
        return { success: true, data: response.data };
      } catch (error) {
        return { 
          success: false, 
          error: error.message,
          baseURL 
        };
      }
    }
  };
};