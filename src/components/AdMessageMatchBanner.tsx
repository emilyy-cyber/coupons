import React, { useState } from 'react';
import { Target, CheckCircle2, Scissors, ExternalLink, Check } from 'lucide-react';
import { getConditionalOutboundUrl } from '../utils/geoIp';
import { copyToClipboard } from '../utils/clipboard';

interface AdMessageMatchBannerProps {
  storeName: string;
  topDiscount: string;
  activeCount: number;
  storeId?: string;
  topOutboundUrl?: string;
  topCouponCode?: string;
}

export const AdMessageMatchBanner: React.FC<AdMessageMatchBannerProps> = ({
  storeName,
  topDiscount,
  activeCount,
  storeId = 'dicks-sporting-goods',
  topOutboundUrl,
  topCouponCode,
}) => {
  const [copied, setCopied] = useState(false);

  const handleClaimTopOffer = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Get destination affiliate link
    const targetUrl = getConditionalOutboundUrl(storeId, topOutboundUrl);

    // 2. Copy top coupon code if available
    if (topCouponCode) {
      copyToClipboard(topCouponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }

    // 3. Open affiliate link:
    // GET CODE mode -> Open in current/back tab
    // GET DEAL mode -> Open in new/next tab
    if (topCouponCode) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }

    // 4. Scroll to coupons section in current tab
    const element = document.getElementById('active-coupons-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white p-4 sm:p-5 rounded-3xl shadow-lg mb-8 border border-orange-400/30 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        
        {/* Ad Relevance Match Badge */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xs shrink-0 text-white border border-white/30">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-white/20 text-white font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-white/30">
                100% Ad Keyword Match
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-orange-100">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" /> Google Ads Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              Verified {storeName} Promo Codes — Get {topDiscount} Today
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 font-medium mt-1">
              Guaranteed message match for search ads. {activeCount} active promotional offers tested working today.
            </p>
          </div>
        </div>

        {/* Above-the-fold Quick Scroll & Affiliate CTA */}
        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={handleClaimTopOffer}
            className={`w-full md:w-auto inline-flex items-center justify-center font-black text-sm px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer border ${
              copied
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-white hover:bg-orange-50 text-orange-700 border-white/50'
            }`}
            id="ad-match-claim-code-btn"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-white" />
                <span>CODE COPIED & STORE OPENED!</span>
              </>
            ) : topCouponCode ? (
              <>
                <Scissors className="w-4 h-4 mr-2 text-orange-600 -rotate-90" />
                <span>Claim Top {topDiscount} Code</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-orange-600" />
              </>
            ) : (
              <>
                <span>Claim Top {topDiscount} Offer</span>
                <ExternalLink className="w-4 h-4 ml-2 text-orange-600" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

