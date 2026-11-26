import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Heart,
  GitCompareArrows,
  Wrench,
  Calendar,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Calculator,
  Trash2,
  Tag,
  BookOpen,
  KeyRound,
} from 'lucide-react';
import {
  Car,
  CARS_DATA,
  SERVICE_PACKAGES,
  BLOG_ARTICLES,
  HERO_IMAGES,
} from '../data/carsData';

interface ModalShellProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  children: React.ReactNode;
}

const ModalShell: React.FC<ModalShellProps> = ({
  onClose,
  title,
  subtitle,
  maxWidth = 'max-w-2xl',
  children,
}) => (
  <div
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto"
    onClick={onClose}
  >
    <div
      className={`bg-white rounded-xl shadow-2xl border border-slate-200 w-full ${maxWidth} overflow-hidden my-auto max-h-[92dvh] flex flex-col`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 sm:gap-4 bg-slate-50">
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
    </div>
  </div>
);

function calculateMonthlyEmiGhs(priceGhs: number, downPercent: number, months: number, rateAnnual = 14.5) {
  const principal = priceGhs * (1 - downPercent / 100);
  const monthlyRate = rateAnnual / 12 / 100;
  if (monthlyRate === 0) return Math.round(principal / months);
  const factor = Math.pow(1 + monthlyRate, months);
  return Math.round((principal * monthlyRate * factor) / (factor - 1));
}

export const CarDetailsModal: React.FC<{
  car: Car;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onBookAction: (car: Car, mode: 'buy' | 'rent') => void;
  onClose: () => void;
}> = ({
  car,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onBookAction,
  onClose,
}) => {
  const [downPercent, setDownPercent] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(48);
  const monthlyEmi = calculateMonthlyEmiGhs(car.priceGhs, downPercent, tenureMonths);

  return (
    <ModalShell
      onClose={onClose}
      title={car.fullName}
      subtitle={`${car.condition} Vehicle · ${car.bodyType} · ${car.year} · Buy or Rent`}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg p-3 aspect-[4/3] flex items-center justify-center">
            <img
              src={car.image}
              alt={car.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Good Deals Autos Service &amp; Care
            </div>
            <p className="text-xs font-medium text-slate-800 mt-1 leading-relaxed">
              {car.servicePlan}
            </p>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                {car.priceLabel}
              </div>
              <div className="text-xs font-bold text-[#4E9612] tabular-nums mt-0.5">
                Daily Rental: {car.rentLabel} (Self-Drive or Chauffeur)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleWishlist(car.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  isWishlisted
                    ? 'bg-lime-50 border-lime-300 text-[#468A0E]'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleCompare(car.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  isCompared
                    ? 'bg-[#0F1419] border-[#0F1419] text-white'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <GitCompareArrows className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {[
              { label: 'Engine', value: car.engine },
              { label: 'Max Power', value: car.power },
              { label: 'Fuel / Range', value: `${car.fuel} · ${car.mileage}` },
              { label: 'Transmission', value: car.transmission },
              { label: 'Seating', value: car.seating },
              { label: 'Condition', value: car.kmDriven ? `Used (${car.kmDriven})` : 'Brand New' },
            ].map((spec) => (
              <div key={spec.label} className="bg-slate-50 border border-slate-200 rounded p-2.5">
                <div className="text-[11px] text-slate-500">{spec.label}</div>
                <div className="font-bold text-slate-900 mt-0.5 tabular-nums">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Key Highlights */}
          <div>
            <div className="text-xs font-bold text-slate-900 mb-1.5">Key Features</div>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-1.5">
              {car.highlights.map((feat) => (
                <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E9612] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick EMI Estimator in GH₵ */}
          <div className="bg-[#0F1419] text-white rounded-lg p-3.5 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                Monthly Payment Estimate (GH₵)
              </span>
              <span className="text-base font-extrabold text-[#84CC16] tabular-nums">
                GH₵ {monthlyEmi.toLocaleString('en-US')}/mo
              </span>
            </div>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 text-xs">
              <label className="block">
                <span className="text-slate-400">Down Payment ({downPercent}%)</span>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full accent-[#58A618] mt-1.5"
                />
              </label>
              <label className="block">
                <span className="text-slate-400">Tenure ({tenureMonths / 12} Years)</span>
                <select
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full min-h-[38px] mt-1 bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-white"
                >
                  <option value={24}>24 Months (2 Yrs)</option>
                  <option value={36}>36 Months (3 Yrs)</option>
                  <option value={48}>48 Months (4 Yrs)</option>
                  <option value={60}>60 Months (5 Yrs)</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookAction(car, 'buy');
              }}
              className="min-h-[44px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-sm font-semibold py-2.5 px-4 rounded transition-colors cursor-pointer"
            >
              Buy / Book Test Drive
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookAction(car, 'rent');
              }}
              className="min-h-[44px] bg-[#0F1419] hover:bg-black text-white text-sm font-semibold py-2.5 px-4 rounded transition-colors cursor-pointer"
            >
              Rent ({car.rentLabel})
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export const BookingModal: React.FC<{
  initialMode: 'buy' | 'rent' | 'service';
  initialCar?: Car | null;
  initialServiceId?: string;
  onClose: () => void;
}> = ({ initialMode, initialCar, initialServiceId, onClose }) => {
  const [mode, setMode] = useState<'buy' | 'rent' | 'service'>(initialMode);
  const [selectedCarId, setSelectedCarId] = useState(
    initialCar?.id || CARS_DATA[0].id
  );
  const [servicePkgId, setServicePkgId] = useState(
    initialServiceId || SERVICE_PACKAGES[0].id
  );
  const [vehicleReg, setVehicleReg] = useState('');
  const [date, setDate] = useState('2026-11-28');
  const [rentalDays, setRentalDays] = useState(3);
  const [driverOption, setDriverOption] = useState<'self-drive' | 'chauffeur'>('self-drive');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const selectedCar = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];
  const selectedPkg =
    SERVICE_PACKAGES.find((p) => p.id === servicePkgId) || SERVICE_PACKAGES[0];

  const chauffeurFeePerDay = driverOption === 'chauffeur' ? 250 : 0;
  const totalRentalGhs = (selectedCar.rentPerDayGhs + chauffeurFeePerDay) * rentalDays;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = mode === 'service' ? 'SRV' : mode === 'rent' ? 'RNT' : 'BUY';
    const refCode = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedRef(refCode);
  };

  return (
    <ModalShell
      onClose={onClose}
      title={
        mode === 'rent'
          ? 'Rent a Car in Ghana'
          : mode === 'buy'
          ? 'Buy or Book a Test Drive'
          : 'Book Certified Car Service'
      }
      subtitle="Good Deals Autos Showroom & Rental Center · Airport Residential Area, Accra"
      maxWidth="max-w-xl"
    >
      {/* 3-Mode Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg mb-5">
        <button
          type="button"
          onClick={() => {
            setMode('buy');
            setConfirmedRef(null);
          }}
          className={`min-h-[42px] py-2 px-1.5 sm:px-2 rounded-md text-[11px] sm:text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            mode === 'buy'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Buy / <span className="hidden min-[400px]:inline">Test </span>Drive
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('rent');
            setConfirmedRef(null);
          }}
          className={`min-h-[42px] py-2 px-1.5 sm:px-2 rounded-md text-[11px] sm:text-xs font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap ${
            mode === 'rent'
              ? 'bg-white text-[#4E9612] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 shrink-0" />
          <span>Rent Car</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('service');
            setConfirmedRef(null);
          }}
          className={`min-h-[42px] py-2 px-1.5 sm:px-2 rounded-md text-[11px] sm:text-xs font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap ${
            mode === 'service'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 shrink-0" />
          <span>Service</span>
        </button>
      </div>

      {confirmedRef ? (
        <div className="bg-lime-50 border border-lime-300 rounded-lg p-6 text-center space-y-3">
          <CheckCircle2 className="w-11 h-11 text-[#4E9612] mx-auto" />
          <h4 className="text-lg font-extrabold text-slate-900">
            {mode === 'rent'
              ? 'Rental Reservation Confirmed!'
              : mode === 'buy'
              ? 'Showroom Appointment Confirmed!'
              : 'Service Slot Reserved!'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Reference <strong className="text-slate-900 tabular-nums">{confirmedRef}</strong> for{' '}
            <strong>{name}</strong> ({phone}). Scheduled for{' '}
            <strong className="tabular-nums">{date}</strong> at <strong>{timeSlot}</strong>:{' '}
            <strong>
              {mode === 'service'
                ? selectedPkg.name
                : mode === 'rent'
                ? `${selectedCar.fullName} (${rentalDays} days · GH₵ ${totalRentalGhs.toLocaleString('en-US')})`
                : `${selectedCar.fullName} (${selectedCar.priceLabel})`}
            </strong>
            .
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 min-h-[42px] bg-[#0F1419] hover:bg-black text-white text-xs font-semibold px-6 py-2.5 rounded cursor-pointer"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode !== 'service' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Vehicle Model
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full min-h-[44px] border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#4E9612]"
                >
                  {CARS_DATA.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.fullName} — {mode === 'rent' ? car.rentLabel : car.priceLabel}
                    </option>
                  ))}
                </select>
              </div>

              {mode === 'rent' && (
                <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Rental Duration (Days)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full min-h-[42px] border border-slate-300 bg-white rounded px-3 py-2 text-sm tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Driving Option
                      </label>
                      <select
                        value={driverOption}
                        onChange={(e) =>
                          setDriverOption(e.target.value as 'self-drive' | 'chauffeur')
                        }
                        className="w-full min-h-[42px] border border-slate-300 bg-white rounded px-3 py-2 text-sm"
                      >
                        <option value="self-drive">Self-Drive</option>
                        <option value="chauffeur">Chauffeur (+GH₵ 250/day)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-600">
                      Estimated Rental Total ({rentalDays} day{rentalDays === 1 ? '' : 's'})
                    </span>
                    <span className="text-base font-extrabold text-[#4E9612] tabular-nums">
                      GH₵ {totalRentalGhs.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Service Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setServicePkgId(pkg.id)}
                      className={`text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                        servicePkgId === pkg.id
                          ? 'border-[#4E9612] bg-lime-50/70'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                        <span className="text-xs font-extrabold text-[#4E9612] tabular-nums">
                          {pkg.price}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{pkg.duration}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Car Make / Model &amp; Registration
                </label>
                <input
                  type="text"
                  required
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value)}
                  placeholder="e.g. Mercedes C300 · GR 4521-24"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {mode === 'rent' ? 'Pickup Date' : 'Preferred Date'}
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
              >
                <option>09:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>04:30 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+233 24 123 4567"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4E9612] hover:bg-[#3B750B] text-white text-sm font-bold py-3 rounded transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {mode === 'rent'
                ? `Reserve Rental (GH₵ ${totalRentalGhs.toLocaleString('en-US')})`
                : mode === 'buy'
                ? 'Confirm Test Drive / Purchase Visit'
                : 'Confirm Service Appointment'}
            </span>
          </button>
        </form>
      )}
    </ModalShell>
  );
};

export const CompareModal: React.FC<{
  compareCars: Car[];
  onRemoveCompare: (id: string) => void;
  onBookCar: (car: Car, mode: 'buy' | 'rent') => void;
  onClose: () => void;
}> = ({ compareCars, onRemoveCompare, onBookCar, onClose }) => (
  <ModalShell
    onClose={onClose}
    title="Side-by-Side Car Comparison"
    subtitle={`Comparing ${compareCars.length} of up to 3 selected vehicles`}
    maxWidth="max-w-4xl"
  >
    {compareCars.length === 0 ? (
      <div className="text-center py-8">
        <GitCompareArrows className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-800">No cars selected for comparison yet.</p>
        <p className="text-xs text-slate-500 mt-1">
          Click the Compare icon on any car card to compare prices, rental rates, and specs side by side.
        </p>
      </div>
    ) : (
      <div>
        <p className="sm:hidden text-[11px] font-medium text-slate-500 mb-2">
          Swipe horizontally to compare all vehicles
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 pr-4 font-bold text-slate-500 uppercase w-28 sm:w-32">Specification</th>
                {compareCars.map((car) => (
                  <th key={car.id} className="py-3 px-3 min-w-[165px] sm:min-w-[180px] align-top">
                  <div className="relative bg-white border border-slate-200 rounded p-2 mb-2 aspect-[4/3] flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onRemoveCompare(car.id)}
                      aria-label={`Remove ${car.fullName}`}
                      className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={car.image}
                      alt={car.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">{car.fullName}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[
              { label: 'Buy Price', render: (c: Car) => c.priceLabel },
              { label: 'Daily Rental', render: (c: Car) => c.rentLabel },
              { label: 'Model Year', render: (c: Car) => `${c.year} (${c.condition})` },
              { label: 'Fuel & Range', render: (c: Car) => `${c.fuel} · ${c.mileage}` },
              { label: 'Transmission', render: (c: Car) => c.transmission },
              { label: 'Engine', render: (c: Car) => c.engine },
              { label: 'Max Power', render: (c: Car) => c.power },
            ].map((row) => (
              <tr key={row.label}>
                <td className="py-2.5 pr-4 font-semibold text-slate-500">{row.label}</td>
                {compareCars.map((car) => (
                  <td key={car.id} className="py-2.5 px-3 font-semibold text-slate-900 tabular-nums">
                    {row.render(car)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="py-3 pr-4 font-semibold text-slate-500">Action</td>
              {compareCars.map((car) => (
                <td key={car.id} className="py-3 px-3">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookCar(car, 'buy');
                      }}
                      className="bg-[#4E9612] hover:bg-[#3B750B] text-white text-[11px] font-semibold px-2 py-2 rounded cursor-pointer"
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookCar(car, 'rent');
                      }}
                      className="bg-[#0F1419] hover:bg-black text-white text-[11px] font-semibold px-2 py-2 rounded cursor-pointer"
                    >
                      Rent
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    )}
  </ModalShell>
);

export const WishlistModal: React.FC<{
  wishlistCars: Car[];
  onRemoveWishlist: (id: string) => void;
  onViewDetails: (car: Car) => void;
  onBookCar: (car: Car, mode: 'buy' | 'rent') => void;
  onClose: () => void;
}> = ({ wishlistCars, onRemoveWishlist, onViewDetails, onBookCar, onClose }) => (
  <ModalShell
    onClose={onClose}
    title="Your Saved Cars Wishlist"
    subtitle={`${wishlistCars.length} saved vehicle${wishlistCars.length === 1 ? '' : 's'}`}
    maxWidth="max-w-xl"
  >
    {wishlistCars.length === 0 ? (
      <div className="text-center py-8">
        <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-800">Your wishlist is empty.</p>
        <p className="text-xs text-slate-500 mt-1">
          Tap the heart icon on any car to bookmark it for buying or renting later.
        </p>
      </div>
    ) : (
      <div className="space-y-3">
        {wishlistCars.map((car) => (
          <div
            key={car.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={car.image}
                alt={car.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-14 object-contain bg-white border border-slate-100 rounded p-1 shrink-0"
              />
              <div>
                <div className="text-sm font-bold text-slate-900">{car.fullName}</div>
                <div className="text-xs text-slate-500 tabular-nums">
                  {car.priceLabel} · Rent {car.rentLabel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewDetails(car);
                }}
                className="flex-1 sm:flex-none min-h-[40px] border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookCar(car, 'rent');
                }}
                className="flex-1 sm:flex-none min-h-[40px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
              >
                Buy / Rent
              </button>
              <button
                type="button"
                onClick={() => onRemoveWishlist(car.id)}
                aria-label={`Remove ${car.fullName} from wishlist`}
                className="min-w-[38px] min-h-[38px] flex items-center justify-center text-slate-400 hover:text-red-600 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </ModalShell>
);

export const FinanceModal: React.FC<{
  onClose: () => void;
  onApplyCallback: () => void;
}> = ({ onClose, onApplyCallback }) => {
  const [selectedCarId, setSelectedCarId] = useState(CARS_DATA[0].id);
  const [downPercent, setDownPercent] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(48);
  const [rate, setRate] = useState(14.5);

  const car = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];
  const emi = calculateMonthlyEmiGhs(car.priceGhs, downPercent, tenureMonths, rate);
  const downAmountGhs = Math.round((car.priceGhs * downPercent) / 100);
  const loanAmountGhs = car.priceGhs - downAmountGhs;

  return (
    <ModalShell
      onClose={onClose}
      title="Good Deals Autos Ghana Car Finance Calculator (GH₵)"
      subtitle="Low down payments starting at 10% · Flexible monthly installments in Ghana Cedis"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Car Model</label>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900"
          >
            {CARS_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullName} — {c.priceLabel}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded p-3">
            <div className="text-[11px] text-slate-500">Down Payment ({downPercent}%)</div>
            <div className="text-sm font-extrabold text-slate-900 tabular-nums mt-0.5">
              GH₵ {downAmountGhs.toLocaleString('en-US')}
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full accent-[#58A618] mt-2"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-3">
            <div className="text-[11px] text-slate-500">Loan Tenure</div>
            <div className="text-sm font-extrabold text-slate-900 tabular-nums mt-0.5">
              {tenureMonths / 12} Years
            </div>
            <select
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full mt-2 bg-white border border-slate-300 rounded px-2 py-1 text-xs"
            >
              <option value={24}>2 Years</option>
              <option value={36}>3 Years</option>
              <option value={48}>4 Years</option>
              <option value={60}>5 Years</option>
            </select>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-3">
            <div className="text-[11px] text-slate-500">Annual Rate</div>
            <div className="text-sm font-extrabold text-slate-900 tabular-nums mt-0.5">
              {rate.toFixed(1)}% p.a.
            </div>
            <input
              type="range"
              min={10}
              max={24}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#58A618] mt-2"
            />
          </div>
        </div>

        <div className="bg-[#0F1419] text-white rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 tabular-nums">
              Financed Amount: GH₵ {loanAmountGhs.toLocaleString('en-US')}
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#84CC16] tabular-nums mt-0.5">
              GH₵ {emi.toLocaleString('en-US')} / month
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onApplyCallback();
            }}
            className="min-h-[44px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs font-bold px-5 py-2.5 rounded inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>Apply for Finance</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export const InfoDrawerModal: React.FC<{
  type: 'offers' | 'about' | 'blog' | 'contact';
  onClose: () => void;
  onBookBuy: () => void;
  onBookRent: () => void;
}> = ({ type, onClose, onBookBuy, onBookRent }) => {
  const [contactSent, setContactSent] = useState(false);

  if (type === 'offers') {
    return (
      <ModalShell
        onClose={onClose}
        title="Good Deals Autos Exclusive Sales & Rental Offers"
        subtitle="Valid this month across new cars, certified used cars, rentals, and service packages"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            {
              title: 'Up to GH₵ 15,000 Cash Discount',
              desc: 'Instant showroom savings on select Tesla, Mercedes-Benz, BMW, Toyota, and Kia models.',
            },
            {
              title: 'Weekly Rental Bundle Discount',
              desc: 'Book any sedan, SUV, or touring wagon for 7+ days and receive 15% off daily GH₵ rates.',
            },
            {
              title: 'Complimentary Accessories Kit',
              desc: 'Includes 3D floor mats, tinting voucher, and first full tank / charge on new purchases.',
            },
            {
              title: '5-Year Extended Care & Service',
              desc: 'First 2 periodic services free plus 20% off ceramic detailing and AC maintenance.',
            },
          ].map((offer) => (
            <div key={offer.title} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex items-center gap-2 text-[#4E9612] font-bold text-xs mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>SHOWROOM BENEFIT</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">{offer.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{offer.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookBuy();
            }}
            className="bg-[#4E9612] hover:bg-[#3B750B] text-white text-xs font-bold px-5 py-2.5 rounded cursor-pointer"
          >
            Claim Offer on Purchase
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookRent();
            }}
            className="border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded cursor-pointer"
          >
            Book Discounted Rental
          </button>
        </div>
      </ModalShell>
    );
  }

  if (type === 'about') {
    return (
      <ModalShell
        onClose={onClose}
        title="About Good Deals Autos — Ignite Your Journey"
        subtitle="Ghana's premier multi-brand showroom, executive rental fleet, and workshop"
      >
        <div className="space-y-4">
          <img
            src={HERO_IMAGES.showroom}
            alt="Good Deals Autos Showroom"
            referrerPolicy="no-referrer"
            className="w-full h-48 object-cover rounded-lg border border-slate-200"
          />
          <p className="text-sm text-slate-700 leading-relaxed">
            Good Deals Autos brings together outright car sales, flexible daily and corporate
            vehicle rentals, and a certified multi-brand workshop under one roof in Accra. Choose
            from 2015–2026 models including Tesla, Mercedes-Benz, BMW, Audi Wagons, and Toyota SUVs
            with transparent Ghana Cedis pricing.
          </p>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2.5 sm:gap-3 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <div className="text-lg font-extrabold text-[#4E9612] tabular-nums">100+</div>
              <div className="text-[11px] text-slate-600">Sale &amp; Rental Cars</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <div className="text-lg font-extrabold text-[#4E9612] tabular-nums">2015–2026</div>
              <div className="text-[11px] text-slate-600">Verified Model Years</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <div className="text-lg font-extrabold text-[#4E9612] tabular-nums">4.9 / 5</div>
              <div className="text-[11px] text-slate-600">Accra Client Rating</div>
            </div>
          </div>
        </div>
      </ModalShell>
    );
  }

  if (type === 'blog') {
    return (
      <ModalShell
        onClose={onClose}
        title="Good Deals Autos Guides & Insights"
        subtitle="Buying advice, rental tips, and maintenance checklists"
      >
        <div className="space-y-4">
          {BLOG_ARTICLES.map((post) => (
            <article key={post.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-[#4E9612]" />
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">{post.title}</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{post.content}</p>
            </article>
          ))}
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell
      onClose={onClose}
      title="Contact Good Deals Autos"
      subtitle="Speak directly with our Accra sales, rental, or service advisors"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2.5 bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#4E9612] shrink-0" />
            <span className="font-semibold tabular-nums">+233 30 245 6789 (Sales, Rentals &amp; Service)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#4E9612] shrink-0" />
            <span>info@gooddealsautos.com</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#4E9612] shrink-0" />
            <span>123, Liberation Road, Airport Residential Area, Accra, Ghana</span>
          </div>
        </div>

        {contactSent ? (
          <div className="bg-lime-50 border border-lime-300 rounded-lg p-5 text-center space-y-2">
            <CheckCircle2 className="w-9 h-9 text-[#4E9612] mx-auto" />
            <div className="text-sm font-bold text-slate-900">Callback Request Received!</div>
            <p className="text-xs text-slate-600">
              A Good Deals Autos advisor will call or WhatsApp you within 15 minutes.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setContactSent(true);
            }}
            className="space-y-3"
          >
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full min-h-[42px] border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
            />
            <input
              type="tel"
              required
              placeholder="Phone / WhatsApp (+233...)"
              className="w-full min-h-[42px] border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
            />
            <select className="w-full min-h-[42px] border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]">
              <option>Buy a Car (Tesla, Benz, BMW, Wagon, SUV)</option>
              <option>Rent a Car (Daily / Weekly / Chauffeur)</option>
              <option>Book Car Service / Maintenance</option>
              <option>Car Finance / Trade-In Valuation</option>
            </select>
            <textarea
              rows={2}
              placeholder="Message or preferred car model (optional)"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4E9612]"
            />
            <button
              type="submit"
              className="w-full min-h-[44px] bg-[#4E9612] hover:bg-[#3B750B] text-white text-sm font-bold py-2.5 rounded cursor-pointer"
            >
              Request Instant Callback
            </button>
          </form>
        )}
      </div>
    </ModalShell>
  );
};
