import React, { useState, useEffect } from 'react';
import EmailAssetsLightbox from './EmailAssetsLightbox';
import './EmailAssetsGrid.css';

interface EmailAsset {
  folderName: string;
  approvedImage: string;
  allImages: string[];
  cbImage?: string;
}

const EmailAssetsGrid: React.FC = () => {
  const [emailAssets, setEmailAssets] = useState<EmailAsset[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<EmailAsset | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    // Load email assets from the directory structure
    const loadEmailAssets = async () => {
      try {
        // Define the exact file structure for each folder
        const folderData = [
          {
            folderName: 'Dresses_EMM_Newness_2208560',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Newness_2208560/APPROVED.jpg',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Newness_2208560/APPROVED.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Newness_2208560/Dresses_EMM_Newness_2208560-1.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Newness_2208560/Dresses_EMM_Newness_2208560-2.jpg'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_NewArrivals.jpg'
          },
          {
            folderName: 'Dresses_EMM_Volume_2219550',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Volume_2219550/APPROVED.jpg',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Volume_2219550/APPROVED.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Volume_2219550/Dresses_EMM_Volume_2219550-1.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Dresses_EMM_Volume_2219550/Dresses_EMM_Volume_2219550-2.jpg'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_Denim.jpg'
          },
          {
            folderName: 'NAA_EME_Cinco_de_Mayo_2197778',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NAA_EME_Cinco_de_Mayo_2197778/APPROVED.jpg',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NAA_EME_Cinco_de_Mayo_2197778/APPROVED.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NAA_EME_Cinco_de_Mayo_2197778/NAA_EME_Cinco_de_Mayo_2197778-1.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NAA_EME_Cinco_de_Mayo_2197778/NAA_EME_Cinco_de_Mayo_2197778-2.jpg'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_OutdoorHome.jpg'
          },
          {
            folderName: 'TJXR_EA_EME_Summer_TL_V2_2197916',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/TJXR_EA_EME_Summer_TL_V2_2197916/APPROVED.jpg',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/TJXR_EA_EME_Summer_TL_V2_2197916/APPROVED.jpg'
            ]
          },
          {
            folderName: 'NA_EMM_Easter_2180600',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Easter_2180600/APPROVED.gif',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Easter_2180600/APPROVED.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Easter_2180600/NA_EMM_Easter_2180600-1.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Easter_2180600/NA_EMM_Easter_2180600-2.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Easter_2180600/NA_EMM_Easter_2180600-3.gif'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_FamilySwim.jpg'
          },
          {
            folderName: 'NA_EMM_KentuckyDerby_2189878',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_KentuckyDerby_2189878/APPROVED.gif',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_KentuckyDerby_2189878/APPROVED.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_KentuckyDerby_2189878/NA_EMM_KentuckyDerby_2189878-1.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_KentuckyDerby_2189878/NA_EMM_KentuckyDerby_2189878-2.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_KentuckyDerby_2189878/NA_EMM_KentuckyDerby_2189878-3.jpg'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_SummerGetaway.jpg'
          },
          {
            folderName: 'Food_EMIS_Quality_2223050',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/APPROVED.gif',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/APPROVED.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/Food_EMIS_Quality_2223050-1.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/Food_EMIS_Quality_2223050-2.jpg',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/Food_EMIS_Quality_2223050-3.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/Food_EMIS_Quality_2223050/Food_EMIS_Quality_2223050-4.gif'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_MothersDay.jpg'
          },
          {
            folderName: 'NA_EMM_MD_2208450',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_MD_2208450/APPROVED.gif',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_MD_2208450/APPROVED.gif'
            ]
          },
          {
            folderName: 'NA_EMM_Newness_2229700',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Newness_2229700/APPROVED.gif',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Newness_2229700/APPROVED.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Newness_2229700/NA_EMM_Newness_2229700 - 1.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Newness_2229700/NA_EMM_Newness_2229700 - 2.gif',
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/NA_EMM_Newness_2229700/NA_EMM_Newness_2229700 - 5.gif'
            ]
          },
          {
            folderName: 'TA_EME_Summer_TL_V2_2171338',
            approvedImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/TA_EME_Summer_TL_V2_2171338/APPROVED.jpg',
            allImages: [
              '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/EM/TA_EME_Summer_TL_V2_2171338/APPROVED.jpg'
            ],
            cbImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets/CB/CB_Food.gif'
          }
        ];

        setEmailAssets(folderData);
      } catch (error) {
        console.error('Error loading email assets:', error);
      }
    };

    loadEmailAssets();
  }, []);

  const handleImageClick = (asset: EmailAsset) => {
    setSelectedFolder(asset);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedFolder(null);
  };

  return (
    <div className="email-assets-container">
      <div className="email-assets-grid">
        {emailAssets.map((asset, index) => (
          <div key={index} className="email-asset-group">
            <div 
              className="email-asset-item"
              onClick={() => handleImageClick(asset)}
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
                onClick={() => {
                  if (asset.cbImage) {
                    handleImageClick({
                      folderName: `${asset.folderName}_CB`,
                      approvedImage: asset.cbImage,
                      allImages: [asset.cbImage]
                    });
                  }
                }}
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
        isOpen={isLightboxOpen}
        selectedFolder={selectedFolder}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default EmailAssetsGrid;
