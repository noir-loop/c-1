import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Star,
  Clock,
  RefreshCw,
  Check,
  Search,
  Save,
  Sliders,
  Utensils,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  AlertCircle,
  Shield,
  Loader2
} from 'lucide-react';
import { MenuItem, MenuCategory, CafeConfig } from '../types';
import { ALL_MENU_ITEMS } from '../data/mockData';
import {
  verifyPasscode,
  updateOwnerPasscode,
  resetOwnerPasscodeToDefault,
  getLockoutRemainingSeconds,
  recordFailedAttempt,
  clearLockout,
  sanitizeInput,
  sanitizePrice
} from '../utils/security';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateMenuItems: (items: MenuItem[]) => void;
  cafeConfig: CafeConfig;
  onUpdateCafeConfig: (config: CafeConfig) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  menuItems = [],
  onUpdateMenuItems,
  cafeConfig,
  onUpdateCafeConfig
}) => {
  // Security & Authentication State (Cryptographic & Zero-Plaintext)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Brute-force rate limiting countdown timer (60s lockout after 5 failures)
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(() => getLockoutRemainingSeconds());

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      const remaining = getLockoutRemainingSeconds();
      setLockoutSeconds(remaining);
      if (remaining <= 0) {
        setPassError(null);
        setFailedAttempts(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  // Security Tab (Change Password) State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [changePassError, setChangePassError] = useState<string | null>(null);
  const [changePassSuccess, setChangePassSuccess] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Inactivity auto-lock: automatically locks the session after 15 minutes of idle time
  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsAuthenticated(false);
      }, 15 * 60 * 1000);
    };
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [isAuthenticated]);

  // Safe close handler: wipes sensitive state on modal close
  const handleModalClose = useCallback(() => {
    setIsAuthenticated(false);
    setInputPass('');
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setPassError(null);
    setChangePassError(null);
    setChangePassSuccess(null);
    onClose();
  }, [onClose]);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'menu' | 'hours' | 'add' | 'security'>('menu');

  // Hours form state
  const [openingTime, setOpeningTime] = useState(cafeConfig.openingTime || '10:00 AM');
  const [closingTime, setClosingTime] = useState(cafeConfig.closingTime || '10:00 PM');
  const [daysOpen, setDaysOpen] = useState(cafeConfig.daysOpen || 'Open Daily');
  const [hoursSavedAlert, setHoursSavedAlert] = useState(false);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Add Item form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<MenuCategory>('chai');
  const [newEmoji, setNewEmoji] = useState('🫖');
  const [newDesc, setNewDesc] = useState('');
  const [newIsSpecialty, setNewIsSpecialty] = useState(false);

  // Editing existing item state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Inline confirm dialog states
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const safeItems = useMemo(() => {
    return Array.isArray(menuItems) ? menuItems.filter((i) => i && typeof i === 'object') : [];
  }, [menuItems]);

  const categories: { id: string; label: string }[] = useMemo(() => [
    { id: 'all', label: `All Dishes (${safeItems.length})` },
    { id: 'chai', label: 'Chai' },
    { id: 'cold_coffee', label: 'Cold Coffee' },
    { id: 'hot_coffee', label: 'Hot Coffee' },
    { id: 'shake', label: 'Shakes' },
    { id: 'matcha', label: 'Matcha' },
    { id: 'mojito', label: 'Mojitos & Drinks' },
    { id: 'munchies', label: 'Munchies' },
    { id: 'bites', label: 'Bites & Fries' },
    { id: 'maggi', label: 'Maggi' },
    { id: 'sandwich', label: 'Sandwiches' },
    { id: 'burger', label: 'Burgers' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'soup', label: 'Soup' },
    { id: 'pastry', label: 'Pastry & Desserts' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'combo', label: 'Combo Bites' }
  ], [safeItems.length]);

  const filteredItems = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    return safeItems.filter((item) => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const itemName = (item.name || '').toLowerCase();
      const itemDesc = (item.description || '').toLowerCase();
      return matchesCategory && (!q || itemName.includes(q) || itemDesc.includes(q));
    });
  }, [safeItems, filterCategory, searchQuery]);

  // Login handler: Cryptographically verified via Web Crypto SHA-256 (no backdoors)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    const entered = inputPass.trim();
    if (!entered) return;

    setIsVerifying(true);
    setPassError(null);

    try {
      const isValid = await verifyPasscode(entered);
      if (isValid) {
        setIsAuthenticated(true);
        setPassError(null);
        setInputPass('');
        setFailedAttempts(0);
        clearLockout();
        showToast('Welcome, Owner! Admin panel unlocked.');
      } else {
        const { isLocked, remainingSeconds } = recordFailedAttempt(failedAttempts);
        setFailedAttempts((prev) => prev + 1);
        if (isLocked) {
          setLockoutSeconds(remainingSeconds);
          setPassError(`Security lockout triggered: 5 failed attempts. Please wait ${remainingSeconds}s.`);
        } else {
          const attemptsLeft = 5 - (failedAttempts + 1);
          setPassError(`Incorrect owner passcode. (${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining before lockout)`);
        }
      }
    } catch (err) {
      console.error('Verification error', err);
      setPassError('Error verifying passcode. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Lock / Logout handler
  const handleLock = () => {
    setIsAuthenticated(false);
    setInputPass('');
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setPassError(null);
    showToast('Admin panel locked securely.');
  };

  // Change Password handler: Validates current cryptographic hash and writes new salted hash
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError(null);
    setChangePassSuccess(null);

    if (newPassInput.trim().length < 6) {
      setChangePassError('New passcode must be at least 6 characters long for security.');
      return;
    }

    if (newPassInput.trim() !== confirmPassInput.trim()) {
      setChangePassError('New passcodes do not match.');
      return;
    }

    setIsChangingPass(true);
    try {
      const isCurrentValid = await verifyPasscode(currentPassInput.trim());
      if (!isCurrentValid) {
        setChangePassError('Current passcode does not match.');
        return;
      }

      await updateOwnerPasscode(newPassInput.trim());
      setChangePassSuccess('Owner passcode encrypted and updated securely! Previous passcodes have been revoked.');
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      showToast('Owner passcode updated securely!');
      setTimeout(() => setChangePassSuccess(null), 4000);
    } catch {
      setChangePassError('Failed to securely update passcode in storage.');
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleResetPasswordToDefault = () => {
    try {
      resetOwnerPasscodeToDefault();
      setChangePassSuccess('Passcode restored to factory default.');
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      showToast('Passcode restored to factory default.');
      setTimeout(() => setChangePassSuccess(null), 4000);
    } catch {
      setChangePassError('Failed to reset passcode.');
    }
  };

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCafeConfig({
      ...cafeConfig,
      openingTime: sanitizeInput(openingTime) || '10:00 AM',
      closingTime: sanitizeInput(closingTime) || '10:00 PM',
      daysOpen: sanitizeInput(daysOpen) || 'Open Daily'
    });
    setHoursSavedAlert(true);
    showToast('Operating hours saved!');
    setTimeout(() => setHoursSavedAlert(false), 3000);
  };

  const handleQuickPriceChange = (id: string, newPriceVal: number | string | null | undefined) => {
    const validPrice = sanitizePrice(newPriceVal);
    const updated = safeItems.map((item) =>
      item.id === id ? { ...item, price: validPrice } : item
    );
    onUpdateMenuItems(updated);
  };

  const handleToggleSpecialty = (id: string) => {
    const updated = safeItems.map((item) =>
      item.id === id ? { ...item, isSpecialty: !item.isSpecialty } : item
    );
    onUpdateMenuItems(updated);
    const target = safeItems.find((i) => i.id === id);
    if (target) {
      showToast(
        !target.isSpecialty
          ? `Starred "${target.name}" for Homepage Specialties`
          : `Removed "${target.name}" from Homepage Specialties`
      );
    }
  };

  const confirmDeleteItem = () => {
    if (!itemToDelete) return;
    const updated = safeItems.filter((item) => item.id !== itemToDelete.id);
    onUpdateMenuItems(updated);
    showToast(`"${itemToDelete.name}" removed from menu.`);
    setItemToDelete(null);
  };

  const confirmResetToDefault = () => {
    onUpdateMenuItems(ALL_MENU_ITEMS);
    try {
      localStorage.removeItem('chaicafe_menu');
      localStorage.removeItem('chaicafe_menu_v3');
      localStorage.removeItem('chaicafe_menu_v4');
    } catch {
      // ignore
    }
    setShowResetConfirm(false);
    showToast(`Menu restored to all ${ALL_MENU_ITEMS.length} dishes from new authentic menu!`);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(newName);
    if (!cleanName) return;

    const parsedPrice = newPrice.trim() !== '' ? sanitizePrice(newPrice) : null;
    const created: MenuItem = {
      id: `custom-${Date.now()}`,
      name: cleanName,
      price: parsedPrice,
      category: newCategory,
      emoji: sanitizeInput(newEmoji) || '🍽️',
      description: sanitizeInput(newDesc) || 'Prepared fresh at Chai Cafe.',
      isSpecialty: newIsSpecialty,
      dietary: ['veg']
    };

    onUpdateMenuItems([created, ...safeItems]);
    showToast(`Added "${created.name}"${created.price !== null ? ` (₹${created.price})` : ' (Blank price)'} to menu!`);
    setNewName('');
    setNewPrice('');
    setNewDesc('');
    setNewIsSpecialty(false);
    setActiveTab('menu');
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const sanitizedItem: MenuItem = {
      ...editingItem,
      name: sanitizeInput(editingItem.name),
      price: sanitizePrice(editingItem.price),
      description: sanitizeInput(editingItem.description || '')
    };

    const updated = safeItems.map((item) =>
      item.id === sanitizedItem.id ? sanitizedItem : item
    );
    onUpdateMenuItems(updated);
    showToast(`Updated "${sanitizedItem.name}".`);
    setEditingItem(null);
  };

  const specialtyCount = safeItems.filter((i) => i.isSpecialty).length;

  if (!isOpen) return null;

  return (
    <div
      onClick={handleModalClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#fff8f7] rounded-3xl border border-pink-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scale-up"
      >
        
        {/* ================================================================ */}
        {/* LOCKED SCREEN: OWNER LOGIN VIEW (Only owner can access)          */}
        {/* ================================================================ */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 my-auto">
            {/* Top Close Button */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7a4855]">
                <Shield className="w-4 h-4 text-[#ff5c89]" />
                <span>Owner Security Portal</span>
              </div>
              <button
                onClick={handleModalClose}
                className="w-8 h-8 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center hover:bg-pink-200 active:scale-95 transition-all duration-150 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shield Icon Lock Emblem */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3d131e] to-[#63182b] text-white flex items-center justify-center shadow-md">
                <Lock className="w-8 h-8 text-pink-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#b32052] inline-block">
                Owner Access Only
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#3d131e]">
                Owner Security Passcode
              </h3>
              <p className="text-xs text-[#7a4855] leading-relaxed">
                This management dashboard is protected. Enter your owner passcode to edit menu items, update prices, manage specials, or modify cafe hours.
              </p>
            </div>

            {/* Error Message if wrong */}
            {passError && (
              <div className="w-full max-w-xs bg-rose-50 border border-rose-300 rounded-xl p-2.5 text-xs text-rose-800 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-left font-medium">{passError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a66a78]">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoFocus
                  disabled={lockoutSeconds > 0 || isVerifying}
                  value={inputPass}
                  onChange={(e) => {
                    setInputPass(e.target.value);
                    if (passError) setPassError(null);
                  }}
                  placeholder={lockoutSeconds > 0 ? 'Account locked temporarily...' : 'Enter owner passcode...'}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white border border-pink-200 text-sm text-[#3d131e] placeholder:text-[#a66a78] focus:outline-none focus:border-[#ff5c89] focus:ring-2 focus:ring-pink-200 font-medium shadow-2xs transition-all disabled:opacity-50 disabled:bg-gray-50"
                />
                <button
                  type="button"
                  disabled={lockoutSeconds > 0 || isVerifying}
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#a66a78] hover:text-[#3d131e] cursor-pointer disabled:opacity-40"
                  aria-label={showPass ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {lockoutSeconds > 0 ? (
                <div className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-gray-600 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-gray-200">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span>Security Lockout: {lockoutSeconds}s</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff4d7e] to-[#ff5c89] hover:from-[#f7386d] hover:to-[#ff4d7e] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Passcode...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Unlock Owner Panel</span>
                    </>
                  )}
                </button>
              )}
            </form>

            <button
              type="button"
              onClick={handleModalClose}
              className="text-xs font-semibold text-[#8c5060] hover:text-[#3d131e] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Cancel & Return to Cafe
            </button>
          </div>
        ) : (
          /* ================================================================ */
          /* AUTHENTICATED: OWNER DASHBOARD VIEW                              */
          /* ================================================================ */
          <>
            {/* Header */}
            <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-white/95 sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#3d131e] text-white flex items-center justify-center shadow-xs">
                  <Sliders className="w-4 h-4 text-pink-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-lg text-[#3d131e]">
                      Chai Cafe Owner Panel
                    </h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Owner Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7a4855]">
                    Manage dishes, pricing, specialties, hours & owner security ({safeItems.length} items loaded)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Lock Panel Button */}
                <button
                  onClick={handleLock}
                  className="px-2.5 py-1 rounded-full bg-rose-50 border border-pink-200 text-[#b32052] hover:bg-rose-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  title="Lock admin panel"
                >
                  <Lock className="w-3 h-3 text-[#ff5c89]" />
                  <span className="hidden sm:inline">Lock</span>
                </button>

                <button
                  onClick={handleModalClose}
                  className="w-8 h-8 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center hover:bg-pink-200 transition-colors cursor-pointer"
                  aria-label="Close admin modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-pink-50/90 via-rose-50/50 to-pink-50/90 border-b border-pink-200/80 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('menu')}
                  className={`text-xs font-extrabold py-2 px-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                    activeTab === 'menu'
                      ? 'bg-gradient-to-r from-[#ff4d7e] to-[#ff5c89] text-white shadow-xs scale-[1.02]'
                      : 'bg-white/90 text-[#7a4855] border border-pink-200/70 hover:bg-white hover:text-[#3d131e] hover:border-pink-300'
                  }`}
                >
                  <Utensils className={`w-3.5 h-3.5 ${activeTab === 'menu' ? 'text-white' : 'text-[#ff5c89]'}`} />
                  <span>Dishes & Prices ({safeItems.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className={`text-xs font-extrabold py-2 px-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                    activeTab === 'add'
                      ? 'bg-gradient-to-r from-[#ff4d7e] to-[#ff5c89] text-white shadow-xs scale-[1.02]'
                      : 'bg-white/90 text-[#7a4855] border border-pink-200/70 hover:bg-white hover:text-[#3d131e] hover:border-pink-300'
                  }`}
                >
                  <Plus className={`w-3.5 h-3.5 ${activeTab === 'add' ? 'text-white' : 'text-[#ff5c89]'}`} />
                  <span>Add New Dish</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('hours')}
                  className={`text-xs font-extrabold py-2 px-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                    activeTab === 'hours'
                      ? 'bg-gradient-to-r from-[#ff4d7e] to-[#ff5c89] text-white shadow-xs scale-[1.02]'
                      : 'bg-white/90 text-[#7a4855] border border-pink-200/70 hover:bg-white hover:text-[#3d131e] hover:border-pink-300'
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 ${activeTab === 'hours' ? 'text-white' : 'text-[#ff5c89]'}`} />
                  <span>Opening Hours</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className={`text-xs font-extrabold py-2 px-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                    activeTab === 'security'
                      ? 'bg-gradient-to-r from-[#ff4d7e] to-[#ff5c89] text-white shadow-xs scale-[1.02]'
                      : 'bg-white/90 text-[#7a4855] border border-pink-200/70 hover:bg-white hover:text-[#3d131e] hover:border-pink-300'
                  }`}
                >
                  <Key className={`w-3.5 h-3.5 ${activeTab === 'security' ? 'text-white' : 'text-[#ff5c89]'}`} />
                  <span>Security & Passcode</span>
                </button>
              </div>

              <div className="shrink-0 ml-1">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="text-[11px] font-bold text-[#b32052] hover:text-[#ba1a1a] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-pink-200 hover:bg-rose-50 transition-all cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap"
                  title="Reset to default authentic cafe menu"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#ff5c89]" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

                {/* Tab Contents */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                  
                  {/* TAB 1: MENU ITEMS & PRICES */}
                  {activeTab === 'menu' && (
                    <div className="space-y-3">
                      {/* Search & Category Filter Bar */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <Search className="w-3.5 h-3.5 text-[#7a4855] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search dishes to edit price..."
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-pink-200 text-[#3d131e] placeholder:text-[#a66a78] focus:outline-none focus:border-[#ff5c89]"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#a66a78] hover:text-[#3d131e]"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="text-xs bg-white border border-pink-200 rounded-xl px-2.5 py-1.5 text-[#3d131e] focus:outline-none focus:border-[#ff5c89] cursor-pointer"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Summary / Stats banner */}
                      <div className="flex items-center justify-between text-[11px] text-[#7a4855] px-1 bg-pink-50/70 p-2 rounded-xl border border-pink-100">
                        <div>
                          Showing <strong>{filteredItems.length}</strong> of <strong>{safeItems.length}</strong> dishes
                          {specialtyCount > 0 && (
                            <span className="ml-2 text-[#b32052] font-semibold">
                              ({specialtyCount} starred as Chef Specialties)
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8c5060]">
                          Click price to quickly edit • Leave blank for unpriced items • ⭐ toggles Chef Specialty
                        </div>
                      </div>

                      {/* Dishes List */}
                      {filteredItems.length === 0 ? (
                        <div className="text-center py-10 bg-white/60 rounded-2xl border border-pink-100 space-y-2">
                          <p className="text-xs text-[#7a4855]">No dishes found matching your query.</p>
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setFilterCategory('all');
                            }}
                            className="text-xs font-bold text-[#b32052] underline"
                          >
                            Clear search filters
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {filteredItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white rounded-2xl p-3 border border-pink-100/90 shadow-2xs hover:border-pink-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                            >
                              {/* Dish info */}
                              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                <span className="text-2xl shrink-0 mt-0.5 sm:mt-0">{item.emoji || '🍽️'}</span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <h4 className="font-bold text-xs sm:text-sm text-[#3d131e] break-words">
                                      {item.name}
                                    </h4>
                                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-rose-50 border border-pink-100 text-[#b32052] font-bold shrink-0">
                                      {item.category.replace('_', ' ')}
                                    </span>
                                    {item.isSpecialty && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 font-bold shrink-0 flex items-center gap-0.5">
                                        ⭐ Special
                                      </span>
                                    )}
                                  </div>
                                  
                                  {item.description && (
                                    <p className="text-[11px] text-[#7e5b65] leading-snug mt-0.5 line-clamp-1">
                                      {item.description}
                                    </p>
                                  )}

                                  {item.priceVariants && (
                                    <div className="flex flex-wrap gap-1 mt-1 text-[9px] text-[#a61e4d] font-semibold">
                                      {Object.entries(item.priceVariants).map(([v, p]) => (
                                        <span key={v} className="bg-rose-50 border border-pink-100 px-1.5 py-0.5 rounded-md tabular-nums">
                                          {v}: ₹{p}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Price input + Actions */}
                              <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-pink-50">
                                {/* Quick Price input */}
                                <div
                                  className="flex items-center gap-1 bg-[#fff0f3] px-2 py-1 rounded-xl border border-pink-200 shadow-2xs"
                                  title="Edit price (leave empty for unpriced/blank)"
                                >
                                  <span className="text-xs font-bold text-[#b32052]">₹</span>
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.price !== null && item.price !== undefined ? item.price : ''}
                                    placeholder="—"
                                    onChange={(e) => {
                                      const val = e.target.value.trim();
                                      handleQuickPriceChange(item.id, val === '' ? null : parseFloat(val));
                                    }}
                                    className="w-12 text-xs font-black text-[#3d131e] bg-transparent focus:outline-none text-right placeholder:text-stone-400"
                                    title="Edit price"
                                  />
                                </div>

                                <div className="flex items-center gap-1">
                                  {/* Edit Dish Name & Details Button */}
                                  <button
                                    type="button"
                                    onClick={() => setEditingItem(item)}
                                    className="px-2 py-1 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-[#7a4855] hover:text-[#b32052] text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
                                    title="Edit dish name, description, category, and emoji"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-[#ff5c89]" />
                                    <span className="text-[11px]">Edit</span>
                                  </button>

                                  {/* Toggle Specialty Star */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleSpecialty(item.id)}
                                    className={`p-1.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                                      item.isSpecialty
                                        ? 'bg-amber-100 border-amber-300 text-amber-600 shadow-2xs'
                                        : 'bg-white border-pink-100 text-stone-300 hover:text-amber-500 hover:bg-amber-50'
                                    }`}
                                    title={
                                      item.isSpecialty
                                        ? 'Featured Specialty on homepage'
                                        : 'Click to feature as Homepage Specialty'
                                    }
                                  >
                                    <Star
                                      className="w-3.5 h-3.5"
                                      fill={item.isSpecialty ? 'currentColor' : 'none'}
                                    />
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                                    className="p-1.5 rounded-xl bg-white hover:bg-rose-50 border border-pink-100 hover:border-rose-200 text-stone-400 hover:text-rose-600 transition-all cursor-pointer active:scale-95"
                                    title="Delete dish from menu"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                  )}
                </div>
              )}

              {/* TAB 2: ADD NEW DISH */}
              {activeTab === 'add' && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs max-w-lg mx-auto space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#3d131e]">
                      Add New Dish to Menu
                    </h4>
                    <p className="text-xs text-[#7a4855]">
                      Create a new item with authentic pricing, emoji and category.
                    </p>
                  </div>

                  <form onSubmit={handleAddNewItem} className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Dish Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Saffron Malai Chai"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Emoji Icon
                        </label>
                        <input
                          type="text"
                          value={newEmoji}
                          onChange={(e) => setNewEmoji(e.target.value)}
                          placeholder="🫖"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-center text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Price (₹) <span className="font-normal text-[#8c606b]">(Leave blank if unpriced)</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          placeholder="e.g. 70 or leave blank"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Category *
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as MenuCategory)}
                          className="w-full px-2 py-1.5 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        >
                          <option value="chai">Chai</option>
                          <option value="cold_coffee">Cold Coffee</option>
                          <option value="hot_coffee">Hot Coffee</option>
                          <option value="shake">Shakes</option>
                          <option value="matcha">Matcha</option>
                          <option value="mojito">Mojitos & Drinks</option>
                          <option value="munchies">Munchies</option>
                          <option value="bites">Bites & Fries</option>
                          <option value="maggi">Maggi</option>
                          <option value="sandwich">Sandwiches</option>
                          <option value="burger">Burgers</option>
                          <option value="pizza">Pizza</option>
                          <option value="pasta">Pasta</option>
                          <option value="soup">Soup</option>
                          <option value="pastry">Pastry & Desserts</option>
                          <option value="chinese">Chinese</option>
                          <option value="combo">Combo Bites</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Description / Ingredients
                      </label>
                      <textarea
                        rows={2}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Briefly describe what makes this dish delicious..."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-pink-50 p-2.5 rounded-xl border border-pink-100">
                      <input
                        type="checkbox"
                        id="newIsSpecialty"
                        checked={newIsSpecialty}
                        onChange={(e) => setNewIsSpecialty(e.target.checked)}
                        className="rounded text-[#ff5c89] focus:ring-[#ff5c89] h-4 w-4"
                      />
                      <label htmlFor="newIsSpecialty" className="text-xs font-semibold text-[#3d131e] cursor-pointer">
                        Feature this as a Chef Specialty on homepage (⭐)
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#ff5c89] hover:bg-[#ff4d7e] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Dish to Menu</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: OPENING HOURS */}
              {activeTab === 'hours' && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs max-w-md mx-auto space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#3d131e]">
                      Edit Opening & Closing Timings
                    </h4>
                    <p className="text-xs text-[#7a4855]">
                      Changes will immediately reflect on the top banner and footer of the landing page.
                    </p>
                  </div>

                  <form onSubmit={handleSaveHours} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Days Open
                      </label>
                      <input
                        type="text"
                        value={daysOpen}
                        onChange={(e) => setDaysOpen(e.target.value)}
                        placeholder="e.g. Open Daily or Mon - Sun"
                        className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Opening Time
                        </label>
                        <input
                          type="text"
                          value={openingTime}
                          onChange={(e) => setOpeningTime(e.target.value)}
                          placeholder="e.g. 10:00 AM"
                          className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Closing Time
                        </label>
                        <input
                          type="text"
                          value={closingTime}
                          onChange={(e) => setClosingTime(e.target.value)}
                          placeholder="e.g. 10:00 PM"
                          className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                        />
                      </div>
                    </div>

                    {hoursSavedAlert && (
                      <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-center font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Timings updated successfully!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#ff5c89] hover:bg-[#ff4d7e] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Operating Hours</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: SECURITY & OWNER PASSCODE */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs max-w-md mx-auto space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#3d131e] text-pink-300 flex items-center justify-center shrink-0">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#3d131e]">
                        Change Owner Passcode
                      </h4>
                      <p className="text-xs text-[#7a4855]">
                        Set a custom secret passcode that only you know to prevent unauthorized changes.
                      </p>
                    </div>
                  </div>

                  {changePassError && (
                    <div className="bg-rose-50 border border-rose-300 rounded-xl p-2.5 text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{changePassError}</span>
                    </div>
                  )}

                  {changePassSuccess && (
                    <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{changePassSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Current Passcode *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        placeholder="Enter current passcode..."
                        className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        New Passcode * (min 4 characters)
                      </label>
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        placeholder="Enter new secret passcode..."
                        className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-7 text-[#7a4855] hover:text-[#3d131e] text-xs cursor-pointer"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Confirm New Passcode *
                      </label>
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        value={confirmPassInput}
                        onChange={(e) => setConfirmPassInput(e.target.value)}
                        placeholder="Confirm new passcode..."
                        className="w-full px-3 py-2 rounded-xl bg-[#fff8f7] border border-pink-200 text-xs text-[#3d131e] focus:outline-none focus:border-[#ff5c89]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isChangingPass}
                      className="w-full py-2.5 rounded-full bg-[#3d131e] hover:bg-[#521c2a] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
                    >
                      {isChangingPass ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-300" />
                          <span>Encrypting & Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5 text-pink-300" />
                          <span>Update Owner Passcode</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#7a4855]">Need to restore original owner passcode?</span>
                    <button
                      type="button"
                      onClick={handleResetPasswordToDefault}
                      className="text-[#b32052] font-semibold hover:underline cursor-pointer"
                    >
                      Reset to Factory Default
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Modal Popup */}
            {editingItem && (
              <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-[#fff8f7] rounded-3xl p-5 border border-pink-200 shadow-2xl w-full max-w-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-[#3d131e]">
                      Edit Dish Details
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="w-7 h-7 rounded-full bg-pink-100 text-[#8c4055] flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveEditItem} className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Dish Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d131e]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Price (₹) <span className="font-normal text-[#8c606b]">(Blank if unpriced)</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={editingItem.price !== null && editingItem.price !== undefined ? editingItem.price : ''}
                          placeholder="Leave empty for Blank"
                          onChange={(e) => {
                            const val = e.target.value.trim();
                            setEditingItem({
                              ...editingItem,
                              price: val === '' ? null : parseFloat(val)
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d131e]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#584045] mb-1">
                          Category
                        </label>
                        <select
                          value={editingItem.category}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              category: e.target.value as MenuCategory
                            })
                          }
                          className="w-full px-2 py-1.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d131e]"
                        >
                          <option value="chai">Chai</option>
                          <option value="cold_coffee">Cold Coffee</option>
                          <option value="hot_coffee">Hot Coffee</option>
                          <option value="shake">Shakes</option>
                          <option value="matcha">Matcha</option>
                          <option value="mojito">Mojitos & Drinks</option>
                          <option value="munchies">Munchies</option>
                          <option value="bites">Bites & Fries</option>
                          <option value="maggi">Maggi</option>
                          <option value="sandwich">Sandwiches</option>
                          <option value="burger">Burgers</option>
                          <option value="pizza">Pizza</option>
                          <option value="pasta">Pasta</option>
                          <option value="soup">Soup</option>
                          <option value="pastry">Pastry & Desserts</option>
                          <option value="chinese">Chinese</option>
                          <option value="combo">Combo Bites</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#584045] mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d131e]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="editIsSpecialty"
                        checked={editingItem.isSpecialty || false}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, isSpecialty: e.target.checked })
                        }
                        className="rounded text-[#ff5c89] focus:ring-[#ff5c89] h-4 w-4"
                      />
                      <label htmlFor="editIsSpecialty" className="text-xs font-semibold text-[#3d131e]">
                        Star as Chef Specialty (⭐)
                      </label>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="flex-1 py-2 rounded-xl bg-pink-100 text-[#7a4855] text-xs font-bold hover:bg-pink-200 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-[#ff5c89] text-white text-xs font-bold hover:bg-[#ff4d7e] transition-colors shadow-xs cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Popup */}
        {itemToDelete && (
          <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#fff8f7] rounded-3xl p-5 border border-pink-200 shadow-2xl w-full max-w-xs space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-[#ba1a1a] flex items-center justify-center mx-auto">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3d131e]">
                Delete Dish?
              </h4>
              <p className="text-xs text-[#7a4855]">
                Are you sure you want to remove <strong>"{itemToDelete.name}"</strong> from the menu?
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-2 rounded-xl bg-pink-100 text-[#7a4855] text-xs font-bold hover:bg-pink-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteItem}
                  className="flex-1 py-2 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Menu Confirmation Popup */}
        {showResetConfirm && (
          <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#fff8f7] rounded-3xl p-5 border border-pink-200 shadow-2xl w-full max-w-xs space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-[#ba1a1a] flex items-center justify-center mx-auto">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3d131e]">
                Reset Entire Menu?
              </h4>
              <p className="text-xs text-[#7a4855]">
                This will restore all {ALL_MENU_ITEMS.length} dishes and prices from the authentic cafe menu boards.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl bg-pink-100 text-[#7a4855] text-xs font-bold hover:bg-pink-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmResetToDefault}
                  className="flex-1 py-2 rounded-xl bg-[#ff5c89] text-white text-xs font-bold hover:bg-[#ff4d7e] transition-colors shadow-xs cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#3d131e] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-pink-300/40 animate-toast">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
