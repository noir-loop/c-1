import React, { useState } from 'react';
import { Download, Smartphone, X, Share, PlusSquare, Sparkles, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running inside installed standalone PWA, suppress the button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      await install();
      setIsInstalling(false);
    } else {
      // Show guided instructions for iOS or desktop
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#8c2a47] bg-white/90 hover:bg-white border border-[#ffd2dc] hover:border-[#ff9eb8] shadow-2xs hover:shadow-xs active:scale-95 transition-all duration-150 cursor-pointer ${className}`}
        title="Install Chai Cafe App on your device"
        aria-label="Install App"
      >
        <Download className="w-3.5 h-3.5 text-[#ff5c89]" />
        <span>Install App</span>
      </button>

      {/* Installation Guide Modal (For iOS Safari & Desktop browsers) */}
      {showGuide && (
        <div
          onClick={() => setShowGuide(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-[#fff8f7] rounded-3xl border border-pink-200 shadow-2xl p-5 space-y-4 animate-scale-up text-[#3d131e]"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-pink-100 hover:bg-pink-200 text-[#8c4055] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* App Emblem Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 border border-pink-200 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                <img src="/icon.svg" alt="Chai Cafe" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#3d131e]">
                  Install Chai Cafe
                </h3>
                <p className="text-[11px] text-[#7e5b65]">
                  Instant offline menu & drink recommendations
                </p>
              </div>
            </div>

            {/* Guided Instructions */}
            {isIOS ? (
              <div className="bg-white/90 rounded-2xl p-3.5 border border-pink-100 shadow-2xs space-y-2 text-xs">
                <div className="font-bold text-[#b32052] flex items-center gap-1.5 text-xs">
                  <Smartphone className="w-4 h-4" />
                  <span>How to install on iPhone & iPad:</span>
                </div>
                <ol className="space-y-2 text-[#4d2631] pl-1 text-[11px] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-pink-100 text-[#8c2a47] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Tap the <strong className="text-[#3d131e]">Share</strong> button <Share className="inline w-3 h-3 text-blue-500 mx-0.5" /> in Safari’s bottom toolbar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-pink-100 text-[#8c2a47] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Scroll down and tap <strong className="text-[#3d131e]">Add to Home Screen</strong> <PlusSquare className="inline w-3 h-3 text-[#ff5c89] mx-0.5" />.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-pink-100 text-[#8c2a47] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Tap <strong className="text-[#3d131e]">Add</strong> in the top-right corner to finish.</span>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="bg-white/90 rounded-2xl p-3.5 border border-pink-100 shadow-2xs space-y-2 text-xs">
                <div className="font-bold text-[#b32052] flex items-center gap-1.5 text-xs">
                  <Download className="w-4 h-4" />
                  <span>How to install on Android & Desktop:</span>
                </div>
                <p className="text-[11px] text-[#4d2631] leading-relaxed">
                  1. Tap the browser menu (<strong className="text-[#3d131e]">⋮</strong> or three dots) in Chrome or Edge.<br />
                  2. Select <strong className="text-[#3d131e]">Install App</strong> or <strong className="text-[#3d131e]">Add to Home screen</strong>.<br />
                  3. Launch Chai Cafe anytime directly from your home screen, even offline!
                </p>
              </div>
            )}

            {/* Offline highlights badge */}
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[10px] text-emerald-800 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Full 70+ dish menu and Miko drink recommendations work completely offline once installed!</span>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 rounded-full bg-[#3d131e] hover:bg-[#5a1e2e] active:scale-95 text-white font-bold text-xs tracking-wide shadow-xs transition-all cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
