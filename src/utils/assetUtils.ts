/**
 * Utility function to get the correct path for static assets
 * This ensures paths work correctly in both development and production
 * @param path - The path to the asset relative to the public folder (e.g., '/pictures/...')
 * @returns The path with PUBLIC_URL prefix if needed
 */
export const getAssetPath = (path: string): string => {
  // Get PUBLIC_URL (empty string in dev, base path in production)
  const publicUrl = process.env.PUBLIC_URL || '';
  
  // If PUBLIC_URL is empty, return the path as-is (it should start with /)
  if (!publicUrl) {
    return path;
  }
  
  // Remove leading slash from path to avoid double slashes when combining
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return the full path with PUBLIC_URL
  return `${publicUrl}/${cleanPath}`;
};

