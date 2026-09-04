import { Bell } from "lucide-react";
import { useCommandStore } from "@/store/commandStore";
import { Badge } from "@/components/ui/Badge";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const openCommand = useCommandStore((s) => s.setOpen);

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-white/8 bg-[rgba(9,7,6,0.72)] backdrop-blur-xl">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Career Operating System
          </p>
          <p className="text-sm font-medium tracking-tight text-foreground">
            Welcome back, {userName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openCommand(true)}
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 h-9 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <span>Search</span>
            <kbd className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          <button
            className="relative h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-background" />
          </button>

          <Badge tone="primary">Student</Badge>

          <button
            className="h-9 w-9 rounded-full overflow-hidden bg-gradient-to-br from-[#ff3b30] to-[#7f1d1d] text-primary-foreground text-sm font-semibold flex items-center justify-center ring-1 ring-white/10 hover:ring-primary/50 transition-all"
            aria-label="Profile"
          >
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
