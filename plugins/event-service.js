// services/EventService.js
export class EventService {
  constructor() {
    this.baseURL = 'http://api.wgrcfp.org/api/v1';
  }

  setBaseURL(url) {
    if (url) {
      this.baseURL = url;
      console.log(`[EventService] Base URL set to: ${url}`);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      console.log(`[EventService] Request: ${options.method || 'GET'} ${url}`);
      
      const response = await $fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        },
        retry: 0, // Disable retry for debugging
      });
      
      console.log(`[EventService] Response from ${endpoint}: Success`);
      return response;
      
    } catch (error) {
      console.error(`[EventService] Error from ${endpoint}:`, {
        message: error.message,
        status: error.status,
        statusCode: error.statusCode,
        data: error.data
      });
      
      if (error.statusCode === 404) {
        throw new Error('Resource not found');
      } else if (error.statusCode >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (!navigator.onLine) {
        throw new Error('No internet connection');
      } else {
        throw new Error(error.message || 'Failed to fetch data');
      }
    }
  }

  async getEvents(page = 1, perPage = 10) {
    return this.request('/events', {
      params: { page, per_page: perPage }
    });
  }

  async getFeaturedEvents() {
    return this.request('/events/featured');
  }

  async getUpcomingEvents() {
    return this.request('/events/upcoming');
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async getEventBySlug(slug) {
    return this.request(`/events/slug/${slug}`);
  }

  async searchEvents(query, type = null) {
    const params = { search: query };
    if (type) params.type = type;
    
    return this.request('/events', { params });
  }
}

// Create singleton instance
const eventService = new EventService();
export default eventService;