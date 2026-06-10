import { memo, useState } from "react";
import { Play, ArrowRight, Clock } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type { DSAPackage } from "@/features/services/dsaApi";

export const PackageCard = memo(function PackageCard({ pkg }: { pkg: DSAPackage }) {
  const [playing, setPlaying] = useState(false);
  const pct = Math.round((pkg.solved / pkg.totalQuestions) * 100);
  const videoId = extractYouTubeId(pkg.videoLink);

  return (
    <div className={cn("glass rounded-2xl overflow-hidden flex flex-col bg-gradient-to-br", pkg.accent)}>
      <div className="p-6 space-y-5 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{pkg.level}</div>
            <div className="mt-1 text-2xl font-bold gradient-text">{pkg.name}</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            {pkg.durationMonths}
          </span>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>{pkg.solved}/{pkg.totalQuestions} solved</span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} />
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 relative">
          {playing && videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={pkg.videoTitle}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="group w-full h-full relative" aria-label={`Play ${pkg.videoTitle}`}>
              <img src={pkg.videoThumb} alt={pkg.videoTitle} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" loading="lazy" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(124,58,237,0.6)] group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[11px] text-white/90">
                <span className="truncate">{pkg.videoTitle}</span>
                <span>{pkg.videoDuration}</span>
              </div>
            </button>
          )}
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Topics</div>
          <div className="flex flex-wrap gap-1.5">
            {pkg.topics.map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Button fullWidth size="lg" variant="primary">
          Start Learning <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}
