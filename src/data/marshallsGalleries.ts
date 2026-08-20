// Image sets for the Marshalls retail galleries. Both the collection page and
// the case study page render these, so the lists live here rather than being
// baked into a component each.

import { getAssetPath } from '../utils/assetUtils';
import { GridImage } from '../components/page-components/ImageGridLightbox';
import { ImageGridLightboxProps } from '../components/page-components/ImageGridLightbox';

const RETAIL = '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL';

/** A gallery: the images plus the grid settings that give it its look. */
export type Gallery = Omit<ImageGridLightboxProps, 'images' | 'className'> & {
  images: GridImage[];
};

export const inStoreSignage: Gallery = {
  columns: 2,
  gap: '2rem',
  maxWidth: '800px',
  fit: 'contain',
  images: [
    {
      id: 1,
      thumbnail: getAssetPath(`${RETAIL}/signage/pinpad_thumbnail.jpg`),
      src: getAssetPath(`${RETAIL}/signage/pinpad_lightbox.jpg`),
      alt: 'Pinpad Signage',
      caption: 'Pinpad Signage'
    },
    {
      id: 2,
      thumbnail: getAssetPath(`${RETAIL}/signage/violator_thumbnail.jpg`),
      src: getAssetPath(`${RETAIL}/signage/violator_lightbox.jpg`),
      alt: 'Violator Signage',
      caption: 'Violator Signage'
    }
  ]
};

export const oohSignage: Gallery = {
  columns: 2,
  gap: '30px',
  maxWidth: '1000px',
  itemHeight: '400px',
  mobileItemHeight: '300px',
  fit: 'cover',
  frosted: true,
  images: [
    {
      id: 1,
      src: getAssetPath(`${RETAIL}/OOH/busShelter.jpg`),
      caption: 'Billboard Design',
      alt: 'Marshalls billboard signage design'
    },
    {
      id: 2,
      src: getAssetPath(`${RETAIL}/OOH/busShelter2.jpg`),
      caption: 'Bus Shelter Design',
      alt: 'Marshalls bus shelter signage design'
    },
    {
      id: 3,
      src: getAssetPath(`${RETAIL}/OOH/pencilBanner.jpg`),
      caption: 'Bus Shelter Design 2',
      alt: 'Marshalls bus shelter signage design alternative'
    },
    {
      id: 4,
      src: getAssetPath(`${RETAIL}/OOH/billboard.jpg`),
      caption: 'Pencil Banner Design',
      alt: 'Marshalls pencil banner signage design'
    }
  ]
};

export const bilingualSignage: Gallery = {
  columns: 4,
  mobileColumns: 2,
  gap: '1.5rem',
  maxWidth: '1200px',
  itemHeight: '400px',
  mobileItemHeight: '300px',
  fit: 'contain',
  images: [
    {
      id: 1,
      src: getAssetPath(
        `${RETAIL}/bilingual/MA-FY25_fallGO_stanchion_localLove-22x28_spanish.jpg`
      ),
      alt: 'Fall Grand Opening Stanchion - Local Love (Spanish)',
      caption: 'Fall Grand Opening Stanchion - Local Love (Spanish)'
    },
    {
      id: 2,
      src: getAssetPath(
        `${RETAIL}/bilingual/MA-FY25_springGO_closing_window-34x52_spanish.jpg`
      ),
      alt: 'Spring Grand Opening Closing Window (Spanish)',
      caption: 'Spring Grand Opening Closing Window (Spanish)'
    },
    {
      id: 3,
      src: getAssetPath(
        `${RETAIL}/bilingual/MA-FY25_springGO_closing_window-34x52_storeClosed1_spanish.jpg`
      ),
      alt: 'Spring Grand Opening Store Closed 1 (Spanish)',
      caption: 'Spring Grand Opening Store Closed 1 (Spanish)'
    },
    {
      id: 4,
      src: getAssetPath(
        `${RETAIL}/bilingual/MA-FY25_springGO_closing_window-34x52_storeClosed2_spanish.jpg`
      ),
      alt: 'Spring Grand Opening Store Closed 2 (Spanish)',
      caption: 'Spring Grand Opening Store Closed 2 (Spanish)'
    }
  ]
};

export const springGrandOpening: Gallery = {
  columns: 4,
  mobileColumns: 2,
  gap: '1rem',
  fit: 'contain',
  images: [1, 2, 3, 4].map(n => ({
    id: n,
    src: getAssetPath(`${RETAIL}/springGO/${n}.${n === 4 ? 'png' : 'jpg'}`),
    alt: `Spring Grand Opening ${n}`,
    caption: `Spring Grand Opening ${n}`
  }))
};
