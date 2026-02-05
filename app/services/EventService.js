// services/EventService.js
import axios from 'axios';

class EventService {
    constructor() {
        // Initialize with null - will be set in setup
        this.api = null;
    }

    // Initialize the service with runtime config
    initialize(config) {
        this.baseURL = config.baseURL || 'http://localhost:8000/api/v1';
        
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add any authentication headers if needed
                // 'Authorization': `Bearer ${config.token}`
            },
            // Add timeout to prevent hanging requests
            timeout: 10000,
            // Add withCredentials if using cookies/sessions
            // withCredentials: true
        });

        // Add request interceptor for logging/debugging
        this.api.interceptors.request.use(
            config => {
                console.log('API Request:', config.method.toUpperCase(), config.url);
                return config;
            },
            error => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor for better error handling
        this.api.interceptors.response.use(
            response => response,
            error => {
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    // Set base URL dynamically
    setBaseURL(url) {
        if (this.api) {
            this.baseURL = url;
            this.api.defaults.baseURL = url;
        }
    }

    async getEvents(page = 1, perPage = 10) {
        try {
            const response = await this.api.get('/events', {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            throw error; // Re-throw after interceptors handle it
        }
    }

    async getFeaturedEvents() {
        try {
            const response = await this.api.get('/events/featured');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUpcomingEvents() {
        try {
            const response = await this.api.get('/events/upcoming');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getEvent(id) {
        try {
            const response = await this.api.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getEventBySlug(slug) {
        try {
            const response = await this.api.get(`/events/slug/${slug}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async searchEvents(query, type = null) {
        try {
            const params = { search: query };
            if (type) params.type = type;
            
            const response = await this.api.get('/events', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    handleError(error) {
        console.error('API Error Details:', {
            message: error.message,
            code: error.code,
            config: error.config?.url
        });

        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            const message = data.message || `Request failed with status ${status}`;
            console.error('Server Error Response:', { status, data });
            throw new Error(message);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No Response Error:', {
                url: error.config?.url,
                baseURL: error.config?.baseURL
            });
            throw new Error(`Cannot connect to server. Please check if the API is running at ${this.baseURL}`);
        } else {
            // Something else happened
            console.error('Request Setup Error:', error.message);
            throw new Error(`Request error: ${error.message}`);
        }
    }
}

// Create singleton instance
const eventService = new EventService();
export default eventService;