import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';

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
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'portfolio2025-assets',
      Prefix: 'art/',
    });

    const response = await s3Client.send(command);

    const filteredImages = (response.Contents || [])
      .filter((item: _Object): item is _Object & { Key: string } => {
        const key = item.Key;
        return typeof key === 'string' && (key.endsWith('.jpg') || key.endsWith('.png'));
      })
      .map(item => ({
        Key: item.Key,
        LastModified: item.LastModified || new Date(),
        Size: item.Size || 0
      }));

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
  return url;
}; 