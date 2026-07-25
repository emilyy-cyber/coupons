import React from 'react';
import { storesData } from '../data/storesData';
import { couponsData } from '../data/couponsData';
import { StoreCard } from '../components/StoreCard';
import { CouponCard } from '../components/CouponCard';
import { Coupon } from '../types';
import { Search, Tag, ArrowLeft } from 'lucide-react';

interface SearchPageProps {
  searchQuery: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCouponModal: (coupon: Coupon) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  searchQuery,
  onNavigate,
  onOpenCouponModal,
}) => {
  const query = searchQuery.toLowerCase().trim();

  const matchingStores = storesData.filter((s) =>
    s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
  );

  const matchingCoupons = couponsData.filter((c) =>
    c.title.toLowerCase().includes(query) ||
    c.storeName.toLowerCase().includes(query) ||
    c.description.toLowerCase().includes(query) ||
    (c.code && c.code.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#F04D23] font-bold flex items-center mb-2 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Home
          </button>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-[#F04D23]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Search Results for "<span className="text-[#F04D23]">{searchQuery}</span>"
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Matching Stores */}
        {matchingStores.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
              Matching Stores ({matchingStores.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {matchingStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onClick={(storeId) => onNavigate('store', storeId)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Matching Coupons */}
        {matchingCoupons.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
              Matching Coupon Codes & Offers ({matchingCoupons.length})
            </h2>
            <div className="space-y-4">
              {matchingCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onOpenModal={onOpenCouponModal}
                  onStoreClick={(storeId) => onNavigate('store', storeId)}
                />
              ))}
            </div>
          </div>
        ) : matchingStores.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB] p-8">
            <p className="text-lg font-bold text-[#1A1A1A]">No matching store or coupon found for "{searchQuery}".</p>
            <p className="text-xs text-[#6B7280] mt-2">Try searching for popular brands like Walmart, Nike, Sephora, or Uber Eats.</p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-4 bg-[#F04D23] text-white font-bold text-xs px-5 py-2.5 rounded-md cursor-pointer"
            >
              Back to Trending Deals
            </button>
          </div>
        ) : null}

      </div>
    </div>
  );
};
