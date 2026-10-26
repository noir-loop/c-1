import React from 'react';
import { MascotPose } from '../types';

interface MikoAvatarProps {
  pose?: MascotPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isGhostHovering?: boolean;
  className?: string;
}

export const MikoAvatar: React.FC<MikoAvatarProps> = ({
  pose = 'smiling' as any,
  size = 'md',
  isGhostHovering = true,
  className = ''
}) => {
  // Map pose to 2x2 sprite coordinates of Chai_Tea_Shop_Character_Sheet_77bb0910.png
  // Top-Left: Serving Chai (pose: 'serving')
  // Top-Right: Taking order with notebook (pose: 'noting')
  // Bottom-Left: Resting chin on hands (pose: 'listening' or 'smiling')
  // Bottom-Right: Cheerful "Order done!" (pose: 'happy')
  let objectPosition = '0% 100%'; // default to bottom-left (listening/smiling)
  if (pose === 'serving') {
    objectPosition = '0% 0%';
  } else if (pose === 'noting') {
    objectPosition = '100% 0%';
  } else if (pose === 'happy') {
    objectPosition = '100% 100%';
  } else if (pose === 'listening' || (pose as string) === 'smiling') {
    objectPosition = '0% 100%';
  }

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        isGhostHovering ? 'animate-float' : ''
      } ${className}`}
    >
      {/* Ghostly Ethereal Glow / Aura */}
      <div className="absolute inset-0 bg-radial from-pink-300/40 via-rose-200/20 to-transparent rounded-full blur-xl scale-110 pointer-events-none" />

      {/* Ghost Floating Mist underneath */}
      {isGhostHovering && (
        <div className="absolute -bottom-2 w-3/4 h-2 bg-pink-300/30 rounded-full blur-xs animate-pulse" />
      )}

      {/* Character Image Container */}
      <div
        className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-2 border-pink-200/80 shadow-md bg-[#fff0f3]`}
      >
        {/* Character Sheet with 2x zoom showing the targeted quadrant */}
        <img
          src="/assets/aistudio/Chai_Tea_Shop_Character_Sheet_77bb0910.png"
          alt="Miko - Chai Cafe Mascot"
          className="w-[200%] h-[200%] max-w-none absolute object-cover"
          style={{
            objectPosition,
            top: objectPosition.includes('100%') && objectPosition.startsWith('0%') ? '-100%' : objectPosition === '100% 100%' ? '-100%' : '0%',
            left: objectPosition.startsWith('100%') ? '-100%' : '0%'
          }}
        />

        {/* Head Cap Badge: "MIKO ♡" overlaying the hat band */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-white/90 text-[#b32052] font-black tracking-wider text-[8px] sm:text-[9px] shadow-2xs border border-pink-200/90 whitespace-nowrap">
            <span>MIKO</span>
            <span className="text-[7px]">♡</span>
          </span>
        </div>

        {/* Apron Badge: Chai Cafe Teapot Logo overlaying the apron */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="px-1.5 py-0.5 rounded-full bg-white/95 text-[#b32052] flex items-center gap-0.5 shadow-2xs border border-pink-200">
            <span className="text-[9px]">🫖</span>
            <span className="font-bold text-[7px] tracking-tight">Chai Cafe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
