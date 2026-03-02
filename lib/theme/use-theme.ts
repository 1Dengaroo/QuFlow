"use client";

import { useTheme as useNextTheme } from "next-themes";
import {
  getThemeDefinition,
  themes,
  type ThemeDefinition,
} from "./theme-registry";

export function useTheme() {
  const nextTheme = useNextTheme();

  const current: ThemeDefinition | undefined = nextTheme.resolvedTheme
    ? getThemeDefinition(nextTheme.resolvedTheme)
    : undefined;

  return {
    /** The active theme's full definition */
    current,
    /** The active theme ID string */
    themeId: nextTheme.resolvedTheme,
    /** All available theme definitions */
    themes,
    /** Set the active theme by ID */
    setTheme: nextTheme.setTheme,
    /** Whether the active theme is dark */
    isDark: current?.isDark ?? false,
  };
}
