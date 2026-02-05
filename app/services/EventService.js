// utils/EventService.js
import axios from 'axios';

export class EventService {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:8000/api/v1';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });
    
    // Optional: Add interceptors
    this.setupInterceptors();
  }
  
  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific error cases
        if (error.response?.status === 401) {
          // Handle unauthorized
          console.error('Unauthorized access');
        }
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Get all published events with pagination
   */
  async getEvents(page = 1, perPage = 10) {
    try {
      const response = await this.api.get('/events', {
        params: { 
          page, 
          per_page: perPage 
        }
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Get featured events
   */
  async getFeaturedEvents() {
    try {
      const response = await this.api.get('/events/featured');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Get upcoming events
   */
  async getUpcomingEvents() {
    try {
      const response = await this.api.get('/events/upcoming');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Get single event by ID
   */
  async getEvent(id) {
    try {
      const response = await this.api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Get single event by slug
   */
  async getEventBySlug(slug) {
    try {
      const response = await this.api.get(`/events/slug/${slug}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Search events
   */
  async searchEvents(query, type = null, page = 1, perPage = 10) {
    try {
      const params = { 
        search: query,
        page,
        per_page: perPage
      };
      
      if (type) params.type = type;
      
      const response = await this.api.get('/events', { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Register for event
   */
  async registerForEvent(eventId, data) {
    try {
      const response = await this.api.post(`/events/${eventId}/register`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  /**
   * Test API connection
   */
  async testConnection() {
    try {
      const response = await this.api.get('/health');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Handle errors
   */
  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || `Request failed with status ${status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your connection.');
    } else {
      throw new Error(error.message);
    }
  }
}