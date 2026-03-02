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
      <div className="w-full px-8 py-10">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-6">
          <CodeEditor />

          {/* Queue row 1 */}
          <QueueCard
            title="Call Stack"
            subtitle="LIFO - Last In, First Out"
            items={[...state.callStack].reverse()}
            color="blue"
            emptyText="Stack is empty"
            icon={<Layers className="w-5 h-5" />}
          />
          <QueueCard
            title="Web APIs"
            subtitle="Browser environment"
            items={state.webApis.map((a) => a.value)}
            color="amber"
            emptyText="No active timers"
            icon={<Globe className="w-5 h-5" />}
          />

          {/* Queue row 2 */}
          <QueueCard
            title="Task Queue"
            subtitle="setTimeout, setInterval"
            items={state.taskQueue}
            color="orange"
            emptyText="Queue is empty"
            icon={<Clock className="w-5 h-5" />}
          />
          <QueueCard
            title="Microtask Queue"
            subtitle="Promises, queueMicrotask"
            items={state.microtaskQueue}
            color="purple"
            emptyText="Queue is empty"
            icon={<Zap className="w-5 h-5" />}
          />

          {/* Queue row 3 */}
          <QueueCard
            title="rAF Queue"
            subtitle="requestAnimationFrame"
            items={state.rafQueue}
            color="emerald"
            emptyText="No pending frames"
            icon={<MonitorPlay className="w-5 h-5" />}
          />
          <ConsoleOutput />

          <StepControls />
          <EventLoopCycle />
          <ExecutionTimeline />

          {error && (
            <Card className="lg:col-span-3 border-destructive/30 bg-destructive/10">
              <CardContent className="pt-4">
                <p className="text-destructive text-sm">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <footer
          className="text-center text-sm py-8 mt-10"
          style={{ color: "var(--warm-muted)" }}
        >
          Built by{" "}
          <a
            href="https://andydeng.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 transition-colors hover:text-[var(--accent-blue)]"
            style={{ color: "var(--warm-text)" }}
          >
            Andy Deng
          </a>
        </footer>
      </div>
    </div>
  );
}
