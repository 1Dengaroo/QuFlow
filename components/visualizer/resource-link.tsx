import { ExternalLink } from "lucide-react";

interface ResourceLinkProps {
  href: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

export function ResourceLink({
  href,
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
}: ResourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-muted"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-semibold flex items-center gap-1.5"
          style={{ color: "var(--warm-text)" }}
        >
          {title}
          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-40" />
        </div>
        <div className="text-[11px] mt-0.5 opacity-70">{subtitle}</div>
      </div>
    </a>
  );
}
