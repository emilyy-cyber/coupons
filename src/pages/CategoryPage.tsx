import React from 'react';
import { categoriesData } from '../data/categoriesData';
import { storesData } from '../data/storesData';
import { couponsData } from '../data/couponsData';
import { StoreCard } from '../components/StoreCard';
import { CouponCard } from '../components/CouponCard';
import { Coupon } from '../types';
import { ArrowLeft, Layers, Tag, Tv, Shirt, Utensils, Plane, Home, Sparkles, ShoppingBag } from 'lucide-react';

interface CategoryPageProps {
  categoryId?: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCouponModal: (coupon: Coupon) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Tv': return <Tv className="w-6 h-6 text-[#F04D23]" />;
    case 'Shirt': return <Shirt className="w-6 h-6 text-[#F04D23]" />;
    case 'Utensils': return <Utensils className="w-6 h-6 text-[#F04D23]" />;
    case 'Plane': return <Plane className="w-6 h-6 text-[#F04D23]" />;
    case 'Home': return <Home className="w-6 h-6 text-[#F04D23]" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#F04D23]" />;
    default: return <ShoppingBag className="w-6 h-6 text-[#F04D23]" />;
  }
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onNavigate,
  onOpenCouponModal,
}) => {
  const isAllCategories = !categoryId || categoryId === 'all' || categoryId === 'categories';
  const currentCategory = categoriesData.find((c) => c.id === categoryId);

  // If viewing All Categories Landing Page
  if (isAllCategories || !currentCategory) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pb-20">
        {/* Header Banner */}
        <div className="bg-white border-b border-[#E5E7EB] py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-[#F04D23] hover:underline flex items-center mb-3 font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home
            </button>

            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-50 border border-[#E5E7EB] rounded-lg text-[#F04D23]">
                <Layers className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                All Coupon Categories
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-2">
              Browse verified promo codes and discount offers grouped by store department. Find savings on tech, fashion, food delivery, travel, home goods, and more.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((cat) => {
              const storeCount = storesData.filter((s) => s.category === cat.id).length || cat.storeCount;
              const couponCount = couponsData.filter((c) => c.category === cat.id).length || cat.couponCount;

              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigate('category', cat.id)}
                  className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:border-[#F04D23] transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 group-hover:bg-[#F04D23] group-hover:text-white transition-colors">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-md border border-emerald-200">
                        {cat.featuredDiscount}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#F04D23] transition-colors mb-2">
                      {cat.name}
                    </h2>

                    <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-gray-500">
                    <span className="flex items-center">
                      <Tag className="w-3.5 h-3.5 mr-1 text-[#F04D23]" />
                      {storeCount} Stores
                    </span>
                    <span className="text-[#F04D23] group-hover:translate-x-0.5 transition-transform">
                      Explore Deals &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Specific Category Landing Page
  const categoryStores = storesData.filter((s) => s.category === currentCategory.id);
  const categoryCoupons = couponsData.filter((c) => c.category === currentCategory.id);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-[#E5E7EB] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs text-[#F04D23] hover:underline flex items-center mb-3 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> All Categories
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-50 border border-[#E5E7EB] rounded-lg text-[#F04D23]">
              {getCategoryIcon(currentCategory.iconName)}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">{currentCategory.name} Promo Codes</h1>
          </div>
          
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-2">
            {currentCategory.description} Featured discount: <span className="text-[#F04D23] font-bold">{currentCategory.featuredDiscount}</span>.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Switcher Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-6 text-xs font-bold">
          <button
            onClick={() => onNavigate('categories')}
            className="px-4 py-2 rounded-md transition-colors cursor-pointer shrink-0 border bg-white text-gray-700 border-[#E5E7EB] hover:border-[#F04D23]"
          >
            All Categories
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer shrink-0 border ${
                cat.id === currentCategory.id
                  ? 'bg-[#F04D23] text-white border-[#F04D23]'
                  : 'bg-white text-gray-700 border-[#E5E7EB] hover:border-[#F04D23]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Top Stores in Category */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
            Top Stores in {currentCategory.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onClick={(storeId) => onNavigate('store', storeId)}
              />
            ))}
          </div>
        </div>

        {/* Active Coupons in Category */}
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
            Top {currentCategory.name} Promo Codes & Deals
          </h2>
          <div className="space-y-4">
            {categoryCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onOpenModal={onOpenCouponModal}
                onStoreClick={(storeId) => onNavigate('store', storeId)}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

