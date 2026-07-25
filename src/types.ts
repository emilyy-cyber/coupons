export type CouponType = 'code' | 'deal' | 'free_shipping' | 'exclusive';

export interface Coupon {
  id: string;
  storeId: string;
  storeName: string;
  storeLogo: string;
  title: string;
  description: string;
  code?: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping' | 'buy_get';
  discountValue: string; // e.g. "20% OFF", "$15 OFF", "FREE SHIPPING"
  type: CouponType;
  expiryDate: string;
  verifiedCount: number;
  successRate: number; // e.g. 96 (%)
  isVerifiedToday: boolean;
  isStaffPick?: boolean;
  isExclusive?: boolean;
  terms?: string;
  usedCountToday: number;
  category: string;
  outboundUrl: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  bgAccentColor?: string;
  rating: number;
  reviewCount: number;
  averageSavings: string; // e.g. "$34.50"
  activeOffersCount: number;
  verifiedCodesCount: number;
  topDiscount: string; // e.g. "50% OFF"
  category: string;
  description: string;
  aboutContent: string;
  shoppingTips: string[];
  faqs: { question: string; answer: string }[];
  websiteUrl: string;
  isTrending?: boolean;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  storeCount: number;
  couponCount: number;
  description: string;
  featuredDiscount: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface QualityScoreMetrics {
  overallScore: number;
  landingPageRelevance: number;
  expectedCtr: number;
  mobileUserExperience: string;
  lcpTime: string;
  clsScore: string;
  inpTime: string;
  ttfbTime: string;
  pagespeedScore: number;
}
