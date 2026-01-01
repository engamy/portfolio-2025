import React, { useMemo, useState, useEffect } from 'react';
import { useSpring, animated, useSprings, to } from '@react-spring/web';
import './home-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { getAssetPath } from '../../utils/assetUtils';

export default function Home() {
  // Set darkMode to false for the home page
  usePageDarkMode(false);

  // Parallax position state (combines mouse and device orientation)
  const [parallaxPosition, setParallaxPosition] = useState({ x: 0, y: 0 });
  const [useDeviceOrientation, setUseDeviceOrientation] = useState(false);

  // Track device orientation for mobile parallax
  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-right tilt (-90 to 90 degrees)
        // beta: front-back tilt (-180 to 180 degrees)
        // Normalize to -1 to 1 range
        const x = Math.max(-1, Math.min(1, e.gamma / 45)); // Clamp gamma to reasonable range
        const y = Math.max(-1, Math.min(1, (e.beta - 90) / 45)); // Adjust beta to center around 0
        setParallaxPosition({ x, y });
      }
    };

    // Check if DeviceOrientationEvent is supported
    if (typeof DeviceOrientationEvent !== 'undefined') {
      // iOS 13+ requires permission
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              setUseDeviceOrientation(true);
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(() => {
            // Permission denied or error - fall back to mouse
            setUseDeviceOrientation(false);
          });
      } else {
        // Android and older iOS - no permission needed
        setUseDeviceOrientation(true);
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Track mouse movement for desktop parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use mouse if device orientation is not being used
      if (!useDeviceOrientation) {
        // Normalize mouse position to -1 to 1 range
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setParallaxPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [useDeviceOrientation]);

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

  // Parallax springs for mouse movement
  const parallaxIntensity = {
    intro: 15,      // Subtle movement for intro text
    jump: 30,       // More pronounced for jump image
    bio: 20,        // Moderate for bio section
    star: 10,       // Subtle for star icon
  };

  const introParallax = useSpring({
    x: parallaxPosition.x * parallaxIntensity.intro,
    y: parallaxPosition.y * parallaxIntensity.intro,
    config: { tension: 50, friction: 30 },
  });

  const jumpParallax = useSpring({
    x: parallaxPosition.x * parallaxIntensity.jump,
    y: parallaxPosition.y * parallaxIntensity.jump,
    config: { tension: 50, friction: 30 },
  });

  const bioParallax = useSpring({
    x: parallaxPosition.x * parallaxIntensity.bio,
    y: parallaxPosition.y * parallaxIntensity.bio,
    config: { tension: 50, friction: 30 },
  });

  const starParallax = useSpring({
    x: parallaxPosition.x * parallaxIntensity.star,
    y: parallaxPosition.y * parallaxIntensity.star,
    rotate: parallaxPosition.x * 5, // Slight rotation based on horizontal position
    config: { tension: 50, friction: 30 },
  });

  return (
    <main className="home-container">
      <animated.div 
        className="home-introtext"
        style={{
          transform: to([introParallax.x, introParallax.y], (x, y) => `translate3d(${x}px, ${y}px, 0)`)
        }}
      >
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
            transform: to([starSpring.rotate, starSpring.scale, starParallax.x, starParallax.y, starParallax.rotate], 
              (r, s, px, py, rot) => `translate3d(${px}px, ${py}px, 0) rotate(${r + rot}deg) scale(${s})`),
          }}
        />
        <animated.p style={{
          opacity: introSpring.opacity,
          transform: introSpring.y.to(y => `translate3d(0, ${y}px, 0)`)
        }}>
          <span>Designer • Developer • Artist</span>
        </animated.p>
      </animated.div>
      <animated.div className="jumpimg" style={{
        opacity: jumpImageSpring.opacity,
        transform: to([jumpImageSpring.y, jumpImageSpring.scale, jumpParallax.x, jumpParallax.y], 
          (y, s, px, py) => `translate3d(${px}px, ${y + py}px, 0) scale(${s})`),
      }}>
        <img src={getAssetPath('/pictures/portfolio-content_spring2026/01_HOME/jump.png')} alt="Jump Hero" />
      </animated.div>
      <animated.div className="smallbio" style={{
        opacity: bioSpring.opacity,
        transform: to([bioSpring.x, bioParallax.x, bioParallax.y], 
          (bx, px, py) => `translate3d(${bx + px}px, ${py}px, 0)`)
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