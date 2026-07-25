import React from 'react';
import { Store } from '../types';
import { ChevronRight, ShieldCheck, Tag } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  onClick: (storeId: string) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  return (
    <div
      onClick={() => onClick(store.id)}
      className="bg-white rounded-xl border border-[#E5E7EB] hover:border-[#F04D23]/50 p-5 transition-colors cursor-pointer group flex flex-col justify-between relative overflow-hidden"
    >
      {/* Verified Store Badge */}
      <div className="absolute top-3 right-3 flex items-center text-[#10B981] text-[10px] font-bold uppercase tracking-wide">
        <ShieldCheck className="w-3.5 h-3.5 mr-1" />
        Verified
      </div>

      <div>
        {/* Store Logo & Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-14 h-14 rounded-lg border border-[#F3F4F6] p-1 bg-white shrink-0 flex items-center justify-center">
            <img
              src={store.logo}
              alt={`${store.name} Logo`}
              className="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A1A] text-base group-hover:text-[#F04D23] transition-colors">
              {store.name}
            </h3>
            <div className="text-xs text-[#6B7280] mt-0.5">
              <span>{store.activeOffersCount} Active Coupons</span>
            </div>
          </div>
        </div>

        {/* Top Discount Tag */}
        <div className="bg-gray-50 border border-[#E5E7EB] rounded-md p-2.5 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5 text-[#F04D23]" />
            <span className="text-xs text-gray-600">Top Offer:</span>
          </div>
          <span className="bg-[#F04D23] text-white font-bold text-xs px-2 py-0.5 rounded">
            {store.topDiscount}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] text-xs font-bold text-[#1A1A1A] group-hover:text-[#F04D23]">
        <span>View Store Coupons</span>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#F04D23]" />
      </div>
    </div>
  );
};
