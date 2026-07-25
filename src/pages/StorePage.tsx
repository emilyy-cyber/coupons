import React, { useState } from 'react';
import { storesData } from '../data/storesData';
import { couponsData } from '../data/couponsData';
import { CouponCard } from '../components/CouponCard';
import { AdMessageMatchBanner } from '../components/AdMessageMatchBanner';
import { Coupon, Store } from '../types';
import { ShieldCheck, Star, ExternalLink, HelpCircle, Lightbulb, ChevronDown, ChevronUp, FileCode, ArrowLeft } from 'lucide-react';

interface StorePageProps {
  storeId: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCouponModal: (coupon: Coupon) => void;
  onOpenSchemaModal: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  storeId,
  onNavigate,
  onOpenCouponModal,
  onOpenSchemaModal,
}) => {
  const store = storesData.find((s) => s.id === storeId) || storesData[0];
  const storeCoupons = couponsData.filter((c) => c.storeId === store.id || c.storeName.toLowerCase() === store.name.toLowerCase());

  const [activeTab, setActiveTab] = useState<'all' | 'code' | 'deal' | 'free_shipping'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredCoupons = storeCoupons.filter((c) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'code') return c.type === 'code';
    if (activeTab === 'deal') return c.type === 'deal';
    if (activeTab === 'free_shipping') return c.type === 'free_shipping';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* Top Navigation Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB] py-3 px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('categories')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Stores
          </button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-bold">{store.name} Promo Codes</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Store Header Profile */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-[#F3F4F6] p-2 bg-white shrink-0 flex items-center justify-center">
              <img
                src={store.logo}
                alt={`${store.name} Logo`}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[#10B981] text-xs font-bold uppercase tracking-wide flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Store
                </span>
                <span className="flex items-center text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {store.rating} ({store.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                {store.name} Promo Codes & Coupons
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl">
                {store.description}
              </p>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="shrink-0 bg-gray-50 p-4 rounded-lg border border-[#E5E7EB] text-center space-y-2 w-full md:w-auto">
            <div className="text-xs text-gray-500 font-semibold">Average Savings</div>
            <div className="text-2xl font-black text-[#10B981]">{store.averageSavings}</div>
            <div className="text-[11px] font-bold text-gray-500">{store.activeOffersCount} Active Offers Tested</div>
            <button
              onClick={onOpenSchemaModal}
              className="text-[11px] font-bold text-[#F04D23] hover:underline flex items-center justify-center space-x-1 mx-auto cursor-pointer"
            >
              <FileCode className="w-3 h-3" />
              <span>Offer Schema JSON-LD</span>
            </button>
          </div>
        </div>

        {/* Above-the-fold Ad Message Matching Banner (Quality Score Priority) */}
        <AdMessageMatchBanner
          storeName={store.name}
          topDiscount={store.topDiscount}
          activeCount={store.activeOffersCount}
        />

        {/* Main Coupons List & Sidebar Layout */}
        <div id="active-coupons-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Active Coupons */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Active {store.name} Promo Codes ({filteredCoupons.length})
              </h2>

              <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md text-xs font-bold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'all' ? 'bg-[#F04D23] text-white' : 'text-gray-700'
                  }`}
                >
                  All ({storeCoupons.length})
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'code' ? 'bg-[#F04D23] text-white' : 'text-gray-700'
                  }`}
                >
                  Codes
                </button>
                <button
                  onClick={() => setActiveTab('deal')}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'deal' ? 'bg-[#F04D23] text-white' : 'text-gray-700'
                  }`}
                >
                  Deals
                </button>
              </div>
            </div>

            {/* Coupons List */}
            {filteredCoupons.length > 0 ? (
              <div className="space-y-4">
                {filteredCoupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    onOpenModal={onOpenCouponModal}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white rounded-xl text-center text-gray-500 border border-[#E5E7EB]">
                No specific coupons found in this tab. Try selecting "All".
              </div>
            )}

            {/* SEO Content Block & Shopping Guide */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E7EB] mt-12 space-y-6">
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                About {store.name} Discounts & Savings Policies
              </h3>
              
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {store.aboutContent}
              </p>

              {/* Shopping Tips */}
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 text-amber-500 mr-2" />
                  Tips to Save Money at {store.name}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#6B7280] list-disc pl-5">
                  {store.shoppingTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* FAQs Accordion */}
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A] mb-4 flex items-center">
                  <HelpCircle className="w-4 h-4 text-[#F04D23] mr-2" />
                  Frequently Asked Questions ({store.name} Coupons)
                </h4>
                <div className="space-y-3">
                  {store.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-bold text-xs sm:text-sm text-[#1A1A1A] flex items-center justify-between cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-[#F04D23]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-4 text-xs sm:text-sm text-[#6B7280] bg-white border-t border-[#E5E7EB] leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Store Info Sidebar */}
          <div className="space-y-6">
            
            {/* Store Quick Card */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] space-y-4">
              <h3 className="font-bold text-[#1A1A1A] text-base border-b border-[#E5E7EB] pb-3">
                {store.name} Store Summary
              </h3>

              <div className="space-y-3 text-xs text-[#6B7280]">
                <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                  <span className="font-medium text-gray-500">Website</span>
                  <a
                    href={store.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#F04D23] hover:underline flex items-center"
                  >
                    <span>{store.name}.com</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                  <span className="font-medium text-gray-500">Active Offers</span>
                  <span className="font-bold text-[#1A1A1A]">{store.activeOffersCount} Offers</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                  <span className="font-medium text-gray-500">Best Discount Today</span>
                  <span className="font-bold text-[#10B981]">{store.topDiscount}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-500">Verification Rate</span>
                  <span className="font-bold text-[#1A1A1A]">98.4% Tested Working</span>
                </div>
              </div>

              <a
                href={store.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold py-3 rounded-md flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Visit Official {store.name} Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F04D23]" />
              </a>
            </div>

            {/* Other Related Stores */}
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] space-y-4">
              <h3 className="font-bold text-[#1A1A1A] text-sm">
                Similar Stores You Might Like
              </h3>
              <div className="space-y-3">
                {storesData
                  .filter((s) => s.id !== store.id)
                  .slice(0, 4)
                  .map((relStore) => (
                    <button
                      key={relStore.id}
                      onClick={() => onNavigate('store', relStore.id)}
                      className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={relStore.logo}
                          alt={relStore.name}
                          className="w-8 h-8 rounded object-cover border border-[#E5E7EB]"
                        />
                        <span className="font-bold text-xs text-[#1A1A1A]">{relStore.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#F04D23] bg-orange-50 px-2 py-0.5 rounded">
                        {relStore.topDiscount}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
