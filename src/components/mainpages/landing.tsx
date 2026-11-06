import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing-style.css';
import { getAssetPath } from '../../utils/assetUtils';
import { usePageMode } from '../../hooks/usePageMode';
import { Icon } from '../page-components/IconSprite';
import SocialLinks from '../page-components/SocialLinks';
import ContactButtons from '../page-components/ContactButtons';
import {
  FILTERS,
  LAB,
  LabItem,
  LandingProject,
  PROJECTS,
  TAGS,
  TagId,
  projectPath
} from '../../data/landingProjects';

const HOME = '/pictures/portfolio-content_spring2026/01_HOME';

const TagPills: React.FC<{ tags: TagId[] }> = ({ tags }) => (
  <ul className="tags">
    {tags.map(tag => (
      <li key={tag}>{TAGS[tag]}</li>
    ))}
  </ul>
);

/** A thumbnail where the project has one, the reference placeholder where not. */
const Thumb: React.FC<{
  item: LandingProject | LabItem;
  className?: string;
  style?: React.CSSProperties;
}> = ({ item, className, style }) => {
  const classes = className ? `thumb ${className}` : 'thumb';

  if (!item.image) {
    return (
      <div className={`ph ${className ?? ''}`.trim()} style={style}>
        <span>Thumbnail: {item.img}</span>
      </div>
    );
  }

  if (item.mediaType === 'video') {
    return (
      <video
        className={classes}
        style={style}
        src={getAssetPath(item.image)}
        autoPlay
        loop
        muted
        playsInline
        aria-label={item.img}
      />
    );
  }

  return (
    <img className={classes} style={style} src={getAssetPath(item.image)} alt={item.img} />
  );
};

export default function Landing() {
  // Light nav over the white hero, dark from the Featured band down.
  usePageMode({ initial: false, flipAt: '.featured' });

  const [active, setActive] = useState<'all' | TagId>('all');
  const visible = PROJECTS.filter(p => active === 'all' || p.tags.includes(active));
  const featured = PROJECTS.filter(p => p.featured);

  return (
    <main>
      <section className="hero" id="home">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-id">
              <h1>Amy<br />Eng</h1>
              <p className="pronouns">(she/her/hers)</p>
              <Icon id="i-star" className="star" />
              <p className="tagline">
                Product Design • UI/UX Design Software Development
              </p>
            </div>

            <img
              className="hero-photo"
              src={getAssetPath(`${HOME}/jump-v2.png`)}
              alt="Amy mid-jump with arms raised"
            />

            <div className="hero-bio">
              <p className="lead">
                Hello, I’m Amy! I’m a <strong>designer with a software background</strong>{' '}
                based in both <strong>Boston &amp; New York City</strong>, studying{' '}
                <strong>Design and Computer Science</strong> (Interaction Design
                concentration) at <strong>Northeastern University</strong>.
              </p>
              <div className="quick">
                <ContactButtons />
                <SocialLinks size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured" id="featured" aria-labelledby="featured-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="featured-h">Featured</h2>
          </div>
          <div className="feat-grid">
            {featured.map(project => (
              <Link key={project.slug} className="card" to={projectPath(project)}>
                <Thumb item={project} />
                <h3>{project.title}</h3>
                <p className="ctx">{project.ctx}</p>
                <TagPills tags={project.tags} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="work-h">Projects</h2>
            <p className="count" aria-live="polite">
              Showing {visible.length} of {PROJECTS.length}
            </p>
          </div>

          <div className="chips" role="group" aria-label="Filter projects by category">
            {FILTERS.map(filter => (
              <button
                key={filter.id}
                type="button"
                className="chip"
                aria-pressed={filter.id === active}
                onClick={() => setActive(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Keyed on the filter so the fade replays when the list swaps. */}
          <div className="grid" key={active}>
            {visible.map(project => (
              <Link key={project.slug} className="card" to={projectPath(project)}>
                <Thumb item={project} />
                <h3>{project.title}</h3>
                <p className="ctx">{project.focus}</p>
                <TagPills tags={project.tags} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lab" id="creative-lab" aria-labelledby="lab-h">
        <div className="wrap">
          <div className="section-head section-head--stacked">
            <h2 id="lab-h">Creative Lab &amp; Fine Art</h2>
            <p className="sub">
              Analog explorations, motion graphics, and visual design.
            </p>
          </div>
          <div className="masonry">
            {LAB.map(item => (
              <Link key={item.slug} className="card" to={item.to ?? `/${item.slug}`}>
                <Thumb item={item} />
                <h3>{item.title}</h3>
                <p className="ctx">{item.ctx}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
