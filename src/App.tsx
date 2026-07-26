import React, { useState, useEffect, useCallback } from 'react';
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

interface RouteState {
  tab: 'home' | 'store' | 'category' | 'categories' | 'search' | 'blog' | 'blog-post';
  param?: string;
}

const parseUrlRoute = (): RouteState => {
  // Check hash fallback first if user opened old hash URL
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (hash) {
    const parts = hash.split('/');
    const route = parts[0].toLowerCase();
    const param = parts.slice(1).join('/');

    if (route === 'store' && param) return { tab: 'store', param };
    if (route === 'category' && param) return { tab: 'category', param };
    if (route === 'categories') return { tab: 'categories' };
    if (route === 'search' && param) return { tab: 'search', param: decodeURIComponent(param) };
    if (route === 'blog') return param ? { tab: 'blog-post', param } : { tab: 'blog' };
    if (route === 'home' || route === '') return { tab: 'home' };
  }

  // Standard HTML5 Path Routing
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!pathname) {
    return { tab: 'home' };
  }

  const parts = pathname.split('/');
  const route = parts[0].toLowerCase();
  const param = parts.slice(1).join('/');

  if (route === 'store' && param) {
    return { tab: 'store', param };
  }
  if (route === 'category' && param) {
    return { tab: 'category', param };
  }
  if (route === 'categories') {
    return { tab: 'categories' };
  }
  if (route === 'search' && param) {
    return { tab: 'search', param: decodeURIComponent(param) };
  }
  if (route === 'blog') {
    if (param) {
      return { tab: 'blog-post', param };
    }
    return { tab: 'blog' };
  }

  return { tab: 'home' };
};

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

  const applyRoute = useCallback((routeState: RouteState) => {
    const { tab, param } = routeState;
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
      setSelectedCategoryId('all');
      setCurrentTab('categories');
    } else if (tab === 'search' && param) {
      setSearchQuery(param);
      setCurrentTab('search');
    } else if (tab === 'blog') {
      setCurrentTab('blog');
    } else if (tab === 'blog-post' && param) {
      setSelectedBlogPostId(param);
      setCurrentTab('blog-post');
    }
  }, []);

  // Sync state on route changes & initial mount
  useEffect(() => {
    const syncFromUrl = () => {
      const route = parseUrlRoute();
      applyRoute(route);
    };

    // Sync initial route
    syncFromUrl();

    // Listen to browser navigation (back/forward)
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [applyRoute]);

  const handleNavigate = (tab: string, param?: string) => {
    let targetPath = '/';

    if (tab === 'home') {
      targetPath = '/';
    } else if (tab === 'store' && param) {
      targetPath = `/store/${param}`;
    } else if (tab === 'category' && param) {
      targetPath = `/category/${param}`;
    } else if (tab === 'categories') {
      targetPath = '/categories';
    } else if (tab === 'search' && param) {
      targetPath = `/search/${encodeURIComponent(param)}`;
    } else if (tab === 'blog') {
      targetPath = '/blog';
    } else if (tab === 'blog-post' && param) {
      targetPath = `/blog/${param}`;
    }

    // Clean up any remaining hash if present
    if (window.location.hash) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    
    applyRoute(parseUrlRoute());
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

        {(currentTab === 'category' || currentTab === 'categories') && (
          <CategoryPage
            categoryId={currentTab === 'categories' ? 'all' : selectedCategoryId}
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

