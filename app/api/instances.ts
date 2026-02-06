import axios from 'axios';
// @ts-ignore
import Cookies from 'js-cookie';

const hostURL = import.meta.env.VITE_API_URL || 'https://your-api-domain.com';
const apiURL = `${hostURL}/api/`;

// Create axios instances with better configuration
const createAxiosInstance = (contentType = 'application/json') => {
    const instance = axios.create({
        baseURL: apiURL,
        timeout: 30000, // 30 second timeout
        headers: {
            'Accept': 'application/json',
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            // Get token from cookie
            const token = Cookies.get('auth_token');
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            // Add CSRF token if available
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                config.headers['X-XSRF-TOKEN'] = csrfToken;
            }

            // Start loading indicator
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('loading-start'));
            }

            return config;
        },
        (error) => {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('loading-error'));
            }
            return Promise.reject(error);
        }
    );

    // Response interceptor
    instance.interceptors.response.use(
        (response) => {
            // Stop loading indicator
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('loading-stop'));
            }
            
            return response;
        },
        async (error) => {
            // Stop loading indicator
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('loading-error'));
            }

            // Handle specific error cases
            if (error.response) {
                const { status, data } = error.response;
                
                // Handle authentication errors
                if (status === 401) {
                    // Clear invalid token
                    Cookies.remove('auth_token');
                    
                    // Redirect to login if not already there
                    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
                        window.location.href = '/auth/login?session=expired';
                    }
                }
                
                // Handle validation errors
                if (status === 422) {
                    console.error('Validation error:', data.errors);
                }
                
                // Handle server errors
                if (status >= 500) {
                    console.error('Server error:', data);
                    
                    // Show user-friendly error message
                    if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('notification', {
                            detail: {
                                type: 'error',
                                message: 'Server error. Please try again later.'
                            }
                        }));
                    }
                }
            } else if (error.request) {
                // Network error
                console.error('Network error:', error.request);
                
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('notification', {
                        detail: {
                            type: 'error',
                            message: 'Network error. Please check your connection.'
                        }
                    }));
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

// Create different instances for different content types
export const $instance = createAxiosInstance('application/json');
const $instanceForm = createAxiosInstance('multipart/form-data');
const $instanceSilent = createAxiosInstance('application/json');

// Configure silent instance to not trigger loading indicators
$instanceSilent.interceptors.request.use((config) => {
    config.headers['X-Silent-Request'] = 'true';
    return config;
});

$instanceSilent.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

