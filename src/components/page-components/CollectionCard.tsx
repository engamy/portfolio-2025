import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionCard.css';
import { getAssetPath } from '../../utils/assetUtils';
import { Collection } from '../../data/collections';

interface CollectionCardProps extends Collection {
  /** Selects the accent treatment; the two pages style the media differently. */
  variant: 'art' | 'design';
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  to,
  media,
  mediaType = 'image',
  mediaAlt,
  title,
  date,
  tags,
  openInNewTab = false,
  variant
}) => (
  <div className={`collection-card collection-card--${variant}`}>
    <Link to={to} {...(openInNewTab ? { target: '_blank' } : {})}>
      <div className="collection-card-media">
        {mediaType === 'video' ? (
          <video src={getAssetPath(media)} autoPlay muted loop playsInline />
        ) : (
          <img src={getAssetPath(media)} alt={mediaAlt} />
        )}
      </div>
      <div className="collection-card-info">
        <h4>{title}</h4>
        <p>{date}</p>
        <div className="collection-card-tags">
          {tags.map(tag => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </Link>
  </div>
);

export default CollectionCard;
