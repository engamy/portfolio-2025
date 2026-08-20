import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCaseStudyCard.css';
import { getAssetPath } from '../../utils/assetUtils';
import { CaseStudy } from '../../data/caseStudies';

const FeaturedCaseStudyCard: React.FC<CaseStudy> = ({
  to,
  image,
  imageAlt,
  title,
  role,
  tags,
  variant = 'default',
}) => {
  const cardClass =
    variant === 'next'
      ? 'home-featured-card home-featured-card--next'
      : 'home-featured-card';

  return (
    <Link to={to} className={cardClass}>
      <div className="home-featured-image">
        <img src={getAssetPath(image)} alt={imageAlt} />
      </div>
      <div className="home-featured-info">
        <h3>{title}</h3>
        <p className="home-featured-dates">{role}</p>
        <div className="home-featured-tags">
          {tags.map(tag => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
        <p className="home-featured-cta">Learn More</p>
      </div>
    </Link>
  );
};

export default FeaturedCaseStudyCard;
