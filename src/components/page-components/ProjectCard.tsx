import React from 'react';
import AutoplayVideo from './AutoplayVideo';
import { Project } from '../../data/projects';

const CODE_ASSETS = '/pictures/portfolio-content_spring2026/03_CODE';

const ProjectCard: React.FC<Project> = ({
  title,
  meta,
  description,
  tags,
  links,
  video
}) => (
  <div className="project">
    <div className="project-text">
      <div className="project-desc">
        <div className="project-title-time">
          <h3>{title}</h3>
          <p>{meta}</p>
        </div>
        <p>{description}</p>
        {links && links.length > 0 && (
          <div className="project-links">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <p>{link.label}</p>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="project-tags">
        {tags.map(tag => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    </div>
    <AutoplayVideo className="project-preview" src={`${CODE_ASSETS}/${video}`} />
  </div>
);

export default ProjectCard;
