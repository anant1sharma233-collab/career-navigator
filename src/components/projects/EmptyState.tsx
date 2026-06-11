import { Inbox } from "lucide-react";

interface Props { title: string; description?: string; icon?: React.ReactNode }

export function EmptyState({ title, description, icon }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center">
      <div className="mx-auto h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground mb-3">
        {icon ?? <Inbox className="w-5 h-5" />}
      </div>
      <p className="text-sm font-medium text-white">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">{description}</p>}
    </div>
  );
}
