export const formatImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  
  // Check different possible path formats
  if (path.includes('storage/')) {
    return `${apiUrl}/${path}`;
  }
  
  if (path.includes('events/featured/')) {
    return `${apiUrl}/storage/${path}`;
  }
  
  return path;
};