import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TOP_BRANDS } from '../data/carsData';

interface TopBrandsSectionProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  onViewAllBrands: () => void;
}

const BrandEmblem: React.FC<{ brand: string }> = ({ brand }) => {
  switch (brand) {
    case 'Tesla':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 36 32" className="w-7 h-7 text-[#DC2626]" fill="currentColor" aria-hidden="true">
            <path d="M5 7C12 4.5 24 4.5 31 7L29.5 10C24 8.2 12 8.2 6.5 10L5 7ZM16 10.5H20L18 29L16 10.5Z" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-[0.22em] text-slate-900 uppercase">
            TESLA
          </span>
        </div>
      );
    case 'Mercedes-Benz':
      return (
        <div className="flex flex-col items-center gap-1">
          <svg viewBox="0 0 36 36" className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="18" cy="18" r="13" />
            <path d="M18 5V18L7.5 25.5M18 18L28.5 25.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9.5px] font-extrabold tracking-wider text-slate-900 uppercase">
            MERCEDES-BENZ
          </span>
        </div>
      );
    case 'BMW':
      return (
        <div className="flex flex-col items-center gap-1">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <circle cx="18" cy="18" r="13" fill="#111827" stroke="#334155" strokeWidth="1.5" />
            <path d="M18 8A10 10 0 0 1 28 18H18V8Z" fill="#2563EB" />
            <path d="M18 28A10 10 0 0 1 8 18H18V28Z" fill="#2563EB" />
            <path d="M18 8A10 10 0 0 0 8 18H18V8Z" fill="#FFFFFF" />
            <path d="M18 28A10 10 0 0 0 28 18H18V28Z" fill="#FFFFFF" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-[0.2em] text-slate-900 uppercase">
            BMW
          </span>
        </div>
      );
    case 'Audi':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 60 22" className="w-12 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="12" cy="11" r="7.5" />
            <circle cx="24" cy="11" r="7.5" />
            <circle cx="36" cy="11" r="7.5" />
            <circle cx="48" cy="11" r="7.5" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-[0.2em] text-slate-900 uppercase">
            AUDI
          </span>
        </div>
      );
    case 'Toyota':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 44 28" className="w-10 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
            <ellipse cx="22" cy="14" rx="18" ry="11" />
            <ellipse cx="22" cy="14" rx="5.5" ry="10.5" />
            <ellipse cx="22" cy="10" rx="11" ry="4.5" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-widest text-[#DC2626] uppercase">
            TOYOTA
          </span>
        </div>
      );
    case 'Hyundai':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 44 24" className="w-10 h-6 text-[#1E3A8A]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <ellipse cx="22" cy="12" rx="18" ry="9" />
            <path d="M13 17L18 7M26 17L31 7M15.5 12H28.5" strokeLinecap="round" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-widest text-[#1E3A8A] uppercase">
            HYUNDAI
          </span>
        </div>
      );
    case 'Kia':
      return (
        <div className="flex flex-col items-center justify-center py-1">
          <svg viewBox="0 0 64 22" className="w-14 h-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden="true">
            <path d="M8 18V4M8 12L19 4M12 10L20 18M28 4V18M37 18L46 4L55 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'Honda':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 36 28" className="w-8 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <rect x="4" y="3" width="28" height="22" rx="5" />
            <path d="M11 8V20M25 8V20M11 14H25" strokeLinecap="round" />
          </svg>
          <span className="text-[10.5px] font-extrabold tracking-[0.18em] text-[#B91C1C] uppercase">
            HONDA
          </span>
        </div>
      );
    case 'Skoda':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 32 32" className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="16" cy="16" r="12" />
            <path d="M9 18C12 12 20 10 24 12L17 17L21 21L10 20Z" fill="currentColor" />
          </svg>
          <span className="text-[11px] font-extrabold tracking-widest text-slate-800 uppercase">
            ŠKODA
          </span>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center gap-1">
          <svg viewBox="0 0 40 26" className="w-9 h-6 text-[#DC2626]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 20L12 6L20 15L28 6L35 20" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10.5px] font-bold tracking-tight text-slate-800">
            mahindra
          </span>
        </div>
      );
  }
};

export const TopBrandsSection: React.FC<TopBrandsSectionProps> = ({
  selectedBrand,
  onSelectBrand,
  onViewAllBrands,
}) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-tight uppercase text-slate-900">
          OUR <span className="text-[#4E9612]">TOP BRANDS</span>
        </h2>

        <button
          type="button"
          onClick={onViewAllBrands}
          className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#4E9612] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>View All Brands</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-3">
        {TOP_BRANDS.map((brand) => {
          const isActive = selectedBrand === brand;
          return (
            <button
              key={brand}
              type="button"
              onClick={() => onSelectBrand(isActive ? '' : brand)}
              className={`bg-white rounded-lg border px-3 py-4 flex items-center justify-center min-h-[78px] transition-all cursor-pointer ${
                isActive
                  ? 'border-[#4E9612] ring-2 ring-lime-100 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <BrandEmblem brand={brand} />
            </button>
          );
        })}
      </div>
    </section>
  );
};
