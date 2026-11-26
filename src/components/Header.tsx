import React, { useState } from 'react';
import {
  Phone,
  Search,
  ChevronDown,
  GitCompareArrows,
  Heart,
  Headphones,
  Menu,
  X,
  ArrowRight,
  KeyRound,
} from 'lucide-react';
import { TOP_BRANDS } from '../data/carsData';

export type NavTab =
  | 'home'
  | 'buy-cars'
  | 'rent-cars'
  | 'used-cars'
  | 'offers'
  | 'finance'
  | 'services'
  | 'about'
  | 'blog'
  | 'contact';

interface HeaderProps {
  activeNav: NavTab;
  onSelectNav: (tab: NavTab, subFilter?: string) => void;
  searchQuery: string;
  searchBrand: string;
  onSearchChange: (brand: string, query: string) => void;
  onSearchSubmit: () => void;
  compareCount: number;
  wishlistCount: number;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onOpenBooking: (mode: 'buy' | 'rent' | 'service') => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeNav,
  onSelectNav,
  searchQuery,
  searchBrand,
  onSearchChange,
  onSearchSubmit,
  compareCount,
  wishlistCount,
  onOpenCompare,
  onOpenWishlist,
  onOpenBooking,
  onOpenContact,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'buy' | 'rent' | 'used' | 'services' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="w-full relative z-40">
      {/* Top Green Promotional Banner matching Good Deals Autos Logo */}
      <div className="bg-gradient-to-r from-[#1A3D06] via-[#3A7910] to-[#58A618] text-white py-2 px-3 sm:px-4">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-[11px] sm:text-sm font-bold tracking-wide">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            </span>
            <p className="text-center sm:text-left leading-snug">
              <span className="text-white">BUY OR RENT CERTIFIED CARS IN GHANA — </span>
              <span className="text-[#FACC15]">IGNITE YOUR JOURNEY</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="bg-[#0F1419] hover:bg-black text-white border border-white/25 font-bold text-[11px] sm:text-xs px-3 py-1.5 rounded inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <span>Let&apos;s Talk Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
          </button>
        </div>
      </div>

      {/* Main White Showroom Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-2.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 lg:gap-8">
          {/* Zone 1: Uploaded Good Deals Autos Logo */}
          <button
            type="button"
            onClick={() => onSelectNav('home')}
            className="flex items-center text-left group cursor-pointer shrink-0"
            aria-label="Good Deals Autos Home"
          >
            <img
              src="/assets/aistudio/image_77d7d558.png"
              alt="Good Deals Autos - Ignite Your Journey"
              referrerPolicy="no-referrer"
              className="h-10 sm:h-14 w-auto object-contain rounded-sm"
            />
          </button>

          {/* Zone 2: Integrated Brand + Model Search Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="order-3 lg:order-2 w-full lg:max-w-[500px] flex items-center bg-[#F8FAFC] border border-slate-300 rounded overflow-hidden focus-within:border-[#4E9612] focus-within:ring-1 focus-within:ring-[#4E9612] transition-all"
          >
            <div className="relative flex items-center border-r border-slate-300 bg-white shrink-0">
              <select
                aria-label="Filter search by brand"
                value={searchBrand}
                onChange={(e) => onSearchChange(e.target.value, searchQuery)}
                className="appearance-none bg-transparent pl-2.5 sm:pl-3.5 pr-6 sm:pr-8 py-2.5 min-h-[42px] max-w-[106px] sm:max-w-none truncate text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">All Brands</option>
                {TOP_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(searchBrand, e.target.value)}
              placeholder="Search Tesla, Benz, BMW, Wagon..."
              className="flex-1 min-w-0 bg-transparent px-3 sm:px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />

            <button
              type="submit"
              aria-label="Search cars"
              className="bg-[#4E9612] hover:bg-[#3B750B] text-white px-3.5 sm:px-4 min-h-[42px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Zone 3: Quick Utility Actions */}
          <div className="order-2 lg:order-3 flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking('buy')}
              className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 min-w-[40px] min-h-[40px] text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 stroke-current"
                fill="none"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="2.2" />
                <path d="M12 3v6.8M4.2 15.5l5.8-2.8M19.8 15.5L14 12.7" />
              </svg>
              <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                <span className="sm:hidden">Drive</span>
                <span className="hidden sm:inline">Book Test Drive</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking('rent')}
              className="hidden sm:flex flex-col items-center gap-1 text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <KeyRound className="w-5 h-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium whitespace-nowrap">Rent a Car</span>
            </button>

            <button
              type="button"
              onClick={onOpenCompare}
              className="relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 min-w-[40px] min-h-[40px] text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <div className="relative">
                <GitCompareArrows className="w-5 h-5" strokeWidth={1.75} />
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#4E9612] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {compareCount}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">Compare</span>
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 min-w-[40px] min-h-[40px] text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <div className="relative">
                <Heart className="w-5 h-5" strokeWidth={1.75} />
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#4E9612] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">Wishlist</span>
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="hidden md:flex flex-col items-center gap-1 text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <Headphones className="w-5 h-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium whitespace-nowrap">Contact Us</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden min-w-[42px] min-h-[42px] flex items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dark Charcoal Navigation Bar */}
      <nav className="bg-[#0F1419] text-white border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setOpenDropdown(null);
                onSelectNav('home');
              }}
              className={`px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'home'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              HOME
            </button>

            {/* BUY CARS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('buy')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => onSelectNav('buy-cars', 'All')}
                className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeNav === 'buy-cars'
                    ? 'bg-[#4E9612] text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>BUY CARS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === 'buy' && (
                <div className="absolute left-0 top-full w-48 bg-white text-slate-800 rounded-b shadow-xl border border-slate-200 py-1.5 z-50">
                  {(['All Cars for Sale', 'SUV', 'Sedan', 'Wagon', 'Hatchback'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        onSelectNav('buy-cars', item === 'All Cars for Sale' ? 'All' : `Body:${item}`);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RENT CARS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('rent')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => onSelectNav('rent-cars', 'All')}
                className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeNav === 'rent-cars'
                    ? 'bg-[#4E9612] text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>RENT CARS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === 'rent' && (
                <div className="absolute left-0 top-full w-52 bg-white text-slate-800 rounded-b shadow-xl border border-slate-200 py-1.5 z-50">
                  {[
                    { label: 'All Rental Vehicles', sub: 'All' },
                    { label: 'Luxury & Executive Sedans', sub: 'Body:Sedan' },
                    { label: 'Wagons & G-Wagons', sub: 'Body:Wagon' },
                    { label: 'SUVs & 4x4 Rentals', sub: 'Body:SUV' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        onSelectNav('rent-cars', item.sub);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* USED CARS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('used')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => onSelectNav('used-cars', 'Used')}
                className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeNav === 'used-cars'
                    ? 'bg-[#4E9612] text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>USED CARS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === 'used' && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      onSelectNav('used-cars', 'Used');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] cursor-pointer"
                  >
                    All Certified Used (2015–2024)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      onSelectNav('used-cars', 'Used:Under300k');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] cursor-pointer"
                  >
                    Used Cars Under GH₵ 300,000
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      onSelectNav('used-cars', 'Used:Wagon');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] cursor-pointer"
                  >
                    Certified Used Wagons &amp; SUVs
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectNav('offers')}
              className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'offers'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              OFFERS
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('finance')}
              className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'finance'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              FINANCE
            </button>

            {/* SERVICES Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => onSelectNav('services')}
                className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeNav === 'services'
                    ? 'bg-[#4E9612] text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>SERVICES</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === 'services' && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b shadow-xl border border-slate-200 py-1.5 z-50">
                  {[
                    { label: 'Periodic Car Maintenance', sub: 'periodic' },
                    { label: 'AC & Climate Servicing', sub: 'ac-cooling' },
                    { label: '3D Wheel Alignment', sub: 'wheel-care' },
                    { label: 'Detailing & Ceramic Coat', sub: 'detailing' },
                  ].map((srv) => (
                    <button
                      key={srv.sub}
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        onSelectNav('services', srv.sub);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-lime-50 hover:text-[#468A0E] cursor-pointer"
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectNav('about')}
              className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'about'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              ABOUT US
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('blog')}
              className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'blog'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              BLOG
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('contact')}
              className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeNav === 'contact'
                  ? 'bg-[#4E9612] text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              CONTACT US
            </button>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 grid grid-cols-2 gap-2 border-t border-white/10">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'buy-cars', label: 'Buy Cars' },
                  { id: 'rent-cars', label: 'Rent Cars' },
                  { id: 'used-cars', label: 'Used Cars' },
                  { id: 'services', label: 'Car Service' },
                  { id: 'offers', label: 'Offers' },
                  { id: 'finance', label: 'Finance (GH₵)' },
                  { id: 'about', label: 'About Us' },
                  { id: 'blog', label: 'Blog' },
                  { id: 'contact', label: 'Contact Us' },
                ] as { id: NavTab; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectNav(item.id);
                  }}
                  className={`text-left px-3 py-2.5 min-h-[44px] rounded text-xs font-semibold uppercase tracking-wide flex items-center ${
                    activeNav === item.id
                      ? 'bg-[#4E9612] text-white'
                      : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
