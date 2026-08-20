import React from 'react';
import { useSpring, animated, useSprings, to } from '@react-spring/web';
import './home-style.css';
import { getAssetPath } from '../../utils/assetUtils';
import FeaturedCaseStudyCard from '../page-components/FeaturedCaseStudyCard';
import { caseStudies } from '../../data/caseStudies';
import { usePageMode } from '../../hooks/usePageMode';
import { ICONS, socials } from '../../data/socials';

export default function Home() {
  usePageMode({ initial: false, flipAt: '.home-featured' });

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
  // Use useSprings instead of useTrail for better control
  const iconSprings = useSprings(
    socials.length,
    socials.map((_, i) => ({
      from: { opacity: 0, scale: 0, rotate: -180 },
      to: { opacity: 1, scale: 1, rotate: 0 },
      config: { tension: 200, friction: 20 },
      delay: 1200 + (i * 100),
    }))
  );

  return (
    <main className="home-page">
      <section className="home-container">
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
        <p>Hello, I'm Amy! </p>
          <p>I'm a <span>product designer </span>
          based <br></br>in <span>Boston</span> and <span>New York </span> who is studying
          <br></br><span> Computer Science and Design </span>
          with a concentration in <span>UI/UX Design</span> <br></br>
          at <span>Northeastern University</span>.
          <br></br><br></br>
          Welcome to my portfolio, and <br></br>
          thank you for your interest in my work.
          <br></br><br></br>
          Feel free to connect with me!
        </p>
        <div className="contacticon">
          {iconSprings.map((spring, index) => (
            <animated.a
              key={socials[index].href}
              href={socials[index].href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                opacity: spring.opacity,
                transform: to([spring.rotate, spring.scale], (r, s) => `rotate(${r}deg) scale(${s})`),
              }}
            >
              <img 
                src={getAssetPath(`${ICONS}/${socials[index].icon}`)} 
                alt={socials[index].label} 
              />
            </animated.a>
          ))}
        </div>
      </animated.div>
      </section>

      <section className="home-featured">
        <div className="home-featured-header">
          <h2>Case Studies</h2>
        </div>
        {caseStudies.map(caseStudy => (
          <FeaturedCaseStudyCard key={caseStudy.to} {...caseStudy} />
        ))}
      </section>
    </main>
  );
} 