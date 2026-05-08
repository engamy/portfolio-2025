import React, { useMemo } from 'react';
import { useSpring, animated, useSprings, to } from '@react-spring/web';
import './home-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { getAssetPath } from '../../utils/assetUtils';

export default function Home() {
  // Set darkMode to false for the home page
  usePageDarkMode(false);

  // Animation for intro text section
  const introSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 50, friction: 20 },
    delay: 200,
  });

  // Animation for star icon with rotation
  const starSpring = useSpring({
    from: { opacity: 0, rotate: -180, scale: 0.5 },
    to: { opacity: 1, rotate: 0, scale: 1 },
    config: { tension: 100, friction: 15 },
    delay: 600,
  });

  // Animation for jump image
  const jumpImageSpring = useSpring({
    from: { opacity: 0, scale: 0.8, y: 20 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: { tension: 60, friction: 25 },
    delay: 400,
  });

  // Animation for bio text
  const bioSpring = useSpring({
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0 },
    config: { tension: 50, friction: 20 },
    delay: 800,
  });

  // Contact icons data
  const contactIcons = useMemo(() => [
    { href: 'https://www.linkedin.com/in/amyeng895/', icon: 'linkedin.png', alt: 'LinkedIn' },
    { href: 'https://www.instagram.com/yifeng.art/', icon: 'instagram.png', alt: 'Instagram' },
    { href: 'https://github.com/engamy', icon: 'github.png', alt: 'GitHub' },
    { href: 'https://www.youtube.com/@yifengart', icon: 'youtube.png', alt: 'YouTube' },
  ], []);

  // Use useSprings instead of useTrail for better control
  const iconSprings = useSprings(
    contactIcons.length,
    contactIcons.map((_, i) => ({
      from: { opacity: 0, scale: 0, rotate: -180 },
      to: { opacity: 1, scale: 1, rotate: 0 },
      config: { tension: 200, friction: 20 },
      delay: 1200 + (i * 100),
    }))
  );

  return (
    <main className="home-container">
      <div className="home-introtext">
        <animated.h1 style={{
          opacity: introSpring.opacity,
          transform: introSpring.y.to(y => `translate3d(0, ${y}px, 0)`)
        }}>
          AMY ENG
        </animated.h1>
        <animated.p style={{
          opacity: introSpring.opacity,
          transform: introSpring.y.to(y => `translate3d(0, ${y}px, 0)`)
        }}>
          she/her/hers
        </animated.p>
        <animated.img 
          src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/star_red.svg')} 
          alt="Red Star"
          style={{
            opacity: starSpring.opacity,
            transform: to([starSpring.rotate, starSpring.scale], (r, s) => `rotate(${r}deg) scale(${s})`),
          }}
        />
        <animated.p style={{
          opacity: introSpring.opacity,
          transform: introSpring.y.to(y => `translate3d(0, ${y}px, 0)`)
        }}>
          <span>Designer • Developer • Artist</span>
        </animated.p>
      </div>
      <animated.div className="jumpimg" style={{
        opacity: jumpImageSpring.opacity,
        transform: to([jumpImageSpring.y, jumpImageSpring.scale], (y, s) => `translate3d(0, ${y}px, 0) scale(${s})`),
      }}>
        <img src={getAssetPath('/pictures/portfolio-content_spring2026/01_HOME/jump-v2.png')} alt="Jump Hero" />
      </animated.div>
      <animated.div className="smallbio" style={{
        opacity: bioSpring.opacity,
        transform: bioSpring.x.to(x => `translate3d(${x}px, 0, 0)`)
      }}>
        <p>Hello! I am a <span>designer, developer, </span> <br></br>
          and artist currently based in <span>Boston</span> who is studying
          <span> Computer Science and Design</span> <br></br>
          with a concentration in <span>UI/UX Design</span> <br></br>
          at <span>Northeastern University</span>.
          <br></br><br></br>
          Welcome to my self-coded portfolio, and <br></br>
          thank you for your interest in my work.
          <br></br><br></br>
          Feel free to connect with me!
        </p>
        <div className="contacticon">
          {iconSprings.map((spring, index) => (
            <animated.a
              key={contactIcons[index].href}
              href={contactIcons[index].href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                opacity: spring.opacity,
                transform: to([spring.rotate, spring.scale], (r, s) => `rotate(${r}deg) scale(${s})`),
              }}
            >
              <img 
                src={getAssetPath(`/pictures/portfolio-content_spring2026/06_ICONS/${contactIcons[index].icon}`)} 
                alt={contactIcons[index].alt} 
              />
            </animated.a>
          ))}
        </div>
      </animated.div>
    </main>
  );
} 