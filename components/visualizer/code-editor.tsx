"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVisualizerStore, CODE_EXAMPLES } from "@/hooks/use-visualizer";
import { Code2, Play, RotateCcw, BookOpen } from "lucide-react";
import { HighlightedEditor } from "./highlighted-editor";

export function CodeEditor() {
  const code = useVisualizerStore((s) => s.code);
  const setCode = useVisualizerStore((s) => s.setCode);
  const parseCode = useVisualizerStore((s) => s.parseCode);
  const reset = useVisualizerStore((s) => s.reset);
  const isRunning = useVisualizerStore((s) => s.state.isRunning);
  const currentStepData = useVisualizerStore((s) => s.currentStepData);

  const highlightRange =
    isRunning && currentStepData && "ast" in currentStepData
      ? { start: currentStepData.ast.start, end: currentStepData.ast.end }
      : null;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "var(--queue-blue-icon-bg)",
              color: "var(--queue-blue-text)",
            }}
          >
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold">Your Code</span>
          <Select
            disabled={isRunning}
            onValueChange={(value) => {
              const example = CODE_EXAMPLES.find((e) => e.name === value);
              if (example) setCode(example.code);
            }}
          >
            <SelectTrigger
              size="sm"
              className="ml-auto h-7 px-2.5 gap-1.5 text-xs font-medium rounded-lg w-auto"
              style={{
                borderColor: "var(--warm-border)",
                color: "var(--warm-muted)",
              }}
            >
              <BookOpen className="w-3 h-3" />
              <SelectValue placeholder="Examples" />
            </SelectTrigger>
            <SelectContent>
              {CODE_EXAMPLES.map((example) => (
                <SelectItem key={example.name} value={example.name}>
                  {example.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col pt-0">
        <div className="rounded-lg overflow-hidden bg-code-bg border border-code-border flex-1 flex flex-col min-h-[300px] sm:min-h-[360px] lg:min-h-[480px]">
          <div className="px-3 py-2 border-b border-code-header-border flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-traffic-red" />
              <div className="w-2.5 h-2.5 rounded-full bg-traffic-yellow" />
              <div className="w-2.5 h-2.5 rounded-full bg-traffic-green" />
            </div>
            <span className="text-muted-foreground text-xs ml-2 font-mono">
              script.js
            </span>
          </div>
          <HighlightedEditor
            value={code}
            onChange={setCode}
            highlightRange={highlightRange}
            readOnly={isRunning}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={parseCode}
            variant="primary"
            disabled={isRunning}
            className="flex-1 h-10 sm:h-11 rounded-lg font-semibold text-sm"
          >
            {isRunning ? (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:0.2s]" />
                <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:0.4s]" />
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1.5" />
                Run Code
              </>
            )}
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={reset}
                className="h-10 sm:h-11 px-4 rounded-lg font-semibold text-sm"
                style={{ borderColor: "var(--warm-border)" }}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reset</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}
