import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QueueCardProps {
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  emptyText: string;
  icon: React.ReactNode;
}

const colors: Record<
  string,
  { bg: string; border: string; text: string; itemBg: string; iconBg: string }
> = {
  blue: {
    bg: "bg-queue-blue-bg",
    border: "border-queue-blue-border",
    text: "text-queue-blue-text",
    itemBg: "bg-queue-blue-item-bg border-queue-blue-item-border",
    iconBg: "bg-queue-blue-icon-bg",
  },
  purple: {
    bg: "bg-queue-purple-bg",
    border: "border-queue-purple-border",
    text: "text-queue-purple-text",
    itemBg: "bg-queue-purple-item-bg border-queue-purple-item-border",
    iconBg: "bg-queue-purple-icon-bg",
  },
  amber: {
    bg: "bg-queue-amber-bg",
    border: "border-queue-amber-border",
    text: "text-queue-amber-text",
    itemBg: "bg-queue-amber-item-bg border-queue-amber-item-border",
    iconBg: "bg-queue-amber-icon-bg",
  },
  orange: {
    bg: "bg-queue-orange-bg",
    border: "border-queue-orange-border",
    text: "text-queue-orange-text",
    itemBg: "bg-queue-orange-item-bg border-queue-orange-item-border",
    iconBg: "bg-queue-orange-icon-bg",
  },
  emerald: {
    bg: "bg-queue-emerald-bg",
    border: "border-queue-emerald-border",
    text: "text-queue-emerald-text",
    itemBg: "bg-queue-emerald-item-bg border-queue-emerald-item-border",
    iconBg: "bg-queue-emerald-icon-bg",
  },
};

export function QueueCard({
  title,
  subtitle,
  items,
  color,
  emptyText,
  icon,
}: QueueCardProps) {
  const c = colors[color];

  return (
    <Card
      className="border-0 shadow-lg overflow-hidden h-full"
      style={{ background: "var(--warm-card)" }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center ${c.text}`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>{title}</span>
              {items.length > 0 && (
                <Badge className={`${c.bg} ${c.text} border-0 text-sm px-3`}>
                  {items.length}
                </Badge>
              )}
            </div>
            <span className="text-sm font-normal text-muted-foreground">
              {subtitle}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ScrollArea className="h-[240px]">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-[240px] text-muted-foreground text-base">
              {emptyText}
            </div>
          ) : (
            <div className="space-y-3 pr-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-xl border text-base truncate ${c.itemBg} ${c.text}`}
                  style={{ fontFamily: "var(--font-source-code), monospace" }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
