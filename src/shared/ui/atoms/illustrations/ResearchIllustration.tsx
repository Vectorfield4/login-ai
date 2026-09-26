import type { FC } from "react";

interface IllustrationProps {
  primary: string;
  secondary: string;
}

export const ResearchIllustration: FC<IllustrationProps> = ({ primary, secondary }) => (
  <g fill="none" stroke={primary} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <radialGradient id="research-glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor={primary} stopOpacity="0.2" />
        <stop offset="100%" stopColor={secondary} stopOpacity="0.05" />
      </radialGradient>
    </defs>

    <circle
      cx="8"
      cy="4.5"
      r="3.2"
      fill="url(#research-glow)"
      stroke={primary}
      strokeWidth="0.6"
      opacity="0.4"
    />
    <circle cx="8" cy="4.5" r="2.2" stroke={primary} strokeWidth="1" opacity="0.6" />
    <circle cx="8" cy="4.5" r="1.2" stroke={primary} strokeWidth="0.8" opacity="0.4" />

    <path
      d="M8 1.3 V 3.3 M8 5.7 V 7.7 M5.3 4.5 H 3.3 M10.7 4.5 H 12.7"
      stroke={primary}
      strokeWidth="1"
      opacity="0.7"
    />

    <g stroke={primary} strokeWidth="0.5" opacity="0.3">
      <line x1="5.5" y1="2.5" x2="10.5" y2="2.5" />
      <line x1="5" y1="3.5" x2="11" y2="3.5" />
      <line x1="4.5" y1="5.5" x2="11.5" y2="5.5" />
      <line x1="5" y1="6.5" x2="11" y2="6.5" />
    </g>

    <circle cx="6.8" cy="3.8" r="0.25" fill={primary} opacity="0.8" />
    <circle cx="9.2" cy="3.8" r="0.25" fill={primary} opacity="0.8" />
    <circle cx="6.5" cy="5.2" r="0.2" fill={primary} opacity="0.5" />
    <circle cx="9.5" cy="5.2" r="0.2" fill={primary} opacity="0.5" />
    <circle cx="8" cy="6" r="0.15" fill={primary} opacity="0.4" />

    <path
      d="M11.5 1.5 L13.5 0.5 L14.5 1.5"
      stroke={primary}
      strokeWidth="0.8"
      fill="none"
      opacity="0.5"
    />
    <circle cx="13" cy="1" r="0.4" fill="none" stroke={primary} strokeWidth="0.5" opacity="0.4" />
  </g>
);
