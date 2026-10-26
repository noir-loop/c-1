import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Utensils,
  ChevronRight,
  Flame,
  Coffee,
  Heart,
  Smile,
  Info,
  Clock,
  MapPin,
  Move,
  Send,
  Search,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { MenuItem } from '../types';
import {
  MoodType,
  MOOD_LIST,
  getDrinkRecommendationForMood,
  answerCustomerQuestion,
  AssistantResponse,
  UNSUPPORTED_QUESTION_RESPONSE
} from '../data/drinkRecommendations';

export type MikoState = 'idle' | 'noting' | 'smiling';

interface MikoMascotProps {
  menuItems: MenuItem[];
  onOpenMenu: () => void;
}

export const MikoMascot: React.FC<MikoMascotProps> = ({
  menuItems,
  onOpenMenu
}) => {
  const [mascotState, setMascotState] = useState<MikoState>('idle');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>('happy');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [activeResponse, setActiveResponse] = useState<AssistantResponse>(() =>
    getDrinkRecommendationForMood('happy', menuItems)
  );
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  // Sync recommendation if menu items change in admin panel
  useEffect(() => {
    if (selectedMood) {
      setActiveResponse(getDrinkRecommendationForMood(selectedMood, menuItems));
    }
  }, [menuItems, selectedMood]);

  // Handle fixed mood selection (Deterministic, pure client-side JS)
  const handleSelectMood = (mood: MoodType) => {
    setSelectedMood(mood);
    setCustomQuestion('');
    setMascotState('noting');
    const res = getDrinkRecommendationForMood(mood, menuItems);
    setActiveResponse(res);
    setTimeout(() => setMascotState('smiling'), 450);
  };

  // Handle typing question with keyword matching (Deterministic, pure client-side JS)
  const handleAskQuestion = (overrideQuery?: string) => {
    const query = (overrideQuery !== undefined ? overrideQuery : customQuestion).trim();
    if (!query) return;
    setMascotState('noting');
    setSelectedMood(null);
    const res = answerCustomerQuestion(query, menuItems);
    setActiveResponse(res);
    setTimeout(() => setMascotState(res.isSupported ? 'smiling' : 'idle'), 450);
  };

  // Native pointer drag & spring snap-back state
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.hypot(dx, dy) > 5) {
      hasMovedRef.current = true;
    }
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
    dragStartRef.current = null;

    // Smoothly spring-snap back to origin (0, 0)
    setDragOffset({ x: 0, y: 0 });

    // If it was a quick tap without drag, open the assistant dialog
    if (!hasMovedRef.current) {
      setIsAssistantOpen(true);
      setShowSpeechBubble(false);
    }
    hasMovedRef.current = false;
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    dragStartRef.current = null;
    setDragOffset({ x: 0, y: 0 });
    hasMovedRef.current = false;
  };


  return (
    <>
      {/* Draggable Miko Mascot Floating in Bottom-Left Corner */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{
          transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) scale(${isDragging ? 1.12 : 1})`,
          transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        className="fixed bottom-4 left-4 z-40 touch-none select-none cursor-grab active:cursor-grabbing group"
        aria-label="Miko Cafe Mascot"
      >
        {/* Subtle tooltip / speech bubble (Dismissible & Uncluttered) */}
        {showSpeechBubble && !isAssistantOpen && !isDragging && (
          <div className="absolute -top-10 left-0 bg-white/95 text-[#a61e4d] text-[11px] font-bold py-1 pl-2.5 pr-1.5 rounded-full shadow-md border border-pink-200 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xs animate-fade-in">
            <Sparkles className="w-3 h-3 text-[#ff5c89] shrink-0" />
            <span>
              {mascotState === 'noting' && 'Browsing menu specials... ♡'}
              {mascotState === 'smiling' && 'Welcome to Chai Cafe! ♡'}
              {mascotState === 'idle' && 'Tap for specials! ♡'}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeechBubble(false);
              }}
              className="w-3.5 h-3.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#8c4055] flex items-center justify-center text-[9px] ml-0.5 cursor-pointer transition-colors"
              title="Dismiss note"
              aria-label="Dismiss speech bubble"
            >
              ✕
            </button>
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white rotate-45 border-r border-b border-pink-200" />
          </div>
        )}

        {/* Floating Ghost Body Wrapper */}
        <div
          className={`relative w-20 h-24 flex items-center justify-center filter drop-shadow-md transition-transform duration-300 ${
            mascotState === 'smiling' ? 'animate-miko-joy' : 'animate-miko-float'
          }`}
        >
          {/* Floating Hearts if Smiling */}
          {mascotState === 'smiling' && (
            <>
              <div className="absolute -top-2 left-2 text-[#ff4d7e] text-sm animate-miko-heart-1 pointer-events-none">
                ♡
              </div>
              <div className="absolute -top-4 right-1 text-[#ff5c89] text-base animate-miko-heart-2 pointer-events-none">
                ♡
              </div>
            </>
          )}

          {/* SVG RENDERING OF GHOST BARISTA MIKO */}
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Ambient Ghost Aura Glow */}
            <ellipse
              cx="50"
              cy="65"
              rx="34"
              ry="42"
              fill="rgba(255, 225, 235, 0.45)"
              className="blur-xs"
            />

            {/* Ghost Floating Body with Wavy Ruffled Tail */}
            <path
              d="M20,52 C18,28 82,28 80,52 C79,72 78,88 80,98 C74,103 68,96 62,99 C56,102 50,96 44,99 C38,102 32,96 26,99 C22,94 21,72 20,52 Z"
              fill="url(#ghostGrad)"
              stroke="#ffd1dc"
              strokeWidth="1.8"
            />

            {/* Little Ghost Floating Hands / Sleeves */}
            {mascotState !== 'noting' ? (
              <>
                {/* Left hand */}
                <path
                  d="M19,65 C12,68 12,76 18,78 C22,79 24,72 22,66"
                  fill="#ffffff"
                  stroke="#ffd1dc"
                  strokeWidth="1.4"
                />
                {/* Right hand */}
                <path
                  d="M81,65 C88,68 88,76 82,78 C78,79 76,72 78,66"
                  fill="#ffffff"
                  stroke="#ffd1dc"
                  strokeWidth="1.4"
                />
              </>
            ) : (
              /* Writing hands holding notepad & pencil */
              <g className="animate-miko-scribble">
                {/* Notepad */}
                <rect
                  x="56"
                  y="62"
                  width="18"
                  height="22"
                  rx="2.5"
                  fill="#fff7f8"
                  stroke="#e24a7b"
                  strokeWidth="1.2"
                />
                {/* Spiral binder top */}
                <circle cx="60" cy="62" r="1.2" fill="#e24a7b" />
                <circle cx="65" cy="62" r="1.2" fill="#e24a7b" />
                <circle cx="70" cy="62" r="1.2" fill="#e24a7b" />
                {/* Notepad lines */}
                <line x1="59" y1="67" x2="71" y2="67" stroke="#f8bac9" strokeWidth="1" />
                <line x1="59" y1="71" x2="69" y2="71" stroke="#f8bac9" strokeWidth="1" />
                <line x1="59" y1="75" x2="71" y2="75" stroke="#f8bac9" strokeWidth="1" />
                {/* Pink Pencil */}
                <path
                  d="M50,78 L54,64 L57,65 L53,79 Z"
                  fill="#ff4d7e"
                  stroke="#a61e4d"
                  strokeWidth="0.8"
                />
                <polygon points="50,78 51,82 53,79" fill="#ffd1dc" stroke="#a61e4d" strokeWidth="0.6" />
              </g>
            )}

            {/* Barista Apron in Pink (#f78da7) */}
            <path
              d="M32,60 C32,58 68,58 68,60 L73,88 C68,91 32,91 27,88 Z"
              fill="#f78da7"
              stroke="#eb5686"
              strokeWidth="1.4"
            />
            {/* Apron Straps */}
            <line x1="36" y1="58" x2="40" y2="48" stroke="#eb5686" strokeWidth="1.6" />
            <line x1="64" y1="58" x2="60" y2="48" stroke="#eb5686" strokeWidth="1.6" />

            {/* CAFE LOGO ON APRON (Teapot & Teacup emblem) */}
            <g transform="translate(50, 74) scale(0.38)">
              {/* Teapot */}
              <ellipse cx="0" cy="-2" rx="14" ry="9" fill="#ffffff" />
              <circle cx="0" cy="-11" r="2.5" fill="#ffffff" />
              {/* Spout */}
              <path d="M-10,-4 C-16,-6 -18,-1 -16,4 C-14,2 -11,0 -8,2" fill="#ffffff" />
              {/* Handle */}
              <path d="M10,-4 C16,-4 16,3 10,4" stroke="#ffffff" strokeWidth="2.4" fill="none" />
              {/* Teacup receiving pour */}
              <path d="M-6,9 C-6,16 6,16 6,9 Z" fill="#ffffff" />
            </g>

            {/* Expressive Face Elements */}
            {/* Cheerful Blush Cheeks */}
            <ellipse cx="32" cy="52" rx="4.5" ry="2.6" fill="#ff8da9" opacity="0.65" />
            <ellipse cx="68" cy="52" rx="4.5" ry="2.6" fill="#ff8da9" opacity="0.65" />

            {mascotState === 'smiling' ? (
              /* Smiling Happy Eyes (^ _ ^) */
              <>
                <path
                  d="M33,47 C36,43 43,43 46,47"
                  stroke="#5d2334"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M54,47 C57,43 64,43 67,47"
                  stroke="#5d2334"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Big happy open mouth with pink tongue */}
                <path
                  d="M45,54 C45,59 55,59 55,54 Z"
                  fill="#c2255c"
                  stroke="#5d2334"
                  strokeWidth="1.2"
                />
              </>
            ) : (
              /* Big Sparkling Anime/Chibi Eyes */
              <>
                <circle cx="39" cy="46" r="5.2" fill="#3d131e" />
                <circle cx="61" cy="46" r="5.2" fill="#3d131e" />
                {/* Eye Sparkles */}
                <circle cx="37.5" cy="44" r="2" fill="#ffffff" />
                <circle cx="41" cy="47.5" r="1.1" fill="#ffffff" />
                <circle cx="59.5" cy="44" r="2" fill="#ffffff" />
                <circle cx="63" cy="47.5" r="1.1" fill="#ffffff" />
                {/* Gentle Smile */}
                <path
                  d="M46,54 C48,56.5 52,56.5 54,54"
                  stroke="#5d2334"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            )}

            {/* Puffy Baker's Chef Hat on Top with "Miko" text on brim */}
            <g transform="translate(0, -2)">
              {/* Puffy Cloud Top of Hat */}
              <path
                d="M30,28 C18,26 18,12 32,8 C36,0 64,0 68,8 C82,12 82,26 70,28 Z"
                fill="#fff5f7"
                stroke="#f3bcc7"
                strokeWidth="1.8"
              />
              {/* Hat Crease Shadows */}
              <path d="M42,10 C46,16 46,24 45,28" stroke="#ffe0e6" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58,10 C54,16 54,24 55,28" stroke="#ffe0e6" strokeWidth="1.5" strokeLinecap="round" />

              {/* Hat Brim Band */}
              <rect
                x="26"
                y="26"
                width="48"
                height="11"
                rx="4"
                fill="#f8bac9"
                stroke="#e24a7b"
                strokeWidth="1.2"
              />

              {/* "Miko" TEXT ON CAP BRIM */}
              <text
                x="50"
                y="34.5"
                textAnchor="middle"
                fill="#8c1b3f"
                fontSize="7.5"
                fontWeight="900"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                letterSpacing="0.8"
              >
                Miko
              </text>
            </g>

            {/* Gradient definition for ghost translucency */}
            <defs>
              <linearGradient id="ghostGrad" x1="50" y1="20" x2="50" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.97" />
                <stop offset="0.75" stopColor="#fff2f5" stopOpacity="0.92" />
                <stop offset="1" stopColor="#ffdce5" stopOpacity="0.75" />
              </linearGradient>
            </defs>
          </svg>

          {/* Drag instruction indicator badge */}
          <div className="absolute -bottom-2 bg-[#3d131e]/75 text-white text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Move className="w-2.5 h-2.5" />
            <span>Hold & Move</span>
          </div>
        </div>
      </div>

      {/* Miko Assistant Drawer / Dialog */}
      {isAssistantOpen && (
        <div
          onClick={() => setIsAssistantOpen(false)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#fff7f8] rounded-t-3xl sm:rounded-3xl border border-pink-200 shadow-2xl p-5 md:p-6 max-h-[88vh] overflow-y-auto no-scrollbar animate-slide-up"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAssistantOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 active:scale-95 text-[#8c4055] flex items-center justify-center transition-all duration-150 cursor-pointer"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Miko Header Lockup */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 border border-pink-200 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                <div className="text-3xl animate-miko-float">👻</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-xl text-[#3d131e]">
                    Miko Barista
                  </h3>
                  <span className="text-[10px] bg-[#ff5c89] text-white font-bold px-2 py-0.5 rounded-full">
                    Cafe Guide
                  </span>
                </div>
                <p className="text-xs text-[#7e5b65]">
                  Chai Cafe • Kapoorthala, Aliganj, Lucknow
                </p>
              </div>
            </div>

            {/* Miko Greeting Speech Bubble */}
            <div className="bg-white/90 rounded-2xl p-3.5 border border-pink-200 shadow-2xs mb-4 relative">
              <p className="text-xs md:text-sm text-[#4d2631] font-medium leading-relaxed">
                "Hi! I'm <strong className="text-[#b32052]">Miko</strong>, your friendly cafe spirit ♡ Take a look at our freshly baked & brewed menu below. When you're ready, our table servers will take your order directly in-person!"
              </p>
              {/* Mood buttons to preview Miko */}
              <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-pink-100">
                <span className="text-[11px] font-semibold text-[#8c5a66]">Miko mode:</span>
                <button
                  type="button"
                  onClick={() => setMascotState('idle')}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                    mascotState === 'idle'
                      ? 'bg-[#3d131e] text-white'
                      : 'bg-rose-50 text-[#733f4c] hover:bg-rose-100'
                  }`}
                >
                  Hovering
                </button>
                <button
                  type="button"
                  onClick={() => setMascotState('noting')}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                    mascotState === 'noting'
                      ? 'bg-[#ff5c89] text-white'
                      : 'bg-rose-50 text-[#733f4c] hover:bg-rose-100'
                  }`}
                >
                  Noting
                </button>
                <button
                  type="button"
                  onClick={() => setMascotState('smiling')}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                    mascotState === 'smiling'
                      ? 'bg-[#ff5c89] text-white'
                      : 'bg-rose-50 text-[#733f4c] hover:bg-rose-100'
                  }`}
                >
                  Smiling
                </button>
              </div>
            </div>

            {/* 1. MIKO'S SIGNATURE SPECIALS FROM THE PDF */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#a61e4d] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff5c89]" />
                  Must-Try Cafe Specials
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  100% Vegetarian
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Special 1: Special CFC Pizza */}
                <div className="bg-white rounded-2xl p-3 border border-pink-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🍕</span>
                      <span className="text-xs font-black text-[#b32052] bg-rose-50 px-2 py-0.5 rounded-full">
                        ₹200/-
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#ff5c89] block">
                      Special Dish
                    </span>
                    <h4 className="font-bold text-xs md:text-sm text-[#3d131e] leading-snug">
                      Special CFC Pizza
                    </h4>
                    <p className="text-[10px] text-[#7a4e58] mt-1 leading-snug line-clamp-2">
                      Spinach, Corn, Onion, Capsicum, Tomato, Jalapeno (8" Thin Crust: ₹220/-).
                    </p>
                  </div>
                </div>

                {/* Special 2: Cardamom Chai */}
                <div className="bg-white rounded-2xl p-3 border border-pink-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🫖</span>
                      <span className="text-xs font-black text-[#b32052] bg-rose-50 px-2 py-0.5 rounded-full">
                        ₹25/-
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#ff5c89] block">
                      Special Drink
                    </span>
                    <h4 className="font-bold text-xs md:text-sm text-[#3d131e] leading-snug">
                      Cardamom Chai
                    </h4>
                    <p className="text-[10px] text-[#7a4e58] mt-1 leading-snug line-clamp-2">
                      Slow-brewed rich milk tea with aromatic freshly crushed green cardamom.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. MOOD-BASED DRINK RECOMMENDATION ASSISTANT (Pop-Out Card Styling) */}
            <div className="mb-4 bg-gradient-to-b from-white via-[#fff2f5] to-white rounded-3xl p-4 sm:p-4.5 border-2 border-[#ff9ebb]/80 shadow-lg shadow-pink-200/50 relative overflow-hidden transition-all duration-300">
              {/* Vibrant Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5c89] via-[#ff8dae] to-[#ff5c89]" />

              <div className="flex items-center justify-between mb-3 pt-0.5">
                <span className="text-xs sm:text-sm font-extrabold text-[#3d131e] flex items-center gap-1.5 tracking-tight">
                  <Sparkles className="w-4 h-4 text-[#ff4073] animate-pulse" />
                  <span>Mood Drink Recommendation</span>
                </span>
                <span className="text-[10px] text-[#b32052] font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-pink-300 shadow-2xs">
                  Instant
                </span>
              </div>

              {/* Requirement 2: Fixed Mood Choices with Horizontal Swipe */}
              <div className="mb-3.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[#7a4e58] font-bold">
                    How are you feeling today?
                  </p>
                  <span className="text-[10px] text-[#b32052] font-medium bg-rose-50 px-2 py-0.5 rounded-full border border-pink-200/50">
                    👈 Swipe moods
                  </span>
                </div>

                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth -mx-1 px-1">
                  {MOOD_LIST.map((m) => {
                    const isSelected = selectedMood === m.id;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => handleSelectMood(m.id)}
                        className={`text-xs py-2.5 px-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap shadow-2xs border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#ff5c89] to-[#ff4073] text-white border-[#ff3366] shadow-md ring-2 ring-[#ff5c89]/20'
                            : 'bg-white text-[#3d131e] hover:bg-rose-50/90 border-pink-200/80 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-base leading-none">{m.emoji}</span>
                        <span className="tracking-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirement 5: Question Input with Keyword Matching */}
              <div className="mb-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskQuestion();
                  }}
                  className="relative flex items-center"
                >
                  <Search className="w-3.5 h-3.5 text-[#915f6c] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Or ask a question (e.g., cold coffee, vegetarian, hours)..."
                    className="w-full text-xs pl-8 pr-16 py-2 rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d131e] placeholder-[#a67c87] focus:outline-none focus:ring-2 focus:ring-[#ff5c89]/30 focus:border-[#ff5c89] transition-all"
                  />
                  {customQuestion && (
                    <button
                      type="button"
                      onClick={() => setCustomQuestion('')}
                      className="absolute right-10 text-[#a67c87] hover:text-[#3d131e] p-1 text-xs cursor-pointer"
                      title="Clear"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-[#3d131e] hover:bg-[#5a1e2e] active:scale-95 text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Ask</span>
                    <Send className="w-2.5 h-2.5" />
                  </button>
                </form>

                {/* Quick question suggestion chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 pb-1 scroll-smooth">
                  {[
                    'Cold coffee options?',
                    'Best chai?',
                    'Chocolate shakes?',
                    'Are you 100% vegetarian?',
                    'Cafe hours?'
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setCustomQuestion(chip);
                        handleAskQuestion(chip);
                      }}
                      className="text-[11px] whitespace-nowrap bg-rose-50 hover:bg-rose-100/80 text-[#8c4055] px-3 py-1.5 rounded-full border border-pink-200/70 font-semibold cursor-pointer transition-all active:scale-95 shrink-0 shadow-2xs"
                    >
                      💬 {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirement 4: Predefined Friendly Response & Recommended Drink */}
              <div className="space-y-2.5 pt-2 border-t border-pink-100/90">
                {/* Friendly response from Miko */}
                <div className="bg-gradient-to-r from-rose-50/90 to-pink-50/70 border border-pink-200/80 rounded-2xl p-3 shadow-2xs flex items-start gap-2.5 animate-fade-in">
                  <div className="w-7 h-7 rounded-full bg-white border border-pink-200 flex items-center justify-center shrink-0 text-base shadow-2xs mt-0.5">
                    👻
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-[11px] text-[#b32052]">Miko's Note:</span>
                      {activeResponse.isSupported && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">
                          Matched Drink
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#4d2631] font-medium leading-relaxed">
                      "{activeResponse.friendlyResponse}"
                    </p>
                  </div>
                </div>

                {/* Recommended Drink Card from authentic menu */}
                {activeResponse.recommendedDrink ? (
                  <div className="bg-white rounded-2xl p-3 border border-pink-200 shadow-2xs space-y-2 animate-fade-in">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-pink-100 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                          {activeResponse.recommendedDrink.emoji}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-[#ff5c89] tracking-wider block">
                            Recommended Drink
                          </span>
                          <h4 className="font-bold text-sm text-[#3d131e] leading-snug truncate">
                            {activeResponse.recommendedDrink.name}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-[#b32052] bg-rose-50 border border-pink-200/80 px-2 py-0.5 rounded-full inline-block tabular-nums">
                          {activeResponse.recommendedDrink.price !== null && activeResponse.recommendedDrink.price !== undefined
                            ? `₹${activeResponse.recommendedDrink.price}/-`
                            : 'Price on Request'}
                        </span>
                        <span className="text-[9px] text-emerald-700 block font-bold mt-0.5">
                          100% Veg
                        </span>
                      </div>
                    </div>

                    {/* Authentic Description */}
                    {activeResponse.recommendedDrink.description && (
                      <p className="text-[11px] text-[#7a4e58] leading-relaxed bg-pink-50/40 p-2 rounded-xl border border-pink-100/60">
                        {activeResponse.recommendedDrink.description}
                      </p>
                    )}

                    {/* Requirement 4: Button to view the menu */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAssistantOpen(false);
                        onOpenMenu();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#ff4d7e] to-[#ff6b95] hover:from-[#f03e6f] hover:to-[#ff5c89] text-white font-bold text-xs tracking-wide shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>View Menu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  /* Fallback when unsupported question: prompt user to pick a mood */
                  <div className="p-3 bg-white rounded-2xl border border-pink-200/80 shadow-2xs space-y-2 animate-fade-in">
                    <span className="text-[11px] text-[#7a4e58] font-bold block">
                      Choose one of our mood choices:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {MOOD_LIST.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleSelectMood(m.id)}
                          className="text-[11px] py-1.5 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#4d2631] font-semibold flex items-center justify-center gap-1 border border-pink-100 transition-colors cursor-pointer"
                        >
                          <span>{m.emoji}</span>
                          <span>{m.label}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAssistantOpen(false);
                        onOpenMenu();
                      }}
                      className="w-full py-2 rounded-xl bg-white hover:bg-rose-50 text-[#8c2a47] font-bold text-xs border border-pink-200 transition-all flex items-center justify-center gap-1 cursor-pointer mt-1"
                    >
                      <Utensils className="w-3.5 h-3.5 text-[#ff5c89]" />
                      <span>Browse All Drinks in Menu</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Offline Ordering Information Box */}
            <div className="mb-4 p-3 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-pink-200 text-xs space-y-1 text-[#613642]">
              <div className="font-bold flex items-center gap-1.5 text-[#a61e4d]">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Daily: 10:00 AM – 10:00 PM</span>
              </div>
              <p className="text-[11px] leading-snug">
                📍 Shop No UGF 18 Arohi Block 2, Kapoorthala Commercial Complex, Aliganj, Lucknow
              </p>
            </div>

            {/* Full Menu Link */}
            <button
              type="button"
              onClick={() => {
                setIsAssistantOpen(false);
                onOpenMenu();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff4d7e] to-[#ff6b95] text-white font-bold text-xs tracking-wide shadow-xs hover:opacity-95 transition-all text-center cursor-pointer"
            >
              Explore Complete Menu (70+ Dishes)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
