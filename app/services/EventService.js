// services/EventService.js
import axios from 'axios';

class EventService {
    constructor() {
        // Base URL - change this to your actual API URL
        this.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/api/v1';
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Get all published events with pagination
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise}
     */
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

    /**
     * Get featured events
     * @returns {Promise}
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
     * @returns {Promise}
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
     * @param {number|string} id - Event ID
     * @returns {Promise}
     */
    async getEvent(id) {
        try {
            const response = await this.api.get(`/events/slug/${slug}`);
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

    /**
     * Search events
     * @param {string} query - Search term
     * @param {string} type - Event type filter
     * @returns {Promise}
     */
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

    /**
     * Handle API errors
     * @param {Error} error - Axios error
     */
    handleError(error) {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            const message = data.message || `Request failed with status ${status}`;
            throw new Error(message);
        } else if (error.request) {
            // Request made but no response
            throw new Error('No response received from server. Please check your connection.');
        } else {
            // Something else happened
            throw new Error(error.message);
        }
    }
}

// Create singleton instance
export default new EventService();