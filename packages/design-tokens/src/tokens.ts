export const lgoColors = {
  spiritCyan: "#31d8e8",
  warmGold: "#f5c86b",
  jadeTeal: "#35c6a3",
  shadowPurple: "#7a4bd9",
  darkNavy: "#07111f",
  nightPanel: "#0d1b2e",
  mistText: "#d7e8f5",
  mutedText: "#91a8bb",
  danger: "#b654e8"
} as const;

export const lgoTypography = {
  sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: '"Be Vietnam Pro", Inter, ui-sans-serif, system-ui, sans-serif'
} as const;

export const lgoSpacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "4rem"
} as const;

export const lgoRadius = {
  sm: "0.5rem",
  md: "0.875rem",
  lg: "1.25rem",
  xl: "1.75rem",
  pill: "999px"
} as const;

export const lgoShadows = {
  panel: "0 24px 80px rgba(0, 0, 0, 0.36)",
  spiritGlow: "0 0 42px rgba(49, 216, 232, 0.28)",
  goldGlow: "0 0 32px rgba(245, 200, 107, 0.24)",
  warningAura: "0 0 32px rgba(122, 75, 217, 0.32)"
} as const;

export const lgoMotion = {
  instant: "80ms",
  fast: "160ms",
  normal: "240ms",
  slow: "420ms"
} as const;

export const lgoBreakpoints = {
  mobile: "360px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px"
} as const;

export const lgoZIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 40,
  toast: 50
} as const;

export const lgoDesignDirection = {
  theme: "Vietnamese spiritual fantasy",
  gameFeel: "friendly online RPG",
  motifs: ["cultivation", "talisman", "spirit gate"],
  rules: ["readable before ornamental", "not SaaS dashboard", "not cyberpunk", "not western medieval generic"],
  reservedWarningColor: "shadow purple"
} as const;
