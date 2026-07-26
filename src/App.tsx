import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CouponModal } from './components/CouponModal';
import { PageSpeedMeter } from './components/PageSpeedMeter';
import { SchemaViewerModal } from './components/SchemaViewerModal';
import { SubmitCouponModal } from './components/SubmitCouponModal';
import { TrustPagesModal } from './components/TrustPagesModal';

import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { BlogPage } from './pages/BlogPage';

import { Coupon } from './types';
import { initGeoIp } from './utils/geoIp';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'store' | 'category' | 'categories' | 'search' | 'blog' | 'blog-post'>('home');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('walmart');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('electronics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string>('1');

  // Pre-fetch Geo-IP location on initial app render
  useEffect(() => {
    initGeoIp();
  }, []);

  // Modals state
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [isPageSpeedOpen, setIsPageSpeedOpen] = useState(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [trustModalType, setTrustModalType] = useState<'privacy' | 'terms' | 'contact' | 'ads' | null>(null);

  const handleNavigate = (tab: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'home') {
      setCurrentTab('home');
    } else if (tab === 'store' && param) {
      setSelectedStoreId(param);
      setCurrentTab('store');
    } else if (tab === 'category' && param) {
      setSelectedCategoryId(param);
      setCurrentTab('category');
    } else if (tab === 'categories') {
      setCurrentTab('category');
    } else if (tab === 'search' && param) {
      setSearchQuery(param);
      setCurrentTab('search');
    } else if (tab === 'blog') {
      setCurrentTab('blog');
    } else if (tab === 'blog-post' && param) {
      setSelectedBlogPostId(param);
      setCurrentTab('blog-post');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenPageSpeedDrawer={() => setIsPageSpeedOpen(true)}
        selectedStoreId={selectedStoreId}
        selectedCategoryId={selectedCategoryId}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenCouponModal={(coupon) => setActiveCoupon(coupon)}
            onOpenPageSpeedDrawer={() => setIsPageSpeedOpen(true)}
          />
        )}

        {currentTab === 'store' && (
          <StorePage
            storeId={selectedStoreId}
            onNavigate={handleNavigate}
            onOpenCouponModal={(coupon) => setActiveCoupon(coupon)}
            onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
          />
        )}

        {currentTab === 'category' && (
          <CategoryPage
            categoryId={selectedCategoryId}
            onNavigate={handleNavigate}
            onOpenCouponModal={(coupon) => setActiveCoupon(coupon)}
          />
        )}

        {currentTab === 'search' && (
          <SearchPage
            searchQuery={searchQuery}
            onNavigate={handleNavigate}
            onOpenCouponModal={(coupon) => setActiveCoupon(coupon)}
          />
        )}

        {currentTab === 'blog' && (
          <BlogPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'blog-post' && (
          <BlogPage selectedPostId={selectedBlogPostId} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrustModal={(type) => setTrustModalType(type)}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        onOpenPageSpeedDrawer={() => setIsPageSpeedOpen(true)}
      />

      {/* Interactive Coupon Code Reveal Modal */}
      <CouponModal
        coupon={activeCoupon}
        onClose={() => setActiveCoupon(null)}
      />

      {/* Speed & Ads Quality Score Diagnostic Drawer */}
      <PageSpeedMeter
        isOpen={isPageSpeedOpen}
        onClose={() => setIsPageSpeedOpen(false)}
        onOpenSchemaModal={() => {
          setIsPageSpeedOpen(false);
          setIsSchemaModalOpen(true);
        }}
      />

      {/* Schema.org Structured Data Viewer */}
      <SchemaViewerModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
        storeName={selectedStoreId ? selectedStoreId.toUpperCase() : 'WALMART'}
      />

      {/* Submit Coupon Modal */}
      <SubmitCouponModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Trust & Legal Modals */}
      <TrustPagesModal
        isOpen={trustModalType !== null}
        type={trustModalType}
        onClose={() => setTrustModalType(null)}
      />

    </div>
  );
}
