import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';

// Log environment variables (masked for security)
console.log('AWS Credentials Check:');
console.log('REACT_APP_ACCESS_KEY_ID exists:', !!process.env.REACT_APP_ACCESS_KEY_ID);
console.log('REACT_APP_SECRET_ACCESS_KEY exists:', !!process.env.REACT_APP_SECRET_ACCESS_KEY);
console.log('REACT_APP_ACCESS_KEY_ID first 4 chars:', process.env.REACT_APP_ACCESS_KEY_ID?.substring(0, 4) + '...');
console.log('REACT_APP_SECRET_ACCESS_KEY first 4 chars:', process.env.REACT_APP_SECRET_ACCESS_KEY?.substring(0, 4) + '...');

const s3Client = new S3Client({
  region: 'us-east-2', // replace with your region
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || '',
  },
});

export interface ArtImage {
  Key: string;
  LastModified: Date;
  Size: number;
}

export const listArtImages = async (): Promise<ArtImage[]> => {
  console.log('Attempting to list images from S3...');
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'portfolio2025-assets',
      Prefix: 'art/',
    });

    console.log('Sending ListObjectsV2Command to S3...');
    const response = await s3Client.send(command);
    console.log('S3 Response received:', {
      hasContents: !!response.Contents,
      contentsLength: response.Contents?.length || 0,
      firstItem: response.Contents?.[0] ? {
        key: response.Contents[0].Key,
        size: response.Contents[0].Size,
        lastModified: response.Contents[0].LastModified
      } : null,
      rawResponse: JSON.stringify(response, null, 2)
    });

    const filteredImages = (response.Contents || [])
      .filter((item: _Object): item is _Object & { Key: string } => {
        const key = item.Key;
        console.log('Checking item:', { key, type: typeof key });
        return typeof key === 'string' && (key.endsWith('.jpg') || key.endsWith('.png'));
      })
      .map(item => ({
        Key: item.Key,
        LastModified: item.LastModified || new Date(),
        Size: item.Size || 0
      }));

    console.log('Filtered images:', {
      count: filteredImages.length,
      firstImage: filteredImages[0] ? {
        key: filteredImages[0].Key,
        size: filteredImages[0].Size
      } : null,
      allImages: filteredImages.map(img => img.Key)
    });

    return filteredImages;
  } catch (error) {
    console.error('Error listing S3 objects:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return [];
  }
};

export const getImageUrl = (key: string): string => {
  const url = `https://portfolio2025-assets.s3.amazonaws.com/${key}`;
  console.log('Generated image URL:', url);
  return url;
}; 