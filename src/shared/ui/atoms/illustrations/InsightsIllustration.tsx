import type { FC } from "react";

interface IllustrationProps {
  primary: string;
  secondary: string;
}

export const InsightsIllustration: FC<IllustrationProps> = ({ primary, secondary }) => (
  <g fill="none" stroke={primary} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="insights-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={secondary} stopOpacity="0.3" />
        <stop offset="100%" stopColor={primary} stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <rect x="2.5" y="5.8" width="1.6" height="2.2" fill="url(#insights-gradient)" rx="0.15" />
    <rect x="5" y="4.5" width="1.6" height="3.5" fill="url(#insights-gradient)" rx="0.15" />
    <rect x="7.5" y="3.2" width="1.6" height="4.8" fill="url(#insights-gradient)" rx="0.15" />
    <rect x="10" y="4.8" width="1.6" height="3.2" fill="url(#insights-gradient)" rx="0.15" />
    <rect x="12.5" y="5.5" width="1.6" height="2.5" fill="url(#insights-gradient)" rx="0.15" />

    <path
      d="M3.3 6.9 L5.8 5.5 L8.3 3.8 L10.8 5.2 L13.3 5.8"
      stroke={primary}
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />

    <circle cx="3.3" cy="6.9" r="0.35" fill={primary} opacity="0.9" />
    <circle cx="5.8" cy="5.5" r="0.35" fill={primary} opacity="0.9" />
    <circle cx="8.3" cy="3.8" r="0.35" fill={primary} opacity="0.9" />
    <circle cx="10.8" cy="5.2" r="0.35" fill={primary} opacity="0.9" />
    <circle cx="13.3" cy="5.8" r="0.35" fill={primary} opacity="0.9" />

    <g stroke={primary} strokeWidth="0.5" opacity="0.15">
      <line x1="1" y1="6.5" x2="15" y2="6.5" />
      <line x1="1" y1="4.5" x2="15" y2="4.5" />
      <line x1="1" y1="2.5" x2="15" y2="2.5" />
    </g>
  </g>
);
