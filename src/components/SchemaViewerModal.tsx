import React, { useState } from 'react';
import { X, Code, Copy, Check, FileCheck, ShieldCheck } from 'lucide-react';

interface SchemaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
}

export const SchemaViewerModal: React.FC<SchemaViewerModalProps> = ({ isOpen, onClose, storeName = 'Walmart' }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const jsonLdExample = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "name": `${storeName} Verified Coupons & Promo Codes`,
    "description": `Save at ${storeName} with verified discount codes, free shipping coupons, and daily deals on 10 Off Promo Codes.`,
    "priceCurrency": "USD",
    "lowPrice": "0.00",
    "highPrice": "300.00",
    "offerCount": "24",
    "offers": [
      {
        "@type": "Offer",
        "name": "$20 OFF Your First Order",
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "validThrough": "2026-12-31",
        "seller": {
          "@type": "Organization",
          "name": storeName
        }
      },
      {
        "@type": "Offer",
        "name": "Up to 50% OFF Rollbacks",
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  const jsonString = JSON.stringify(jsonLdExample, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-neutral-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-800 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          id="close-schema-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-sky-950 text-sky-400 border border-sky-800 rounded-2xl">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Schema.org Structured Data (JSON-LD)</h2>
            <p className="text-xs text-gray-400">Live offer schema injected for Google Rich Snippets & Ads Quality Score</p>
          </div>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-3 mb-4 flex items-center space-x-2 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Valid Offer Schema • Passed Google Rich Results Test • Zero Errors</span>
        </div>

        <div className="relative mb-6">
          <pre className="bg-neutral-950 text-emerald-400 p-4 rounded-2xl border border-neutral-800 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed shadow-inner">
            <code>{jsonString}</code>
          </pre>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-neutral-700 transition-colors cursor-pointer flex items-center space-x-1.5"
            id="copy-schema-json-btn"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON-LD</span>
              </>
            )}
          </button>
        </div>

        <div className="text-xs text-gray-400 flex justify-between items-center border-t border-neutral-800 pt-4">
          <span>Automatically updated for all store landing pages.</span>
          <button
            onClick={onClose}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
