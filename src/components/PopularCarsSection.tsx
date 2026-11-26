import React from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Heart,
  GitCompareArrows,
  RotateCcw,
  CarFront,
} from 'lucide-react';
import { Car } from '../data/carsData';

export type YearRangeFilter = 'all' | '2024-2026' | '2020-2023' | '2015-2019';
export type DealModeFilter = 'all' | 'buy' | 'rent';

interface PopularCarsSectionProps {
  cars: Car[];
  showAll: boolean;
  onToggleShowAll: () => void;
  dealMode: DealModeFilter;
  onDealModeChange: (mode: DealModeFilter) => void;
  conditionFilter: 'All' | 'New' | 'Used';
  onConditionChange: (condition: 'All' | 'New' | 'Used') => void;
  bodyTypeFilter: string;
  onBodyTypeChange: (bodyType: string) => void;
  yearRange: YearRangeFilter;
  onYearRangeChange: (range: YearRangeFilter) => void;
  activeBrandLabel: string;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  carouselOffset: number;
  onShiftCarousel: (dir: 'prev' | 'next') => void;
  wishlistIds: string[];
  compareIds: string[];
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onViewDetails: (car: Car) => void;
  onBookCar: (car: Car, mode: 'buy' | 'rent') => void;
}

const HOMEPAGE_DEFAULT_COUNT = 15;

export const PopularCarsSection: React.FC<PopularCarsSectionProps> = ({
  cars,
  showAll,
  onToggleShowAll,
  dealMode,
  onDealModeChange,
  conditionFilter,
  onConditionChange,
  bodyTypeFilter,
  onBodyTypeChange,
  yearRange,
  onYearRangeChange,
  activeBrandLabel,
  hasActiveFilters,
  onResetFilters,
  carouselOffset,
  onShiftCarousel,
  wishlistIds,
  compareIds,
  onToggleWishlist,
  onToggleCompare,
  onViewDetails,
  onBookCar,
}) => {
  const visibleCars = showAll
    ? cars
    : cars.slice(carouselOffset, carouselOffset + HOMEPAGE_DEFAULT_COUNT);

  const canGoPrev = !showAll && carouselOffset > 0;
  const canGoNext = !showAll && carouselOffset + HOMEPAGE_DEFAULT_COUNT < cars.length;

  return (
    <section id="popular-cars" className="max-w-[1280px] mx-auto px-3 sm:px-4 pt-10 sm:pt-12 pb-6">
      {/* Section Heading & Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3.5 mb-5">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-base sm:text-xl font-extrabold tracking-tight uppercase text-slate-900 mr-1">
              EXPLORE OUR <span className="text-[#4E9612]">CARS FOR SALE &amp; RENT</span>
            </h2>
            <button
              type="button"
              onClick={onToggleShowAll}
              className="sm:hidden text-xs font-semibold text-[#4E9612] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{showAll ? 'Top 15' : `All (${cars.length})`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Buy / Rent Mode Switcher */}
            <div className="inline-flex items-center bg-[#0F1419] p-0.5 rounded text-xs">
              {(
                [
                  { id: 'all', label: 'Buy & Rent' },
                  { id: 'buy', label: 'Buy' },
                  { id: 'rent', label: 'Rent' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onDealModeChange(item.id)}
                  className={`px-2.5 sm:px-3 py-1.5 min-h-[34px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                    dealMode === item.id
                      ? 'bg-[#4E9612] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Condition Filter */}
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
              {(['All', 'New', 'Used'] as const).map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => onConditionChange(cond)}
                  className={`px-2.5 py-1.5 min-h-[34px] text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                    conditionFilter === cond
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            {/* Body Type Filter */}
            <select
              aria-label="Filter by body type"
              value={bodyTypeFilter}
              onChange={(e) => onBodyTypeChange(e.target.value)}
              className="w-full sm:w-auto bg-white border border-slate-200 rounded px-2.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer min-h-[38px]"
            >
              <option value="">All Body Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Wagon">Wagon / G-Wagon</option>
              <option value="Hatchback">Hatchback</option>
            </select>

            {/* Model Year Range Filter (2015 - 2026) */}
            <select
              aria-label="Filter by model year range"
              value={yearRange}
              onChange={(e) => onYearRangeChange(e.target.value as YearRangeFilter)}
              className="w-full sm:w-auto bg-white border border-slate-200 rounded px-2.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#4E9612] cursor-pointer tabular-nums min-h-[38px]"
            >
              <option value="all">Years: 2015–2026 ({cars.length})</option>
              <option value="2024-2026">2024–2026 Latest</option>
              <option value="2020-2023">2020–2023 Modern</option>
              <option value="2015-2019">2015–2019 Value</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4E9612] hover:text-[#3B750B] cursor-pointer self-start sm:self-auto py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                Reset{activeBrandLabel ? ` (${activeBrandLabel})` : ''}
              </span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleShowAll}
          className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#4E9612] items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>{showAll ? 'Show Top 15' : `View All Cars (${cars.length})`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Empty Filter State */}
      {cars.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
          <CarFront className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">
            No cars match those exact filters
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Try clearing your brand, body type, or price range to browse our complete showroom lineup.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs font-semibold px-5 py-2.5 rounded cursor-pointer"
          >
            Show All Available Cars
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Left Carousel Arrow */}
          {canGoPrev && (
            <button
              type="button"
              onClick={() => onShiftCarousel('prev')}
              aria-label="Previous cars"
              className="hidden xl:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* 5-Column Multi-Row Car Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {visibleCars.map((car) => {
              const isWishlisted = wishlistIds.includes(car.id);
              const isCompared = compareIds.includes(car.id);
              const primaryActionMode = dealMode === 'rent' ? 'rent' : 'buy';

              return (
                <article
                  key={car.id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-white border-b border-slate-100 flex items-center justify-center overflow-hidden p-2">
                    {car.bestSeller && (
                      <span className="absolute top-2 left-2 z-10 bg-[#4E9612] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                        BEST SELLER
                      </span>
                    )}
                    {car.condition === 'Used' && !car.bestSeller && (
                      <span className="absolute top-2 left-2 z-10 bg-[#0F1419] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                        CERTIFIED USED
                      </span>
                    )}

                    {/* Quick Wishlist & Compare Controls */}
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(car.id)}
                        aria-label={`Save ${car.fullName} to wishlist`}
                        title="Save to Wishlist"
                        className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                          isWishlisted
                            ? 'bg-lime-50 border-lime-300 text-[#468A0E]'
                            : 'bg-white/90 border-slate-200 text-slate-500 hover:text-[#4E9612]'
                        }`}
                      >
                        <Heart className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleCompare(car.id)}
                        aria-label={`Compare ${car.fullName}`}
                        title="Add to Compare"
                        className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-[#0F1419] border-[#0F1419] text-white'
                            : 'bg-white/90 border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <GitCompareArrows className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    <img
                      src={car.image}
                      alt={`${car.fullName} ${car.bodyType} ${car.fuel} for sale and rent in Ghana`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug truncate">
                      {car.fullName}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 truncate tabular-nums">
                      {car.year} · {car.bodyType} · {car.fuel} · {car.kmDriven ?? car.transmission}
                    </p>

                    {/* Ghana Cedis Sale Price + Daily Rental Rate */}
                    <div className="mt-2.5 space-y-0.5">
                      {dealMode === 'rent' ? (
                        <>
                          <div className="text-base font-extrabold text-[#4E9612] tabular-nums">
                            {car.rentLabel}
                          </div>
                          <div className="text-[11px] text-slate-500 tabular-nums">
                            Buy Price: {car.priceLabel}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[15px] font-extrabold text-slate-900 tabular-nums">
                            {car.priceLabel}
                          </div>
                          <div className="text-[11px] font-semibold text-[#4E9612] tabular-nums">
                            Rent: {car.rentLabel}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-3.5 pt-1 grid grid-cols-2 gap-2 mt-auto">
                      <button
                        type="button"
                        onClick={() => onViewDetails(car)}
                        className="min-h-[40px] border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-[11.5px] font-semibold py-2 px-2 rounded transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onBookCar(car, primaryActionMode)}
                        className="min-h-[40px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs sm:text-[11.5px] font-semibold py-2 px-2 rounded transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {dealMode === 'rent' ? 'Rent Now' : 'Buy / Rent'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Carousel Arrow */}
          {canGoNext && (
            <button
              type="button"
              onClick={() => onShiftCarousel('next')}
              aria-label="Next cars"
              className="hidden xl:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:text-[#4E9612] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
