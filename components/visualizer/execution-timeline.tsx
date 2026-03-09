"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { List } from "lucide-react";

export function ExecutionTimeline() {
  const state = useVisualizerStore((s) => s.state);
  const steps = useVisualizerStore((s) => s.steps);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = timelineRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']",
    ) as HTMLElement | null;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [state.currentStep]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: "var(--step-neutral-bg)",
                color: "var(--step-neutral-text)",
              }}
            >
              <List className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-semibold">Timeline</span>
          </div>
          <Badge
            variant="outline"
            className="font-mono text-[11px] px-2 py-0.5"
          >
            {state.currentStep} steps
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea ref={timelineRef} className="h-[200px] sm:h-[240px]">
          {state.currentStep === 0 ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[240px] text-muted-foreground">
              <p className="text-xs">Press play to begin execution</p>
            </div>
          ) : (
            <div className="space-y-1 pr-3">
              {steps.slice(0, state.currentStep).map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs"
                  style={{
                    background:
                      i === state.currentStep - 1
                        ? "var(--step-highlight-bg)"
                        : "transparent",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 tabular-nums"
                    style={{
                      background:
                        step.type === "push"
                          ? "var(--step-push-bg)"
                          : step.type === "pop" || step.type === "shift"
                            ? "var(--step-pop-bg)"
                            : "var(--step-neutral-bg)",
                      color:
                        step.type === "push"
                          ? "var(--step-push-text)"
                          : step.type === "pop" || step.type === "shift"
                            ? "var(--step-pop-text)"
                            : "var(--step-neutral-text)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-semibold shrink-0 text-[11px] ${
                      step.type === "push"
                        ? "text-step-push-text"
                        : step.type === "pop" || step.type === "shift"
                          ? "text-step-pop-text"
                          : "text-step-neutral-text"
                    }`}
                  >
                    {step.type}
                  </span>
                  {"queue" in step && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 shrink-0 h-4"
                    >
                      {step.queue}
                    </Badge>
                  )}
                  {"value" in step && (
                    <span
                      className="text-muted-foreground text-[11px] truncate"
                      style={{
                        fontFamily: "var(--font-source-code), monospace",
                      }}
                    >
                      {step.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
