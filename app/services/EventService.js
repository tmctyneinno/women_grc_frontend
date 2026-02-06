// services/EventService.js
export class EventService {
  constructor() {
    // Use relative path in production, full URL in development
    if (process.client) {
      // Check if we're on production domain
      this.baseURL = window.location.protocol === 'https:' 
      ? 'https://api.wgrcfp.org/api/v1'
      : 'http://api.wgrcfp.org/api/v1';
      // this.baseURL = window.location.protocol === 'https:' 
      // ? 'http://127.0.0.1:8000/api/v1'
      // : 'http://127.0.0.1:8000/api/v1';
    } else {
      this.baseURL = '/api'; // For SSR
    }
    
    console.log('[EventService] Base URL:', this.baseURL);
  }

  async fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Server is not responding.');
      }
      
      throw error;
    }
  }

  async getEvents(page = 1, perPage = 10) {
    const url = `${this.baseURL}/events?page=${page}&per_page=${perPage}`;
    return this.fetchWithTimeout(url);
  }

  async getFeaturedEvents() {
    const url = `${this.baseURL}/events/featured`;
    return this.fetchWithTimeout(url);
  }

  async getUpcomingEvents() {
    const url = `${this.baseURL}/events/upcoming`;
    return this.fetchWithTimeout(url);
  }

  async getEvent(id) {
    const url = `${this.baseURL}/events/${id}`;
    return this.fetchWithTimeout(url);
  }

  async getEventBySlug(slug) {
    const url = `${this.baseURL}/events/${slug}`;
    return this.fetchWithTimeout(url);
  }

  async searchEvents(query, type = null) {
    let url = `${this.baseURL}/events?search=${encodeURIComponent(query)}`;
    if (type) url += `&type=${type}`;
    return this.fetchWithTimeout(url);
  }

  
}

const eventService = new EventService();
export default eventService;