import React, { useState } from 'react';
import EmailAssetsLightbox from './EmailAssetsLightbox';
import './EmailAssetsGrid.css';
import { activateProps } from '../../hooks/useLightbox';
import { EmailAsset, emailAssets } from '../../data/marshallsEmailAssets';

const EmailAssetsGrid: React.FC = () => {
  // This gallery selects a campaign folder rather than a single image, so it
  // keeps its own selection state instead of using useLightbox.
  const [selectedFolder, setSelectedFolder] = useState<EmailAsset | null>(null);

  const closeLightbox = () => setSelectedFolder(null);

  return (
    <div className="email-assets-container">
      <div className="email-assets-grid">
        {emailAssets.map(asset => (
          <div key={asset.folderName} className="email-asset-group">
            <div
              className="email-asset-item"
              {...activateProps(() => setSelectedFolder(asset), asset.folderName)}
            >
              <img
                src={asset.approvedImage}
                alt={asset.folderName}
                className="email-asset-thumbnail"
              />
            </div>
            {asset.cbImage && (
              <div
                className="email-asset-item email-asset-cb"
                {...activateProps(
                  () =>
                    setSelectedFolder({
                      folderName: `${asset.folderName}_CB`,
                      approvedImage: asset.cbImage as string,
                      allImages: [asset.cbImage as string]
                    }),
                  `${asset.folderName} content block`
                )}
              >
                <img
                  src={asset.cbImage}
                  alt={`${asset.folderName} CB`}
                  className="email-asset-thumbnail"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <EmailAssetsLightbox
        isOpen={selectedFolder !== null}
        selectedFolder={selectedFolder}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default EmailAssetsGrid;
