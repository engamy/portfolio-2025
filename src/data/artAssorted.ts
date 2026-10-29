// Every art image that is not part of a named collection.
//
// The /art page shows the assorted works on their own; the Visual Explorations
// page shows these plus the Make It series, which is why both lists live here
// rather than inline in a component.

import { getAssetPath } from '../utils/assetUtils';

/** The shape MasonryGrid and ImageLightbox both consume. */
export interface ArtImage {
  id: number;
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

interface ArtImageFile extends Omit<ArtImage, 'src'> {
  file: string;
}

const ART = '/pictures/portfolio-content_spring2026/04_ART';
const ASSORTED = ART + '/content_assorted';
const MAKEIT = ART + '/makeit';

const resolve = (dir: string, images: ArtImageFile[]): ArtImage[] =>
  images.map(({ file, ...rest }) => ({ ...rest, src: getAssetPath(dir + '/' + file) }));

const ASSORTED_FILES: ArtImageFile[] = [
  { id: 8, file: 'sageValorant.png', caption: 'Sage Valorant - Digital fan art of the Valorant character with vibrant colors', alt: 'Sage Valorant fan art', width: 700, height: 500 },
  { id: 3, file: 'forget.jpg', caption: 'Forget - Mixed media piece exploring memory and the passage of time', alt: 'Forget mixed media artwork', width: 700, height: 500 },
  { id: 15, file: 'makiZenin.jpg', caption: 'Maki Zenin - Digital character illustration with dynamic pose and action', alt: 'Maki Zenin character illustration', width: 800, height: 600 },
  { id: 1, file: 'carisDemise.jpg', caption: 'Caris\' Demise (2022)', alt: 'Caris Demise digital illustration', width: 800, height: 600 },
  { id: 12, file: 'femmeFatale.jpg', caption: 'Femme Fatale - Digital character design with noir aesthetic and dramatic lighting', alt: 'Femme Fatale character design', width: 700, height: 500 },
  { id: 6, file: 'scubadivers.jpg', caption: 'Scuba Divers - Underwater scene created with traditional painting techniques', alt: 'Scuba divers underwater painting', width: 700, height: 500 },
  { id: 9, file: 'faceStudies.jpg', caption: 'Face Studies - Traditional drawing studies focusing on facial anatomy and expression', alt: 'Face studies drawings', width: 600, height: 800 },
  { id: 4, file: 'hutao.png', caption: 'Hu Tao Fan Art - Digital character illustration with vibrant colors and dynamic composition', alt: 'Hu Tao character illustration', width: 600, height: 900 },
  { id: 11, file: 'myFaithLooksUpToThee.jpg', caption: 'My Faith Looks Up To Thee - Traditional painting with religious themes and symbolism', alt: 'My Faith Looks Up To Thee painting', width: 800, height: 600 },
  { id: 13, file: 'higaruma.jpg', caption: 'Higaruma - Digital character illustration with detailed linework and shading', alt: 'Higaruma character illustration', width: 600, height: 800 },
  { id: 7, file: 'gojo.jpg', caption: 'Gojo Satoru - Digital character portrait with dynamic lighting and composition', alt: 'Gojo Satoru character portrait', width: 800, height: 600 },
  { id: 2, file: 'farm.jpg', caption: 'Farm Scene - Traditional ink drawing capturing rural life and agricultural themes', alt: 'Farm scene ink drawing', width: 600, height: 800 },
  { id: 10, file: 'lights.jpg', caption: 'Lights - Digital illustration exploring atmospheric lighting and mood', alt: 'Lights digital illustration', width: 700, height: 500 },
  { id: 5, file: 'makima.png', caption: 'Makima Portrait - Digital painting focusing on character expression and mood', alt: 'Makima character portrait', width: 800, height: 600 },
  { id: 14, file: 'yuta.jpg', caption: 'Yuta - Digital character portrait with emotional depth and expressive features', alt: 'Yuta character portrait', width: 700, height: 500 },
  { id: 16, file: 'ellie.jpg', caption: 'Ellie - Digital character illustration with emotional storytelling and detailed rendering', alt: 'Ellie character illustration', width: 800, height: 600 },
  { id: 17, file: 'miku_2022.png', caption: 'Miku 2022 - Digital fan art of Hatsune Miku with vibrant colors and dynamic composition', alt: 'Miku 2022 fan art', width: 700, height: 500 },
  { id: 18, file: 'ink_squirrel.jpg', caption: 'Ink Squirrel - Traditional ink drawing showcasing wildlife and natural forms', alt: 'Ink squirrel drawing', width: 600, height: 800 },
  { id: 19, file: 'ink_panda.jpg', caption: 'Ink Panda - Traditional ink drawing with expressive linework and character', alt: 'Ink panda drawing', width: 600, height: 800 },
  { id: 20, file: 'ink_cat.jpg', caption: 'Ink Cat - Traditional ink drawing capturing feline grace and movement', alt: 'Ink cat drawing', width: 600, height: 800 },
  { id: 21, file: 'ceramicFortuneCat.jpg', caption: 'Ceramic Fortune Cat - 3D ceramic sculpture with traditional Japanese symbolism', alt: 'Ceramic fortune cat sculpture', width: 800, height: 600 },
  { id: 22, file: 'ceramicPanda.jpg', caption: 'Ceramic Panda - 3D ceramic sculpture with detailed texture and form', alt: 'Ceramic panda sculpture', width: 800, height: 600 },
  { id: 23, file: 'ceramicDragon.jpg', caption: 'Ceramic Dragon - 3D ceramic sculpture with intricate details and mythical themes', alt: 'Ceramic dragon sculpture', width: 800, height: 600 },
  { id: 24, file: 'thanksgiving.jpg', caption: 'Thanksgiving - Traditional painting capturing holiday warmth and family themes', alt: 'Thanksgiving painting', width: 700, height: 500 },
  { id: 25, file: 'subway.jpg', caption: 'Subway - Urban scene capturing the energy and movement of city life', alt: 'Subway urban scene', width: 700, height: 500 },
  { id: 26, file: 'gojo_sketchbook.jpg', caption: 'Gojo Sketchbook - Traditional sketchbook studies showing character development process', alt: 'Gojo sketchbook studies', width: 600, height: 800 },
  { id: 27, file: 'killua.jpg', caption: 'Killua - Digital character portrait with dynamic lighting and expressive features', alt: 'Killua character portrait', width: 700, height: 500 },
  { id: 28, file: 'satosugu.jpg', caption: 'Satosugu - Digital character illustration with emotional depth and storytelling', alt: 'Satosugu character illustration', width: 700, height: 500 },
  { id: 29, file: 'sukuna.jpg', caption: 'Sukuna - Digital character portrait with dark themes and powerful presence', alt: 'Sukuna character portrait', width: 700, height: 500 },
  { id: 30, file: 'dandadan.jpg', caption: 'Dandadan - Digital character illustration with dynamic action and vibrant colors', alt: 'Dandadan character illustration', width: 700, height: 500 },
  { id: 31, file: 'makimaBang.jpg', caption: 'Makima Bang - Digital character illustration with dramatic lighting and intense expression', alt: 'Makima Bang character illustration', width: 700, height: 500 },
  { id: 32, file: 'scubadivers2.jpg', caption: 'Scuba Divers 2 - Traditional painting exploring underwater themes and marine life', alt: 'Scuba divers 2 painting', width: 700, height: 500 },
  { id: 33, file: 'akiangel2.jpg', caption: 'Aki Angel 2 - Digital character illustration with ethereal themes and angelic symbolism', alt: 'Aki Angel 2 character illustration', width: 800, height: 600 },
  { id: 34, file: 'akiangel1.jpg', caption: 'Aki Angel 1 - Digital character illustration with celestial themes and divine beauty', alt: 'Aki Angel 1 character illustration', width: 800, height: 600 }
];

const MAKEIT_FILES: ArtImageFile[] = [
  { id: 101, file: 'three.jpg', caption: 'Make It Three - Handcrafted creation exploring form and texture', alt: 'Make It Three', width: 800, height: 600 },
  { id: 102, file: 'four.jpg', caption: 'Make It Four - Experimental piece combining traditional and modern techniques', alt: 'Make It Four', width: 800, height: 600 },
  { id: 103, file: 'six.jpg', caption: 'Make It Six - Abstract composition exploring color and movement', alt: 'Make It Six', width: 800, height: 600 },
  { id: 104, file: 'nine.jpg', caption: 'Make It Nine - Mixed media work showcasing creative problem-solving', alt: 'Make It Nine', width: 800, height: 600 },
  { id: 105, file: 'ten.jpg', caption: 'Make It Ten - Final piece in the series, representing completion and growth', alt: 'Make It Ten', width: 800, height: 600 },
  { id: 106, file: 'eleven.jpg', caption: 'Make It Eleven - Extended exploration beyond the original series', alt: 'Make It Eleven', width: 800, height: 600 }
];

/** Loose work shown on the /art page. */
export const assortedArt: ArtImage[] = resolve(ASSORTED, ASSORTED_FILES);

/** The Make It collage series. */
export const makeItArt: ArtImage[] = resolve(MAKEIT, MAKEIT_FILES);

/**
 * Everything uncategorised, in one list: the assorted works plus Make It.
 * Excludes the (Extra)ordinary Portfolio and Motion Media collections, which
 * have pages of their own.
 */
export const uncategorizedArt: ArtImage[] = [...assortedArt, ...makeItArt];
