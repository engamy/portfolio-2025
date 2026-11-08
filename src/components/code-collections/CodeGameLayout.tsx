import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './code-game-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { Icon } from '../page-components/IconSprite';
import ExternalLink from '../page-components/ExternalLink';

export const CODE = '/pictures/portfolio-content_spring2026/03_CODE';

export interface SummaryItem {
  icon: string;
  label: string;
  value: string;
}

export interface GameLink {
  label: string;
  href: string;
}

interface CodeGameLayoutProps {
  /** Picks the hero colours: cg--lightemall, cg--minesweeper, cg--pipefantasy. */
  modifier: string;
  title: string;
  summary: SummaryItem[];
  links: GameLink[];
  children: React.ReactNode;
}

/**
 * Hero, Quick Summary and content wrapper shared by the smaller game case
 * studies. Each page supplies its own sections as children.
 */
export default function CodeGameLayout({ modifier, title, summary, links, children }: CodeGameLayoutProps) {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  // Light navbar over the hero, dark once the cream content reaches the top.
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.cg-content');
      if (!content) return;
      setDarkMode(content.getBoundingClientRect().top > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  return (
    <main className={`design-container cg-casestudy ${modifier}`}>
      <CaseStudyHero variant="cg" title={title}>
        <div className="cg-snapshot">
          <h2 className="cg-snapshot-title">Quick Summary</h2>
          <div className="cg-cards">
            {summary.map(item => (
              <div key={item.label} className="cg-sum-card">
                <h3>
                  <Icon id={item.icon} className="cg-card-icon" />
                  {item.label}
                </h3>
                <p>{item.value}</p>
              </div>
            ))}
            <div className="cg-sum-card cg-sum-card--wide">
              <h3>
                <Icon id="i-github" className="cg-card-icon" />
                Links
              </h3>
              <p>
                {links.map((link, i) => (
                  <React.Fragment key={link.href}>
                    {i > 0 && ' · '}
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </CaseStudyHero>

      <div className="cg-content">{children}</div>
    </main>
  );
}

/** The gameplay recording, with its caption underneath. */
export const GameVideo: React.FC<{ file: string; caption: string }> = ({ file, caption }) => (
  <figure className="cg-figure">
    <video src={getAssetPath(`${CODE}/${file}`)} controls muted playsInline preload="metadata" />
    <figcaption>{caption}</figcaption>
  </figure>
);

/** The links again at the bottom of the page, as buttons. */
export const GameLinks: React.FC<{ links: GameLink[] }> = ({ links }) => (
  <ul className="cg-links">
    {links.map(link => (
      <li key={link.href}>
        <ExternalLink href={link.href} className="btn">
          {link.label}
        </ExternalLink>
      </li>
    ))}
  </ul>
);
