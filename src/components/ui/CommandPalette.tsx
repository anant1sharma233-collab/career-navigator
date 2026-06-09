import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCommandStore } from "@/store/commandStore";
import { cn } from "@/utils/cn";

interface Item {
  id: string;
  group: string;
  label: string;
  icon: string;
  action: () => void;
}

export function CommandPalette() {
  const { open, setOpen } = useCommandStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const items: Item[] = useMemo(
    () => [
      { id: "dsa-graph", group: "DSA Topics", label: "Graph — DFS", icon: "💻", action: () => navigate({ to: "/dsa" }) },
      { id: "dsa-trees", group: "DSA Topics", label: "Trees — BFS", icon: "🌳", action: () => navigate({ to: "/dsa" }) },
      { id: "dsa-dp", group: "DSA Topics", label: "DP — Knapsack", icon: "🧠", action: () => navigate({ to: "/dsa" }) },
      { id: "proj-mern", group: "Projects", label: "MERN Stack App", icon: "🚀", action: () => navigate({ to: "/projects" }) },
      { id: "proj-ai", group: "Projects", label: "AI Chatbot", icon: "🤖", action: () => navigate({ to: "/projects" }) },
      { id: "notes-dbms", group: "Notes", label: "DBMS Notes", icon: "📚", action: () => navigate({ to: "/subjects" }) },
      { id: "job-tcs", group: "Jobs", label: "TCS NQT", icon: "💼", action: () => navigate({ to: "/jobs" }) },
      { id: "job-amzn", group: "Jobs", label: "Amazon SDE", icon: "💼", action: () => navigate({ to: "/jobs" }) },
      { id: "act-leaderboard", group: "Actions", label: "View Leaderboard", icon: "🏆", action: () => navigate({ to: "/leaderboard" }) },
      { id: "act-settings", group: "Actions", label: "Settings", icon: "⚙️", action: () => navigate({ to: "/settings" }) },
    ],
    [navigate],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const grouped = useMemo(() => {
    const m = new Map<string, Item[]>();
    for (const it of filtered) m.set(it.group, [...(m.get(it.group) ?? []), it]);
    return Array.from(m.entries());
  }, [filtered]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useCommandStore.getState().toggle();
      }
      if (!useCommandStore.getState().open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(filtered.length - 1, c + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(0, c - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[cursor];
        if (it) {
          it.action();
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, cursor, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[600px] rounded-2xl border border-white/10 bg-popover shadow-[0_30px_120px_-20px_rgba(124,58,237,0.5)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 h-14 border-b border-white/5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything — DSA, projects, jobs…"
                className="flex-1 bg-transparent outline-hidden text-base text-white placeholder:text-muted-foreground/70"
              />
              <kbd className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div className="max-h-[400px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-muted-foreground">No results</div>
              ) : (
                grouped.map(([group, gItems]) => (
                  <div key={group} className="py-1">
                    <div className="px-5 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      {group}
                    </div>
                    {gItems.map((it) => {
                      const idx = filtered.indexOf(it);
                      const active = idx === cursor;
                      return (
                        <button
                          key={it.id}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => {
                            it.action();
                            setOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left transition-colors",
                            active ? "bg-primary/15 text-white" : "text-white/85 hover:bg-white/5",
                          )}
                        >
                          <span className="text-base">{it.icon}</span>
                          <span className="flex-1">{it.label}</span>
                          {active && (
                            <span className="text-[10px] text-muted-foreground font-mono">↵ open</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
