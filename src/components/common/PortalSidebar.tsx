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
        <Link to={brandHref as any} className="inline-flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold text-primary-foreground"
            style={{ background: "linear-gradient(135deg,#ff3b30,#7f1d1d)" }}
          >
            {brand.charAt(0)}
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">{brand}</span>
        </Link>
      </div>

      <p className="px-6 pb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Workspace
      </p>

      <nav className="flex-1 px-3 space-y-0.5">
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
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                  active
                    ? "bg-white/[0.06] text-foreground border border-white/8"
                    : "text-muted-foreground border border-transparent hover:text-foreground hover:bg-white/[0.035]",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-primary" />
                )}
                <Icon className={cn("w-4 h-4", active && "text-primary")} />
                <span className="font-medium tracking-tight">{item.label}</span>
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
