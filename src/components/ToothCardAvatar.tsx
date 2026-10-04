import React, { useState, useEffect, useId } from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export const TOOTH_PATH =
  'M 50 14 C 42 7 34 5 26 5 C 13 5 4 16 4 32 C 4 48 10 62 15 74 C 18 82 20 94 24 102 C 26 106 31 106 34 101 C 39 93 44 82 50 74 C 56 82 61 93 66 101 C 69 106 74 106 76 102 C 80 94 82 82 85 74 C 90 62 96 48 96 32 C 96 16 87 5 74 5 C 66 5 58 7 50 14 Z';

export const AGENT_AVATAR_SRC = 'https://i.ibb.co/vx8MfgHj/Design-sem-nome-1-1.png';
export const AGENT_AVATAR_FALLBACK = '/images/agent-avatar.png';

interface ToothCardAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'responsive';
  className?: string;
  showOnlineDot?: boolean;
  avatarSrc?: string;
  alt?: string;
  isInteractive?: boolean;
}

export const ToothCardAvatar: React.FC<ToothCardAvatarProps> = ({
  size = 'responsive',
  className = '',
  showOnlineDot = true,
  avatarSrc,
  alt = 'OralPro Atendimento',
  isInteractive = false,
}) => {
  let dynamicAvatarUrl: string | undefined;
  try {
    const siteContent = useSiteContent();
    const avatarSlot = siteContent?.getSlot('agent_avatar', AGENT_AVATAR_SRC);
    if (avatarSlot?.imageUrl) {
      dynamicAvatarUrl = avatarSlot.imageUrl;
    }
  } catch {
    // Rendered outside SiteContentProvider
  }

  const effectiveAvatar = avatarSrc || dynamicAvatarUrl || AGENT_AVATAR_SRC;
  const [currentSrc, setCurrentSrc] = useState<string>(effectiveAvatar);
  const rawId = useId();
  const id = rawId.replace(/:/g, '_');

  useEffect(() => {
    setCurrentSrc(effectiveAvatar);
  }, [effectiveAvatar]);

  const handleError = () => {
    if (currentSrc !== AGENT_AVATAR_FALLBACK) {
      setCurrentSrc(AGENT_AVATAR_FALLBACK);
    }
  };

  // Dimensions for different sizes (compact, refined, and responsive)
  const sizeClasses = {
    xs: 'w-6 h-[27px]',
    sm: 'w-8 h-[36px] sm:w-8.5 sm:h-[38px]',
    md: 'w-10 h-[45px] sm:w-11 sm:h-[49px]',
    lg: 'w-13 h-[58px] sm:w-14 sm:h-[63px]',
    responsive: 'w-11 h-[49px] sm:w-12 sm:h-[53px] md:w-[52px] md:h-[58px]',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${sizeClasses} ${className}`}
    >
      {/* SVG Tooth Card Shape (Card Background, Glow & Border) */}
      <svg
        viewBox="0 0 100 108"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_4px_12px_rgba(30,58,138,0.20)] drop-shadow-[0_1px_3px_rgba(15,23,42,0.10)] transition-all duration-300 group-hover:drop-shadow-[0_8px_18px_rgba(37,99,235,0.32)]"
        aria-hidden="true"
      >
        <defs>
          {/* Card porcelain gradient background */}
          <linearGradient id={`toothCardBg_${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#eff6ff" />
          </linearGradient>

          {/* Elegant medical blue border gradient */}
          <linearGradient id={`toothBorder_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Clip path for inner image containment */}
          <clipPath id={`toothClip_${id}`}>
            <path d={TOOTH_PATH} />
          </clipPath>
        </defs>

        {/* Outer Tooth Card Body with Fill & Stroke */}
        <path
          d={TOOTH_PATH}
          fill={`url(#toothCardBg_${id})`}
          stroke={`url(#toothBorder_${id})`}
          strokeWidth="2.2"
          className="transition-colors duration-300"
        />

        {/* Subtle glossy enamel reflection highlight on top-left cusp */}
        <path
          d="M 23 11 C 15 11 9 19 8 29"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>

      {/* Fitted & Responsive Image Centered Inside the Tooth Card */}
      <div className="relative z-10 w-[84%] h-[78%] -mt-0.5 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <img
          src={currentSrc}
          onError={handleError}
          alt={alt}
          className={`w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-transform duration-300 ${
            isInteractive ? 'group-hover:scale-108' : ''
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Online Status Green Indicator at the top-right cusp */}
      {showOnlineDot && (
        <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 z-20 flex h-2.5 w-2.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1.5 ring-white shadow-xs" />
        </span>
      )}
    </div>
  );
};
