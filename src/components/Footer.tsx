import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { NavTab } from './Header';

interface FooterProps {
  onSelectNav: (tab: NavTab, subFilter?: string) => void;
  onOpenBooking: (mode: 'buy' | 'rent' | 'service') => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectNav,
  onOpenBooking,
  onOpenContact,
}) => {
  return (
    <footer id="contact-section" className="bg-[#0D0F13] text-slate-300 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 py-9 sm:py-11">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-7 sm:gap-8">
          {/* Column 1: Brand Logo & Social */}
          <div className="col-span-2 lg:col-span-1">
            <div className="bg-white p-1.5 rounded inline-block shadow-xs">
              <img
                src="/assets/aistudio/image_77d7d558.png"
                alt="Good Deals Autos - Ignite Your Journey"
                referrerPolicy="no-referrer"
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mt-3 max-w-sm">
              Good Deals Autos Ghana is your trusted destination to buy, rent, or service luxury
              and modern vehicles from 2015 to 2026.
            </p>
            <div className="flex items-center gap-2.5 mt-4">
              {[
                { label: 'Facebook', icon: Facebook },
                { label: 'Instagram', icon: Instagram },
                { label: 'YouTube', icon: Youtube },
                { label: 'WhatsApp', icon: MessageCircle },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    onClick={onOpenContact}
                    className="w-9 h-9 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#4E9612] text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button type="button" onClick={() => onSelectNav('home')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('buy-cars', 'All')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Buy Cars
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('rent-cars', 'All')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Rent Cars
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('used-cars', 'Used')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Used Cars (2015–2024)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('offers')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Offers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('finance')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Finance (GH₵)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Our Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button type="button" onClick={() => onOpenBooking('buy')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Book Test Drive
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('rent')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Daily &amp; Weekly Car Rental
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('finance')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Car Finance
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('offers')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Exchange Your Car
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('services', 'detailing')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Accessories &amp; Detailing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('service')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Service &amp; Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: About Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              About Us
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button type="button" onClick={() => onSelectNav('about')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  About Good Deals Autos
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('about')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Our Team
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenContact} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Careers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('blog')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('about')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectNav('about')} className="py-1 text-left hover:text-[#84CC16] transition-colors cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#84CC16] shrink-0" />
                <span className="tabular-nums">+233 30 245 6789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#84CC16] shrink-0" />
                <span className="break-all">info@gooddealsautos.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#84CC16] shrink-0 mt-0.5" />
                <span>123, Liberation Road, Airport Residential Area, Accra, Ghana</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Accepted Payments Bar */}
      <div className="border-t border-white/10 bg-[#080A0D]">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <p>© 2026 Good Deals Autos Ghana. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <span className="text-slate-400 mr-1">We Accept</span>
            <span className="bg-white text-[#1E3A8A] font-extrabold px-2 py-0.5 rounded-xs text-[10px] tracking-wider">
              VISA
            </span>
            <span className="bg-white text-slate-900 font-bold px-2 py-0.5 rounded-xs text-[10px] inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 -ml-2 inline-block" />
            </span>
            <span className="bg-[#FACC15] text-[#111827] font-extrabold px-2 py-0.5 rounded-xs text-[10px]">
              MTN MoMo
            </span>
            <span className="bg-[#4E9612] text-white font-extrabold px-2 py-0.5 rounded-xs text-[10px]">
              Telecel Cash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
