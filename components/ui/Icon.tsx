import type { SVGProps } from "react";

/** Line icon set, 24px grid, 1.5px stroke. */
const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  chat: <path d="M4 20l1.5-4A8 8 0 1112 20a8 8 0 01-3.6-.9L4 20z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.5v.01M12 16v-3.2a2.3 2.3 0 014.6 0V16M12 10.5V16" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.01" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5.5v13l10-6.5-10-6.5z" />,

  // Service pillars
  performance: (
    <>
      <path d="M3 17l5.5-5.5 4 4L21 7" />
      <path d="M15 7h6v6" />
    </>
  ),
  programmatic: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="4.5" cy="6" r="1.8" />
      <circle cx="19.5" cy="6" r="1.8" />
      <circle cx="4.5" cy="18" r="1.8" />
      <circle cx="19.5" cy="18" r="1.8" />
      <path d="M6 7.2l4 3.3M18 7.2l-4 3.3M6 16.8l4-3.3M18 16.8l-4-3.3" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3M12 7v6M9.5 10.5L12 13l2.5-2.5" />
    </>
  ),
  retail: (
    <>
      <path d="M4 7h16l-1.5 11a2 2 0 01-2 1.7h-9a2 2 0 01-2-1.7L4 7z" />
      <path d="M8.5 10V6a3.5 3.5 0 017 0v4" />
    </>
  ),
  ott: (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2" />
      <path d="M8 20.5h8M10.5 8.5v5l4-2.5-4-2.5z" />
    </>
  ),
  measurement: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <circle cx="16" cy="9" r="2" />
    </>
  ),

  // Industries
  fintech: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6.5 14.5h4" />
    </>
  ),
  gaming: (
    <>
      <path d="M7 8h10a4.5 4.5 0 014.4 5.4l-.7 3.3a2.3 2.3 0 01-4 1l-1.9-2.2H9.2l-1.9 2.2a2.3 2.3 0 01-4-1l-.7-3.3A4.5 4.5 0 017 8z" />
      <path d="M8 11v3M6.5 12.5h3M15.5 12h.01M17.5 13.5h.01" />
    </>
  ),
  ecommerce: (
    <>
      <path d="M3 4h2.5l2 11h11l2-8H7" />
      <circle cx="9.5" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </>
  ),

  // Principles / misc
  connect: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7M7.2 8.2l3.6 7.6M16.8 8.2l-3.6 7.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  wave: <path d="M2 14c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3M2 19c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3M12 3l2 5h-4l2-5z" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
