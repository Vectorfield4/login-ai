import type { FC } from "react";

interface IllustrationProps {
  primary: string;
  secondary: string;
}

export const ProductIllustration: FC<IllustrationProps> = ({ primary, secondary }) => (
  <g fill="none" stroke={primary} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="product-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={secondary} stopOpacity="0.25" />
        <stop offset="100%" stopColor={primary} stopOpacity="0.1" />
      </linearGradient>
    </defs>

    <rect
      x="5"
      y="3"
      width="6"
      height="4"
      fill="url(#product-gradient)"
      rx="0.4"
      stroke={primary}
      strokeWidth="0.9"
    />

    <path
      d="M8 2.5 V 3 M8 7 V 8 M4.5 5 H 5 M13 5 H 13.5"
      stroke={primary}
      strokeWidth="1"
      opacity="0.6"
    />

    <rect x="6.5" y="3.8" width="1.2" height="1.2" fill={primary} opacity="0.2" rx="0.15" />
    <rect x="8.3" y="3.8" width="1.2" height="1.2" fill={primary} opacity="0.15" rx="0.15" />
    <rect x="10.1" y="3.8" width="1.2" height="1.2" fill={primary} opacity="0.1" rx="0.15" />

    <path
      d="M11.5 5.5 L13 4 L14.5 5.5"
      stroke={primary}
      strokeWidth="1.2"
      fill="none"
      opacity="0.8"
    />
    <path
      d="M11.5 5.5 L10 4 L8.5 5.5"
      stroke={primary}
      strokeWidth="0.6"
      fill="none"
      opacity="0.3"
      strokeDasharray="2 2"
    />

    <g stroke={primary} strokeWidth="0.4" opacity="0.15">
      <circle cx="4" cy="6" r="0.8" />
      <circle cx="12" cy="3" r="0.6" />
      <circle cx="13.5" cy="7.5" r="0.5" />
    </g>

    <g fill={primary} opacity="0.6">
      <circle cx="3.5" cy="5.5" r="0.15" />
      <circle cx="12.5" cy="2.7" r="0.12" />
      <circle cx="14" cy="7.2" r="0.1" />
      <circle cx="4.5" cy="6.8" r="0.08" />
      <circle cx="11.5" cy="3.3" r="0.08" />
    </g>
  </g>
);
