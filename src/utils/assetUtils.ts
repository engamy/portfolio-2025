/**
 * Utility function to get the correct path for static assets
 * This ensures paths work correctly in both development and production
 * @param path - The path to the asset relative to the public folder (e.g., '/pictures/...')
 * @returns The path with PUBLIC_URL prefix if needed, or S3 URL if using S3 for videos
 */
export const getAssetPath = (path: string): string => {
  // Check if we should use S3 for videos (set REACT_APP_USE_S3_VIDEOS=true in .env)
  const useS3ForVideos = process.env.REACT_APP_USE_S3_VIDEOS === 'true';
  const s3BucketUrl = process.env.REACT_APP_S3_BUCKET_URL || 'https://portfolio2025-assets.s3.amazonaws.com';
  
  // If using S3 for videos and this is a video file
  if (useS3ForVideos && (path.endsWith('.mp4') || path.endsWith('.mov'))) {
    // Convert local path to S3 path
    // Example: '/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4'
    // Becomes: 'videos/03_CODE/minesweeper.mp4'
    
    // Extract the relevant part of the path
    let s3Path = path;
    
    // Remove '/pictures/portfolio-content_spring2026/' prefix
    if (s3Path.includes('/portfolio-content_spring2026/')) {
      s3Path = s3Path.split('/portfolio-content_spring2026/')[1];
    }
    
    // Add 'videos/' prefix
    s3Path = `videos/${s3Path}`;
    
    const s3Url = `${s3BucketUrl}/${s3Path}`;
    console.log('Using S3 URL for video:', { originalPath: path, s3Path, s3Url });
    return s3Url;
  }
  
  // Otherwise, use the standard public folder path logic
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

