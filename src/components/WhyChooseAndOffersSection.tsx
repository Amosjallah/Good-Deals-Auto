import React, { useState } from 'react';
import {
  CarFront,
  BadgeCheck,
  Banknote,
  RefreshCw,
  Headphones,
  ArrowRight,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { HERO_IMAGES } from '../data/carsData';

interface WhyChooseAndOffersSectionProps {
  onExploreCars: () => void;
  onOpenOffers: () => void;
  onOpenFinance: () => void;
  onOpenService: () => void;
  onOpenAbout: () => void;
}

export const WhyChooseAndOffersSection: React.FC<WhyChooseAndOffersSectionProps> = ({
  onExploreCars,
  onOpenOffers,
  onOpenFinance,
  onOpenService,
  onOpenAbout,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const whyItems = [
    {
      icon: CarFront,
      title: 'Wide Range of Cars',
      subtitle: '100+ Cars to buy or rent',
      action: onExploreCars,
    },
    {
      icon: BadgeCheck,
      title: 'Best Price Guarantee',
      subtitle: 'Transparent GH₵ pricing',
      action: onOpenOffers,
    },
    {
      icon: Banknote,
      title: 'Easy Finance Options',
      subtitle: 'Flexible monthly plans',
      action: onOpenFinance,
    },
    {
      icon: RefreshCw,
      title: 'Exchange Offers',
      subtitle: 'Best trade-in value',
      action: onOpenOffers,
    },
    {
      icon: Headphones,
      title: 'After Sales Support',
      subtitle: 'Trusted service & support',
      action: onOpenService,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* WHY CHOOSE GOOD DEALS AUTOS? */}
      <section className="max-w-[1280px] mx-auto px-3 sm:px-4 pt-4">
        <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-tight uppercase text-slate-900 mb-4">
          WHY CHOOSE <span className="text-[#4E9612]">GOOD DEALS AUTOS?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={item.action}
                className="min-h-[56px] bg-white border border-slate-200 hover:border-lime-300 hover:shadow-sm rounded-lg px-4 py-3.5 flex items-center gap-3 text-left transition-all cursor-pointer"
              >
                <span className="w-10 h-10 rounded-lg bg-lime-50 border border-lime-200 text-[#4E9612] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* EXCLUSIVE OFFERS DARK BANNER */}
      <section id="offers-section" className="max-w-[1280px] mx-auto px-3 sm:px-4">
        <div className="bg-[#0F1419] text-white rounded-xl overflow-hidden border border-white/10 shadow-lg p-4 sm:px-7 sm:py-5 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5 sm:gap-6">
          {/* Left Offer Intro */}
          <div className="flex flex-col min-[380px]:flex-row items-start min-[380px]:items-center gap-3.5 sm:gap-4 shrink-0 w-full xl:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-lime-500/15 border border-lime-500/35 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-[#84CC16]" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#84CC16]">
                EXCLUSIVE OFFERS
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Great Benefits on Every Booking
              </h3>
              <button
                type="button"
                onClick={onOpenOffers}
                className="mt-2.5 min-h-[40px] border border-[#6CC022] text-white hover:bg-[#4E9612] text-xs font-semibold px-4 py-2 rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Middle 4 Benefit Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-0 flex-1 w-full xl:border-l xl:border-white/10 xl:pl-6">
            <div className="bg-white/5 sm:bg-transparent p-3 sm:p-0 sm:px-4 rounded-lg sm:rounded-none sm:border-r sm:border-white/10">
              <div className="text-sm sm:text-base font-extrabold text-white tabular-nums">
                GH₵ 15,000
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-300 mt-0.5">Cash Discount</div>
            </div>

            <div className="bg-white/5 sm:bg-transparent p-3 sm:p-0 sm:px-4 rounded-lg sm:rounded-none sm:border-r sm:border-white/10">
              <div className="text-sm sm:text-base font-bold text-white">
                Flexible Rentals
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-300 mt-0.5 tabular-nums">
                From GH₵ 360/day
              </div>
            </div>

            <div className="bg-white/5 sm:bg-transparent p-3 sm:p-0 sm:px-4 rounded-lg sm:rounded-none sm:border-r sm:border-white/10">
              <div className="text-sm sm:text-base font-bold text-white">
                Free Accessories
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-300 mt-0.5">
                On Selected Models
              </div>
            </div>

            <div className="bg-white/5 sm:bg-transparent p-3 sm:p-0 sm:px-4 rounded-lg sm:rounded-none">
              <div className="text-sm sm:text-base font-bold text-white">
                Extended Warranty
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-300 mt-0.5">
                Up to 5 Years
              </div>
            </div>
          </div>

          {/* Right Gift Box Graphic with Green Satin Ribbon */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <svg viewBox="0 0 96 86" className="w-24 h-20" fill="none" aria-hidden="true">
              <rect x="14" y="34" width="68" height="44" rx="4" fill="#1F242D" stroke="#374151" strokeWidth="1.5" />
              <rect x="10" y="24" width="76" height="14" rx="3" fill="#2A303B" stroke="#4B5563" strokeWidth="1.5" />
              <rect x="42" y="24" width="12" height="54" fill="#58A618" />
              <rect x="14" y="48" width="68" height="8" fill="#468811" opacity="0.85" />
              <path d="M48 24C42 12 26 10 24 18C22 24 38 24 48 24Z" fill="#84CC16" />
              <path d="M48 24C54 12 70 10 72 18C74 24 58 24 48 24Z" fill="#58A618" />
            </svg>
          </div>
        </div>
      </section>

      {/* ABOUT US & NEWSLETTER SPLIT */}
      <section id="about-section" className="max-w-[1280px] mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Half: Showroom Photo + About Copy */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-xs">
            <div className="sm:col-span-6 relative min-h-[200px] sm:min-h-[210px] bg-slate-900">
              <img
                src={HERO_IMAGES.showroom}
                alt="Good Deals Autos showroom exterior at dusk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded shadow-sm">
                <img
                  src="/assets/aistudio/image_77d7d558.png"
                  alt="Good Deals Autos"
                  referrerPolicy="no-referrer"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <div className="sm:col-span-6 p-4 sm:p-6 flex flex-col justify-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#4E9612]">
                ABOUT US
              </div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                Your Trusted Showroom &amp; Rentals
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2.5">
                At Good Deals Autos, we bring you quality cars to buy or rent, certified auto
                servicing, transparent Ghana Cedis pricing, and unmatched customer care. Ignite your
                journey today!
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="min-h-[42px] border border-slate-300 hover:border-[#4E9612] hover:bg-lime-50/50 text-slate-800 text-xs font-semibold px-4 py-2 rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Half: Dark Newsletter Card */}
          <div className="lg:col-span-5 bg-[#0D1016] text-white rounded-xl overflow-hidden relative flex items-center border border-slate-800 shadow-sm min-h-[210px]">
            <img
              src={HERO_IMAGES.headlight}
              alt="Luxury sports car headlight"
              referrerPolicy="no-referrer"
              className="absolute right-0 top-0 h-full w-3/4 object-cover opacity-80"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0D1016] via-[#0D1016]/90 to-[#0D1016]/25"
              aria-hidden="true"
            />

            <div className="relative z-10 p-4 sm:p-6 w-full max-w-md">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#84CC16]">
                STAY UPDATED
              </div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-white mt-1">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Get the latest arrivals, rental deals, service discounts, and GH₵ offers.
              </p>

              {subscribed ? (
                <div className="mt-4 flex items-center gap-2 bg-lime-950/70 border border-lime-500/40 text-lime-200 text-xs font-medium px-3.5 py-2.5 rounded">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>Subscribed! Watch your inbox for our latest car deals &amp; rental offers.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-4 flex flex-col min-[400px]:flex-row items-stretch gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 min-h-[44px] bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[#58A618]"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
