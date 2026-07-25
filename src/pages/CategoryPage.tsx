import React, { useState } from 'react';
import { categoriesData } from '../data/categoriesData';
import { storesData } from '../data/storesData';
import { couponsData } from '../data/couponsData';
import { StoreCard } from '../components/StoreCard';
import { CouponCard } from '../components/CouponCard';
import { Coupon } from '../types';
import { ArrowLeft, Tag, Layers } from 'lucide-react';

interface CategoryPageProps {
  categoryId?: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCouponModal: (coupon: Coupon) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onNavigate,
  onOpenCouponModal,
}) => {
  const currentCategory = categoriesData.find((c) => c.id === categoryId) || categoriesData[0];
  const categoryStores = storesData.filter((s) => s.category === currentCategory.id || !categoryId);
  const categoryCoupons = couponsData.filter((c) => c.category === currentCategory.id || !categoryId);

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
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">{currentCategory.name} Coupons</h1>
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
