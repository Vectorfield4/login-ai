import type { FC } from "react";

interface IllustrationProps {
  primary: string;
  secondary: string;
}

export const DefaultIllustration: FC<IllustrationProps> = ({ primary, secondary }) => (
  <g
    fill="none"
    stroke={primary}
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.25"
  >
    <defs>
      <linearGradient id="default-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={secondary} stopOpacity="0.15" />
        <stop offset="100%" stopColor={primary} stopOpacity="0.05" />
      </linearGradient>
    </defs>

    <rect
      x="3"
      y="2.5"
      width="10"
      height="4"
      fill="url(#default-gradient)"
      rx="0.3"
      stroke={primary}
      strokeWidth="0.6"
      opacity="0.3"
    />

    <g strokeWidth="0.4" opacity="0.2">
      <line x1="4" y1="4" x2="12" y2="4" />
      <line x1="4" y1="5.2" x2="11" y2="5.2" />
      <line x1="4" y1="6.4" x2="10" y2="6.4" />
    </g>

    <g fill={primary} opacity="0.15">
      <circle cx="5" cy="3.6" r="0.12" />
      <circle cx="7" cy="4.8" r="0.1" />
      <circle cx="9" cy="3.2" r="0.08" />
      <circle cx="11" cy="5.8" r="0.08" />
    </g>

    <g stroke={primary} strokeWidth="0.3" opacity="0.1">
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="14" cy="7" r="1.2" />
      <circle cx="1" cy="7.5" r="1" />
    </g>
  </g>
);
