import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface PortalSidebarProps {
  brand: string;
  brandHref: string;
  items: NavItem[];
  cta?: { label: string; onClick?: () => void };
}

export function PortalSidebar({ brand, brandHref, items, cta }: PortalSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sidebar-surface fixed left-0 top-0 z-30 h-screen w-[260px] flex flex-col">
      <div className="px-6 pt-7 pb-8">
        <Link to={brandHref as any} className="inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-primary glow-primary" />
          <span className="text-xl font-semibold gradient-text tracking-tight">{brand}</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item, i) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
            >
              <Link
                to={item.to as any}
                style={{ transition: "background-color 150ms ease, color 150ms ease, box-shadow 150ms ease" }}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  active
                    ? "bg-primary text-white nav-active-glow"
                    : "text-muted-foreground hover:text-white hover:bg-[rgba(124,58,237,0.08)]",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {cta && (
        <div className="p-3">
          <button
            onClick={cta.onClick}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white gradient-primary hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            {cta.label}
          </button>
        </div>
      )}
    </aside>
  );
}
