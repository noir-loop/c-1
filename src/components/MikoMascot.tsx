import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Utensils,
  ChevronRight,
  Clock,
  Move,
  Info,
  ChefHat
} from 'lucide-react';
import { MenuItem } from '../types';
import {
  MoodType,
  MOOD_LIST,
  CHEF_MOOD_QUOTE,
  getDrinkRecommendationForMood,
  AssistantResponse
} from '../data/drinkRecommendations';
import { CAFE_DETAILS } from '../data/mockData';

export type MikoState = 'idle' | 'noting' | 'smiling';

interface MikoMascotProps {
  menuItems: MenuItem[];
  onOpenMenu: () => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MikoMascot: React.FC<MikoMascotProps> = ({
  menuItems,
  onOpenMenu,
  onSelectItem
}) => {
  const [mascotState, setMascotState] = useState<MikoState>('idle');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [activeResponse, setActiveResponse] = useState<AssistantResponse>(() =>
    getDrinkRecommendationForMood('happy', menuItems)
  );
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  // Sync recommendation if menu items change in admin
  useEffect(() => {
    setActiveResponse(getDrinkRecommendationForMood(selectedMood, menuItems));
  }, [menuItems, selectedMood]);

  // Handle fixed mood selection: always renders the complete curated food & drink pairings for that mood
  const handleSelectMood = (mood: MoodType) => {
    setSelectedMood(mood);
    setMascotState('noting');
    const res = getDrinkRecommendationForMood(mood, menuItems);
    setActiveResponse(res);
    setTimeout(() => setMascotState('smiling'), 400);
  };

  // Open the mascot assistant and guarantee the active mood pairings are freshly resolved
  const handleOpenAssistant = () => {
    const mood = selectedMood || 'happy';
    setSelectedMood(mood);
    setActiveResponse(getDrinkRecommendationForMood(mood, menuItems));
    setIsAssistantOpen(true);
    setShowSpeechBubble(false);
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
      handleOpenAssistant();
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
        {/* Subtle tooltip / speech bubble */}
        {showSpeechBubble && !isAssistantOpen && !isDragging && (
          <div className="absolute -top-10 left-0 bg-white/95 text-[#a61e4d] text-[11px] font-bold py-1 pl-2.5 pr-1.5 rounded-full shadow-md border border-pink-200 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xs animate-fade-in">
            <Sparkles className="w-3 h-3 text-[#ff5c89] shrink-0" />
            <span>
              {mascotState === 'noting' && 'Curating food & drink moods... ♡'}
              {mascotState === 'smiling' && 'Welcome to Chai Cafe! ♡'}
              {mascotState === 'idle' && 'Curated by Mood! ♡'}
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
            {/* Soft Ambient Ghost Glow */}
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

            {/* Ghost Hands / Sleeves */}
            {mascotState !== 'noting' ? (
              <>
                <path
                  d="M19,65 C12,68 12,76 18,78 C22,79 24,72 22,66"
                  fill="#ffffff"
                  stroke="#ffd1dc"
                  strokeWidth="1.4"
                />
                <path
                  d="M81,65 C88,68 88,76 82,78 C78,79 76,72 78,66"
                  fill="#ffffff"
                  stroke="#ffd1dc"
                  strokeWidth="1.4"
                />
              </>
            ) : (
              <g className="animate-miko-scribble">
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
                <circle cx="60" cy="62" r="1.2" fill="#e24a7b" />
                <circle cx="65" cy="62" r="1.2" fill="#e24a7b" />
                <circle cx="70" cy="62" r="1.2" fill="#e24a7b" />
                <line x1="59" y1="67" x2="71" y2="67" stroke="#f8bac9" strokeWidth="1" />
                <line x1="59" y1="71" x2="69" y2="71" stroke="#f8bac9" strokeWidth="1" />
                <line x1="59" y1="75" x2="71" y2="75" stroke="#f8bac9" strokeWidth="1" />
                <path
                  d="M50,78 L54,64 L57,65 L53,79 Z"
                  fill="#ff4d7e"
                  stroke="#a61e4d"
                  strokeWidth="0.8"
                />
                <polygon points="50,78 51,82 53,79" fill="#ffd1dc" stroke="#a61e4d" strokeWidth="0.6" />
              </g>
            )}

            {/* Apron in Soft Coral Pink */}
            <path
              d="M32,60 C32,58 68,58 68,60 L73,88 C68,91 32,91 27,88 Z"
              fill="#f78da7"
              stroke="#eb5686"
              strokeWidth="1.4"
            />
            <line x1="36" y1="58" x2="40" y2="48" stroke="#eb5686" strokeWidth="1.6" />
            <line x1="64" y1="58" x2="60" y2="48" stroke="#eb5686" strokeWidth="1.6" />

            {/* Teapot emblem */}
            <g transform="translate(50, 74) scale(0.38)">
              <ellipse cx="0" cy="-2" rx="14" ry="9" fill="#ffffff" />
              <circle cx="0" cy="-11" r="2.5" fill="#ffffff" />
              <path d="M-10,-4 C-16,-6 -18,-1 -16,4 C-14,2 -11,0 -8,2" fill="#ffffff" />
              <path d="M10,-4 C16,-4 16,3 10,4" stroke="#ffffff" strokeWidth="2.4" fill="none" />
              <path d="M-6,9 C-6,16 6,16 6,9 Z" fill="#ffffff" />
            </g>

            {/* Blush cheeks */}
            <ellipse cx="32" cy="52" rx="4.5" ry="2.6" fill="#ff8da9" opacity="0.65" />
            <ellipse cx="68" cy="52" rx="4.5" ry="2.6" fill="#ff8da9" opacity="0.65" />

            {mascotState === 'smiling' ? (
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
                <path
                  d="M45,54 C45,59 55,59 55,54 Z"
                  fill="#c2255c"
                  stroke="#5d2334"
                  strokeWidth="1.2"
                />
              </>
            ) : (
              <>
                <circle cx="39" cy="46" r="5.2" fill="#3d131e" />
                <circle cx="61" cy="46" r="5.2" fill="#3d131e" />
                <circle cx="37.5" cy="44" r="2" fill="#ffffff" />
                <circle cx="41" cy="47.5" r="1.1" fill="#ffffff" />
                <circle cx="59.5" cy="44" r="2" fill="#ffffff" />
                <circle cx="63" cy="47.5" r="1.1" fill="#ffffff" />
                <path
                  d="M46,54 C48,56.5 52,56.5 54,54"
                  stroke="#5d2334"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            )}

            {/* Baker Chef Hat */}
            <g transform="translate(0, -2)">
              <path
                d="M30,28 C18,26 18,12 32,8 C36,0 64,0 68,8 C82,12 82,26 70,28 Z"
                fill="#fff5f7"
                stroke="#f3bcc7"
                strokeWidth="1.8"
              />
              <path d="M42,10 C46,16 46,24 45,28" stroke="#ffe0e6" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M58,10 C54,16 54,24 55,28" stroke="#ffe0e6" strokeWidth="1.5" strokeLinecap="round" />
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
            className="relative w-full max-w-lg bg-[#fff7f8] rounded-t-3xl sm:rounded-3xl border border-pink-200 shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto no-scrollbar animate-slide-up"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAssistantOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 active:scale-95 text-[#8c4055] flex items-center justify-center transition-all duration-150 cursor-pointer z-10"
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
                    Curated By Mood
                  </span>
                </div>
                <p className="text-xs text-[#7e5b65]">
                  {CAFE_DETAILS.name} · Order according to how you feel today!
                </p>
              </div>
            </div>

            {/* Miko Greeting Speech Bubble */}
            <div className="bg-white/90 rounded-2xl p-3.5 border border-pink-200 shadow-2xs mb-4 relative">
              <p className="text-xs md:text-sm text-[#4d2631] font-medium leading-relaxed">
                "Hi! I'm <strong className="text-[#b32052]">Miko</strong> ♡ How are you feeling today? Tap any mood below to see all the authentic food & beverage pairings our chef recommends!"
              </p>
            </div>

            {/* CURATED BY MOOD FOOD & DRINK SYSTEM */}
            <div className="mb-4 bg-gradient-to-b from-white via-[#fff2f5] to-white rounded-3xl p-4 sm:p-5 border-2 border-[#ff9ebb]/80 shadow-lg shadow-pink-200/50 relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5c89] via-[#ff8dae] to-[#ff5c89]" />

              {/* Section Header */}
              <div className="flex items-center justify-between mb-3 pt-0.5">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#3d131e] flex items-center gap-1.5 tracking-tight">
                    <Sparkles className="w-4 h-4 text-[#ff4073] animate-pulse" />
                    <span>Curated By Mood</span>
                  </span>
                  <p className="text-[10px] text-[#7a4e58]">
                    Order according to how you feel today!
                  </p>
                </div>
                <span className="text-[10px] text-[#b32052] font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-pink-300 shadow-2xs">
                  Food & Drinks
                </span>
              </div>

              {/* Mood Choices Tabs */}
              <div className="mb-3.5">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth -mx-1 px-1">
                  {MOOD_LIST.map((m) => {
                    const isSelected = selectedMood === m.id;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => handleSelectMood(m.id)}
                        className={`text-xs py-2 px-3.5 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap shadow-2xs border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#ff5c89] to-[#ff4073] text-white border-[#ff3366] shadow-md ring-2 ring-[#ff5c89]/20 scale-102'
                            : 'bg-white text-[#3d131e] hover:bg-rose-50/90 border-pink-200/80 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-base leading-none">{m.emoji}</span>
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Recommendation Output: Vibe Title, Note, and ALL Curated Pairings */}
              <div className="space-y-3 pt-2 border-t border-pink-100">
                {/* Vibe Title & Miko's Friendly Note */}
                <div className="bg-gradient-to-r from-rose-50/90 to-pink-50/70 border border-pink-200/80 rounded-2xl p-3 shadow-2xs flex items-start gap-2.5 animate-fade-in">
                  <div className="w-7 h-7 rounded-full bg-white border border-pink-200 flex items-center justify-center shrink-0 text-base shadow-2xs mt-0.5">
                    👻
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-[11px] text-[#b32052]">Chef's Vibe:</span>
                      {activeResponse.vibeTitle && (
                        <span className="text-[10px] uppercase tracking-wider bg-[#ff5c89] text-white px-2 py-0.5 rounded-full font-black shadow-2xs">
                          {activeResponse.vibeTitle}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#4d2631] font-medium leading-relaxed">
                      "{activeResponse.friendlyResponse}"
                    </p>
                  </div>
                </div>

                {/* Complete Curated Food & Drink Pairings Platter */}
                {activeResponse.curatedPairings && activeResponse.curatedPairings.length > 0 && (
                  <div className="bg-white rounded-2xl p-3 border border-pink-200 shadow-2xs space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between pb-1 border-b border-pink-100">
                      <span className="text-xs font-extrabold text-[#3d131e] flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#ff5c89]" />
                        <span>Curated Mood Pairings ({activeResponse.curatedPairings.length} Items)</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        100% Veg
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-68 overflow-y-auto no-scrollbar">
                      {activeResponse.curatedPairings.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (onSelectItem) {
                              setIsAssistantOpen(false);
                              onSelectItem(item);
                            }
                          }}
                          className="p-2 rounded-xl bg-pink-50/40 hover:bg-rose-50 border border-pink-100/80 transition-all flex items-center justify-between gap-2 cursor-pointer group active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                              {item.emoji}
                            </span>
                            <div className="min-w-0">
                              <h5 className="font-bold text-xs text-[#3d131e] truncate group-hover:text-[#b32052] transition-colors">
                                {item.name}
                              </h5>
                              <span className="text-[9px] uppercase font-semibold text-[#8c5060]">
                                {item.category.replace('_', ' ')}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            {item.priceVariants ? (
                              <span className="text-[10px] font-black text-[#b32052] bg-white px-1.5 py-0.5 rounded-md border border-pink-200 tabular-nums">
                                {Object.values(item.priceVariants).map(v => `₹${v}`).join('/')}
                              </span>
                            ) : item.price !== null && item.price !== undefined ? (
                              <span className="text-xs font-black text-[#b32052] bg-white px-2 py-0.5 rounded-md border border-pink-200 tabular-nums">
                                ₹{item.price}/-
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-[#b32052] bg-white px-1.5 py-0.5 rounded-md border border-pink-200">
                                MRP
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View Full Menu Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAssistantOpen(false);
                        onOpenMenu();
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#ff4d7e] to-[#ff6b95] hover:from-[#f03e6f] hover:to-[#ff5c89] text-white font-bold text-xs tracking-wide shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Explore Full Cafe Menu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CHEF'S MOOD CORNER (From Screenshot 4) */}
            <div className="mb-4 p-3.5 bg-gradient-to-br from-amber-50/80 via-rose-50/70 to-pink-50/80 rounded-2xl border border-amber-200/70 text-xs shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-[#944c1d] mb-1">
                <ChefHat className="w-4 h-4 text-[#d97706]" />
                <span className="uppercase tracking-wide text-[11px] font-black">
                  Chef's Mood Corner
                </span>
              </div>
              <p className="text-[11px] text-[#6b3518] leading-relaxed italic">
                "{CHEF_MOOD_QUOTE}"
              </p>
            </div>

            {/* Customer Note from Screenshot 3 */}
            <div className="mb-4 p-3 bg-white/90 rounded-2xl border border-pink-200/90 text-xs space-y-1 text-[#613642] shadow-2xs">
              <div className="font-bold flex items-center gap-1.5 text-[#a61e4d] text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Customer Note:</span>
              </div>
              <ul className="text-[11px] text-[#7a4855] space-y-0.5 list-disc list-inside">
                <li>Packing Charge: ₹15 per parcel</li>
                <li>Extra Kulhad: ₹15</li>
                <li>Please inform our team of any specific dietary requirements or food allergies prior to ordering.</li>
              </ul>
            </div>

            {/* Offline Ordering Information */}
            <div className="p-3 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-pink-200 text-xs space-y-1 text-[#613642] mb-3">
              <div className="font-bold flex items-center gap-1.5 text-[#a61e4d]">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Daily: 10:00 AM – 10:00 PM</span>
              </div>
              <p className="text-[11px] leading-snug">
                📍 {CAFE_DETAILS.address}, {CAFE_DETAILS.city}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
