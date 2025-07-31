import React from 'react';
import '../mainpages/art-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';

export default function ArtMotionMedia() {
  // Set darkMode to true for the art collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.art-motion-works');

  // Motion Media videos with YouTube links
  const motionMediaVideos = [
    {
      id: 1,
      thumbnail: 'https://img.youtube.com/vi/ikV4OLQfhk8/hqdefault.jpg',
      title: 'OMORI Animatic',
      description: 'Animated storyboard and character development for OMORI fan content',
      youtubeUrl: 'https://www.youtube.com/watch?v=ikV4OLQfhk8',
      duration: '3:45',
      year: '2023'
    },
    {
      id: 2,
      thumbnail: 'https://img.youtube.com/vi/X5NznpkhB5A/hqdefault.jpg',
      title: 'Exquisite Dead Guy',
      description: 'Character animation exploring themes of mortality and beauty',
      youtubeUrl: 'https://www.youtube.com/watch?v=X5NznpkhB5A',
      duration: '2:18',
      year: '2023'
    },
    {
      id: 3,
      thumbnail: 'https://img.youtube.com/vi/I_G7qQ-iT64/hqdefault.jpg',
      title: 'SUM',
      description: 'Abstract animation piece exploring mathematical and visual concepts',
      youtubeUrl: 'https://www.youtube.com/watch?v=I_G7qQ-iT64',
      duration: '1:52',
      year: '2023'
    },
    {
      id: 4,
      thumbnail: 'https://img.youtube.com/vi/b6PvTSXQrJs/hqdefault.jpg',
      title: 'eye contact',
      description: 'Intimate character animation focusing on emotional connection',
      youtubeUrl: 'https://www.youtube.com/watch?v=b6PvTSXQrJs',
      duration: '2:34',
      year: '2023'
    },
    {
      id: 5,
      thumbnail: 'https://img.youtube.com/vi/ZIpOcMtCdfc/hqdefault.jpg',
      title: 'therefore you and me animatic',
      description: 'Storyboard animation exploring themes of connection and relationship',
      youtubeUrl: 'https://www.youtube.com/watch?v=ZIpOcMtCdfc&t=64s&pp=ygUZdGhlcmVmb3JlIHlvdSBhbmQgbWUgdGJoaw%3D%3D',
      duration: '4:12',
      year: '2023'
    }
  ];

  return (
    <main className="art-container">
      <div
        className="art-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/04_ART/header.png')" }}
      >
        <div className="art-section-header-introtext">
          <h1>Motion Media</h1>
          <p>Exploring the intersection of art and animation through digital and traditional techniques.
            <br></br><br></br>
            This collection showcases my work in motion graphics, character animation, and
            experimental video art. Each piece represents a journey into the dynamic world
            of moving images and storytelling through motion.
            <br></br><br></br>
            From character animations to abstract motion studies, these videos demonstrate
            my passion for bringing static artwork to life through the magic of animation.
          </p>
        </div>
      </div>

      <div className="art-assorted art-motion-works">
        <h2>Motion Media Collection</h2>

        <div className="motion-media-grid">
          {motionMediaVideos.map((video) => (
            <div key={video.id} className="video-item">
              <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <div className="play-button">▶</div>
                    <div className="video-duration">{video.duration}</div>
                  </div>
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

      <style>{`
        .motion-media-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2vw;
          padding: 0 10vw;
          margin-top: 4vw;
        }

        .video-item {
          background-color: #1a1a1a;
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .video-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .video-item a {
          text-decoration: none;
          color: #F0EDE6;
        }

        .video-thumbnail {
          position: relative;
          width: 100%;
          height: 245px;
          overflow: hidden;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-item:hover .video-thumbnail img {
          transform: scale(1.05);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-item:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          font-size: 3rem;
          color: white;
          background: rgba(255, 0, 0, 0.8);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .video-info {
          padding: 1.5vw;
        }

        .video-info h4 {
          font-size: 1.2rem;
          margin: 0 0 0.5vw 0;
          color: #F0EDE6;
        }

        .video-info p {
          font-size: 0.9rem;
          margin: 0 0 1vw 0;
          color: #cccccc;
          line-height: 1.4;
        }

        .video-year {
          font-size: 0.8rem;
          color: #888888;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .motion-media-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3vw;
            padding: 0 5vw;
          }

          .video-thumbnail {
            height: 200px;
          }

          .video-info {
            padding: 3vw;
          }

          .video-info h4 {
            font-size: 1rem;
          }

          .video-info p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </main>
  );
}
