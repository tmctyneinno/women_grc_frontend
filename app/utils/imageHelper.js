export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  
  // If it's already a full URL
  if (path.startsWith('http')) return path;
  
  // If it's a relative path, prepend your API URL
  const baseUrl = process.env.API_URL || 'http://localhost:8000';
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${baseUrl}/storage/${cleanPath}`;
};