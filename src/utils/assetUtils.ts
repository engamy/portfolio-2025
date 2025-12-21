/**
 * Utility function to get the correct path for static assets
 * This ensures paths work correctly in both development and production
 * @param path - The path to the asset relative to the public folder (e.g., '/pictures/...')
 * @returns S3 URL if using S3, or local path if not
 */
export const getAssetPath = (path: string): string => {
  // Check if we should use S3 for ALL assets
  // Default to true in production, or if REACT_APP_USE_S3_VIDEOS is explicitly set
  const envVarSet = process.env.REACT_APP_USE_S3_VIDEOS;
  const isProduction = process.env.NODE_ENV === 'production';
  const useS3ForAssets = envVarSet === 'true' || (isProduction && envVarSet !== 'false');
  const s3BucketUrl = process.env.REACT_APP_S3_BUCKET_URL || 'https://portfolio2025-assets.s3.amazonaws.com';
  
  // Log for debugging
  if (isProduction && !useS3ForAssets) {
    console.warn('getAssetPath: S3 is disabled in production. Set REACT_APP_USE_S3_VIDEOS=true to enable.');
  }
  
  // If using S3 for assets
  if (useS3ForAssets) {
    // Convert local path to S3 path
    // Example: '/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4'
    // Becomes: 'assets/portfolio-content_spring2026/03_CODE/minesweeper.mp4'
    
    // Remove leading '/pictures/' prefix
    let s3Path = path;
    if (s3Path.startsWith('/pictures/')) {
      s3Path = s3Path.replace('/pictures/', '');
    } else if (s3Path.startsWith('pictures/')) {
      s3Path = s3Path.replace('pictures/', '');
    }
    
    // Add 'assets/' prefix (matching the upload script structure)
    s3Path = `assets/${s3Path}`;
    
    const s3Url = `${s3BucketUrl}/${s3Path}`;
    console.log('Using S3 URL for asset:', { originalPath: path, s3Path, s3Url });
    return s3Url;
  }
  
  // Otherwise, use the standard public folder path logic
  // Get PUBLIC_URL (empty string in dev, base path in production)
  const publicUrl = (process.env as any).PUBLIC_URL || '';
  
  // If PUBLIC_URL is empty, return the path as-is (it should start with /)
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

