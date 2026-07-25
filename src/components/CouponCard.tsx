import React from 'react';
import { Coupon } from '../types';
import { ShieldCheck, Flame, Scissors, ArrowRight, ExternalLink, ThumbsUp, Clock } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
  onOpenModal: (coupon: Coupon) => void;
  onStoreClick?: (storeId: string) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, onOpenModal, onStoreClick }) => {
  const isCode = coupon.type === 'code' && coupon.code;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-[#F04D23]/40 transition-colors">
      
      {/* Exclusive / Staff Pick Badge */}
      {coupon.isExclusive && (
        <div className="absolute top-0 left-0 bg-[#F04D23] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-br-md">
          Exclusive Deal
        </div>
      )}

      {/* Main Left Section: Store Logo Box + Offer Info */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        
        {/* Crisp Store Logo Box (80px x 80px style) */}
        <div className="w-20 h-20 border border-[#F3F4F6] rounded-lg shrink-0 flex flex-col items-center justify-center p-2 text-center bg-white">
          <span className="font-extrabold text-sm text-[#F04D23] leading-tight">
            {coupon.discountValue}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-1">
            {coupon.type === 'code' ? 'Promo Code' : coupon.type === 'free_shipping' ? 'Shipping' : 'Store Deal'}
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {onStoreClick && (
              <button
                onClick={() => onStoreClick(coupon.storeId)}
                className="text-xs font-bold text-[#1A1A1A] hover:text-[#F04D23] transition-colors cursor-pointer"
              >
                {coupon.storeName}
              </button>
            )}

            {/* Verified Badge (Clean Minimalism style: ✓ Verified • X Uses) */}
            <span className="text-[#10B981] text-[11px] font-bold uppercase tracking-wide flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
              ✓ Verified • {coupon.usedCountToday} Uses
            </span>

            {/* Staff Pick Badge */}
            {coupon.isStaffPick && (
              <span className="inline-flex items-center bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                <Flame className="w-3 h-3 mr-1 text-amber-600" />
                Staff Pick
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug hover:text-[#F04D23] transition-colors cursor-pointer" onClick={() => onOpenModal(coupon)}>
            {coupon.title}
          </h3>

          <p className="text-xs sm:text-[13px] text-[#6B7280] mt-1 line-clamp-2 leading-relaxed">
            {coupon.description}
          </p>

          {/* Success Rate & Expiry */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B7280] mt-2 font-medium">
            <span className="flex items-center text-[#10B981] font-bold">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {coupon.successRate}% Success Rate
            </span>
            <span className="flex items-center text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              Expires {coupon.expiryDate}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button (GET CODE / GET DEAL style: bg-[#F04D23], 6px radius) */}
      <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5E7EB]">
        <button
          onClick={() => onOpenModal(coupon)}
          className="w-full md:w-auto bg-[#F04D23] hover:bg-[#d83f19] text-white font-bold text-sm px-5 py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
          id={`coupon-btn-${coupon.id}`}
        >
          {isCode ? (
            <>
              <Scissors className="w-4 h-4 text-white -rotate-90" />
              <span>GET CODE</span>
              <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded font-mono font-bold ml-1">
                {coupon.code ? `${coupon.code.substring(0, 3)}***` : 'CODE'}
              </span>
            </>
          ) : (
            <>
              <span>GET DEAL</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
