"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { Terminal } from "lucide-react";

export function ConsoleOutput() {
  const consoleLogs = useVisualizerStore((s) => s.state.console);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = consoleRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [consoleLogs.length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-10 h-10 rounded-xl bg-queue-emerald-icon-bg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-queue-emerald-text" />
          </div>
          Console Output
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={consoleRef}
          className="rounded-2xl p-5 h-[220px] overflow-auto bg-code-bg"
          style={{ fontFamily: "var(--font-source-code), monospace" }}
        >
          {consoleLogs.length === 0 ? (
            <span className="text-muted-foreground text-base">
              // Output appears here...
            </span>
          ) : (
            consoleLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 py-1.5">
                <span className="text-console-prompt text-lg">›</span>
                <span className="text-code-text text-base">{log}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
