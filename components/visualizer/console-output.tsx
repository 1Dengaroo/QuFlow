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
    <Card className="border-t-[3px] border-t-queue-emerald-text overflow-hidden">
      <CardHeader className="pb-2 pt-3 sm:pt-4">
        <CardTitle className="text-xs">
          <div className="w-6 h-6 rounded-md bg-queue-emerald-icon-bg flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-queue-emerald-text" />
          </div>
          <span className="text-sm font-semibold">Console</span>
          {consoleLogs.length > 0 && (
            <span className="bg-queue-emerald-bg text-queue-emerald-text text-xs font-bold px-2 py-0.5 rounded-md tabular-nums ml-auto">
              {consoleLogs.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3 sm:pb-4 pt-0">
        <div
          ref={consoleRef}
          className="rounded-lg p-3 h-[160px] sm:h-[200px] overflow-auto bg-code-bg border border-code-border"
          style={{ fontFamily: "var(--font-source-code), monospace" }}
        >
          {consoleLogs.length === 0 ? (
            <span className="text-muted-foreground text-xs">
              {"// Output appears here..."}
            </span>
          ) : (
            consoleLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-1">
                <span className="text-console-prompt text-xs select-none shrink-0 tabular-nums w-4 text-right opacity-50">
                  {i + 1}
                </span>
                <span className="text-code-text text-xs">{log}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
