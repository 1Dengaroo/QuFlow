import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  {
    bg: string;
    border: string;
    text: string;
    itemBg: string;
    iconBg: string;
    topBorder: string;
  }
> = {
  blue: {
    bg: "bg-queue-blue-bg",
    border: "border-queue-blue-border",
    text: "text-queue-blue-text",
    itemBg: "bg-queue-blue-item-bg border-queue-blue-item-border",
    iconBg: "bg-queue-blue-icon-bg",
    topBorder: "border-t-queue-blue-accent",
  },
  purple: {
    bg: "bg-queue-purple-bg",
    border: "border-queue-purple-border",
    text: "text-queue-purple-text",
    itemBg: "bg-queue-purple-item-bg border-queue-purple-item-border",
    iconBg: "bg-queue-purple-icon-bg",
    topBorder: "border-t-queue-purple-accent",
  },
  amber: {
    bg: "bg-queue-amber-bg",
    border: "border-queue-amber-border",
    text: "text-queue-amber-text",
    itemBg: "bg-queue-amber-item-bg border-queue-amber-item-border",
    iconBg: "bg-queue-amber-icon-bg",
    topBorder: "border-t-queue-amber-accent",
  },
  orange: {
    bg: "bg-queue-orange-bg",
    border: "border-queue-orange-border",
    text: "text-queue-orange-text",
    itemBg: "bg-queue-orange-item-bg border-queue-orange-item-border",
    iconBg: "bg-queue-orange-icon-bg",
    topBorder: "border-t-queue-orange-accent",
  },
  emerald: {
    bg: "bg-queue-emerald-bg",
    border: "border-queue-emerald-border",
    text: "text-queue-emerald-text",
    itemBg: "bg-queue-emerald-item-bg border-queue-emerald-item-border",
    iconBg: "bg-queue-emerald-icon-bg",
    topBorder: "border-t-queue-emerald-accent",
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
    <Card className={`overflow-hidden border-t-[3px] ${c.topBorder}`}>
      <CardHeader className="pb-2 pt-3 sm:pt-4">
        <CardTitle className="text-xs">
          <div
            className={`w-6 h-6 rounded-md ${c.iconBg} flex items-center justify-center ${c.text}`}
          >
            {icon}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold">{title}</span>
              <span className="text-[11px] text-muted-foreground ml-2 font-normal">
                {subtitle}
              </span>
            </div>
            {items.length > 0 && (
              <span
                className={`${c.bg} ${c.text} text-xs font-bold px-2 py-0.5 rounded-md tabular-nums`}
              >
                {items.length}
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3 sm:pb-4 pt-0">
        <ScrollArea className="h-[160px] sm:h-[200px]">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-[160px] sm:h-[200px] text-muted-foreground text-xs">
              {emptyText}
            </div>
          ) : (
            <div className="space-y-1.5 pr-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg border text-xs truncate font-medium ${c.itemBg} ${c.text}`}
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
