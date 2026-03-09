"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemePicker } from "@/components/theme-picker";
import { CircleHelp, BookMarked, TriangleAlert } from "lucide-react";
import { ResourceLink } from "./resource-link";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between gap-3 mb-4 lg:mb-6">
      <div className="min-w-0">
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--warm-text)" }}
        >
          Qu<span style={{ color: "var(--accent-purple)" }}>Flow</span>
        </h1>
        <p
          style={{ color: "var(--warm-muted)" }}
          className="text-xs sm:text-sm mt-0.5"
        >
          JavaScript event loop, visualized
        </p>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <ThemePicker />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-[var(--warm-muted)] hover:text-[var(--warm-text)]"
              title="Resources"
            >
              <BookMarked className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle
                className="text-lg"
                style={{ color: "var(--warm-text)" }}
              >
                Resources
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2" style={{ color: "var(--warm-muted)" }}>
              <p className="text-xs mb-3">
                Resources that helped me understand the event loop.
              </p>
              <ResourceLink
                href="https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=1476s"
                icon="▶"
                iconBg="var(--step-pop-bg)"
                iconColor="var(--step-pop-text)"
                title="What the heck is the event loop anyway?"
                subtitle="Philip Roberts — JSConf EU"
              />
              <ResourceLink
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
                icon="MDN"
                iconBg="var(--step-push-bg)"
                iconColor="var(--step-push-text)"
                title="JavaScript Execution Model"
                subtitle="MDN Web Docs"
              />
              <ResourceLink
                href="https://jsflow.info/"
                icon="JS"
                iconBg="var(--step-neutral-bg)"
                iconColor="var(--step-neutral-text)"
                title="JSFlow"
                subtitle="Interactive JS execution visualizer"
              />
              <ResourceLink
                href="https://github.com/vault-developer/event-loop-explorer/tree/master"
                icon="</>"
                iconBg="var(--queue-purple-bg)"
                iconColor="var(--queue-purple-text)"
                title="Event Loop Explorer"
                subtitle="AST-based event loop analysis"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-[var(--warm-muted)] hover:text-[var(--warm-text)]"
              title="About"
            >
              <CircleHelp className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle
                className="text-lg"
                style={{ color: "var(--warm-text)" }}
              >
                Why did I make this?
              </DialogTitle>
            </DialogHeader>
            <div
              className="text-sm space-y-3 leading-relaxed"
              style={{ color: "var(--warm-muted)" }}
            >
              <p>
                Although I&apos;ve been working professionally as a developer
                for some time now, I found my understanding of the JavaScript
                event loop had gaps.
              </p>
              <p>
                I couldn&apos;t explain why certain code snippets behaved the
                way they did, (like setTimeout with 0 delay still runs after
                promises), or why, despite JavaScript being single-threaded, we
                can still do things concurrently.
              </p>
              <p>
                I built this tool to help me solidify these concepts, as I
                believe that building is the best way to learn.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-[var(--warm-muted)] hover:text-[var(--warm-text)]"
              title="Limitations"
            >
              <TriangleAlert className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle
                className="text-lg"
                style={{ color: "var(--warm-text)" }}
              >
                Limitations
              </DialogTitle>
            </DialogHeader>
            <div
              className="text-sm space-y-3 leading-relaxed"
              style={{ color: "var(--warm-muted)" }}
            >
              <p>
                This is a simplified educational model, not a full JS runtime.
                It supports{" "}
                <code className="text-xs px-1.5 py-0.5 rounded-md bg-muted font-mono">
                  console.log
                </code>
                ,{" "}
                <code className="text-xs px-1.5 py-0.5 rounded-md bg-muted font-mono">
                  setTimeout
                </code>
                ,{" "}
                <code className="text-xs px-1.5 py-0.5 rounded-md bg-muted font-mono">
                  Promise.resolve().then()
                </code>
                ,{" "}
                <code className="text-xs px-1.5 py-0.5 rounded-md bg-muted font-mono">
                  queueMicrotask
                </code>
                , and{" "}
                <code className="text-xs px-1.5 py-0.5 rounded-md bg-muted font-mono">
                  requestAnimationFrame
                </code>
                .
              </p>
              <p>
                It does not support variables, loops, conditionals, promise
                chaining, async/await, setInterval, or complex expressions.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
