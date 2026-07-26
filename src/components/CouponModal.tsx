import React, { useState } from 'react';
import { Coupon } from '../types';
import { X, Copy, Check, ExternalLink, ThumbsUp, ThumbsDown, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { getConditionalOutboundUrl } from '../utils/geoIp';

interface CouponModalProps {
  coupon: Coupon | null;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({ coupon, onClose }) => {
  if (!coupon) return null;

  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const handleCopyCode = () => {
    // Determine destination URL synchronously based on pre-cached visitor location
    const targetUrl = getConditionalOutboundUrl(coupon.storeId, coupon.outboundUrl);

    if (coupon.code) {
      copyToClipboard(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }

    // Open target link: GET CODE in current/back tab, GET DEAL in new/next tab
    if (coupon.code) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 border border-[#E5E7EB] relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
          aria-label="Close coupon dialog"
          id="close-coupon-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Store Brand Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-lg border border-[#F3F4F6] p-2 bg-white shrink-0 flex items-center justify-center">
            <img
              src={coupon.storeLogo}
              alt={coupon.storeName}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#1A1A1A] text-base">{coupon.storeName}</span>
              <span className="text-[#10B981] text-[10px] font-bold uppercase tracking-wide flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#1A1A1A] leading-snug mt-0.5">
              {coupon.title}
            </h2>
          </div>
        </div>

        {/* Code Display / Copy Section */}
        {coupon.code ? (
          <div className="bg-gray-50 border border-dashed border-[#E5E7EB] rounded-lg p-5 mb-6 text-center">
            <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-center space-x-1">
              <Sparkles className="w-4 h-4 text-[#F04D23]" />
              <span>Copy Promo Code Below</span>
            </div>

            {/* Code Box */}
            <div className="bg-white border border-[#E5E7EB] rounded py-3 px-4 flex items-center justify-center space-x-3 mb-4 font-mono font-bold text-2xl tracking-widest text-[#1A1A1A] select-all">
              {coupon.code}
            </div>

            {/* Action Copy & Go Button */}
            <button
              onClick={handleCopyCode}
              className={`w-full py-3 px-6 rounded-md font-bold text-sm transition-colors cursor-pointer flex items-center justify-center space-x-2 ${
                copied
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#F04D23] hover:bg-[#d83d15] text-white'
              }`}
              id="copy-and-go-btn"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Code Copied! Opening {coupon.storeName}...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code & Go to {coupon.storeName}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-[#E5E7EB] rounded-lg p-5 mb-6 text-center">
            <p className="text-xs text-gray-600 mb-4">
              No code required! This deal is automatically applied when you shop through our direct link.
            </p>
            <button
              onClick={handleCopyCode}
              className="w-full bg-[#1A1A1A] hover:bg-black text-white py-3 px-6 rounded-md font-bold text-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
              id="open-deal-direct-btn"
            >
              <span>Activate Deal on {coupon.storeName}</span>
              <ExternalLink className="w-4 h-4 text-[#F04D23]" />
            </button>
          </div>
        )}

        {/* Verification Success Rate & Terms */}
        <div className="space-y-3 text-xs text-[#6B7280] bg-gray-50 p-4 rounded-lg border border-[#E5E7EB]">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center text-[#10B981] font-bold">
              <ShieldCheck className="w-4 h-4 mr-1" />
              {coupon.successRate}% Verified Working Today
            </span>
            <span className="flex items-center text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1" /> Expires {coupon.expiryDate}
            </span>
          </div>

          {coupon.terms && (
            <div className="pt-2 border-t border-[#E5E7EB] text-gray-500 leading-relaxed">
              <strong className="text-gray-700">Terms & Conditions:</strong> {coupon.terms}
            </div>
          )}
        </div>

        {/* Feedback Counter */}
        <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-gray-700">
          <span>Did this coupon work for you?</span>
          {feedbackGiven ? (
            <span className="text-[#10B981] font-bold">
              Thanks for your feedback!
            </span>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFeedbackGiven('yes')}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 px-3 py-1.5 rounded transition-colors cursor-pointer"
                id="feedback-yes-btn"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes</span>
              </button>
              <button
                onClick={() => setFeedbackGiven('no')}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-700 px-3 py-1.5 rounded transition-colors cursor-pointer"
                id="feedback-no-btn"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>No</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
