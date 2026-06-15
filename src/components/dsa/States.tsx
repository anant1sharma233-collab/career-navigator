import { AlertCircle, Inbox } from "lucide-react";

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message }: { title?: string; message?: string }) {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <Inbox className="w-8 h-8 mx-auto text-muted-foreground" />
      <p className="mt-3 text-white font-medium">{title}</p>
      {message && <p className="mt-1 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function ErrorState({ onRetry, message = "Something went wrong." }: { onRetry?: () => void; message?: string }) {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <AlertCircle className="w-8 h-8 mx-auto text-danger" />
      <p className="mt-3 text-white font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 text-sm text-primary hover:underline">Try again</button>
      )}
    </div>
  );
}
