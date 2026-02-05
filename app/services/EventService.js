// services/EventService.js
import axios from 'axios';

class EventService {
    constructor() {
        // FIX: Use Nuxt runtime config instead of process.env
        // We'll make this configurable
        this.baseURL = 'http://api.wgrcfp.org/api/v1'; // Default for now
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    // Set base URL dynamically (call this after getting config)
    setBaseURL(url) {
        this.baseURL = url;
        this.api.defaults.baseURL = url;
    }

    async getEvents(page = 1, perPage = 10) {
        try {
            const response = await this.api.get('/events', {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getFeaturedEvents() {
        try {
            const response = await this.api.get('/events/featured');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUpcomingEvents() {
        try {
            const response = await this.api.get('/events/upcoming');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getEvent(id) {
        try {
            const response = await this.api.get(`/events/slug/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getEventBySlug(slug) {
        try {
            const response = await this.api.get(`/events/slug/${slug}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async searchEvents(query, type = null) {
        try {
            const params = { search: query };
            if (type) params.type = type;
            
            const response = await this.api.get('/events', { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            const { status, data } = error.response;
            const message = data.message || `Request failed with status ${status}`;
            throw new Error(message);
        } else if (error.request) {
            throw new Error('No response received from server. Please check your connection.');
        } else {
            throw new Error(error.message);
        }
    }
}

// Create singleton instance
export default new EventService();