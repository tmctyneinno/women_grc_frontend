// composables/useEventService.js
import axios from 'axios';

export const useEventService = () => {
  const config = useRuntimeConfig();
  
  const baseURL = config.public.apiUrl || 'http://localhost:8000/api/v1';
  
  const api = axios.create({
    baseURL,
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const getEvents = async (page = 1, perPage = 10) => {
    try {
      const response = await api.get('/events', {
        params: { page, per_page: perPage }
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getFeaturedEvents = async () => {
    try {
      const response = await api.get('/events/featured');
      return response.data; 
    } catch (error) {
      handleError(error);
    }
  };

  const getUpcomingEvents = async () => {
    try {
      const response = await api.get('/events/upcoming');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getEventBySlug = async (slug) => {
    try {
      const response = await api.get(`/events/slug/${slug}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const searchEvents = async (query, type = null) => {
    try {
      const params = { search: query };
      if (type) params.type = type;
      
      const response = await api.get('/events', { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || `Request failed with status ${status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your connection.');
    } else {
      throw new Error(error.message);
    }
  };

  return {
    getEvents,
    getFeaturedEvents,
    getUpcomingEvents,
    getEventBySlug,
    searchEvents
  };
};