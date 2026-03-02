export interface ThemeDefinition {
  /** Unique ID used as the data-theme attribute value */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Short description for UI tooltip/label */
  description: string;
  /** Whether this theme is dark (controls .dark class for Tailwind dark: variant) */
  isDark: boolean;
  /** Preview swatch colors for the theme picker UI [bg, primary, accent] */
  previewColors: [string, string, string];
}

export const themes: ThemeDefinition[] = [
  {
    id: "light",
    name: "Light",
    description: "Warm educational theme with soft tones",
    isDark: false,
    previewColors: ["#faf9f7", "#4a7cdb", "#8b5cf6"],
  },
  {
    id: "dark",
    name: "Dark",
    description: "Easy on the eyes for late-night coding",
    isDark: true,
    previewColors: ["#1a1a1a", "#5a8cec", "#a78bfa"],
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep navy with vibrant accents",
    isDark: true,
    previewColors: ["#0f0f1a", "#6699ff", "#a78bfa"],
  },
  {
    id: "sakura",
    name: "Sakura",
    description: "Cherry blossom warmth with parchment tones",
    isDark: false,
    previewColors: ["#fdf6f0", "#d4708f", "#8b5e83"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon-soaked void with electric accents",
    isDark: true,
    previewColors: ["#08080c", "#00e5ff", "#ff2eaa"],
  },
  {
    id: "thermal",
    name: "Thermal",
    description: "Infrared heat vision — cold violet to scorching orange",
    isDark: true,
    previewColors: ["#05020a", "#ff8c20", "#40ff80"],
  },
  {
    id: "noir",
    name: "Noir",
    description: "1940s film noir — silver, smoke, and one crimson accent",
    isDark: true,
    previewColors: ["#0e0e0e", "#c41030", "#b0b0b0"],
  },
  {
    id: "solaris",
    name: "Solaris",
    description: "Golden-hour sunlight on sandstone",
    isDark: false,
    previewColors: ["#faf3e6", "#c47a20", "#a85c32"],
  },
  {
    id: "arctic",
    name: "Arctic",
    description: "Crystalline ice and glacier blue precision",
    isDark: false,
    previewColors: ["#f0f4f8", "#2e7cc9", "#7854b8"],
  },
  {
    id: "moss",
    name: "Moss",
    description: "Deep forest floor — bark, fern, and lichen",
    isDark: true,
    previewColors: ["#0e120c", "#68a060", "#b8a848"],
  },
  {
    id: "brutal",
    name: "Brutal",
    description: "Pure reduction — black, white, one red accent, zero ornament",
    isDark: false,
    previewColors: ["#ffffff", "#dd0000", "#000000"],
  },
  {
    id: "candy",
    name: "Candy",
    description: "Bubblegum pink, lavender, and lemon — pure toy-store fun",
    isDark: false,
    previewColors: ["#f0e8ff", "#e84090", "#8050d8"],
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Polished volcanic glass with brushed-gold accents",
    isDark: true,
    previewColors: ["#0c0b0a", "#c8a050", "#a08868"],
  },
];

export const themeIds = themes.map((t) => t.id);

export const darkThemeIds = themes.filter((t) => t.isDark).map((t) => t.id);

export function getThemeDefinition(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
