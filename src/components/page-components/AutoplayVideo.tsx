import React from 'react';
import { getAssetPath } from '../../utils/assetUtils';

interface AutoplayVideoProps {
  /** Path to the video, resolved through getAssetPath. */
  src: string;
  className?: string;
}

/**
 * The muted, looping, autoplaying preview video used for the code page header
 * and every project card.
 */
const AutoplayVideo: React.FC<AutoplayVideoProps> = ({ src, className }) => (
  <div className={className}>
    <video muted autoPlay loop playsInline width="100%" height="auto">
      <source src={getAssetPath(src)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default AutoplayVideo;
