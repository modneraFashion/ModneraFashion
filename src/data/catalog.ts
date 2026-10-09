export type CategoryId =
  | 'ethnic-wear'
  | 'dupatta-set'
  | 'handwork-embroidery'
  | 'kurti-pant'
  | 'bottom-wear'
  | 'frocks';

export interface ReelFrame {
  image: string;
  caption: string;
  subcaption: string;
  objectPosition: string;
  scaleClass: string;
  filterStyle?: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  editionNumber: string;
  tagline: string;
  description: string;
  fabricSignature: string;
  heroImage: string;
  reelFrames: ReelFrame[];
}

export interface MarketplacePartnerInfo {
  platform: 'Flipkart' | 'Amazon' | 'Meesho';
  price: number;
  badgeText: string;
  deliveryEstimate: string;
  sellerName: string;
  productCode: string;
  searchUrl: string;
}

export interface GalleryAngle {
  label: string;
  caption: string;
  image: string;
  objectPosition: string;
  transformClass: string;
  filterClass: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  mrp: number;
  fabric: string;
  embroideryType: string;
  colorName: string;
  colorHex: string;
  sizes: string[];
  availability: string;
  atelierOrigin: string;
  description: string;
  craftDetails: string[];
  videoInspectionHighlights: string[];
  primaryImage: string;
  hoverImage: string;
  hoverObjectPosition: string;
  hoverTransformClass: string;
  galleryAngles: GalleryAngle[];
  partners: {
    flipkart: MarketplacePartnerInfo;
    amazon: MarketplacePartnerInfo;
    meesho: MarketplacePartnerInfo;
  };
}

export const BRAND_INFO = {
  name: 'Modnera Fashion',
  founder: 'The Armaan',
  foundedYear: 2016,
  manufacturingFactory: {
    title: 'Mumbai Manufacturing Atelier',
    address: 'Bandra West Industrial & Couture Zone, Mumbai, Maharashtra — 400051',
    shortAddress: 'Mumbai, Bandra 400051',
    pincode: '400051',
    role: 'Master Pattern Cutting, Hand-Zardozi Looms & Nationwide Dispatch Hub',
    mapQuery: 'Bandra+Mumbai+400051',
  },
  physicalShop: {
    title: 'Madhubani Flagship Boutique',
    address: 'Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road, Bihar — 847212',
    shortAddress: 'Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212',
    pincode: '847212',
    role: 'Walk-in Bridal & Ethnic Showroom, Live Video Shopping Studio & 20-Min Local Hub',
    mapQuery: 'Shanghat+Muhallah+Bhauwara+Madhubani+Stadium+Road+847212',
  },
  contact: {
    phoneDisplay: '+91 77159 66368',
    phoneRaw: '7715966368',
    emails: ['info@modnera.com', 'modneracare@gmail.com'],
    hours: 'Mon – Sun · 10:00 AM to 9:30 PM IST',
  },
  hyperlocalPincodes: ['847212', '847211'],
  channelPartners: ['Flipkart', 'Amazon', 'Meesho'] as const,
};

const IMG_ETHNIC = '/src/assets/images/modnera_ethnic_wear_1791545633365.jpg';
const IMG_DUPATTA = '/src/assets/images/modnera_dupatta_set_1791545646049.jpg';
const IMG_HANDWORK = '/src/assets/images/modnera_handwork_embroidery_1791545659836.jpg';
const IMG_KURTI_PANT = '/src/assets/images/modnera_kurti_pant_1791545673524.jpg';
const IMG_BOTTOM = '/src/assets/images/modnera_bottom_wear_1791545686274.jpg';
const IMG_FROCKS = '/src/assets/images/modnera_frocks_1791545702888.jpg';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ethnic-wear',
    name: 'Ethnic Wear',
    shortName: 'Ethnic Wear',
    editionNumber: '01',
    tagline: 'Regal Anarkalis & Bridal Couture',
    description:
      'Heirloom-grade silk Anarkalis, festive kalidar ensembles, and ceremonial silhouettes crafted with antique zari and architectural flare.',
    fabricSignature: 'Pure Raw Silk & Banarasi Brocade',
    heroImage: IMG_ETHNIC,
    reelFrames: [
      {
        image: IMG_ETHNIC,
        caption: '01 / Full Kalidar Flare',
        subcaption: '24-Kali Crimson Zardozi Anarkali in Motion',
        objectPosition: 'center 20%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_ETHNIC,
        caption: '02 / Bodice Zari Macro',
        subcaption: 'Hand-laid antique gold tilla & kundan neckline',
        objectPosition: 'center 32%',
        scaleClass: 'scale-125',
      },
      {
        image: IMG_HANDWORK,
        caption: '03 / Royal Court Drape',
        subcaption: 'Ivory & Maroon ceremonial bridal edit',
        objectPosition: 'center 45%',
        scaleClass: 'scale-110',
      },
    ],
  },
  {
    id: 'dupatta-set',
    name: 'Dupatta Set',
    shortName: 'Dupatta Set',
    editionNumber: '02',
    tagline: 'Chanderi Suits & Organza Drapes',
    description:
      'Three-piece artisanal ensembles featuring handwoven gold tissue and Banarasi organza dupattas with scalloped zari borders.',
    fabricSignature: 'Emerald Chanderi & Tissue Organza',
    heroImage: IMG_DUPATTA,
    reelFrames: [
      {
        image: IMG_DUPATTA,
        caption: '01 / Tissue Organza Fall',
        subcaption: '2.5-Meter handwoven zari dupatta drape',
        objectPosition: 'center 18%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_DUPATTA,
        caption: '02 / Pallu Border Weave',
        subcaption: 'Intricate marori & gota patti edging',
        objectPosition: 'center 68%',
        scaleClass: 'scale-125',
      },
      {
        image: IMG_KURTI_PANT,
        caption: '03 / Festive Daywear Set',
        subcaption: 'Breathable silk-cotton lining with zari weave',
        objectPosition: 'center 25%',
        scaleClass: 'scale-110',
      },
    ],
  },
  {
    id: 'handwork-embroidery',
    name: 'Hand Work Embroidery Dresses',
    shortName: 'Hand Work Embroidery',
    editionNumber: '03',
    tagline: 'Master Karigar Zardozi & Dabka',
    description:
      'Over 140 hours of meticulous hand needlework per garment by our Bandra 400051 master artisans using French knots, pearls, and dabka.',
    fabricSignature: 'Ivory Mulberry Silk & Pearl Dabka',
    heroImage: IMG_HANDWORK,
    reelFrames: [
      {
        image: IMG_HANDWORK,
        caption: '01 / Couture Silhouette',
        subcaption: 'Floor-sweeping ivory zardozi bridal gown',
        objectPosition: 'center 20%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_HANDWORK,
        caption: '02 / Artisanal Needlework',
        subcaption: 'Close-up 3D pearl, dabka & cut-dana relief',
        objectPosition: 'center 42%',
        scaleClass: 'scale-135',
      },
      {
        image: IMG_ETHNIC,
        caption: '03 / Heritage Ghera Border',
        subcaption: 'Heavy heirloom arch motifs along the hem',
        objectPosition: 'center 82%',
        scaleClass: 'scale-125',
      },
    ],
  },
  {
    id: 'kurti-pant',
    name: 'Kurti / Pant',
    shortName: 'Kurti / Pant',
    editionNumber: '04',
    tagline: 'Tailored Co-ords & Straight Sets',
    description:
      'Contemporary straight-cut silk kurtis paired with structured cigarette pants and tapered trousers for effortless modern grace.',
    fabricSignature: 'Tussar Silk & Resham Threadwork',
    heroImage: IMG_KURTI_PANT,
    reelFrames: [
      {
        image: IMG_KURTI_PANT,
        caption: '01 / Architectural Cut',
        subcaption: 'Terracotta rose resham kurti & cigarette pant',
        objectPosition: 'center 18%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_KURTI_PANT,
        caption: '02 / Botanical Daman Motif',
        subcaption: 'Fine gold kasab embroidery on slit & cuffs',
        objectPosition: 'center 58%',
        scaleClass: 'scale-125',
      },
      {
        image: IMG_DUPATTA,
        caption: '03 / Jewel-Tone Ensemble',
        subcaption: 'Structured neckline with handcrafted potli buttons',
        objectPosition: 'center 28%',
        scaleClass: 'scale-115',
      },
    ],
  },
  {
    id: 'bottom-wear',
    name: 'Bottom Wear',
    shortName: 'Bottom Wear',
    editionNumber: '05',
    tagline: 'Zari Shararas, Palazzos & Silk Pants',
    description:
      'Statement flared shararas, wide-leg embroidered palazzos, and tailored ankle-grazer silk trousers designed to elevate any kurta or crop top.',
    fabricSignature: 'Pearl Chanderi & Scalloped Zari Hem',
    heroImage: IMG_BOTTOM,
    reelFrames: [
      {
        image: IMG_BOTTOM,
        caption: '01 / Flared Sharara Sweep',
        subcaption: 'Wide-ghera ivory silk palazzo with zari panel',
        objectPosition: 'center 25%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_BOTTOM,
        caption: '02 / Paisley Hem Border',
        subcaption: 'Heavy woven antique gold border at ankle fall',
        objectPosition: 'center 78%',
        scaleClass: 'scale-125',
      },
      {
        image: IMG_KURTI_PANT,
        caption: '03 / Tailored Cigarette Fit',
        subcaption: 'Zari-piped ankle cuffs with side-slit finish',
        objectPosition: 'center 85%',
        scaleClass: 'scale-125',
      },
    ],
  },
  {
    id: 'frocks',
    name: 'Frocks',
    shortName: 'Frocks',
    editionNumber: '06',
    tagline: 'Couture Flared Frocks & Gowns',
    description:
      'Whimsical, ultra-flared georgette and organza designer frocks adorned with antique silver sequins, crystal vine work, and fluid drape.',
    fabricSignature: 'Pure Silk Georgette & Silver Sequins',
    heroImage: IMG_FROCKS,
    reelFrames: [
      {
        image: IMG_FROCKS,
        caption: '01 / 360° Couture Twirl',
        subcaption: 'Mauve georgette flared frock with silver vine work',
        objectPosition: 'center 20%',
        scaleClass: 'scale-100',
      },
      {
        image: IMG_FROCKS,
        caption: '02 / Crystal Bodice Detail',
        subcaption: 'Hand-tacked silver bugle beads & sheer sleeves',
        objectPosition: 'center 32%',
        scaleClass: 'scale-125',
      },
      {
        image: IMG_HANDWORK,
        caption: '03 / Evening Reception Edit',
        subcaption: 'Cascading train with luminous beadwork',
        objectPosition: 'center 50%',
        scaleClass: 'scale-115',
      },
    ],
  },
];

export const PRODUCTS: Product[] = [
  // 1. ETHNIC WEAR (3 Products)
  {
    id: 'mod-ew-01',
    sku: 'MOD-EW-101',
    name: 'Begum Meher Crimson Zardozi Anarkali Ensemble',
    category: 'ethnic-wear',
    categoryName: 'Ethnic Wear',
    price: 6490,
    mrp: 8990,
    fabric: 'Pure Mulberry Raw Silk with Organza Dupatta',
    embroideryType: 'Antique Gold Zardozi, Dabka & Kundan Work',
    colorName: 'Deep Sindoor Maroon & Antique Gold',
    colorHex: '#6E141D',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'In Stock · Ready in Madhubani (847212) & Mumbai (400051)',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'A signature Modnera heirloom Anarkali tailored with 24 kalis of deep sindoor maroon raw silk. The bodice and grand Mughal-arch border are hand-embroidered with antique gold tilla, dabka, and micro-pearls.',
    craftDetails: [
      '24-panel full kalidar flare with reinforced horsehair hem for regal structure',
      'Hand-embroidered sweetheart yoke and full-length sheer zardozi sleeves',
      'Includes matching scalloped organza dupatta and churidar silk bottoms',
      '100% breathable cotton-silk mulmul inner lining',
    ],
    videoInspectionHighlights: [
      'Live weight and shimmer test of the 14-inch Mughal arch zardozi hem border',
      'Up-close inspection of the kundan and dabka hand-stitching on the neckline',
      'Full 5-meter flare demonstration on mannequin or stylist frame',
    ],
    primaryImage: IMG_ETHNIC,
    hoverImage: IMG_HANDWORK,
    hoverObjectPosition: 'center 30%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Palace Lookbook',
        caption: 'Full-length silhouette showing 24-kali flare and dupatta drape',
        image: IMG_ETHNIC,
        objectPosition: 'center 15%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Zardozi Arch Border Macro',
        caption: 'Close-up of the hand-worked antique gold Mughal arch ghera',
        image: IMG_ETHNIC,
        objectPosition: 'center 85%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Neckline & Bodice Craft',
        caption: 'Intricate kundan, tilla, and dabka needlework on the bodice',
        image: IMG_ETHNIC,
        objectPosition: 'center 28%',
        transformClass: 'scale-150',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 6799,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-EW101',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Crimson+Zardozi+Anarkali',
      },
      amazon: {
        platform: 'Amazon',
        price: 6850,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-EW101',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Anarkali+Ethnic+Wear',
      },
      meesho: {
        platform: 'Meesho',
        price: 6599,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-EW101',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Ethnic+Wear',
      },
    },
  },
  {
    id: 'mod-ew-02',
    sku: 'MOD-EW-102',
    name: 'Noor-e-Jahan Royal Velvet & Silk Festive Lehenga Set',
    category: 'ethnic-wear',
    categoryName: 'Ethnic Wear',
    price: 7850,
    mrp: 10990,
    fabric: 'Brocade Raw Silk & Micro-Velvet Border',
    embroideryType: 'Marori Zari, Sequins & Resham Florals',
    colorName: 'Imperial Burgundy & Champagne Zari',
    colorHex: '#58111A',
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'In Stock · Ready for 20-Min Local or Express Dispatch',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'Designed by The Armaan for grand wedding receptions and festive evenings, this royal ethnic ensemble combines a structured zari blouse with a heavily bordered silk skirt and double-drape dupatta.',
    craftDetails: [
      'Hand-woven zari brocade panels with antique gold temple border',
      'Includes custom-padded blouse with tassel dori back tie',
      'Can-can net under-layer for natural ceremonial volume',
    ],
    videoInspectionHighlights: [
      'Showcasing the metallic sheen of pure zari under warm and natural light',
      'Inspecting inner can-can softness and side-zipper tailoring finish',
    ],
    primaryImage: IMG_ETHNIC,
    hoverImage: IMG_DUPATTA,
    hoverObjectPosition: 'center 22%',
    hoverTransformClass: 'scale-110',
    galleryAngles: [
      {
        label: 'Ceremonial Silhouette',
        caption: 'Royal courtyard presentation of the Noor-e-Jahan ensemble',
        image: IMG_ETHNIC,
        objectPosition: 'center 25%',
        transformClass: 'scale-105',
        filterClass: 'saturate-110',
      },
      {
        label: 'Ghera Zari Detail',
        caption: 'Dense gold marori embroidery along the lower panels',
        image: IMG_ETHNIC,
        objectPosition: 'center 80%',
        transformClass: 'scale-140',
        filterClass: 'contrast-105',
      },
      {
        label: 'Complementary Zari Drape',
        caption: 'Golden tissue dupatta pairing option',
        image: IMG_DUPATTA,
        objectPosition: 'center 35%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 8150,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-EW102',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Festive+Ethnic+Set',
      },
      amazon: {
        platform: 'Amazon',
        price: 8200,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-EW102',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Royal+Ethnic+Set',
      },
      meesho: {
        platform: 'Meesho',
        price: 7950,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-EW102',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Lehenga+Anarkali',
      },
    },
  },
  {
    id: 'mod-ew-03',
    sku: 'MOD-EW-103',
    name: 'Mithila Heritage Bandhani & Gota Patti Silk Suit',
    category: 'ethnic-wear',
    categoryName: 'Ethnic Wear',
    price: 4290,
    mrp: 5990,
    fabric: 'Handloom Dola Silk with Zari Border',
    embroideryType: 'Artisanal Gota Patti & Mirror Highlights',
    colorName: 'Festive Vermilion & Gold Leaf',
    colorHex: '#8C1D28',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Available at Bhauwara Stadium Road Boutique',
    atelierOrigin: 'Madhubani 847212 Exclusive',
    description:
      'Celebrating our roots at Shanghat Muhallah, Bhauwara, Madhubani, this celebratory Dola silk ethnic suit blends traditional gota patti artistry with contemporary lightweight comfort.',
    craftDetails: [
      'Authentic silver-backed gold gota patti hand-appliquéd on neckline',
      'Lightweight festive wear ideal for pujas, haldi-mehendi, and family gatherings',
      'Paired with matching silk trousers and bordered nazneen dupatta',
    ],
    videoInspectionHighlights: [
      'Softness and drape test of the pure Dola silk weave',
      'Close-up view of the hand-stitched gota patti leaves',
    ],
    primaryImage: IMG_ETHNIC,
    hoverImage: IMG_KURTI_PANT,
    hoverObjectPosition: 'center 20%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Front Lookbook View',
        caption: 'Mithila Heritage Ethnic Suit in sunlit courtyard',
        image: IMG_ETHNIC,
        objectPosition: 'center 10%',
        transformClass: 'scale-110',
        filterClass: 'brightness-105',
      },
      {
        label: 'Neckline Gota Work',
        caption: 'Detailed view of the hand-set yoke embroidery',
        image: IMG_ETHNIC,
        objectPosition: 'center 30%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Daylight Silhouette',
        caption: 'Alternate styling view for daytime festivities',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 20%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 4499,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-EW103',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Silk+Suit',
      },
      amazon: {
        platform: 'Amazon',
        price: 4550,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-EW103',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Silk+Ethnic+Suit',
      },
      meesho: {
        platform: 'Meesho',
        price: 4350,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-EW103',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Gota+Patti+Suit',
      },
    },
  },

  // 2. DUPATTA SET (3 Products)
  {
    id: 'mod-ds-01',
    sku: 'MOD-DS-201',
    name: 'Panna Emerald Chanderi & Gold Tissue Dupatta Set',
    category: 'dupatta-set',
    categoryName: 'Dupatta Set',
    price: 4890,
    mrp: 6990,
    fabric: 'Pure Chanderi Silk Kurta & Handwoven Tissue Zari Dupatta',
    embroideryType: 'Zari Butti Weave & Nakshi Border',
    colorName: 'Panna Emerald & Burnished Gold',
    colorHex: '#0F4C3A',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'In Stock · Bestseller in Madhubani & Mumbai',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'An unmistakable statement of quiet luxury. The jewel-toned Panna Emerald Chanderi kurta is crowned by a grand 2.5-meter liquid-gold tissue organza dupatta with woven zari borders.',
    craftDetails: [
      'Full 2.5-meter handwoven gold tissue dupatta with four-side nakshi zari border',
      'Emerald green Chanderi kurta studded with delicate gold zari buttis',
      'Includes matching silk straight pants with zari ankle border',
    ],
    videoInspectionHighlights: [
      'Demonstrating the liquid-gold sheen and featherlight drape of the tissue dupatta',
      'Inspecting the Chanderi kurta lining and backside weave neatness',
    ],
    primaryImage: IMG_DUPATTA,
    hoverImage: IMG_ETHNIC,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Dupatta Drape',
        caption: 'Emerald Chanderi suit paired with liquid-gold tissue dupatta',
        image: IMG_DUPATTA,
        objectPosition: 'center 15%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Tissue Zari Pallu Macro',
        caption: 'Close-up of the woven gold zari border and tassel corners',
        image: IMG_DUPATTA,
        objectPosition: 'center 72%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Emerald Bodice & Placket',
        caption: 'Hand-embroidered neckline placket with zari motifs',
        image: IMG_DUPATTA,
        objectPosition: 'center 28%',
        transformClass: 'scale-145',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 5199,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-DS201',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Emerald+Dupatta+Set',
      },
      amazon: {
        platform: 'Amazon',
        price: 5250,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-DS201',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Chanderi+Dupatta+Set',
      },
      meesho: {
        platform: 'Meesho',
        price: 4990,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-DS201',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Dupatta+Set',
      },
    },
  },
  {
    id: 'mod-ds-02',
    sku: 'MOD-DS-202',
    name: 'kesar Banarasi Organza & Silk Three-Piece Dupatta Set',
    category: 'dupatta-set',
    categoryName: 'Dupatta Set',
    price: 4450,
    mrp: 6290,
    fabric: 'Katan Silk Suit & Banarasi Cutwork Organza Dupatta',
    embroideryType: 'Banarasi Jangla Weave & Resham Booti',
    colorName: 'Forest Jade & Antique Bronze',
    colorHex: '#185A46',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Ready for 20-Min Local Delivery (847212/847211)',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Crafted for connoisseurs of traditional weaves, this three-piece set highlights a rich Katan silk silhouette complemented by a floating Banarasi organza dupatta.',
    craftDetails: [
      'Hand-finished scalloped zari border along the entire dupatta perimeter',
      'Three-quarter sleeves with woven gold cuff bands',
      'Relaxed yet tailored fit suitable for all-day festive comfort',
    ],
    videoInspectionHighlights: [
      'Showing the translucency and crisp structure of the Banarasi organza dupatta',
      'Checking sleeve cuff embroidery and trouser pocket convenience',
    ],
    primaryImage: IMG_DUPATTA,
    hoverImage: IMG_BOTTOM,
    hoverObjectPosition: 'center 30%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Editorial Portrait',
        caption: 'Full-length view of the Banarasi Organza Dupatta Set',
        image: IMG_DUPATTA,
        objectPosition: 'center 25%',
        transformClass: 'scale-105',
        filterClass: 'contrast-105',
      },
      {
        label: 'Zari Weave Texture',
        caption: 'Macro detail of the metallic zari weave',
        image: IMG_DUPATTA,
        objectPosition: 'center 60%',
        transformClass: 'scale-150',
        filterClass: 'brightness-105',
      },
      {
        label: 'Bottom & Border Pairing',
        caption: 'Coordinated silk bottom hem detail',
        image: IMG_BOTTOM,
        objectPosition: 'center 70%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 4699,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-DS202',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Banarasi+Dupatta+Set',
      },
      amazon: {
        platform: 'Amazon',
        price: 4750,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-DS202',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Organza+Dupatta+Set',
      },
      meesho: {
        platform: 'Meesho',
        price: 4520,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-DS202',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Three+Piece+Suit',
      },
    },
  },
  {
    id: 'mod-ds-03',
    sku: 'MOD-DS-203',
    name: 'Zarina Terracotta Silk Suit with Zari Dupatta Set',
    category: 'dupatta-set',
    categoryName: 'Dupatta Set',
    price: 3890,
    mrp: 5490,
    fabric: 'Pure Tussar Silk Blend with Chanderi Dupatta',
    embroideryType: 'Dori, Sequins & Zari Border Work',
    colorName: 'Terracotta Rose & Champagne',
    colorHex: '#9E473B',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availability: 'In Stock · Express Dispatch Enabled',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'Warm terracotta tones meet shimmering champagne zari in this versatile dupatta set that transitions effortlessly from daytime celebrations to evening dinners.',
    craftDetails: [
      'Botanical jharokha motifs embroidered along the daman and sleeves',
      'Paired with a contrasting champagne gold tissue-silk dupatta',
      'Includes ankle-length cigarette trousers with zari piping',
    ],
    videoInspectionHighlights: [
      'Color accuracy check of the terracotta rose hue under daylight and warm bulbs',
      'Close-up of the daman floral threadwork',
    ],
    primaryImage: IMG_DUPATTA,
    hoverImage: IMG_KURTI_PANT,
    hoverObjectPosition: 'center 18%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Dupatta Drape Look',
        caption: 'Classic shoulder drape showing full 2.5m zari length',
        image: IMG_DUPATTA,
        objectPosition: 'center 20%',
        transformClass: 'scale-100',
        filterClass: 'sepia-[.12]',
      },
      {
        label: 'Kurta Silhouette View',
        caption: 'Unencumbered view of the embroidered kurta and pant cut',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 20%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Daman Floral Detail',
        caption: 'Macro shot of the gold resham botanical motif',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 68%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 4099,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-DS203',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Terracotta+Dupatta+Set',
      },
      amazon: {
        platform: 'Amazon',
        price: 4150,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-DS203',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Tussar+Dupatta+Set',
      },
      meesho: {
        platform: 'Meesho',
        price: 3950,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-DS203',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Silk+Dupatta+Set',
      },
    },
  },

  // 3. HAND WORK EMBROIDERY DRESSES (3 Products)
  {
    id: 'mod-hw-01',
    sku: 'MOD-HW-301',
    name: 'Ruhani Ivory Pearl & Dabka Hand-Embroidered Couture Dress',
    category: 'handwork-embroidery',
    categoryName: 'Hand Work Embroidery Dresses',
    price: 8990,
    mrp: 12990,
    fabric: 'Heavy Ivory Raw Silk & Pure Organza Train',
    embroideryType: '100% Hand-Crafted Zardozi, Dabka, Pearl & Cut-Dana',
    colorName: 'Alabaster Ivory & Champagne Gold',
    colorHex: '#D8C7A8',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'Limited Atelier Edition · Ready in Bandra & Madhubani',
    atelierOrigin: 'Bandra Mumbai 400051 Master Karigar Loom',
    description:
      'The pinnacle of Modnera Fashion’s Mumbai Bandra (400051) craftsmanship. Every square inch of the Ruhani Couture Dress is hand-embroidered on wooden adda frames using metallic dabka coils, freshwater-toned seed pearls, and paisley zardozi.',
    craftDetails: [
      '148 man-hours of authentic hand adda embroidery by Bandra master artisans',
      '3D raised pearl and dabka paisley motifs from high-neck collar to trailing hem',
      'Full-length fitted bodice flaring into a cathedral-inspired royal kali train',
      'Custom measurements complimentary on Direct Website orders',
    ],
    videoInspectionHighlights: [
      'Extreme macro camera pass over the raised 3D pearl and dabka bullion knots',
      'Demonstrating the interior silk-satin lining that protects skin from handwork threads',
      'Showing how the champagne gold beadwork catches chandelier lighting',
    ],
    primaryImage: IMG_HANDWORK,
    hoverImage: IMG_FROCKS,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Couture Profile',
        caption: 'Floor-sweeping ivory and champagne gold handwork silhouette',
        image: IMG_HANDWORK,
        objectPosition: 'center 20%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: '3D Dabka & Pearl Macro',
        caption: 'Intricate hand-sewn paisley and floral trellis on bodice & sleeves',
        image: IMG_HANDWORK,
        objectPosition: 'center 38%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Cathedral Hem Train',
        caption: 'Heavy scalloped zardozi border pooling along the floor',
        image: IMG_HANDWORK,
        objectPosition: 'center 85%',
        transformClass: 'scale-140',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 9499,
        badgeText: 'Flipkart Assured · Modnera Couture',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-HW301',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Handwork+Embroidery+Dress',
      },
      amazon: {
        platform: 'Amazon',
        price: 9590,
        badgeText: 'Amazon Prime · Luxury Edition',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-HW301',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Hand+Embroidered+Gown',
      },
      meesho: {
        platform: 'Meesho',
        price: 9150,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-HW301',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Bridal+Handwork+Dress',
      },
    },
  },
  {
    id: 'mod-hw-02',
    sku: 'MOD-HW-302',
    name: 'Aafreen Kundan & Kasab Hand-Worked Bridal Peshwas',
    category: 'handwork-embroidery',
    categoryName: 'Hand Work Embroidery Dresses',
    price: 7490,
    mrp: 10490,
    fabric: 'Pure Silk Georgette & Raw Silk Paneling',
    embroideryType: 'Hand-Set Kundan Stones, Nakshi & French Knots',
    colorName: 'Champagne Gold & Antique Ivory',
    colorHex: '#C5B08B',
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'In Stock · Ready for Live Video Inspection',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Inspired by royal Mughal peshwas silhouettes, the Aafreen dress combines delicatepastel French knots with hand-set kundan stones that illuminate every movement.',
    craftDetails: [
      'Hand-tacked kundan stones reinforced with double silk thread',
      'Full-length fitted sleeves with heavy bridal jaal pattern',
      'Includes matching pearl-edged net veil dupatta',
    ],
    videoInspectionHighlights: [
      'Close-up tug test showing the durability of hand-stitched kundan settings',
      'Full 360-degree view of back embroidery matches front density',
    ],
    primaryImage: IMG_HANDWORK,
    hoverImage: IMG_ETHNIC,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Atelier Portrait',
        caption: 'Aafreen Hand-Worked Peshwas in natural studio light',
        image: IMG_HANDWORK,
        objectPosition: 'center 28%',
        transformClass: 'scale-110',
        filterClass: 'contrast-105',
      },
      {
        label: 'Sleeve Jaal Needlework',
        caption: 'Dense nakshi and pearl work along the full sleeve',
        image: IMG_HANDWORK,
        objectPosition: 'center 45%',
        transformClass: 'scale-150',
        filterClass: 'brightness-105',
      },
      {
        label: 'Royal Red Contrast Option',
        caption: 'Also available in crimson bridal colorway upon request',
        image: IMG_ETHNIC,
        objectPosition: 'center 30%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 7899,
        badgeText: 'Flipkart Assured · Modnera Couture',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-HW302',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Kundan+Handwork+Dress',
      },
      amazon: {
        platform: 'Amazon',
        price: 7950,
        badgeText: 'Amazon Prime · Luxury Edition',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-HW302',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Kundan+Embroidery+Dress',
      },
      meesho: {
        platform: 'Meesho',
        price: 7650,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-HW302',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Handwork+Gown',
      },
    },
  },
  {
    id: 'mod-hw-03',
    sku: 'MOD-HW-303',
    name: 'Zoya Resham & Mirror Hand-Embroidered Evening Dress',
    category: 'handwork-embroidery',
    categoryName: 'Hand Work Embroidery Dresses',
    price: 5990,
    mrp: 8490,
    fabric: 'Crushed Tissue Silk & Organza Overlay',
    embroideryType: 'Real Mirror Work (Abhla), Kardana & Silk Thread',
    colorName: 'Warm Sand & Silver-Gold Zari',
    colorHex: '#B8A382',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availability: 'In Stock · 20-Min Delivery in 847212 / 847211',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'A lighter, contemporary interpretation of our handwork heritage. Real micro-mirrors (abhla) and kardana beads trace geometric arches down the torso and flare.',
    craftDetails: [
      'Hand-locked real mirror work with metallic silk thread frames',
      'Concealed side pockets integrated seamlessly into the kali seams',
      'Featherweight construction despite rich surface ornamentation',
    ],
    videoInspectionHighlights: [
      'Mirror sparkle test under studio movement',
      'Inspecting the concealed side pockets and seam finishing',
    ],
    primaryImage: IMG_HANDWORK,
    hoverImage: IMG_BOTTOM,
    hoverObjectPosition: 'center 35%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Silhouette',
        caption: 'Warm sand tissue silk with geometric mirror work',
        image: IMG_HANDWORK,
        objectPosition: 'center 15%',
        transformClass: 'scale-105',
        filterClass: 'brightness-105',
      },
      {
        label: 'Paisley & Mirror Macro',
        caption: 'Close-up of the lower panel hand embroidery',
        image: IMG_HANDWORK,
        objectPosition: 'center 70%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Coordinated Skirt Detail',
        caption: 'Matching ivory-gold flared lower silhouette',
        image: IMG_BOTTOM,
        objectPosition: 'center 60%',
        transformClass: 'scale-115',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 6299,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-HW303',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Mirror+Handwork+Dress',
      },
      amazon: {
        platform: 'Amazon',
        price: 6350,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-HW303',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Mirror+Work+Dress',
      },
      meesho: {
        platform: 'Meesho',
        price: 6090,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-HW303',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Evening+Dress',
      },
    },
  },

  // 4. KURTI / PANT (3 Products)
  {
    id: 'mod-kp-01',
    sku: 'MOD-KP-401',
    name: 'Samaira Terracotta Silk Kurti & Cigarette Pant Set',
    category: 'kurti-pant',
    categoryName: 'Kurti / Pant',
    price: 2890,
    mrp: 4290,
    fabric: 'Pure Tussar-Chanderi Silk with Mulmul Lining',
    embroideryType: 'Linear Zari Track & Botanical Resham Daman',
    colorName: 'Terracotta Rose & Antique Gold',
    colorHex: '#A44A3F',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Ready for 20-Min Local Delivery (847212/847211)',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Architectural vertical zari lines elongate the frame in our bestselling Samaira Kurti & Pant set. Tailored from breathable Tussar-Chanderi silk in a warm terracotta rose tone, paired with ankle-grazer cigarette pants.',
    craftDetails: [
      'Mandarin slit collar with handcrafted antique gold potli buttons',
      'Vertical princess-line zari embroidery with botanical corner motifs',
      'Tailored cigarette pants with elasticated back waist, drawstring, and deep pockets',
    ],
    videoInspectionHighlights: [
      'Showing the tailored fit and ankle slit detail of the cigarette pants',
      'Demonstrating the non-sheer cotton mulmul lining inside the silk kurti',
    ],
    primaryImage: IMG_KURTI_PANT,
    hoverImage: IMG_DUPATTA,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Co-ord Look',
        caption: 'Samaira Straight Kurti and Cigarette Pant in architectural studio',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 18%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Neckline & Potli Buttons',
        caption: 'Close-up of the mandarin collar and shoulder zari work',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 25%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Cigarette Pant & Daman',
        caption: 'Botanical corner embroidery and piped trouser cuff',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 78%',
        transformClass: 'scale-140',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 3099,
        badgeText: 'Flipkart Assured · Top Rated',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-KP401',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Kurti+Pant+Set',
      },
      amazon: {
        platform: 'Amazon',
        price: 3150,
        badgeText: 'Amazon Prime · Bestseller',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-KP401',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Kurti+Pant+Set',
      },
      meesho: {
        platform: 'Meesho',
        price: 2950,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-KP401',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Kurti+Pant',
      },
    },
  },
  {
    id: 'mod-kp-02',
    sku: 'MOD-KP-402',
    name: 'Inaya Emerald Straight Silk Kurta & Tapered Trouser Set',
    category: 'kurti-pant',
    categoryName: 'Kurti / Pant',
    price: 3190,
    mrp: 4590,
    fabric: 'Pure Roman Silk with Zari Threadwork',
    embroideryType: 'Minimalist Zari Placket & Cuff Embroidery',
    colorName: 'Emerald Green & Gold Zari',
    colorHex: '#13523E',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Available at Madhubani Boutique & Online',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'Sleek, crease-resistant Roman silk tailored into a sharp straight-fit kurta and ankle-length tapered trouser set—ideal for executive festive days and intimate gatherings.',
    craftDetails: [
      'Lustrous Roman silk that requires minimal ironing',
      'Subtle gold zari bootis across the front panel',
      'Comfort-stretch waistband on trousers with dual side pockets',
    ],
    videoInspectionHighlights: [
      'Wrinkle-resistance hand-crush test on live video call',
      'Close-up of the emerald Roman silk sheen',
    ],
    primaryImage: IMG_KURTI_PANT,
    hoverImage: IMG_BOTTOM,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Studio Full View',
        caption: 'Clean straight-cut silhouette with ankle trousers',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 22%',
        transformClass: 'scale-105',
        filterClass: 'contrast-105',
      },
      {
        label: 'Emerald Colorway Preview',
        caption: 'Rich emerald green silk variant with gold embroidery',
        image: IMG_DUPATTA,
        objectPosition: 'center 25%',
        transformClass: 'scale-115',
        filterClass: 'brightness-100',
      },
      {
        label: 'Sleeve & Cuff Detail',
        caption: 'Three-quarter sleeve finished with geometric zari border',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 48%',
        transformClass: 'scale-145',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 3399,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-KP402',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Straight+Kurta+Trouser',
      },
      amazon: {
        platform: 'Amazon',
        price: 3450,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-KP402',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Roman+Silk+Kurti+Pant',
      },
      meesho: {
        platform: 'Meesho',
        price: 3250,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-KP402',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Silk+Kurti+Set',
      },
    },
  },
  {
    id: 'mod-kp-03',
    sku: 'MOD-KP-403',
    name: 'Tara Ivory & Gold Chikankari-Zari Kurti Pant Co-ord',
    category: 'kurti-pant',
    categoryName: 'Kurti / Pant',
    price: 3490,
    mrp: 4990,
    fabric: 'Chanderi Modal Silk',
    embroideryType: 'Resham Threadwork & Badla Mukaish Dots',
    colorName: 'Warm Ivory & Burnished Copper',
    colorHex: '#B66352',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'In Stock · Express Dispatch Enabled',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Combining soft resham florals with metallic zari highlights, the Tara Kurti & Pant Co-ord delivers refined daytime sophistication.',
    craftDetails: [
      'Hand-finished side slits with zari taping',
      'Straight-leg pants with embroidered hem vents',
      'Pre-washed, zero-shrinkage modal silk fabric',
    ],
    videoInspectionHighlights: [
      'Inspecting the softness of the modal-silk interior against the hand',
      'Viewing the embroidered hem vents on the pants',
    ],
    primaryImage: IMG_KURTI_PANT,
    hoverImage: IMG_HANDWORK,
    hoverObjectPosition: 'center 30%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Co-ord Silhouette',
        caption: 'Balanced proportions of the 44-inch kurti and 38-inch pant',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 15%',
        transformClass: 'scale-100',
        filterClass: 'brightness-105',
      },
      {
        label: 'Ivory Embroidery Variant',
        caption: 'Warm ivory and gold threadwork detail',
        image: IMG_BOTTOM,
        objectPosition: 'center 30%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
      {
        label: 'Trouser Hem Vent',
        caption: 'Tailored ankle finish with metallic piping',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 88%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 3699,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-KP403',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Chanderi+Kurti+Pant',
      },
      amazon: {
        platform: 'Amazon',
        price: 3750,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-KP403',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Kurti+Pant+Coord',
      },
      meesho: {
        platform: 'Meesho',
        price: 3550,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-KP403',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Coord+Set',
      },
    },
  },

  // 5. BOTTOM WEAR (3 Products)
  {
    id: 'mod-bw-01',
    sku: 'MOD-BW-501',
    name: 'Maharani Pearl Ivory Zari-Bordered Flared Sharara',
    category: 'bottom-wear',
    categoryName: 'Bottom Wear',
    price: 2690,
    mrp: 3990,
    fabric: 'Pure Chanderi Silk with Crepe Lining',
    embroideryType: 'Heavy Paisley Zari & Sequin Hem Panels',
    colorName: 'Pearl Ivory & Antique Gold',
    colorHex: '#DFD3BE',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · 20-Min Local Delivery in 847212 / 847211',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Engineered with the fullness of a lehenga skirt and the effortless comfort of wide-leg palazzos. Our Maharani Pearl Ivory Sharara pairs seamlessly with short kurtis, long slits, or silk crop tops.',
    craftDetails: [
      'Each leg features a 1.8-meter pleated flare for dramatic movement',
      'Woven and embroidered antique gold paisley border along the bottom 16 inches',
      'Contoured front belt with zari embroidery and concealed side zip + back elastic',
    ],
    videoInspectionHighlights: [
      'Demonstrating how the wide flare looks like a continuous skirt when standing still',
      'Close-up of the paisley gold zari border weave and inner crepe lining',
    ],
    primaryImage: IMG_BOTTOM,
    hoverImage: IMG_HANDWORK,
    hoverObjectPosition: 'center 65%',
    hoverTransformClass: 'scale-110',
    galleryAngles: [
      {
        label: 'Full Flared Stance',
        caption: 'Pearl ivory sharara showing full kali flare and waistband',
        image: IMG_BOTTOM,
        objectPosition: 'center 25%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Paisley Zari Hem Macro',
        caption: '16-inch ornamental antique gold border detail',
        image: IMG_BOTTOM,
        objectPosition: 'center 82%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Waistband & Pleat Construction',
        caption: 'Embroidered belt with structured box pleats',
        image: IMG_BOTTOM,
        objectPosition: 'center 48%',
        transformClass: 'scale-145',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 2899,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-BW501',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Flared+Sharara+Palazzo',
      },
      amazon: {
        platform: 'Amazon',
        price: 2950,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-BW501',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Sharara+Bottom+Wear',
      },
      meesho: {
        platform: 'Meesho',
        price: 2750,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-BW501',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Sharara+Bottom',
      },
    },
  },
  {
    id: 'mod-bw-02',
    sku: 'MOD-BW-502',
    name: 'Nawabiyat Wide-Leg Embroidered Silk Palazzo Trousers',
    category: 'bottom-wear',
    categoryName: 'Bottom Wear',
    price: 2190,
    mrp: 3290,
    fabric: 'Raw Silk Blend',
    embroideryType: 'Jharokha Arch Zari & Sequins Border',
    colorName: 'Champagne Cream & Gold',
    colorHex: '#D5C5AA',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Ready in Madhubani & Mumbai',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'A wardrobe staple crafted to elevate every kurta in your closet. The Nawabiyat Wide-Leg Palazzo features architectural arch embroidery from mid-calf to ankle.',
    craftDetails: [
      'Non-clinging raw silk blend with soft santoon lining',
      'Deep utility pockets on both sides',
      'Universal champagne cream shade matches maroon, emerald, navy, and pastel tops',
    ],
    videoInspectionHighlights: [
      'Matching test showing how the champagne shade pairs with dark and pastel kurtis',
      'Checking waistband stretch and pocket depth',
    ],
    primaryImage: IMG_BOTTOM,
    hoverImage: IMG_KURTI_PANT,
    hoverObjectPosition: 'center 75%',
    hoverTransformClass: 'scale-115',
    galleryAngles: [
      {
        label: 'Wide-Leg Profile',
        caption: 'Effortless drape of the Nawabiyat Silk Palazzo',
        image: IMG_BOTTOM,
        objectPosition: 'center 35%',
        transformClass: 'scale-105',
        filterClass: 'contrast-105',
      },
      {
        label: 'Arch Border Close-Up',
        caption: 'Detailed zari and sequin needlework at the hem',
        image: IMG_BOTTOM,
        objectPosition: 'center 75%',
        transformClass: 'scale-150',
        filterClass: 'brightness-105',
      },
      {
        label: 'Tailored Cigarette Option',
        caption: 'Compare with our tapered cigarette silhouette',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 80%',
        transformClass: 'scale-125',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 2399,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-BW502',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Silk+Palazzo',
      },
      amazon: {
        platform: 'Amazon',
        price: 2450,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-BW502',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Embroidered+Palazzo',
      },
      meesho: {
        platform: 'Meesho',
        price: 2250,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-BW502',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Palazzo+Pant',
      },
    },
  },
  {
    id: 'mod-bw-03',
    sku: 'MOD-BW-503',
    name: 'Zari-Piped Tailored Silk Cigarette Trousers (Pack of 2 — Ivory & Rose)',
    category: 'bottom-wear',
    categoryName: 'Bottom Wear',
    price: 1890,
    mrp: 2790,
    fabric: 'Stretch Cotton-Silk',
    embroideryType: 'Double Zari Piping & Ankle Slit Buttons',
    colorName: 'Pearl Ivory + Terracotta Rose Duo',
    colorHex: '#9E473B',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Express & 20-Min Local Delivery',
    atelierOrigin: 'Bandra Mumbai 400051 Factory Direct',
    description:
      'Precision-cut ankle-length cigarette pants in breathable stretch cotton-silk. Finished with delicate gold zari piping at the cuff and side ankle vents.',
    craftDetails: [
      '4-way comfort stretch cotton-silk weave for all-day wear',
      'Reinforced crotch gusset for durability and ease of movement',
      'Flat front belt for a smooth profile under fitted kurtis',
    ],
    videoInspectionHighlights: [
      'Stretch test and fabric thickness demonstration on camera',
      'Close-up of the ankle zari piping',
    ],
    primaryImage: IMG_BOTTOM,
    hoverImage: IMG_DUPATTA,
    hoverObjectPosition: 'center 60%',
    hoverTransformClass: 'scale-110',
    galleryAngles: [
      {
        label: 'Ivory Bottom Look',
        caption: 'Pearl ivory bottom wear styling',
        image: IMG_BOTTOM,
        objectPosition: 'center 40%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
      {
        label: 'Terracotta Cigarette Fit',
        caption: 'Tapered ankle-grazer cut with zari cuff',
        image: IMG_KURTI_PANT,
        objectPosition: 'center 82%',
        transformClass: 'scale-135',
        filterClass: 'contrast-105',
      },
      {
        label: 'Hem Detail View',
        caption: 'Precision stitching from our Bandra 400051 factory',
        image: IMG_BOTTOM,
        objectPosition: 'center 85%',
        transformClass: 'scale-150',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 1999,
        badgeText: 'Flipkart Assured · Value Duo',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-BW503',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Cigarette+Pants',
      },
      amazon: {
        platform: 'Amazon',
        price: 2050,
        badgeText: 'Amazon Prime · Bestseller',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-BW503',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Silk+Trousers+Women',
      },
      meesho: {
        platform: 'Meesho',
        price: 1920,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-BW503',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Women+Trousers',
      },
    },
  },

  // 6. FROCKS (3 Products)
  {
    id: 'mod-fr-01',
    sku: 'MOD-FR-601',
    name: 'Celeste Dusty Mauve Silver-Sequin Flared Couture Frock',
    category: 'frocks',
    categoryName: 'Frocks',
    price: 5690,
    mrp: 7990,
    fabric: 'Pure Whisper Georgette with Satin Organza Underlayer',
    embroideryType: 'Antique Silver Sequins, Cut-Dana & Botanical Vines',
    colorName: 'Dusty Mauve & Antique Silver',
    colorHex: '#7A626D',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    availability: 'In Stock · Ready in Madhubani (847212) & Mumbai (400051)',
    atelierOrigin: 'Bandra Mumbai 400051 Couture Studio',
    description:
      'Designed for unforgettable twirls and cocktail evenings. The Celeste Couture Frock pairs a sculpted V-neck silver-beaded bodice with 6 meters of cascading dusty mauve silk georgette.',
    craftDetails: [
      '6-meter umbrella-cut georgette flare with rolled picot wire hem',
      'Hand-embroidered silver botanical vines cascading from waist to mid-skirt',
      'Sheer illusion sleeves studded with crystal bugle beads',
      'Built-in cups and concealed back zipper for an impeccable fit',
    ],
    videoInspectionHighlights: [
      'Live twirl and drape flow demonstration showing the 6-meter georgette flare',
      'Macro view of the silver bugle beads and sequin vine work on the bodice',
      'Inspecting the double satin lining for complete opacity',
    ],
    primaryImage: IMG_FROCKS,
    hoverImage: IMG_HANDWORK,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: '360° Twirl Silhouette',
        caption: 'Full-motion view of the 6-meter dusty mauve georgette frock',
        image: IMG_FROCKS,
        objectPosition: 'center 20%',
        transformClass: 'scale-100',
        filterClass: 'brightness-100',
      },
      {
        label: 'Silver Vine Bodice Macro',
        caption: 'Hand-sewn antique silver sequins and crystal beadwork',
        image: IMG_FROCKS,
        objectPosition: 'center 32%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Cascading Skirt Wave',
        caption: 'Close-up of the fluid georgette pleats and trailing vines',
        image: IMG_FROCKS,
        objectPosition: 'center 68%',
        transformClass: 'scale-140',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 5999,
        badgeText: 'Flipkart Assured · Modnera Couture',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-FR601',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Designer+Frock+Gown',
      },
      amazon: {
        platform: 'Amazon',
        price: 6050,
        badgeText: 'Amazon Prime · Luxury Edition',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-FR601',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Flared+Frock+Women',
      },
      meesho: {
        platform: 'Meesho',
        price: 5790,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-FR601',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Ladies+Frock',
      },
    },
  },
  {
    id: 'mod-fr-02',
    sku: 'MOD-FR-602',
    name: 'parisa Rose-Quartz Pleated Organza Midi & Floor Frock',
    category: 'frocks',
    categoryName: 'Frocks',
    price: 4390,
    mrp: 6190,
    fabric: 'Silk Organza with Micro-Pleated Skirt',
    embroideryType: '3D Organza Petals & Silver Resham',
    colorName: 'Lavender Smoke & Pearl Silver',
    colorHex: '#8E7884',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availability: 'In Stock · 20-Min Local Delivery in 847212 / 847211',
    atelierOrigin: 'Madhubani Flagship & Bandra Studio',
    description:
      'Romantic, airy, and sculpted to perfection. The Parisa Frock features sun-ray pleats that expand gracefully with every step, accented by a beaded cinched waist belt.',
    craftDetails: [
      'Permanent heat-set sun-ray pleats that retain crispness after wear',
      'Hand-beaded waist belt stitched seamlessly to the bodice',
      'Breathable butter-crepe inner lining',
    ],
    videoInspectionHighlights: [
      'Showing the bounce and movement of the sun-ray organza pleats',
      'Close-up of the waist belt beadwork and sleeve finish',
    ],
    primaryImage: IMG_FROCKS,
    hoverImage: IMG_ETHNIC,
    hoverObjectPosition: 'center 25%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Atelier Motion Shot',
        caption: 'Parisa Organza Frock in sunlit Bandra atelier',
        image: IMG_FROCKS,
        objectPosition: 'center 25%',
        transformClass: 'scale-105',
        filterClass: 'brightness-105',
      },
      {
        label: 'Waist Belt & Pleat Detail',
        caption: 'Cinched beaded waistline transitioning into flared skirt',
        image: IMG_FROCKS,
        objectPosition: 'center 45%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Ivory Bridal Frock Option',
        caption: 'Alternate heavy ivory-gold floor-length edition',
        image: IMG_HANDWORK,
        objectPosition: 'center 30%',
        transformClass: 'scale-110',
        filterClass: 'brightness-100',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 4650,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-FR602',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Organza+Frock',
      },
      amazon: {
        platform: 'Amazon',
        price: 4690,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-FR602',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Organza+Gown+Frock',
      },
      meesho: {
        platform: 'Meesho',
        price: 4490,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-FR602',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Party+Wear+Frock',
      },
    },
  },
  {
    id: 'mod-fr-03',
    sku: 'MOD-FR-603',
    name: 'Noorani Ivory Lace & Zari Fusion Tiered Frock',
    category: 'frocks',
    categoryName: 'Frocks',
    price: 3990,
    mrp: 5690,
    fabric: 'Chanderi Silk & Chantilly-Inspired Floral Lace',
    embroideryType: 'Pearl Beadwork & Scalloped Lace Tiers',
    colorName: 'Vintage Ivory & Dusty Rose',
    colorHex: '#C2B1A8',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock · Express Pan-India Delivery',
    atelierOrigin: 'Bandra Mumbai 400051 Atelier',
    description:
      'Blending European atelier lace aesthetics with Indian hand-beaded craft, the Noorani Tiered Frock is a favourite for engagement brunches, birthday soirées, and festive evenings.',
    craftDetails: [
      'Three graduated tiers of embroidered silk and floral lace',
      'Full sleeves with pearl-buttoned cuffs',
      'Lightweight, travel-friendly silhouette',
    ],
    videoInspectionHighlights: [
      'Showing the intricate floral lace texture alongside pearl work',
      'Demonstrating sleeve cuff buttons and tier proportions',
    ],
    primaryImage: IMG_FROCKS,
    hoverImage: IMG_KURTI_PANT,
    hoverObjectPosition: 'center 20%',
    hoverTransformClass: 'scale-105',
    galleryAngles: [
      {
        label: 'Full Tiered Look',
        caption: 'Graceful movement of the Noorani Fusion Frock',
        image: IMG_FROCKS,
        objectPosition: 'center 15%',
        transformClass: 'scale-110',
        filterClass: 'sepia-[.08]',
      },
      {
        label: 'Sleeve & Shoulder Lace',
        caption: 'Sheer embroidered sleeve detail',
        image: IMG_FROCKS,
        objectPosition: 'center 28%',
        transformClass: 'scale-150',
        filterClass: 'contrast-105',
      },
      {
        label: 'Ivory Handwork Close-Up',
        caption: 'Artisanal pearl and thread detailing',
        image: IMG_HANDWORK,
        objectPosition: 'center 40%',
        transformClass: 'scale-125',
        filterClass: 'brightness-105',
      },
    ],
    partners: {
      flipkart: {
        platform: 'Flipkart',
        price: 4199,
        badgeText: 'Flipkart Assured · Modnera Official',
        deliveryEstimate: '3–5 Business Days',
        sellerName: 'Modnera Fashion Retail',
        productCode: 'FK-MOD-FR603',
        searchUrl: 'https://www.flipkart.com/search?q=Modnera+Fashion+Tiered+Frock',
      },
      amazon: {
        platform: 'Amazon',
        price: 4250,
        badgeText: 'Amazon Prime · Designer Boutique',
        deliveryEstimate: '2–4 Business Days',
        sellerName: 'Modnera Couture Official',
        productCode: 'AMZ-MOD-FR603',
        searchUrl: 'https://www.amazon.in/s?k=Modnera+Fashion+Fusion+Frock',
      },
      meesho: {
        platform: 'Meesho',
        price: 4050,
        badgeText: 'Meesho Mall · Verified Brand',
        deliveryEstimate: '4–6 Business Days',
        sellerName: 'Modnera Factory Direct',
        productCode: 'MSH-MOD-FR603',
        searchUrl: 'https://www.meesho.com/search?q=Modnera+Fashion+Tiered+Gown',
      },
    },
  },
];

export function evaluatePincodeDelivery(rawPincode: string): {
  isValid: boolean;
  isHyperlocal20Min: boolean;
  pincode: string;
  headline: string;
  subline: string;
  dispatchHub: string;
  feeText: string;
} {
  const cleaned = rawPincode.replace(/\D/g, '').slice(0, 6);
  if (cleaned.length !== 6) {
    return {
      isValid: false,
      isHyperlocal20Min: false,
      pincode: cleaned,
      headline: 'Enter a 6-digit Indian Pincode to check delivery speed',
      subline: 'Pincodes 847212 & 847211 qualify for 20-Minute Boutique Rider Delivery. All other pincodes receive Express Insured Shipping.',
      dispatchHub: 'Madhubani Flagship (847212) / Mumbai Bandra (400051)',
      feeText: 'Complimentary on Direct Website Orders',
    };
  }

  if (cleaned === '847212' || cleaned === '847211') {
    return {
      isValid: true,
      isHyperlocal20Min: true,
      pincode: cleaned,
      headline: `20-Minute Hyperlocal Delivery Available for ${cleaned}`,
      subline:
        'Your location is within our Madhubani Flagship Zone! A dedicated Modnera Fashion boutique rider will deliver your garment within 20 minutes from Shanghat Muhallah, Bhauwara, Stadium Road (847212).',
      dispatchHub: 'Madhubani Flagship Boutique (Shanghat Muhallah, Bhauwara — 847212)',
      feeText: 'FREE 20-Min Priority Delivery · Pay on Delivery or UPI',
    };
  }

  return {
    isValid: true,
    isHyperlocal20Min: false,
    pincode: cleaned,
    headline: `Express Insured Delivery Available for Pincode ${cleaned}`,
    subline:
      'Priority Air/Surface Express dispatch in tamper-proof couture packaging (Estimated arrival: 2–4 Business Days).',
    dispatchHub:
      cleaned.startsWith('40')
        ? 'Mumbai Bandra Manufacturing Factory (400051) — Next-Day Metro Express'
        : 'Mumbai Bandra Factory (400051) & Madhubani Hub (847212)',
    feeText: 'FREE Express Insured Shipping across India',
  };
}
