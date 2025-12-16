/**
 * Utility function to get the correct path for static assets
 * This ensures paths work correctly in both development and production
 * @param path - The path to the asset relative to the public folder (e.g., '/pictures/...')
 * @returns The path with PUBLIC_URL prefix if needed
 */
export const getAssetPath = (path: string): string => {
  // Get PUBLIC_URL (empty string in dev, base path in production)
  // In Create React App, PUBLIC_URL is available at runtime
  const publicUrl = (process.env as any).PUBLIC_URL || '';
  
  // Log for debugging in both dev and production
  console.log('getAssetPath:', { 
    originalPath: path, 
    publicUrl: publicUrl || '(empty)', 
    nodeEnv: process.env.NODE_ENV,
    finalPath: publicUrl ? `${publicUrl}${path}` : path 
  });
  
  // If PUBLIC_URL is empty, return the path as-is (it should start with /)
  // This matches how images work in the codebase
  if (!publicUrl) {
    return path;
  }
  
  // If PUBLIC_URL ends with /, don't add another /
  const separator = publicUrl.endsWith('/') ? '' : '/';
  // Remove leading slash from path to avoid double slashes when combining
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return the full path with PUBLIC_URL
  return `${publicUrl}${separator}${cleanPath}`;
};

