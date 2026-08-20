// Email and content-block assets for the Marshalls e-commerce work.
//
// This list was previously a literal inside EmailAssetsGrid, wrapped in an async
// effect that never awaited anything. It is static data, so it lives here and is
// read directly.

import { getAssetPath } from '../utils/assetUtils';

const ECOMM =
  '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/email_assets';

export interface EmailAsset {
  folderName: string;
  approvedImage: string;
  allImages: string[];
  cbImage?: string;
}

/**
 * @param folder      Campaign folder name, which also prefixes its image files.
 * @param approved    Filename of the approved design.
 * @param variants    Suffixes of the exploration files, appended to the folder name.
 * @param contentBlock Filename in the shared CB folder, if the campaign has one.
 */
const campaign = (
  folder: string,
  approved: string,
  variants: string[] = [],
  contentBlock?: string
): EmailAsset => {
  const inFolder = (file: string) => getAssetPath(`${ECOMM}/EM/${folder}/${file}`);

  return {
    folderName: folder,
    approvedImage: inFolder(approved),
    allImages: [inFolder(approved), ...variants.map(v => inFolder(`${folder}${v}`))],
    ...(contentBlock ? { cbImage: getAssetPath(`${ECOMM}/CB/${contentBlock}`) } : {})
  };
};

export const emailAssets: EmailAsset[] = [
  campaign(
    'Dresses_EMM_Newness_2208560',
    'APPROVED.jpg',
    ['-1.jpg', '-2.jpg'],
    'CB_NewArrivals.jpg'
  ),
  campaign(
    'Dresses_EMM_Volume_2219550',
    'APPROVED.jpg',
    ['-1.gif', '-2.jpg'],
    'CB_Denim.jpg'
  ),
  campaign(
    'NAA_EME_Cinco_de_Mayo_2197778',
    'APPROVED.jpg',
    ['-1.jpg', '-2.jpg'],
    'CB_OutdoorHome.jpg'
  ),
  campaign('TJXR_EA_EME_Summer_TL_V2_2197916', 'APPROVED.jpg'),
  campaign(
    'NA_EMM_Easter_2180600',
    'APPROVED.gif',
    ['-1.gif', '-2.gif', '-3.gif'],
    'CB_FamilySwim.jpg'
  ),
  campaign(
    'NA_EMM_KentuckyDerby_2189878',
    'APPROVED.gif',
    ['-1.gif', '-2.gif', '-3.jpg'],
    'CB_SummerGetaway.jpg'
  ),
  campaign(
    'Food_EMIS_Quality_2223050',
    'APPROVED.gif',
    ['-1.jpg', '-2.jpg', '-3.gif', '-4.gif'],
    'CB_MothersDay.jpg'
  ),
  campaign('NA_EMM_MD_2208450', 'APPROVED.gif'),
  campaign('NA_EMM_Newness_2229700', 'APPROVED.gif', [' - 1.gif', ' - 2.gif', ' - 5.gif']),
  campaign(
    'TA_EME_Summer_TL_V2_2171338',
    'APPROVED.jpg',
    [],
    'CB_Food.gif'
  )
];
