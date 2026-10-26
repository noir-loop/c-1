import React from 'react';
import { WifiOff, Sparkles } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 max-w-xs bg-[#3d131e]/95 text-white backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-pink-300/40 animate-slide-up flex items-center gap-2.5 text-xs select-none"
    >
      <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
        <WifiOff className="w-3.5 h-3.5 animate-pulse" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 font-bold text-pink-100 text-[11px] leading-tight">
          <span>Offline Mode</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <p className="text-[10px] text-pink-200/90 leading-tight mt-0.5">
          Menu & Miko drink recommendations are fully available offline!
        </p>
      </div>
    </div>
  );
};
