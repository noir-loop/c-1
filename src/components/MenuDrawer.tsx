import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { X, Search, Heart, Utensils, Flame, RotateCcw } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onResetMenu?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  menuItems = [],
  onResetMenu
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['chai-masala', 'piz-special-cfc']));
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  const toggleFavorite = (id: string) => {
    if (!id) return;
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const safeItems = useMemo(() => {
    return Array.isArray(menuItems) ? menuItems.filter((i) => i && typeof i === 'object') : [];
  }, [menuItems]);

  const categories: { id: string; label: string; count: number }[] = useMemo(() => [
    { id: 'all', label: 'All Dishes', count: safeItems.length },
    { id: 'chai', label: 'Chai', count: safeItems.filter((i) => i.category === 'chai').length },
    { id: 'cold_coffee', label: 'Cold Coffee', count: safeItems.filter((i) => i.category === 'cold_coffee').length },
    { id: 'hot_coffee', label: 'Hot Coffee', count: safeItems.filter((i) => i.category === 'hot_coffee').length },
    { id: 'shake', label: 'Shakes', count: safeItems.filter((i) => i.category === 'shake').length },
    { id: 'matcha', label: 'Matcha', count: safeItems.filter((i) => i.category === 'matcha').length },
    { id: 'mojito', label: 'Mojitos & Drinks', count: safeItems.filter((i) => i.category === 'mojito').length },
    { id: 'munchies', label: 'Munchies', count: safeItems.filter((i) => i.category === 'munchies').length },
    { id: 'bites', label: 'Bites & Fries', count: safeItems.filter((i) => i.category === 'bites').length },
    { id: 'maggi', label: 'Maggi', count: safeItems.filter((i) => i.category === 'maggi').length },
    { id: 'sandwich', label: 'Sandwiches', count: safeItems.filter((i) => i.category === 'sandwich').length },
    { id: 'burger', label: 'Burgers', count: safeItems.filter((i) => i.category === 'burger').length },
    { id: 'pizza', label: 'Pizza', count: safeItems.filter((i) => i.category === 'pizza').length },
    { id: 'pasta', label: 'Pasta', count: safeItems.filter((i) => i.category === 'pasta').length },
    { id: 'soup', label: 'Soup', count: safeItems.filter((i) => i.category === 'soup').length },
    { id: 'pastry', label: 'Pastry & Desserts', count: safeItems.filter((i) => i.category === 'pastry').length },
    { id: 'chinese', label: 'Chinese', count: safeItems.filter((i) => i.category === 'chinese').length },
    { id: 'combo', label: 'Combo Bites', count: safeItems.filter((i) => i.category === 'combo').length }
  ], [safeItems]);

  const filteredItems = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    return safeItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const itemName = (item.name || '').toLowerCase();
      const itemDesc = (item.description || '').toLowerCase();
      const matchesSearch = !q || itemName.includes(q) || itemDesc.includes(q);
      const matchesFavorite = showOnlyFavorites ? (item.id && favorites.has(item.id)) : true;
      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [safeItems, selectedCategory, searchQuery, showOnlyFavorites, favorites]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-[#fff8f7] shadow-2xl flex flex-col border-l border-pink-200 animate-slide-left overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-white/95 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ff5c89] text-white flex items-center justify-center shadow-xs">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#3d131e] leading-tight">
                Chai Cafe Digital Menu
              </h2>
              <p className="text-[11px] text-[#8c6570]">
                100% Pure Vegetarian · Table Order ({safeItems.length} dishes)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer border ${
                showOnlyFavorites
                  ? 'bg-[#ff5c89] text-white border-[#ff5c89] shadow-2xs'
                  : 'bg-rose-50 text-[#b32052] border-pink-200 hover:bg-rose-100'
              }`}
              title="Show my saved items"
            >
              <Heart className={`w-3.5 h-3.5 transition-transform ${showOnlyFavorites ? 'fill-white' : 'fill-[#ff5c89]'}`} />
              <span>Saved ({favorites.size})</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center hover:bg-pink-200 active:scale-95 transition-all duration-150 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offline Ordering Notice Banner */}
        <div className="bg-rose-50/80 border-b border-pink-200/60 px-4 py-2 flex items-center justify-between text-xs text-[#7e4655]">
          <span className="font-medium text-[11px]">
            🛎️ In-person ordering: Your server takes your order right at your table!
          </span>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 bg-white/80 border-b border-pink-100 space-y-2 backdrop-blur-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8c6570] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chai, pizza, fries, shakes, pasta..."
              className="w-full pl-8 pr-8 py-2 rounded-full bg-white border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:ring-2 focus:ring-[#ff5c89]/50 transition-all placeholder:text-[#ab8c95]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center text-[10px] hover:bg-pink-200 cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips with Item Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id && !showOnlyFavorites;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowOnlyFavorites(false);
                  }}
                  className={`text-[11px] px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#ff5c89] text-white shadow-2xs font-bold scale-[1.02]'
                      : 'bg-white text-[#734350] border border-pink-100 hover:bg-pink-50'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 no-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 text-[#8c6570] space-y-3">
              <span className="text-4xl block">🍵</span>
              <p className="font-bold text-sm text-[#3d131e]">No matching dishes found</p>
              <p className="text-xs text-[#7a4855]">
                {safeItems.length === 0
                  ? 'Your menu items list is currently empty.'
                  : 'Try searching for something else or switch to All Dishes.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                {safeItems.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setShowOnlyFavorites(false);
                    }}
                    className="px-4 py-2 rounded-full bg-pink-100 text-[#b32052] text-xs font-bold hover:bg-pink-200 transition-colors cursor-pointer"
                  >
                    View All {safeItems.length} Dishes
                  </button>
                )}
                {onResetMenu && (
                  <button
                    onClick={onResetMenu}
                    className="px-4 py-2 rounded-full bg-[#ff5c89] text-white text-xs font-bold hover:bg-[#ff4d7e] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Full Default Menu</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isFav = item.id ? favorites.has(item.id) : false;
              return (
                <div
                  key={item.id || item.name}
                  className="bg-white rounded-2xl p-3.5 border border-[#ffdce3] hover:border-[#ff9eb8] shadow-2xs hover:shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 relative flex gap-3 group"
                >
                  {/* Emoji / Food Badge */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-100 flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    {item.emoji || '🍽️'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-baseline justify-between gap-1">
                      <h4 className="font-bold text-sm text-[#3d131e] truncate group-hover:text-[#b32052] transition-colors">
                        {item.name}
                      </h4>
                      {item.price !== null && item.price !== undefined ? (
                        <span className="font-black text-[#b32052] text-sm shrink-0 tabular-nums">
                          ₹{item.price}/-
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#b32052] bg-rose-50 border border-pink-200/80 px-2 py-0.5 rounded-full shrink-0">
                          {item.name.toLowerCase().includes('water') ? 'MRP' : 'Price on Request'}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-[11px] text-[#6e4e56] mt-0.5 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Price variants if any (e.g. Regular vs Large, Dry vs Gravy, Small vs Kulhad) */}
                    {item.priceVariants && typeof item.priceVariants === 'object' && !Array.isArray(item.priceVariants) && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {Object.entries(item.priceVariants).map(([variant, vPrice]) => (
                          <span
                            key={variant}
                            className="text-[10px] bg-rose-50 border border-pink-200 text-[#b32052] font-semibold px-2 py-0.5 rounded-md tabular-nums"
                          >
                            {variant}: ₹{vPrice}/-
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {item.isSpecialty && (
                        <span className="text-[9px] bg-rose-100 text-[#a61e4d] font-bold px-2 py-0.5 rounded-full">
                          Chef Special
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                        100% Veg
                      </span>
                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium flex items-center">
                          <Flame className="w-2.5 h-2.5 inline mr-0.5" />
                          Spiced
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bookmark heart to save for waiter */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3.5 right-3 text-[#b38491] hover:text-[#ff5c89] transition-all duration-150 active:scale-125 cursor-pointer p-1"
                    aria-label="Save dish"
                    title={isFav ? 'Remove from saved' : 'Save to show server'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-150 ${
                        isFav ? 'fill-[#ff5c89] text-[#ff5c89] scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-white/95 border-t border-pink-100 text-center space-y-1">
          <p className="text-[11px] font-semibold text-[#b32052]">
            📦 Note: Packing Charges Apply — 15%
          </p>
          <p className="text-[10px] text-[#7a4855]">
            💡 <strong className="text-[#3d131e]">Chai Cafe</strong> • 100% Pure Vegetarian Fresh Preparation
          </p>
        </div>
      </div>
    </div>
  );
};
