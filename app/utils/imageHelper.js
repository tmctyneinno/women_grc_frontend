export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8000';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use the storage link URL
  return `${baseUrl}/storage/${cleanPath}`;
};