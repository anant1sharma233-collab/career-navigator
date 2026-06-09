import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home,
  Code2,
  Rocket,
  BookOpen,
  Trophy,
  Briefcase,
  User as UserIcon,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils/cn";

const nav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/dsa", label: "DSA", icon: Code2 },
  { to: "/projects", label: "Projects", icon: Rocket },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: UserIcon },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[260px] border-r border-white/5 bg-background flex flex-col">
      <div className="px-6 pt-7 pb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-primary glow-primary" />
          <span className="text-xl font-semibold gradient-text tracking-tight">PrepForge</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {nav.map((item, i) => {
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
                to={item.to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                  active
                    ? "bg-primary text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-3">
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white gradient-primary hover:opacity-95 transition-opacity">
          <Sparkles className="w-4 h-4" />
          Upgrade to Premium
        </button>
      </div>
    </aside>
  );
}
