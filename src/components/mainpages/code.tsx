import React from 'react';
import './code-style.css';
import './home-style.css';
import { usePageMode } from '../../hooks/usePageMode';
import FeaturedCaseStudyCard from '../page-components/FeaturedCaseStudyCard';
import AutoplayVideo from '../page-components/AutoplayVideo';
import ProjectCard from '../page-components/ProjectCard';
import { nextCaseStudy } from '../../data/caseStudies';
import { projects } from '../../data/projects';

export default function Code() {
  usePageMode({ initial: true });

  return (
    <main className="code-container">
      <div className="section-header">
        <div className="section-header-introtext">
          <h1>Developer</h1>
          <p>As a full-stack developer, I bring comprehensive technical expertise across
            modern web technologies including but not limited to JavaScript, TypeScript,
            React.js, Node.js, Next.js, Java, SQL, HTML, CSS, and Python.
            <br></br><br></br>
            While I excel in both frontend and backend development, I have a particular
            passion for frontend engineering, where I can combine my technical skills in
            web development with creative problem-solving to build engaging user experiences.
          </p>
        </div>
        <AutoplayVideo
          className="header-media"
          src="/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4"
        />
      </div>

      <section className="home-featured code-featured">
        <div className="home-featured-header">
          <h2>Case Studies</h2>
        </div>
        <FeaturedCaseStudyCard {...nextCaseStudy} />
      </section>

      <div className="project-container">

        <h2>Projects</h2>

        {projects.map(project => (
          <ProjectCard key={project.title} {...project} />
        ))}

      </div>
    </main>
  );
}
