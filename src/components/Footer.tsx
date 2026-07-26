import React from 'react';
import { Tag, ShieldCheck, Lock, CheckCircle2, Zap, Code, Heart } from 'lucide-react';
import { storesData } from '../data/storesData';
import { categoriesData } from '../data/categoriesData';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenTrustModal: (type: 'privacy' | 'terms' | 'contact' | 'ads') => void;
  onOpenSchemaModal: () => void;
  onOpenPageSpeedDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTrustModal,
  onOpenSchemaModal,
  onOpenPageSpeedDrawer,
}) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-8 text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Links */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="font-extrabold text-base text-[#1A1A1A] tracking-tight mr-2">
            10 OFF<span className="text-[#F04D23]"> PROMO CODES</span>
          </div>

          <button
            onClick={() => onOpenTrustModal('privacy')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          
          <button
            onClick={() => onOpenTrustModal('terms')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Terms of Use
          </button>

          <button
            onClick={() => onOpenTrustModal('contact')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Contact Us
          </button>

          <button
            onClick={() => onNavigate('categories')}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Categories
          </button>

          <button
            onClick={onOpenPageSpeedDrawer}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            PageSpeed Audit
          </button>

          <button
            onClick={onOpenSchemaModal}
            className="hover:text-[#F04D23] transition-colors cursor-pointer"
          >
            Schema JSON-LD
          </button>
        </div>

        {/* Copyright */}
        <div className="text-right">
          © 2026 10 Off Promo Codes. All rights reserved. • Optimized for Speed & Quality Score
        </div>

      </div>
    </footer>
  );
};
