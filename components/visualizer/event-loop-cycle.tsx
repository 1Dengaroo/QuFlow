"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { LoopStage } from "./loop-stage";
import { FlowConnector } from "./flow-connector";
import { RefreshCw } from "lucide-react";

export function EventLoopCycle() {
  const state = useVisualizerStore((s) => s.state);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: "var(--loop-purple-bg)",
              color: "var(--loop-purple-text)",
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold">Event Loop Cycle</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-2 sm:py-3 px-1 sm:px-4">
          <LoopStage
            label="Call Stack"
            active={state.callStack.length > 0}
            color="blue"
            step={1}
          />
          <FlowConnector active={state.callStack.length > 0} />
          <LoopStage
            label="Microtasks"
            active={state.microtaskQueue.length > 0}
            color="purple"
            step={2}
          />
          <FlowConnector active={state.microtaskQueue.length > 0} />
          <LoopStage
            label="Tasks"
            active={state.taskQueue.length > 0}
            color="amber"
            step={3}
          />
          <FlowConnector active={false} />
          <LoopStage label="Render" active={false} color="emerald" step={4} />
        </div>
      </CardContent>
    </Card>
  );
}
