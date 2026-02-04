// utils/imageHelper.js
export const getImageUrl = (path) => {
  if (!path || path === 'null' || path === 'undefined') {
    return '/images/event-placeholder.jpg';
  }
  
  // Already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Check if it's a Laravel storage path
  if (path.startsWith('storage/')) {
    // Remove 'storage/' prefix as Laravel storage link will handle it
    const cleanPath = path.replace('storage/', '');
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${baseUrl}/storage/${cleanPath}`;
  }
  
  // If path starts with /storage, it's already a full path from API
  if (path.startsWith('/storage')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${baseUrl}${path}`;
  }
  
  // If it's a relative path without storage prefix
  if (path.includes('uploads/') || path.includes('images/')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}/storage/${cleanPath}`;
  }
  
  // Fallback
  return '/images/event-placeholder.jpg';
};