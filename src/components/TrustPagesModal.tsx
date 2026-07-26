import React, { useState } from 'react';
import { X, ShieldCheck, Mail, FileText, Lock, CheckCircle2, Send } from 'lucide-react';

interface TrustPagesModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'contact' | 'ads' | null;
  onClose: () => void;
}

export const TrustPagesModal: React.FC<TrustPagesModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden max-h-[85vh] flex flex-col justify-between animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-3">
            {type === 'privacy' && <Lock className="w-6 h-6 text-orange-600" />}
            {type === 'terms' && <FileText className="w-6 h-6 text-orange-600" />}
            {type === 'contact' && <Mail className="w-6 h-6 text-orange-600" />}
            {type === 'ads' && <ShieldCheck className="w-6 h-6 text-orange-600" />}
            
            <h2 className="text-xl font-black text-gray-900">
              {type === 'privacy' && 'Privacy Policy & Cookie Security'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'contact' && 'Contact Support & Deal Verification'}
              {type === 'ads' && 'Google Ads Transparency & Compliance'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
            id="close-trust-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="my-4 overflow-y-auto text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed pr-2">
          {type === 'privacy' && (
            <>
              <p>
                At 10 Off Promo Codes, we respect your privacy. This Privacy Policy details how we collect, use, and protect your information when visiting our website.
              </p>
              <h3 className="font-extrabold text-gray-900 text-sm">1. Data Collection</h3>
              <p>
                We do not require account registration to view or copy coupon codes. Minimal aggregate analytics are gathered to measure page speed, coupon click-through rates, and Google Ads Quality Score relevance.
              </p>
              <h3 className="font-extrabold text-gray-900 text-sm">2. Cookies & Affiliate Tracking</h3>
              <p>
                When you click "Get Code" or "Get Deal", a referral link redirects you to the partner merchant. Partners may place a tracking cookie to attribute sales.
              </p>
              <h3 className="font-extrabold text-gray-900 text-sm">3. Security</h3>
              <p>
                Our site operates under 256-bit SSL encryption. We enforce zero intrusive popups, forced software downloads, or misleading interstitials.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                By accessing 10 Off Promo Codes, you agree to these Terms of Service. Please read them carefully.
              </p>
              <h3 className="font-extrabold text-gray-900 text-sm">1. Coupon Accuracy</h3>
              <p>
                10 Off Promo Codes tests promo codes daily. However, store promotions are subject to merchant modification or early expiration without prior notice.
              </p>
              <h3 className="font-extrabold text-gray-900 text-sm">2. Intellectual Property</h3>
              <p>
                All store logos and brand marks referenced on 10 Off Promo Codes remain the registered trademarks of their respective owners.
              </p>
            </>
          )}

          {type === 'ads' && (
            <>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-orange-900 space-y-2">
                <h3 className="font-black text-sm text-orange-950 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-orange-600" />
                  Google Ads Quality Score Compliance Statement
                </h3>
                <p>
                  10 Off Promo Codes strictly adheres to Google Ads policies regarding message match, landing page relevance, and user transparency.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Message Match:</strong> Headlines match promised ad copy word-for-word.</li>
                <li><strong>No Deceptive Ads:</strong> No false "100% off" claims or fake buttons.</li>
                <li><strong>Clear Single CTA:</strong> Users can instantly view and copy codes without obstruction.</li>
                <li><strong>Lightning Speed:</strong> Pages load under 1.5 seconds for optimal Ad Rank.</li>
              </ul>
            </>
          )}

          {type === 'contact' && (
            <div>
              {contactSent ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-extrabold text-gray-900">Message Sent!</h3>
                  <p className="text-xs text-gray-500">We respond to all merchant & user inquiries within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject / Question</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Broken coupon report or merchant partnership"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 shrink-0 text-right">
          <button
            onClick={onClose}
            className="bg-gray-900 hover:bg-black text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
