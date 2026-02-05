// services/EventService.js
import axios from 'axios';

class EventService {
    constructor() {
        // Get config from environment or use defaults
        this.baseURL = process.env.API_BASE_URL || 'http://localhost:8000/api/v1';
        
        // Initialize axios instance immediately
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            timeout: 10000,
        });

        this.setupInterceptors();
    }

    // Alternative constructor for Nuxt runtime config
    static createWithConfig(config) {
        const instance = new EventService();
        if (config?.baseURL) {
            instance.setBaseURL(config.baseURL);
        }
        return instance;
    }

    setupInterceptors() {
        // Request interceptor
        this.api.interceptors.request.use(
            config => {
                if (process.client) {
                    console.log('API Request:', config.method?.toUpperCase(), config.url);
                }
                return config;
            },
            error => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            response => response,
            error => {
                return Promise.reject(this.handleError(error));
            }
        );
    }

    setBaseURL(url) {
        this.baseURL = url;
        this.api.defaults.baseURL = url;
        console.log('EventService baseURL set to:', url);
    }

    async getEvents(page = 1, perPage = 10) {
        const response = await this.api.get('/events', {
            params: { page, per_page: perPage }
        });
        return response.data;
    }

    async getFeaturedEvents() {
        const response = await this.api.get('/events/featured');
        return response.data;
    }

    async getUpcomingEvents() {
        const response = await this.api.get('/events/upcoming');
        return response.data;
    }

    async getEvent(id) {
        const response = await this.api.get(`/events/${id}`);
        return response.data;
    }

    async getEventBySlug(slug) {
        const response = await this.api.get(`/events/slug/${slug}`);
        return response.data;
    }

    async searchEvents(query, type = null) {
        const params = { search: query };
        if (type) params.type = type;
        
        const response = await this.api.get('/events', { params });
        return response.data;
    }

    handleError(error) {
        // Don't log on server-side during SSR
        if (process.server) {
            return error;
        }

        console.error('API Error:', {
            message: error.message,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            status: error.response?.status
        });

        if (error.response) {
            const { status, data } = error.response;
            const message = data?.message || data?.error || `Request failed with status ${status}`;
            return new Error(message);
        } else if (error.request) {
            return new Error(`Cannot connect to server. Please check your connection and ensure the API is running.`);
        } else if (error.code === 'ECONNABORTED') {
            return new Error('Request timeout. Please try again.');
        } else {
            return new Error(`Request error: ${error.message}`);
        }
    }
}

// Create and export singleton instance
const eventService = new EventService();
export default eventService;