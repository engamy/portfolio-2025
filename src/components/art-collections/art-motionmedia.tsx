import React from 'react';
import '../mainpages/art-style.css';
import './art-motionmedia.css';
import { usePageMode } from '../../hooks/usePageMode';

// Motion Media videos with YouTube links.
const motionMediaVideos = [
  {
    id: 1,
    thumbnail: 'https://img.youtube.com/vi/ikV4OLQfhk8/hqdefault.jpg',
    title: 'OMORI Animatic',
    description: '2D hand animation',
    youtubeUrl: 'https://www.youtube.com/watch?v=ikV4OLQfhk8',
    duration: '3:45',
    year: '2023'
  },
  {
    id: 2,
    thumbnail: 'https://img.youtube.com/vi/X5NznpkhB5A/hqdefault.jpg',
    title: 'Exquisite Dead Guy',
    description: 'After Effects 2D animation',
    youtubeUrl: 'https://www.youtube.com/watch?v=X5NznpkhB5A',
    duration: '2:18',
    year: '2023'
  },
  {
    id: 3,
    thumbnail: 'https://img.youtube.com/vi/I_G7qQ-iT64/hqdefault.jpg',
    title: 'SUM',
    description: 'Video editing',
    youtubeUrl: 'https://www.youtube.com/watch?v=I_G7qQ-iT64',
    duration: '1:52',
    year: '2023'
  },
  {
    id: 4,
    thumbnail: 'https://img.youtube.com/vi/b6PvTSXQrJs/hqdefault.jpg',
    title: 'eye contact',
    description: 'Video editing',
    youtubeUrl: 'https://www.youtube.com/watch?v=b6PvTSXQrJs',
    duration: '2:34',
    year: '2023'
  },
  {
    id: 5,
    thumbnail: 'https://img.youtube.com/vi/ZIpOcMtCdfc/hqdefault.jpg',
    title: 'therefore you and me animatic',
    description: '2D hand animation',
    youtubeUrl:
      'https://www.youtube.com/watch?v=ZIpOcMtCdfc&t=64s&pp=ygUZdGhlcmVmb3JlIHlvdSBhbmQgbWUgdGJoaw%3D%3D',
    duration: '4:12',
    year: '2023'
  }
];

export default function ArtMotionMedia() {
  // No hero to scroll past, so the page holds one nav mode throughout.
  usePageMode({ initial: true });

  return (
    <main className="art-container">
      <div className="art-assorted art-assorted--dark art-motion-works">
        <div className="art-page-head">
          <h1>Motion Media</h1>
        </div>

        <div className="motion-media-grid">
          {motionMediaVideos.map(video => (
            <div key={video.id} className="video-item">
              <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <div className="play-button">▶</div>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-info">
                  <h4>{video.title}</h4>
                  <p>{video.description}</p>
                  <span className="video-year">{video.year}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
