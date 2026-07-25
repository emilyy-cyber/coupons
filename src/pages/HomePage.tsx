import React, { useState } from 'react';
import { storesData } from '../data/storesData';
import { couponsData } from '../data/couponsData';
import { categoriesData } from '../data/categoriesData';
import { blogPostsData } from '../data/blogData';
import { StoreCard } from '../components/StoreCard';
import { CouponCard } from '../components/CouponCard';
import { Coupon, Store } from '../types';
import { Flame, ShieldCheck, Tag, Sparkles, TrendingUp, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenCouponModal: (coupon: Coupon) => void;
  onOpenPageSpeedDrawer: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCouponModal,
  onOpenPageSpeedDrawer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'code' | 'deal' | 'free_shipping' | 'exclusive'>('all');

  // Filter top coupons
  const filteredCoupons = couponsData.filter((coupon) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'code') return coupon.type === 'code';
    if (selectedFilter === 'deal') return coupon.type === 'deal';
    if (selectedFilter === 'free_shipping') return coupon.type === 'free_shipping';
    if (selectedFilter === 'exclusive') return coupon.isExclusive;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      
      {/* Clean Minimalism Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Section Header: Today's Top Coupons & Deals */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-[#E5E7EB] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              Today's Top Coupons & Deals
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Hand-picked offers verified by our editors for Oct 2026
            </p>
          </div>
          <button
            onClick={() => setSelectedFilter('all')}
            className="text-xs sm:text-sm font-semibold text-[#F04D23] hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Quick Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer border ${
              selectedFilter === 'all'
                ? 'bg-[#F04D23] text-white border-[#F04D23]'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#F04D23]/50'
            }`}
          >
            All Offers ({couponsData.length})
          </button>
          <button
            onClick={() => setSelectedFilter('code')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer border ${
              selectedFilter === 'code'
                ? 'bg-[#F04D23] text-white border-[#F04D23]'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#F04D23]/50'
            }`}
          >
            Promo Codes
          </button>
          <button
            onClick={() => setSelectedFilter('exclusive')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer border ${
              selectedFilter === 'exclusive'
                ? 'bg-[#F04D23] text-white border-[#F04D23]'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#F04D23]/50'
            }`}
          >
            Exclusives
          </button>
          <button
            onClick={() => setSelectedFilter('free_shipping')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer border ${
              selectedFilter === 'free_shipping'
                ? 'bg-[#F04D23] text-white border-[#F04D23]'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#F04D23]/50'
            }`}
          >
            Free Shipping
          </button>
        </div>

        {/* Coupon Grid: 2-column layout matching Clean Minimalism specification */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredCoupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onOpenModal={onOpenCouponModal}
              onStoreClick={(storeId) => onNavigate('store', storeId)}
            />
          ))}
        </div>

        {/* Trending Stores Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 mt-4">
          <div className="flex items-center justify-between mb-6 border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Featured Merchant Partners
            </h2>
            <button
              onClick={() => onNavigate('categories')}
              className="text-xs font-semibold text-[#F04D23] hover:underline cursor-pointer"
            >
              All Stores &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {storesData.slice(0, 8).map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onClick={(storeId) => onNavigate('store', storeId)}
              />
            ))}
          </div>
        </div>

        {/* Browse Categories */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#E5E7EB] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Browse Categories
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Find deals across top retail categories</p>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="text-xs font-semibold text-[#F04D23] hover:underline cursor-pointer"
            >
              All Categories &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoriesData.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('category', cat.id)}
                className="p-4 bg-white rounded-lg border border-[#E5E7EB] hover:border-[#F04D23]/50 transition-colors cursor-pointer group text-left"
              >
                <div className="text-xs font-bold text-[#F04D23] mb-1">{cat.featuredDiscount}</div>
                <h3 className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#F04D23] transition-colors">
                  {cat.name}
                </h3>
                <div className="text-[11px] text-[#6B7280] mt-1">{cat.couponCount}+ active coupons</div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Guides / Blog Posts */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-6 border-b border-[#E5E7EB] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Savings Guides & Coupon Tips
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Verified savings advice from our shopping editors</p>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs font-semibold text-[#F04D23] hover:underline cursor-pointer"
            >
              All Guides &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPostsData.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog-post', post.id)}
                className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:border-[#F04D23]/40 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#F04D23] uppercase tracking-wider mb-1">
                      {post.category} • {post.readTime}
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] text-base group-hover:text-[#F04D23] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};
