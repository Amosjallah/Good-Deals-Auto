import { useMemo, useState } from 'react';
import { Header, NavTab } from './components/Header';
import { HeroSection } from './components/HeroSection';
import {
  PopularCarsSection,
  YearRangeFilter,
  DealModeFilter,
} from './components/PopularCarsSection';
import { TopBrandsSection } from './components/TopBrandsSection';
import { WhyChooseAndOffersSection } from './components/WhyChooseAndOffersSection';
import { Footer } from './components/Footer';
import {
  CarDetailsModal,
  BookingModal,
  CompareModal,
  WishlistModal,
  FinanceModal,
  InfoDrawerModal,
} from './components/Modals';
import { CARS_DATA, Car } from './data/carsData';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>('home');

  // Search & Filter State
  const [headerBrand, setHeaderBrand] = useState('');
  const [headerQuery, setHeaderQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dealMode, setDealMode] = useState<DealModeFilter>('all');
  const [conditionFilter, setConditionFilter] = useState<'All' | 'New' | 'Used'>('All');
  const [yearRange, setYearRange] = useState<YearRangeFilter>('all');
  const [bodyTypeFilter, setBodyTypeFilter] = useState<string>('');
  const [showAllCars, setShowAllCars] = useState(false);
  const [carouselOffset, setCarouselOffset] = useState(0);

  // Saved State
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Modal / Drawer State
  const [detailCar, setDetailCar] = useState<Car | null>(null);
  const [bookingState, setBookingState] = useState<{
    open: boolean;
    mode: 'buy' | 'rent' | 'service';
    car?: Car | null;
    serviceId?: string;
  }>({ open: false, mode: 'buy' });
  const [compareOpen, setCompareOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<'offers' | 'about' | 'blog' | 'contact' | null>(null);

  const effectiveBrand = filterBrand || headerBrand;

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      if (dealMode === 'buy' && car.availableFor === 'Rent Only') return false;
      if (dealMode === 'rent' && car.availableFor === 'Buy Only') return false;
      if (conditionFilter !== 'All' && car.condition !== conditionFilter) return false;
      if (bodyTypeFilter && car.bodyType !== bodyTypeFilter) return false;
      if (effectiveBrand && car.brand !== effectiveBrand) return false;
      if (filterModel && car.model !== filterModel) return false;
      if (minPrice && car.priceGhs < Number(minPrice)) return false;
      if (maxPrice && car.priceGhs > Number(maxPrice)) return false;

      if (yearRange === '2024-2026' && (car.year < 2024 || car.year > 2026)) return false;
      if (yearRange === '2020-2023' && (car.year < 2020 || car.year > 2023)) return false;
      if (yearRange === '2015-2019' && (car.year < 2015 || car.year > 2019)) return false;

      if (headerQuery.trim()) {
        const q = headerQuery.toLowerCase();
        const hay = `${car.fullName} ${car.brand} ${car.model} ${car.bodyType} ${car.fuel} ${car.year}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [
    dealMode,
    conditionFilter,
    yearRange,
    bodyTypeFilter,
    effectiveBrand,
    filterModel,
    minPrice,
    maxPrice,
    headerQuery,
  ]);

  const hasActiveFilters = Boolean(
    effectiveBrand ||
      filterModel ||
      minPrice ||
      maxPrice ||
      headerQuery.trim() ||
      dealMode !== 'all' ||
      conditionFilter !== 'All' ||
      yearRange !== 'all' ||
      bodyTypeFilter
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAllFilters = () => {
    setHeaderBrand('');
    setHeaderQuery('');
    setFilterBrand('');
    setFilterModel('');
    setMinPrice('');
    setMaxPrice('');
    setDealMode('all');
    setConditionFilter('All');
    setYearRange('all');
    setBodyTypeFilter('');
    setCarouselOffset(0);
  };

  const handleSelectNav = (tab: NavTab, subFilter?: string) => {
    setActiveNav(tab);

    if (tab === 'home') {
      resetAllFilters();
      setShowAllCars(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'buy-cars') {
      setDealMode('buy');
      setConditionFilter('All');
      setShowAllCars(true);
      setCarouselOffset(0);
      if (subFilter && subFilter.startsWith('Body:')) {
        setBodyTypeFilter(subFilter.split(':')[1]);
      } else {
        setBodyTypeFilter('');
      }
      scrollToSection('popular-cars');
      return;
    }

    if (tab === 'rent-cars') {
      setDealMode('rent');
      setConditionFilter('All');
      setShowAllCars(true);
      setCarouselOffset(0);
      if (subFilter && subFilter.startsWith('Body:')) {
        setBodyTypeFilter(subFilter.split(':')[1]);
      } else {
        setBodyTypeFilter('');
      }
      scrollToSection('popular-cars');
      return;
    }

    if (tab === 'used-cars') {
      setDealMode('all');
      setConditionFilter('Used');
      setShowAllCars(true);
      setCarouselOffset(0);
      if (subFilter === 'Used:Under300k') {
        setMaxPrice('300000');
        setBodyTypeFilter('');
      } else if (subFilter === 'Used:Wagon') {
        setBodyTypeFilter('Wagon');
        setMaxPrice('');
      } else {
        setBodyTypeFilter('');
        setMaxPrice('');
      }
      scrollToSection('popular-cars');
      return;
    }

    if (tab === 'offers') {
      scrollToSection('offers-section');
      return;
    }

    if (tab === 'finance') {
      setFinanceOpen(true);
      return;
    }

    if (tab === 'services') {
      setBookingState({
        open: true,
        mode: 'service',
        serviceId: subFilter,
      });
      return;
    }

    if (tab === 'about') {
      scrollToSection('about-section');
      return;
    }

    if (tab === 'blog') {
      setInfoModal('blog');
      return;
    }

    if (tab === 'contact') {
      setInfoModal('contact');
    }
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const wishlistCars = CARS_DATA.filter((c) => wishlistIds.includes(c.id));
  const compareCars = CARS_DATA.filter((c) => compareIds.includes(c.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827]">
      <Header
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        searchQuery={headerQuery}
        searchBrand={headerBrand}
        onSearchChange={(brand, query) => {
          setHeaderBrand(brand);
          setHeaderQuery(query);
          setCarouselOffset(0);
        }}
        onSearchSubmit={() => {
          setShowAllCars(true);
          scrollToSection('popular-cars');
        }}
        compareCount={compareIds.length}
        wishlistCount={wishlistIds.length}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenBooking={(mode) => setBookingState({ open: true, mode })}
        onOpenContact={() => setInfoModal('contact')}
      />

      <main className="flex-1">
        <HeroSection
          selectedBrand={filterBrand}
          selectedModel={filterModel}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onFilterChange={({ brand, model, minPrice: minP, maxPrice: maxP }) => {
            setFilterBrand(brand);
            setFilterModel(model);
            setMinPrice(minP);
            setMaxPrice(maxP);
            setCarouselOffset(0);
          }}
          onApplySearch={() => {
            setShowAllCars(true);
            scrollToSection('popular-cars');
          }}
          onExploreCars={() => {
            setShowAllCars(true);
            scrollToSection('popular-cars');
          }}
          onRentCars={() => {
            setDealMode('rent');
            setShowAllCars(true);
            scrollToSection('popular-cars');
          }}
          onBookTestDrive={() => setBookingState({ open: true, mode: 'buy' })}
          onBookService={() => setBookingState({ open: true, mode: 'service' })}
        />

        <PopularCarsSection
          cars={filteredCars}
          showAll={showAllCars}
          onToggleShowAll={() => {
            setShowAllCars((prev) => !prev);
            setCarouselOffset(0);
          }}
          dealMode={dealMode}
          onDealModeChange={(mode) => {
            setDealMode(mode);
            setCarouselOffset(0);
          }}
          conditionFilter={conditionFilter}
          onConditionChange={(cond) => {
            setConditionFilter(cond);
            setCarouselOffset(0);
          }}
          bodyTypeFilter={bodyTypeFilter}
          onBodyTypeChange={(body) => {
            setBodyTypeFilter(body);
            setCarouselOffset(0);
          }}
          yearRange={yearRange}
          onYearRangeChange={(range) => {
            setYearRange(range);
            setCarouselOffset(0);
          }}
          activeBrandLabel={effectiveBrand}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetAllFilters}
          carouselOffset={carouselOffset}
          onShiftCarousel={(dir) => {
            setCarouselOffset((prev) => {
              if (dir === 'next') {
                return Math.min(prev + 5, Math.max(0, filteredCars.length - 15));
              }
              return Math.max(0, prev - 5);
            });
          }}
          wishlistIds={wishlistIds}
          compareIds={compareIds}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onViewDetails={(car) => setDetailCar(car)}
          onBookCar={(car, mode) =>
            setBookingState({ open: true, mode, car })
          }
        />

        <TopBrandsSection
          selectedBrand={effectiveBrand}
          onSelectBrand={(brand) => {
            setFilterBrand(brand);
            setHeaderBrand('');
            setFilterModel('');
            setCarouselOffset(0);
            if (brand) {
              setShowAllCars(true);
              scrollToSection('popular-cars');
            }
          }}
          onViewAllBrands={() => {
            resetAllFilters();
            setShowAllCars(true);
            scrollToSection('popular-cars');
          }}
        />

        <WhyChooseAndOffersSection
          onExploreCars={() => {
            setShowAllCars(true);
            scrollToSection('popular-cars');
          }}
          onOpenOffers={() => setInfoModal('offers')}
          onOpenFinance={() => setFinanceOpen(true)}
          onOpenService={() => setBookingState({ open: true, mode: 'service' })}
          onOpenAbout={() => setInfoModal('about')}
        />
      </main>

      <Footer
        onSelectNav={handleSelectNav}
        onOpenBooking={(mode) => setBookingState({ open: true, mode })}
        onOpenContact={() => setInfoModal('contact')}
      />

      {/* Interactive Modals */}
      {detailCar && (
        <CarDetailsModal
          car={detailCar}
          isWishlisted={wishlistIds.includes(detailCar.id)}
          isCompared={compareIds.includes(detailCar.id)}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onBookAction={(car, mode) =>
            setBookingState({ open: true, mode, car })
          }
          onClose={() => setDetailCar(null)}
        />
      )}

      {bookingState.open && (
        <BookingModal
          initialMode={bookingState.mode}
          initialCar={bookingState.car}
          initialServiceId={bookingState.serviceId}
          onClose={() => setBookingState({ open: false, mode: 'buy' })}
        />
      )}

      {compareOpen && (
        <CompareModal
          compareCars={compareCars}
          onRemoveCompare={handleToggleCompare}
          onBookCar={(car, mode) =>
            setBookingState({ open: true, mode, car })
          }
          onClose={() => setCompareOpen(false)}
        />
      )}

      {wishlistOpen && (
        <WishlistModal
          wishlistCars={wishlistCars}
          onRemoveWishlist={handleToggleWishlist}
          onViewDetails={(car) => setDetailCar(car)}
          onBookCar={(car, mode) =>
            setBookingState({ open: true, mode, car })
          }
          onClose={() => setWishlistOpen(false)}
        />
      )}

      {financeOpen && (
        <FinanceModal
          onClose={() => setFinanceOpen(false)}
          onApplyCallback={() => setInfoModal('contact')}
        />
      )}

      {infoModal && (
        <InfoDrawerModal
          type={infoModal}
          onClose={() => setInfoModal(null)}
          onBookBuy={() => setBookingState({ open: true, mode: 'buy' })}
          onBookRent={() => setBookingState({ open: true, mode: 'rent' })}
        />
      )}
    </div>
  );
}
