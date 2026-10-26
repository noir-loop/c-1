import React from 'react';

interface FallingItem {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  swayDirection: 'left' | 'right';
  opacity: number;
}

const FOOD_EMOJIS = ['🫖', '🍕', '🍟', '☕', '🥤', '🥐', '🧋', '✨'];

// Ultra-lightweight pre-computed static items (8 items for 60fps performance)
const FALLING_ITEMS: FallingItem[] = Array.from({ length: 8 }, (_, i) => {
  const emoji = FOOD_EMOJIS[i % FOOD_EMOJIS.length];
  const baseLeft = (i / 8) * 88 + 6;
  const left = Math.max(5, Math.min(92, baseLeft));
  const duration = 11 + (i % 3) * 2.5;
  const delay = -(i * 1.4);
  const size = 15 + (i % 3) * 2;
  const swayDirection = i % 2 === 0 ? 'left' : 'right';
  const opacity = 0.15 + (i % 2) * 0.05;

  return {
    id: i,
    emoji,
    left,
    duration,
    delay,
    size,
    swayDirection,
    opacity,
  };
});

export const FallingElements: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {FALLING_ITEMS.map((item) => (
        <span
          key={item.id}
          className={`absolute top-0 transform-gpu ${
            item.swayDirection === 'left' ? 'animate-fall-left' : 'animate-fall-right'
          }`}
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
            willChange: 'transform',
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};
