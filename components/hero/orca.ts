/** Stylised side-view orca, drawn in a 200 x 100 box facing right. */
export const ORCA_BODY =
  "M22 58 C40 40 75 32 96 31 L108 4 C111 2 113 3 113 6 L118 31 C150 32 176 36 189 48 C197 56 191 64 180 66 C160 72 130 76 95 76 C70 76 45 70 26 64 L8 76 C6 77 4 75 5 73 L14 60 L5 47 C4 45 6 43 8 44 Z";
export const ORCA_FIN = "M100 74 L92 92 C91 95 95 95 97 93 L112 75 Z";
/** Signature white markings: eye patch, saddle and belly (rendered as gaps). */
export const ORCA_PATCHES =
  "M141 44 C149 38 163 39 168 45 C161 50 149 50 141 44 Z M118 70 C140 66 165 63 183 64 C170 71 144 75 118 70 Z M98 35 C104 33 116 33 122 36 C114 40 104 40 98 35 Z";

/** The pod: three orcas, positioned in a 0–1 unit space (x, y, scale). */
export const POD = [
  { x: 0.04, y: 0.34, s: 0.72 },
  { x: 0.46, y: 0.06, s: 0.42 },
  { x: 0.56, y: 0.74, s: 0.34 },
] as const;
