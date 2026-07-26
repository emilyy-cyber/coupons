import React, { useState, useRef, useEffect } from 'react';
import { Search, Tag, Flame, ShieldCheck, Gauge, Layers, Menu, X, ChevronRight, CheckCircle } from 'lucide-react';
import { storesData } from '../data/storesData';
import { categoriesData } from '../data/categoriesData';
import { Store, Category } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSubmitModal: () => void;
  onOpenPageSpeedDrawer: () => void;
  selectedStoreId?: string;
  selectedCategoryId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSubmitModal,
  onOpenPageSpeedDrawer,
  selectedStoreId,
  selectedCategoryId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter stores & categories based on search input
  const filteredStores = storesData.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const filteredCategories = categoriesData.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  // Handle clicking outside search box
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleSelectStore = (store: Store) => {
    onNavigate('store', store.id);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (category: Category) => {
    onNavigate('category', category.id);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB]">
      {/* Top Quality Score & Speed Announcement Ribbon */}
      <div className="bg-[#1A1A1A] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-emerald-400 font-medium">
            <span className="inline-flex items-center bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 text-[11px] font-mono">
              <CheckCircle className="w-3 h-3 mr-1 text-emerald-400" />
              PageSpeed 98/100
            </span>
            <span className="hidden sm:inline text-gray-300 font-normal">
              Google Ads Quality Score Compliant • Verified Offers Updated Oct 2026
            </span>
          </div>
          <button
            onClick={onOpenPageSpeedDrawer}
            className="flex items-center text-xs font-semibold text-[#F04D23] hover:underline cursor-pointer"
            id="open-speed-audit-btn"
          >
            <Gauge className="w-3.5 h-3.5 mr-1" />
            <span>Speed & Quality Audit</span>
          </button>
        </div>
      </div>

      {/* Main Header Container (Clean Minimalism Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">
          
          {/* Logo Brand & Search Bar Wrapper */}
          <div className="flex items-center gap-6 md:gap-8 flex-1 min-w-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-left cursor-pointer shrink-0"
              id="header-logo-btn"
            >
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
                10 OFF<span className="text-[#F04D23]"> PROMO CODES</span>
              </div>
            </button>

            {/* Clean Minimalism Search Input */}
            <div className="flex-1 max-w-md relative hidden sm:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search for Walmart, Nike, Amazon..."
                    className="w-full pl-4 pr-10 py-2 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#F04D23] transition-colors"
                    id="header-search-input"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F04D23] cursor-pointer"
                    id="header-search-submit-btn"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Instant Search Dropdown Panel */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-[#E5E7EB] overflow-hidden z-50">
                  {filteredStores.length > 0 && (
                    <div className="p-2 border-b border-[#E5E7EB]">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
                        Matching Stores
                      </div>
                      {filteredStores.map((store) => (
                        <button
                          key={store.id}
                          onClick={() => handleSelectStore(store)}
                          className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={store.logo}
                              alt={store.name}
                              className="w-7 h-7 rounded border border-gray-200 object-cover"
                            />
                            <div>
                              <div className="font-bold text-sm text-[#1A1A1A]">{store.name}</div>
                              <div className="text-xs text-gray-500">{store.activeOffersCount} coupons</div>
                            </div>
                          </div>
                          <span className="bg-orange-50 text-[#F04D23] text-xs font-bold px-2 py-0.5 rounded">
                            {store.topDiscount}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredCategories.length > 0 && (
                    <div className="p-2 bg-gray-50/50">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
                        Categories
                      </div>
                      {filteredCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleSelectCategory(category)}
                          className="w-full text-left flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-sm font-semibold text-gray-700"
                        >
                          <span>{category.name}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredStores.length === 0 && filteredCategories.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No matching stores. Press Enter to search all coupons.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#4B5563]">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#F04D23] transition-colors cursor-pointer ${
                currentTab === 'home' ? 'text-[#F04D23] font-bold' : ''
              }`}
              id="nav-home-btn"
            >
              Coupons
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`hover:text-[#F04D23] transition-colors cursor-pointer ${
                currentTab === 'category' || currentTab === 'categories' ? 'text-[#F04D23] font-bold' : ''
              }`}
              id="nav-categories-btn"
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className={`hover:text-[#F04D23] transition-colors cursor-pointer ${
                currentTab === 'blog' ? 'text-[#F04D23] font-bold' : ''
              }`}
              id="nav-blog-btn"
            >
              Savings Guides
            </button>
            <button
              onClick={onOpenSubmitModal}
              className="bg-[#F04D23] hover:bg-[#d83f19] text-white font-bold text-xs px-4 py-2 rounded-md transition-colors cursor-pointer"
              id="submit-coupon-btn"
            >
              + Submit Code
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar for Mobile View */}
        <div className="sm:hidden pb-3" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search stores or coupons..."
              className="w-full pl-4 pr-10 py-2 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#F04D23]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Trending Stores Secondary Navigation Bar (48px height Clean Minimalism Strip) */}
      <div className="bg-white border-t border-[#E5E7EB] py-3 px-4 sm:px-8 text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto flex items-center gap-5 overflow-x-auto no-scrollbar">
          <span className="font-bold text-[#1A1A1A] uppercase tracking-wide shrink-0">
            Trending Stores:
          </span>
          {storesData.slice(0, 9).map((store) => (
            <button
              key={store.id}
              onClick={() => onNavigate('store', store.id)}
              className={`shrink-0 hover:text-[#F04D23] transition-colors cursor-pointer ${
                selectedStoreId === store.id ? 'text-[#F04D23] font-bold' : ''
              }`}
            >
              {store.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E7EB] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-[#1A1A1A] py-2 border-b border-gray-100"
          >
            Trending Coupons
          </button>
          <button
            onClick={() => {
              onNavigate('categories');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-[#1A1A1A] py-2 border-b border-gray-100"
          >
            Categories
          </button>
          <button
            onClick={() => {
              onNavigate('blog');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-[#1A1A1A] py-2 border-b border-gray-100"
          >
            Savings Guides & Blog
          </button>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenSubmitModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-[#F04D23] text-white font-bold text-sm py-2.5 rounded-md text-center"
            >
              Submit a Coupon
            </button>
            <button
              onClick={() => {
                onOpenPageSpeedDrawer();
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#1A1A1A] text-emerald-400 font-bold text-xs p-2.5 rounded-md flex items-center justify-center"
            >
              <Gauge className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
