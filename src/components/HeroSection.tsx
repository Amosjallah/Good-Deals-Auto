import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CarFront,
  ChevronDown,
} from 'lucide-react';
import { HERO_IMAGES, TOP_BRANDS, CARS_DATA } from '../data/carsData';

interface HeroSectionProps {
  selectedBrand: string;
  selectedModel: string;
  minPrice: string;
  maxPrice: string;
  onFilterChange: (filters: {
    brand: string;
    model: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
  onApplySearch: () => void;
  onExploreCars: () => void;
  onRentCars: () => void;
  onBookTestDrive: () => void;
  onBookService: () => void;
}

const HERO_SLIDES = [
  {
    headlineTop: 'Good Deals Autos',
    headlineAccent: 'Ignite Your Journey',
    subtitle:
      'Buy or rent Tesla, Mercedes-Benz, BMW, Wagons, and SUVs from 2015 to 2026 in Ghana Cedis — backed by certified auto care.',
    primaryLabel: 'EXPLORE CARS',
    secondaryLabel: 'RENT A CAR',
    primaryAction: 'explore' as const,
    secondaryAction: 'rent' as const,
    image: HERO_IMAGES.headlight,
    imageAlt: 'Dark luxury sports vehicle front grille and LED headlights',
  },
  {
    headlineTop: 'Certified Showroom',
    headlineAccent: 'Sales & Rentals',
    subtitle:
      'Every vehicle undergoes a 210-point inspection with flexible GH₵ financing, instant trade-in valuation, and chauffeur-driven rental options.',
    primaryLabel: 'BOOK TEST DRIVE',
    secondaryLabel: 'EXPLORE CARS',
    primaryAction: 'test-drive' as const,
    secondaryAction: 'explore' as const,
    image: HERO_IMAGES.suv,
    imageAlt: 'Luxury SUV parked in twilight showroom plaza',
  },
  {
    headlineTop: 'Precision Workshop',
    headlineAccent: 'Showroom Care',
    subtitle:
      'Periodic maintenance, 3D wheel alignment, AC cooling service, and ceramic detailing by certified automotive technicians.',
    primaryLabel: 'BOOK SERVICE',
    secondaryLabel: 'RENT A CAR',
    primaryAction: 'service' as const,
    secondaryAction: 'rent' as const,
    image: HERO_IMAGES.showroom,
    imageAlt: 'Good Deals Autos architectural glass car showroom exterior at dusk',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedBrand,
  selectedModel,
  minPrice,
  maxPrice,
  onFilterChange,
  onApplySearch,
  onExploreCars,
  onRentCars,
  onBookTestDrive,
  onBookService,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[slideIndex];

  const availableModels = Array.from(
    new Set(
      CARS_DATA.filter((car) => !selectedBrand || car.brand === selectedBrand).map(
        (car) => car.model
      )
    )
  );

  const prevSlide = () =>
    setSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  const nextSlide = () =>
    setSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));

  const runAction = (action: 'explore' | 'rent' | 'test-drive' | 'service') => {
    if (action === 'explore') onExploreCars();
    else if (action === 'rent') onRentCars();
    else if (action === 'test-drive') onBookTestDrive();
    else onBookService();
  };

  return (
    <section className="relative">
      {/* Large Centered Editorial Hero with Full-Bleed Background Car Image */}
      <div className="relative bg-[#07090D] text-white overflow-hidden min-h-[580px] sm:min-h-[670px] lg:min-h-[720px] flex items-center justify-center">
        {/* Background Showcase Image */}
        <img
          src={currentSlide.image}
          alt={currentSlide.imageAlt}
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-300"
        />

        {/* Balanced Center-Legibility Scrim */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/80"
          aria-hidden="true"
        />

        {/* Left & Right Minimal Carousel Chevrons */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous hero slide"
          className="absolute left-1.5 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-[#84CC16] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.6} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next hero slide"
          className="absolute right-1.5 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-[#84CC16] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.6} />
        </button>

        {/* Centered Editorial Copy & CTA Buttons */}
        <div className="relative z-10 max-w-4xl mx-auto px-11 sm:px-16 pt-12 pb-24 text-center flex flex-col items-center">
          <h1 className="font-hero-serif text-[34px] sm:text-6xl lg:text-[72px] leading-[1.06] tracking-tight text-balance">
            <span className="block font-bold text-white">{currentSlide.headlineTop}</span>
            <span className="block italic font-normal text-[#84CC16] mt-1.5">
              {currentSlide.headlineAccent}
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            {currentSlide.subtitle}
          </p>

          {/* Centered Two-Button Row */}
          <div className="mt-7 sm:mt-8 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => runAction(currentSlide.primaryAction)}
              className="bg-[#58A618] hover:bg-[#468811] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] px-7 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xs transition-colors shadow-lg cursor-pointer whitespace-nowrap"
            >
              {currentSlide.primaryLabel}
            </button>

            <button
              type="button"
              onClick={() => runAction(currentSlide.secondaryAction)}
              className="bg-black/50 hover:bg-white/15 text-white border border-[#84CC16]/80 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] px-7 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              {currentSlide.secondaryLabel}
            </button>
          </div>

          {/* Centered Pagination Dots */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.headlineTop}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === slideIndex ? 'bg-[#84CC16] scale-125' : 'bg-white/40 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlapping Floating Filter Bar: Find Your Perfect Car (GH₵) */}
      <div className="max-w-[1140px] mx-auto px-3 sm:px-4 -mt-8 relative z-30">
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-3.5 sm:px-5 sm:py-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="flex items-center gap-2.5 pr-2 shrink-0">
            <span className="w-9 h-9 rounded-full bg-[#4E9612] text-white flex items-center justify-center shrink-0 shadow-sm">
              <CarFront className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
              Find Your Perfect Car
            </span>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 flex-1">
            {/* Select Brand */}
            <div className="relative">
              <select
                aria-label="Select Brand"
                value={selectedBrand}
                onChange={(e) =>
                  onFilterChange({
                    brand: e.target.value,
                    model: '',
                    minPrice,
                    maxPrice,
                  })
                }
                className="w-full min-h-[44px] appearance-none bg-white border border-slate-300 rounded px-3 py-2.5 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer"
              >
                <option value="">Select Brand</option>
                {TOP_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Select Model */}
            <div className="relative">
              <select
                aria-label="Select Model"
                value={selectedModel}
                onChange={(e) =>
                  onFilterChange({
                    brand: selectedBrand,
                    model: e.target.value,
                    minPrice,
                    maxPrice,
                  })
                }
                className="w-full min-h-[44px] appearance-none bg-white border border-slate-300 rounded px-3 py-2.5 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer"
              >
                <option value="">Select Model</option>
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Min Price in GH₵ */}
            <div className="relative">
              <select
                aria-label="Minimum Price"
                value={minPrice}
                onChange={(e) =>
                  onFilterChange({
                    brand: selectedBrand,
                    model: selectedModel,
                    minPrice: e.target.value,
                    maxPrice,
                  })
                }
                className="w-full min-h-[44px] appearance-none bg-white border border-slate-300 rounded px-3 py-2.5 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer tabular-nums"
              >
                <option value="">Min Price (GH₵)</option>
                <option value="100000">GH₵ 100,000+</option>
                <option value="250000">GH₵ 250,000+</option>
                <option value="450000">GH₵ 450,000+</option>
                <option value="700000">GH₵ 700,000+</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Max Price in GH₵ */}
            <div className="relative">
              <select
                aria-label="Maximum Price"
                value={maxPrice}
                onChange={(e) =>
                  onFilterChange({
                    brand: selectedBrand,
                    model: selectedModel,
                    minPrice,
                    maxPrice: e.target.value,
                  })
                }
                className="w-full min-h-[44px] appearance-none bg-white border border-slate-300 rounded px-3 py-2.5 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer tabular-nums"
              >
                <option value="">Max Price (GH₵)</option>
                <option value="300000">Up to GH₵ 300,000</option>
                <option value="550000">Up to GH₵ 550,000</option>
                <option value="850000">Up to GH₵ 850,000</option>
                <option value="2500000">Up to GH₵ 2,500,000</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="button"
            onClick={onApplySearch}
            className="min-h-[44px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Search Cars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
