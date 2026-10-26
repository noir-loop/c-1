import React, { useState, useMemo, useEffect } from 'react';
import {
  Utensils,
  Instagram,
  Star,
  ChevronRight,
  Flame,
  Clock,
  MapPin,
  Sparkles,
  QrCode,
  Smartphone,
  Sliders,
  Shield,
  Lock,
  X
} from 'lucide-react';
import { FallingElements } from './components/FallingElements';
import { TeapotLogo } from './components/TeapotLogo';
import { MenuDrawer } from './components/MenuDrawer';
import { MikoMascot } from './components/MikoMascot';
import { AdminPanelModal } from './components/AdminPanelModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ALL_MENU_ITEMS, CAFE_DETAILS } from './data/mockData';
import { MenuItem, CafeConfig } from './types';
import { sanitizeInput, sanitizePrice, safeOpenExternalUrl } from './utils/security';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<MenuItem | null>(null);

  // Close modals on Escape key press for fluid UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSpecialty(null);
        setIsMenuOpen(false);
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persistent menu items state (validated & sanitized against injection/tampering)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const savedV4 = localStorage.getItem('chaicafe_menu_v4');
      if (savedV4) {
        const parsed = JSON.parse(savedV4);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Verify valid menu items & sanitize all properties
          const valid: MenuItem[] = parsed
            .filter(
              (i) => i && typeof i.name === 'string' && (typeof i.price === 'number' || i.price === null) && i.category
            )
            .map((i) => ({
              ...i,
              name: sanitizeInput(i.name),
              description: sanitizeInput(i.description || ''),
              emoji: sanitizeInput(i.emoji || '🍽️'),
              price: sanitizePrice(i.price)
            }));
          if (valid.length > 0) return valid;
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved menu, using authentic default', err);
    }
    return ALL_MENU_ITEMS;
  });

  const handleUpdateMenuItems = (updated: MenuItem[]) => {
    const valid = Array.isArray(updated) && updated.length > 0 ? updated : ALL_MENU_ITEMS;
    const sanitizedList: MenuItem[] = valid.map((i) => ({
      ...i,
      name: sanitizeInput(i.name),
      description: sanitizeInput(i.description || ''),
      emoji: sanitizeInput(i.emoji || '🍽️'),
      price: sanitizePrice(i.price)
    }));
    setMenuItems(sanitizedList);
    try {
      localStorage.setItem('chaicafe_menu_v4', JSON.stringify(sanitizedList));
    } catch (err) {
      console.error('Failed to save menu items', err);
    }
  };

  const handleResetMenu = () => {
    setMenuItems(ALL_MENU_ITEMS);
    try {
      localStorage.setItem('chaicafe_menu_v4', JSON.stringify(ALL_MENU_ITEMS));
      localStorage.removeItem('chaicafe_menu_v3');
      localStorage.removeItem('chaicafe_menu');
    } catch (err) {
      console.warn('Failed to reset menu', err);
    }
  };

  // Persistent cafe config (sanitized hours & days editable via Admin Panel)
  const [cafeConfig, setCafeConfig] = useState<CafeConfig>(() => {
    try {
      const saved = localStorage.getItem('chaicafe_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.openingTime && parsed.closingTime) {
          return {
            openingTime: sanitizeInput(parsed.openingTime),
            closingTime: sanitizeInput(parsed.closingTime),
            daysOpen: sanitizeInput(parsed.daysOpen || 'Open Daily'),
            address: CAFE_DETAILS.address
          };
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved cafe config', err);
    }
    return {
      openingTime: '10:00 AM',
      closingTime: '10:00 PM',
      daysOpen: 'Open Daily',
      address: CAFE_DETAILS.address
    };
  });

  const handleUpdateCafeConfig = (config: CafeConfig) => {
    const sanitizedConfig: CafeConfig = {
      ...config,
      openingTime: sanitizeInput(config.openingTime),
      closingTime: sanitizeInput(config.closingTime),
      daysOpen: sanitizeInput(config.daysOpen),
      address: CAFE_DETAILS.address
    };
    setCafeConfig(sanitizedConfig);
    try {
      localStorage.setItem('chaicafe_config', JSON.stringify(sanitizedConfig));
    } catch (err) {
      console.error('Failed to save cafe config', err);
    }
  };

  // Dynamic 4 Signature Featured Specialties (prioritizes starred items from Admin)
  const specialties: MenuItem[] = useMemo(() => {
    const list = Array.isArray(menuItems) && menuItems.length > 0 ? menuItems : ALL_MENU_ITEMS;
    const starred = list.filter((i) => i && i.isSpecialty);
    if (starred.length >= 4) return starred.slice(0, 4);
    if (starred.length > 0) {
      const remaining = list.filter((i) => i && !i.isSpecialty);
      return [...starred, ...remaining].slice(0, 4);
    }
    return list.slice(0, 4);
  }, [menuItems]);

  return (
    <div className="relative min-h-screen bg-[#fff7f8] text-[#3d131e] flex flex-col items-center justify-start pb-12 selection:bg-pink-200 overflow-x-hidden">
      {/* Falling Tea Kettle, Pizza, Fries & Treats (Looping Motion like Snow, low opacity) */}
      <FallingElements />

      {/* Centered Mobile Viewport Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col items-center pt-2">
        {/* Brand Lockup: Chai Cafe Logo + Tagline */}
        <div className="mt-2 mb-4 w-full flex flex-col items-center">
          <TeapotLogo />
        </div>

        {/* Operating Hours Banner (Clean, Uncluttered) */}
        <div className="w-full bg-white/95 backdrop-blur-md border border-[#ffd2dc] rounded-2xl py-2 px-3.5 shadow-2xs flex items-center justify-center mb-4 gap-2 transition-all">
          <div className="flex items-center justify-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="min-w-0 flex items-center gap-1.5 text-xs font-semibold text-[#4d2631] truncate">
              <span>{cafeConfig.daysOpen}</span>
              <span className="text-[#d897a8] text-[10px]">·</span>
              <span className="tabular-nums">{cafeConfig.openingTime} – {cafeConfig.closingTime}</span>
            </div>
          </div>
        </div>

        {/* Scaled-Down Action Link Cards (Sleek, Uncluttered & Tactile with Online vs Offline Badges) */}
        <div className="w-full space-y-2 mb-5">
          {/* Card 1: Explore Menu (100% Offline Ready) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-full text-left bg-gradient-to-r from-[#ff4d7e] via-[#ff5c89] to-[#ff7098] hover:from-[#f7386d] hover:to-[#ff5c89] text-white rounded-2xl py-2.5 px-3.5 shadow-xs glow-pink transition-all duration-200 ease-out active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 text-white shadow-2xs group-hover:scale-105 transition-transform duration-200">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm tracking-tight leading-snug">
                    Explore Menu
                  </h3>
                  <span className="text-[9px] bg-white/25 text-white font-bold px-1.5 py-0.2 rounded-full tracking-wide">
                    Offline Ready
                  </span>
                </div>
                <p className="text-[10px] text-rose-100 font-medium truncate">
                  Fresh Chai, Gourmet Pizza, Shakes & Munchies ({menuItems.length} items)
                </p>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center shrink-0 ml-2 group-hover:translate-x-1 transition-transform duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          {/* Card 2: Follow on Instagram (Online Link) */}
          <a
            href={CAFE_DETAILS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              safeOpenExternalUrl(CAFE_DETAILS.instagram);
            }}
            className="w-full text-left bg-white/95 backdrop-blur-xs hover:bg-white rounded-2xl py-2.5 px-3.5 border border-[#ffdce3] hover:border-[#ff9eb8] shadow-2xs hover:shadow-xs transition-all duration-200 ease-out active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-pink-100 flex items-center justify-center shrink-0 text-[#ff5c89] group-hover:scale-105 group-hover:bg-[#ff5c89] group-hover:text-white transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[#3d131e] tracking-tight leading-snug">
                    Follow on Instagram
                  </h3>
                  <span className="text-[9px] bg-rose-50 text-[#8c5060] font-semibold px-1.5 py-0.2 rounded-full border border-pink-200/60">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-[#7e5b65] font-normal truncate">
                  {CAFE_DETAILS.instagramHandle} · Daily stories & reels
                </p>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 ml-2 text-[#7e5b65] group-hover:bg-[#ff5c89] group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 3: Google Review (Online Link) */}
          <a
            href={CAFE_DETAILS.googleReview}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              safeOpenExternalUrl(CAFE_DETAILS.googleReview);
            }}
            className="w-full text-left bg-white/95 backdrop-blur-xs hover:bg-white rounded-2xl py-2.5 px-3.5 border border-[#ffdce3] hover:border-[#ff9eb8] shadow-2xs hover:shadow-xs transition-all duration-200 ease-out active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-pink-100 flex items-center justify-center shrink-0 text-[#ff5c89] group-hover:scale-105 group-hover:bg-[#ff5c89] group-hover:text-white transition-all duration-200">
                <Star className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[#3d131e] tracking-tight leading-snug">
                    Google Review
                  </h3>
                  <div className="flex text-amber-400">
                    {'★★★★★'.split('').map((s, idx) => (
                      <span key={idx} className="text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] bg-amber-50 text-amber-800 font-semibold px-1.5 py-0.2 rounded-full border border-amber-200/60">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-[#7e5b65] font-normal truncate">
                  Rate your visit & support your neighborhood cafe
                </p>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 ml-2 text-[#7e5b65] group-hover:bg-[#ff5c89] group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* Cafe Specialties Section */}
        <div className="w-full mb-5">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[#ff5c89] text-base">🔥</span>
              <h2 className="font-serif font-bold text-lg md:text-xl text-[#3d131e]">
                Cafe Specialties
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#b32052] tracking-wider uppercase bg-rose-50 border border-pink-200/60 px-2 py-0.5 rounded-full">
              Must-Try
            </span>
          </div>

          {/* 2x2 Grid of Specialties (Uniform height, clean typography, smooth hover lift) */}
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            {specialties.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSpecialty(item)}
                className="bg-white/95 rounded-2xl p-3 border border-[#ffdce3] shadow-2xs hover:shadow-md hover:border-[#ff9eb8] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between cursor-pointer group active:scale-[0.98]"
              >
                <div>
                  {/* Top: Emoji Icon & Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-full bg-rose-50 border border-pink-100 flex items-center justify-center text-base group-hover:scale-110 transition-transform duration-200 shadow-2xs">
                      {item.emoji}
                    </div>
                    {item.price !== null && item.price !== undefined ? (
                      <span className="text-xs font-black text-[#b32052] bg-rose-50 border border-pink-200/80 px-2 py-0.5 rounded-full tabular-nums">
                        ₹{item.price}/-
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#b32052] bg-rose-50 border border-pink-200/80 px-2 py-0.5 rounded-full">
                        {item.name.toLowerCase().includes('water') ? 'MRP' : 'Price on Request'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-[#3d131e] mb-1 line-clamp-1 group-hover:text-[#b32052] transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[11px] text-[#7e5b65] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-pink-50 flex items-center justify-between text-[10px] text-[#a61e4d] font-bold">
                  <span>View Details</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Dining Notice Banner (Clean, Calm & Uncluttered) */}
        <div className="w-full bg-white/90 border border-pink-200/70 rounded-2xl p-3 text-center text-xs text-[#5a2e3b] mb-5 shadow-2xs">
          <p className="font-semibold text-[#8c2a47] flex items-center justify-center gap-1.5">
            <span>🛎️</span>
            <span>Table Service Dining Experience</span>
          </p>
          <p className="text-[11px] text-[#7a4855] mt-0.5">
            Browse our digital menu & let your server know what you'd like to enjoy!
          </p>
        </div>

        {/* Cafe Footer & Discreet Admin Button */}
        <footer className="w-full text-center space-y-2 pt-2 border-t border-pink-100/80 text-xs text-[#7e5b65]">
          <p className="font-bold text-[#3d131e]">
            Chai Cafe · {cafeConfig.address}
          </p>
          <p className="text-[11px] text-[#8c5060]">
            100% Pure Vegetarian · Freshly Baked & Brewed © 2026
          </p>

          {/* Owner Link & PWA Install */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1 text-[11px]">
            <PWAInstallButton />

            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#8c5060] hover:text-[#b32052] font-semibold flex items-center gap-1 transition-all duration-150 px-2.5 py-1 rounded-full bg-white/80 border border-pink-200/60 hover:bg-rose-50 active:scale-95 cursor-pointer shadow-2xs"
              title="Owner Login (Password Protected)"
            >
              <Lock className="w-3 h-3 text-[#ff5c89]" />
              <span>Owner Login</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Specialty Item Detail Informational Modal (Smooth Backdrop & Scale Transition) */}
      {selectedSpecialty && (
        <div
          onClick={() => setSelectedSpecialty(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff8f7] rounded-3xl p-6 border border-pink-200 shadow-2xl w-full max-w-sm space-y-4 animate-scale-up"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-3xl shadow-xs">
                {selectedSpecialty.emoji}
              </div>
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="w-8 h-8 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center hover:bg-pink-200 transition-colors duration-150 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif font-bold text-xl text-[#3d131e]">
                  {selectedSpecialty.name}
                </h3>
                {selectedSpecialty.price !== null && selectedSpecialty.price !== undefined ? (
                  <span className="font-black text-lg text-[#b32052] shrink-0 tabular-nums">
                    ₹{selectedSpecialty.price}/-
                  </span>
                ) : (
                  <span className="font-bold text-xs text-[#b32052] bg-rose-50 border border-pink-200/80 px-2.5 py-1 rounded-full shrink-0">
                    {selectedSpecialty.name.toLowerCase().includes('water') ? 'MRP' : 'Price on Request'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7e5b65] mt-2 leading-relaxed">
                {selectedSpecialty.description}
              </p>
            </div>

            {/* Price Variants if any */}
            {selectedSpecialty.priceVariants && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#3d131e] block">Size / Serving Options:</span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(selectedSpecialty.priceVariants).map(([variant, vPrice]) => (
                    <span
                      key={variant}
                      className="text-xs bg-white border border-pink-200 text-[#b32052] font-bold px-2.5 py-1 rounded-xl shadow-2xs tabular-nums"
                    >
                      {variant}: ₹{vPrice}/-
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="bg-rose-100 text-[#b32052] font-semibold px-2.5 py-0.5 rounded-full">
                Chef Specialty
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                100% Veg
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedSpecialty(null);
                  setIsMenuOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-[#ff5c89] hover:bg-[#ff4d7e] active:scale-[0.98] text-white font-bold text-xs shadow-xs transition-all duration-150 cursor-pointer"
              >
                Browse Full Menu ({menuItems.length} Dishes)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore Menu Drawer (Pure Digital Menu Card) */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        onResetMenu={handleResetMenu}
      />

      {/* Miko Mascot Floating in Bottom-Left Corner (Draggable, Menu Guide & Recommender) */}
      <MikoMascot
        menuItems={menuItems}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Admin Panel Modal (Dishes, Pricing, Add/Delete, Specialties, Hours) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onUpdateMenuItems={handleUpdateMenuItems}
        cafeConfig={cafeConfig}
        onUpdateCafeConfig={handleUpdateCafeConfig}
      />


      {/* Friendly Offline Mode Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}
