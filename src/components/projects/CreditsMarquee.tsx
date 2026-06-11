import type { Contributor } from "@/types/projects";

interface Props { contributors: Contributor[] }

/**
 * CreditsMarquee — infinite horizontal scroll of contributors.
 * Pure CSS animation, GPU-friendly, no JS tickers.
 */
export function CreditsMarquee({ contributors }: Props) {
  if (!contributors.length) return null;
  const doubled = [...contributors, ...contributors];
  return (
    <section className="relative mt-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="px-6 pt-5 pb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Built with help from</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Mentors · Creators · Contributors</span>
      </div>
      <div className="relative group overflow-hidden py-4">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-6 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {doubled.map((c, i) => (
            <div key={`${c.name}-${i}`} className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-semibold text-white">
                {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-white font-medium">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">{c.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
