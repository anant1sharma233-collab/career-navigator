import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface Tab<T extends string> { key: T; label: string; icon?: React.ComponentType<{ className?: string }> }

export function TabSwitcher<T extends string>({ tabs, value, onChange }: { tabs: Tab<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="inline-flex glass rounded-xl p-1">
      {tabs.map(({ key, label, icon: Icon }) => {
        const active = value === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              active ? "text-white" : "text-muted-foreground hover:text-white",
            )}
          >
            {active && (
              <motion.div
                layoutId="dsa-tab-pill"
                className="absolute inset-0 rounded-lg gradient-primary shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative inline-flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />} {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
