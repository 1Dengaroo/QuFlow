"use client";

import { useVisualizerStore } from "@/hooks/use-visualizer";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CircleCheckBig,
} from "lucide-react";

const SPEED_PRESETS = [
  { label: "0.5x", ms: 3000 },
  { label: "1x", ms: 1500 },
  { label: "2x", ms: 750 },
  { label: "3x", ms: 500 },
] as const;

export function StepControls() {
  const state = useVisualizerStore((s) => s.state);
  const steps = useVisualizerStore((s) => s.steps);
  const autoplay = useVisualizerStore((s) => s.autoplay);
  const setAutoplay = useVisualizerStore((s) => s.setAutoplay);
  const toggleAutoplay = useVisualizerStore((s) => s.toggleAutoplay);
  const stepForward = useVisualizerStore((s) => s.stepForward);
  const stepBackward = useVisualizerStore((s) => s.stepBackward);
  const isCompleted = useVisualizerStore((s) => s.isCompleted);
  const currentStepData = useVisualizerStore((s) => s.currentStepData);
  const speed = useVisualizerStore((s) => s.speed);
  const setSpeed = useVisualizerStore((s) => s.setSpeed);

  const atEnd = !steps.length || state.currentStep >= steps.length;
  const hasSteps = steps.length > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[480px] px-3 sm:px-5 pb-3 sm:pb-5 pointer-events-auto">
        <div
          className="backdrop-blur-xl border rounded-xl shadow-xl overflow-hidden border-t-[3px]"
          style={{
            background: "color-mix(in srgb, var(--warm-card) 95%, transparent)",
            borderColor: "var(--warm-border)",
            borderTopColor: "var(--accent-purple)",
          }}
        >
          <div className="px-3 sm:px-4 lg:px-5 py-2.5 lg:py-3">
            {hasSteps && (
              <div className="mb-2 flex items-center gap-2 min-h-[20px]">
                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-step-push-text">
                    <CircleCheckBig className="w-3.5 h-3.5 shrink-0" />
                    Complete — {steps.length} steps
                  </div>
                ) : currentStepData ? (
                  <div
                    className="text-xs truncate"
                    style={{ fontFamily: "var(--font-source-code), monospace" }}
                  >
                    <span className="text-[var(--accent-purple)] font-semibold">
                      {currentStepData.type}
                    </span>
                    {"queue" in currentStepData && (
                      <span className="text-[var(--accent-blue)] ml-1.5">
                        → {currentStepData.queue}
                      </span>
                    )}
                    {"value" in currentStepData && (
                      <span className="text-[var(--warm-muted)] ml-1.5">
                        {currentStepData.value}
                      </span>
                    )}
                  </div>
                ) : null}

                <span
                  className="font-mono text-xs tabular-nums shrink-0 ml-auto"
                  style={{ color: "var(--warm-muted)" }}
                >
                  {state.currentStep}/{steps.length}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setAutoplay(false);
                        stepBackward();
                      }}
                      disabled={state.currentStep <= 0}
                      className="h-10 w-10 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                      style={{
                        background: "var(--muted)",
                        color: "var(--warm-text)",
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Previous step</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleAutoplay}
                      disabled={atEnd}
                      className="h-12 w-12 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                      style={{
                        background: autoplay
                          ? "var(--warm-border)"
                          : "var(--btn-primary)",
                        color: autoplay ? "var(--warm-text)" : "white",
                      }}
                    >
                      {autoplay ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {autoplay ? "Pause" : "Play"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setAutoplay(false);
                        stepForward();
                      }}
                      disabled={atEnd}
                      className="h-10 w-10 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                      style={{
                        background: "var(--btn-success)",
                        color: "white",
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Next step</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex gap-1 ml-auto">
                {SPEED_PRESETS.map((preset) => (
                  <button
                    key={preset.ms}
                    onClick={() => setSpeed(preset.ms)}
                    className="h-7 sm:h-6 px-2 rounded-md text-[11px] font-semibold transition-colors"
                    style={{
                      background:
                        speed === preset.ms
                          ? "var(--accent-purple)"
                          : "var(--muted)",
                      color:
                        speed === preset.ms
                          ? "white"
                          : "var(--muted-foreground)",
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
