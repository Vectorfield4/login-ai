import type { FC } from "react";

interface IllustrationProps {
  primary: string;
  secondary: string;
}

export const CaseStudyIllustration: FC<IllustrationProps> = ({ primary, secondary }) => (
  <g fill="none" stroke={primary} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="case-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={secondary} stopOpacity="0.25" />
        <stop offset="100%" stopColor={primary} stopOpacity="0.1" />
      </linearGradient>
    </defs>

    <rect
      x="3"
      y="5.2"
      width="3.5"
      height="2.8"
      fill="url(#case-gradient)"
      rx="0.2"
      stroke={primary}
      strokeWidth="0.8"
    />
    <rect
      x="9.5"
      y="5.2"
      width="3.5"
      height="2.8"
      fill="url(#case-gradient)"
      rx="0.2"
      stroke={primary}
      strokeWidth="0.8"
    />

    <rect
      x="5.5"
      y="2.5"
      width="5"
      height="2.5"
      fill="url(#case-gradient)"
      rx="0.2"
      stroke={primary}
      strokeWidth="0.8"
    />

    <path
      d="M4.75 5.2 V 3.5"
      stroke={primary}
      strokeWidth="0.7"
      strokeDasharray="2 2"
      opacity="0.5"
    />
    <path
      d="M11.25 5.2 V 3.5"
      stroke={primary}
      strokeWidth="0.7"
      strokeDasharray="2 2"
      opacity="0.5"
    />
    <path
      d="M6.75 2.5 V 1"
      stroke={primary}
      strokeWidth="0.7"
      strokeDasharray="2 2"
      opacity="0.5"
    />

    <circle cx="4.75" cy="3.5" r="0.3" fill={primary} opacity="0.6" />
    <circle cx="11.25" cy="3.5" r="0.3" fill={primary} opacity="0.6" />
    <circle cx="6.75" cy="1" r="0.3" fill={primary} opacity="0.6" />

    <rect x="6.5" y="3.2" width="2" height="0.8" fill={primary} opacity="0.3" rx="0.1" />
    <rect x="6.5" y="4.3" width="3" height="0.8" fill={primary} opacity="0.2" rx="0.1" />

    <g stroke={primary} strokeWidth="0.4" opacity="0.1">
      <line x1="2" y1="7.5" x2="14" y2="7.5" />
      <line x1="2" y1="1.5" x2="14" y2="1.5" />
    </g>
  </g>
);
