"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";

function ThemeSwatch({ colors }: { colors: [string, string, string] }) {
  return (
    <div className="flex gap-1">
      {colors.map((color, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full border border-border/50"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

export function ThemePicker() {
  const { current, themes, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="h-10 px-4 rounded-xl text-sm font-medium"
        style={{
          borderColor: "var(--warm-border)",
          color: "var(--warm-text)",
        }}
      >
        <Palette className="w-4 h-4 mr-2" />
        Theme
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 rounded-xl text-sm font-medium"
          style={{
            borderColor: "var(--warm-border)",
            color: "var(--warm-text)",
          }}
        >
          <Palette className="w-4 h-4 mr-2" />
          {current?.name ?? "Theme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="flex items-center justify-between cursor-pointer py-2.5"
          >
            <div className="flex items-center gap-3">
              <ThemeSwatch colors={theme.previewColors} />
              <div>
                <div className="text-sm font-medium">{theme.name}</div>
                <div className="text-xs text-muted-foreground">
                  {theme.description}
                </div>
              </div>
            </div>
            {current?.id === theme.id && (
              <Check className="w-4 h-4 text-[var(--accent-blue)]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
