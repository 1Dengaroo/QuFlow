"use client";

import { useEffect, useRef } from "react";
import { useVisualizerStore } from "./use-visualizer";

export function useAutoplay() {
  const autoplay = useVisualizerStore((s) => s.autoplay);
  const isRunning = useVisualizerStore((s) => s.state.isRunning);
  const currentStep = useVisualizerStore((s) => s.state.currentStep);
  const stepsLength = useVisualizerStore((s) => s.steps.length);
  const stepForward = useVisualizerStore((s) => s.stepForward);
  const speed = useVisualizerStore((s) => s.speed);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoplay && isRunning && currentStep < stepsLength) {
      timeoutRef.current = setTimeout(() => {
        stepForward();
      }, speed);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoplay, isRunning, currentStep, stepsLength, stepForward, speed]);
}
