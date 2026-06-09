import { Sparkles } from "lucide-react";

export function ComingSoon({ label }: { label: string }) {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white">{label}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        We're building this surface. Backend integration coming next.
      </p>
    </div>
  );
}
