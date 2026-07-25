import React, { useState } from 'react';
import { X, Send, CheckCircle, Tag } from 'lucide-react';

interface SubmitCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitCouponModal: React.FC<SubmitCouponModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    couponCode: '',
    discountDescription: '',
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.storeName && formData.discountDescription) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ storeName: '', couponCode: '', discountDescription: '', expiryDate: '' });
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
          id="close-submit-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <Tag className="w-5 h-5 -rotate-12" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">Submit a Coupon Code</h2>
            <p className="text-xs text-gray-500">Help the community save money!</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">Coupon Submitted!</h3>
            <p className="text-xs text-gray-600">
              Our savings verification team will test this code and publish it shortly. Thank you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store / Retailer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Target, Nike, Sephora"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                id="submit-store-name-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Coupon Code (Optional if Deal)
              </label>
              <input
                type="text"
                placeholder="e.g. SAVE20"
                value={formData.couponCode}
                onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-mono uppercase"
                id="submit-code-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Offer / Discount Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. 20% off all shoes with no minimum purchase"
                value={formData.discountDescription}
                onChange={(e) => setFormData({ ...formData, discountDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                id="submit-desc-input"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
              id="submit-coupon-form-btn"
            >
              <Send className="w-4 h-4" />
              <span>Submit For Verification</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
