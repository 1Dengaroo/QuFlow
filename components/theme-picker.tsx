"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/lib/theme/use-theme";

const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";

export function ThemePicker() {
  const { isDark, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getTrue, getFalse);

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
        style={{ color: "var(--warm-muted)" }}
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--muted)]"
          style={{ color: "var(--warm-muted)" }}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {isDark ? "Light mode" : "Dark mode"}
      </TooltipContent>
    </Tooltip>
  );
}
