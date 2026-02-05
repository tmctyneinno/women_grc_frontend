// services/EventService.js
import { ofetch } from 'ofetch';

export class EventService {
  constructor() {
    this.baseURL = 'http://api.wgrcfp.org/api/v1';
    
    // Create a fetch instance with defaults
    this.$fetch = ofetch.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      retry: 0,
      onRequest({ request, options }) {
        console.log(`[EventService] ${options.method || 'GET'} ${request}`);
      },
      onResponseError({ request, response, options }) {
        console.error(`[EventService] Error:`, {
          url: request,
          status: response?.status,
          statusText: response?.statusText
        });
      }
    });
  }

  setBaseURL(url) {
    if (url) {
      this.baseURL = url;
      this.$fetch = ofetch.create({
        baseURL: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        retry: 0
      });
      console.log(`[EventService] Base URL updated to: ${url}`);
    }
  }

  async getEvents(page = 1, perPage = 10) {
    return this.$fetch('/events', {
      params: { page, per_page: perPage }
    });
  }

  async getFeaturedEvents() {
    return this.$fetch('/events/featured');
  }

  async getUpcomingEvents() {
    return this.$fetch('/events/upcoming');
  }

  async getEvent(id) {
    return this.$fetch(`/events/${id}`);
  }

  async getEventBySlug(slug) {
    return this.$fetch(`/events/${slug}`);
  }

  async searchEvents(query, type = null) {
    const params = { search: query };
    if (type) params.type = type;
    
    return this.$fetch('/events', { params });
  }
}

const eventService = new EventService();
export default eventService;