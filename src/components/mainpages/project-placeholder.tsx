import React from 'react';
import { Link } from 'react-router-dom';
import './landing-style.css';
import { usePageMode } from '../../hooks/usePageMode';
import { LandingProject, TAGS } from '../../data/landingProjects';

interface ProjectPlaceholderProps {
  project: LandingProject;
}

/**
 * The stand-in page for a project that has no case study written yet, ported
 * from the reference's project view. Each one has a real route so the card
 * linking to it behaves like every other card.
 */
export default function ProjectPlaceholder({ project }: ProjectPlaceholderProps) {
  usePageMode({ initial: true });

  return (
    <main>
      <section className="page wrap">
        <Link className="back" to="/#work">Back to projects</Link>
        <h1>{project.title}</h1>
        <p className="ctx">{project.ctx}</p>
        <ul className="tags">
          {project.tags.map(tag => (
            <li key={tag}>{TAGS[tag]}</li>
          ))}
        </ul>
        <div className="ph">
          <span>Hero image: {project.img}</span>
        </div>
        <p className="note">This case study is coming soon.</p>
      </section>
    </main>
  );
}
