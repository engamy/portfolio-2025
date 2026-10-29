import React from 'react';
import { Link } from 'react-router-dom';
import './code-style.css';
import './landing-style.css';
import ProjectCard from '../page-components/ProjectCard';
import { usePageMode } from '../../hooks/usePageMode';
import { Project } from '../../data/projects';

interface CodeProjectProps {
  project: Project;
}

/**
 * A single engineering project on its own page.
 *
 * Reuses ProjectCard and code-style.css rather than restating the layout, so a
 * project reads the same here as it does in the list on /code.
 */
export default function CodeProject({ project }: CodeProjectProps) {
  usePageMode({ initial: true });

  return (
    <main className="code-container code-project-page">
      <div className="project-container">
        <Link className="back" to="/#work">Back to projects</Link>
        <ProjectCard {...project} />
      </div>
    </main>
  );
}
