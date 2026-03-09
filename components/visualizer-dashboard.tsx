"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useAutoplay } from "@/hooks/use-autoplay";
import { Layers, Globe, Clock, Zap, MonitorPlay } from "lucide-react";
import {
  DashboardHeader,
  CodeEditor,
  StepControls,
  ConsoleOutput,
  EventLoopCycle,
  ExecutionTimeline,
  QueueCard,
} from "@/components/visualizer";

export function VisualizerDashboard() {
  const state = useVisualizerStore((s) => s.state);
  const error = useVisualizerStore((s) => s.error);

  useKeyboardShortcuts();
  useAutoplay();

  return (
    <div
      className="min-h-screen font-[var(--font-dm-sans)]"
      style={{ background: "var(--warm-bg-gradient)" }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-8 pb-40 lg:pb-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr] gap-3 lg:gap-4">
          {/* Code editor — full width on mobile, left column on desktop */}
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-3">
            <CodeEditor />
          </div>

          {/* Queue cards — 2-col on tablet, right 2 cols on desktop */}
          <QueueCard
            title="Call Stack"
            subtitle="LIFO"
            items={[...state.callStack].reverse()}
            color="blue"
            emptyText="Stack is empty"
            icon={<Layers className="w-4 h-4" />}
          />
          <QueueCard
            title="Web APIs"
            subtitle="Browser"
            items={state.webApis.map((a) => a.value)}
            color="amber"
            emptyText="No active timers"
            icon={<Globe className="w-4 h-4" />}
          />

          <QueueCard
            title="Task Queue"
            subtitle="Macrotasks"
            items={state.taskQueue}
            color="orange"
            emptyText="Queue is empty"
            icon={<Clock className="w-4 h-4" />}
          />
          <QueueCard
            title="Microtask Queue"
            subtitle="Promises"
            items={state.microtaskQueue}
            color="purple"
            emptyText="Queue is empty"
            icon={<Zap className="w-4 h-4" />}
          />

          <QueueCard
            title="rAF Queue"
            subtitle="Animation"
            items={state.rafQueue}
            color="emerald"
            emptyText="No pending frames"
            icon={<MonitorPlay className="w-4 h-4" />}
          />
          <ConsoleOutput />

          {/* Event loop cycle + timeline — span right 2 cols on desktop */}
          <div className="sm:col-span-2 lg:col-start-2 lg:col-span-2">
            <EventLoopCycle />
          </div>
          <div className="sm:col-span-2 lg:col-start-2 lg:col-span-2">
            <ExecutionTimeline />
          </div>

          {error && (
            <Card className="sm:col-span-2 lg:col-span-3 border-destructive/50 bg-destructive/10">
              <CardContent className="pt-4">
                <p className="text-destructive text-sm font-medium">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <footer
          className="text-center text-xs py-6 mt-8 hidden lg:block"
          style={{ color: "var(--warm-muted)" }}
        >
          Built by{" "}
          <a
            href="https://andydeng.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 transition-colors hover:text-[var(--accent-purple)]"
            style={{ color: "var(--warm-text)" }}
          >
            Andy Deng
          </a>
        </footer>
      </div>

      <StepControls />
    </div>
  );
}
