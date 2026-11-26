import React, { useEffect } from 'react';
import { Car, SERVICE_PACKAGES } from '../data/carsData';
import { NavTab } from './Header';
import { DealModeFilter } from './PopularCarsSection';

interface SeoHeadProps {
  activeNav: NavTab;
  dealMode: DealModeFilter;
  selectedBrand: string;
  selectedCar: Car | null;
  cars: Car[];
}

const DEFAULT_TITLE = 'Good Deals Autos – Buy, Rent & Service Cars in Ghana';
const DEFAULT_DESCRIPTION =
  'Shop or rent certified 2015–2026 Tesla, Mercedes-Benz, BMW, wagons, and SUVs in Ghana Cedis with financing and auto service at Good Deals Autos.';
const DEFAULT_IMAGE_PATH = '/src/assets/images/hero_red_suv_1795687313590.jpg';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  activeNav,
  dealMode,
  selectedBrand,
  selectedCar,
  cars,
}) => {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = origin + window.location.pathname;

    let pageTitle = DEFAULT_TITLE;
    let pageDescription = DEFAULT_DESCRIPTION;
    let ogImagePath = DEFAULT_IMAGE_PATH;

    if (selectedCar) {
      pageTitle = `${selectedCar.fullName} (${selectedCar.priceLabel}) | Good Deals Autos`;
      pageDescription = `${selectedCar.condition} ${selectedCar.fullName} (${selectedCar.bodyType}, ${selectedCar.fuel}) available to buy at ${selectedCar.priceLabel} or rent from ${selectedCar.rentLabel} in Accra, Ghana.`;
      ogImagePath = selectedCar.image;
    } else if (selectedBrand) {
      pageTitle = `${selectedBrand} Cars for Sale & Rent | Good Deals Autos`;
      pageDescription = `Browse verified 2015–2026 ${selectedBrand} vehicles for sale and daily rental in Ghana Cedis (GH₵) with warranty and financing at Good Deals Autos.`;
    } else if (dealMode === 'rent' || activeNav === 'rent-cars') {
      pageTitle = 'Rent Luxury & Modern Cars in Accra | Good Deals Autos';
      pageDescription =
        'Self-drive and chauffeur car rentals in Ghana from GH₵ 360/day. Choose Tesla, Mercedes-Benz, G-Wagon, BMW, and SUVs at Good Deals Autos.';
    } else if (dealMode === 'buy' || activeNav === 'buy-cars') {
      pageTitle = 'Buy New & Certified Cars in Ghana | Good Deals Autos';
      pageDescription =
        'Shop 2015–2026 Tesla, Mercedes-Benz, BMW, station wagons, and SUVs in Ghana Cedis with 210-point inspection and easy financing.';
    } else if (activeNav === 'used-cars') {
      pageTitle = 'Certified Used Cars (2015–2024) | Good Deals Autos';
      pageDescription =
        'Inspect and buy affordable certified pre-owned 2015–2024 sedans, hatchbacks, wagons, and SUVs in Ghana Cedis at Good Deals Autos.';
    } else if (activeNav === 'finance') {
      pageTitle = 'Car Finance Calculator (GH₵) | Good Deals Autos';
      pageDescription =
        'Estimate monthly Ghana Cedis auto finance payments starting from 10% down payment across 24 to 60 months at Good Deals Autos.';
    }

    const fullImageUrl = ogImagePath.startsWith('http')
      ? ogImagePath
      : `${origin}${ogImagePath}`;

    document.title = pageTitle;
    upsertCanonical(canonicalUrl);
    upsertMetaTag('name', 'description', pageDescription);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:title', pageTitle);
    upsertMetaTag('property', 'og:description', pageDescription);
    upsertMetaTag('property', 'og:image', fullImageUrl);
    upsertMetaTag('name', 'twitter:title', pageTitle);
    upsertMetaTag('name', 'twitter:description', pageDescription);
    upsertMetaTag('name', 'twitter:image', fullImageUrl);

    // Dynamic JSON-LD catalog & service offers
    const scriptId = 'gda-dynamic-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const featuredCars = selectedCar ? [selectedCar] : cars.slice(0, 15);
    const structuredCatalog = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: 'Good Deals Autos Vehicles for Sale and Rent in Ghana',
          numberOfItems: featuredCars.length,
          itemListElement: featuredCars.map((car, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Car',
              name: car.fullName,
              brand: {
                '@type': 'Brand',
                name: car.brand,
              },
              model: car.model,
              vehicleModelDate: String(car.year),
              bodyType: car.bodyType,
              fuelType: car.fuel,
              vehicleTransmission: car.transmission,
              image: car.image.startsWith('http') ? car.image : `${origin}${car.image}`,
              itemCondition:
                car.condition === 'New'
                  ? 'https://schema.org/NewCondition'
                  : 'https://schema.org/UsedCondition',
              offers: [
                {
                  '@type': 'Offer',
                  name: `Buy ${car.fullName}`,
                  price: car.priceGhs,
                  priceCurrency: 'GHS',
                  availability: 'https://schema.org/InStock',
                  url: canonicalUrl,
                },
                {
                  '@type': 'Offer',
                  name: `Rent ${car.fullName} (Daily Rate)`,
                  price: car.rentPerDayGhs,
                  priceCurrency: 'GHS',
                  availability: 'https://schema.org/InStock',
                  url: canonicalUrl,
                },
              ],
            },
          })),
        },
        {
          '@type': 'OfferCatalog',
          name: 'Good Deals Autos Certified Workshop Services',
          itemListElement: SERVICE_PACKAGES.map((pkg) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: pkg.name,
              description: pkg.description,
              provider: {
                '@type': 'AutoRepair',
                name: 'Good Deals Autos Ghana',
              },
            },
          })),
        },
      ],
    };

    scriptEl.textContent = JSON.stringify(structuredCatalog);
  }, [activeNav, dealMode, selectedBrand, selectedCar, cars]);

  return null;
};
