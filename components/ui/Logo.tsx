/**
 * Placeholder brand mark: a stylised orca dorsal fin rising from a wave.
 * Replace with the client's approved logo when supplied.
 */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#19C8F2" />
          <stop offset="0.6" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#FF7A70" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9" stroke="url(#logo-g)" strokeWidth="1.5" />
      <path d="M11 21.5C13.5 16 15.5 10.5 21 7c-1 5-1.2 9.5.5 14.5H11z" fill="url(#logo-g)" />
      <path d="M6 23.5c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6" stroke="#8BE9FA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-[19px] font-semibold tracking-tight text-ice">
        Orca<span className="text-cyan">Verse</span>
      </span>
    </span>
  );
}
