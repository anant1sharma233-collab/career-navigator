import { ArrowRight, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/button";
import type { DSAData } from "@/features/services/dsaApi";

export function UserInfoBar({ data }: { data: DSAData }) {
  const pct = ((data.totalSolved / data.totalQuestions) * 100).toFixed(1);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr_1.5fr]">
      <div className="glass rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Trophy className="w-4 h-4 text-yellow-400" /> Your Rank
        </div>
        <div className="mt-3 text-5xl font-bold gradient-text">#{data.userRank}</div>
        <div className="mt-1 text-xs text-muted-foreground">Keep climbing the leaderboard</div>
      </div>

      <div className="glass rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
          <span>Progress</span>
          <span className="text-white">{pct}%</span>
        </div>
        <div className="mt-3 text-3xl font-bold text-white">
          {data.totalSolved} <span className="text-muted-foreground text-xl font-medium">/ {data.totalQuestions}</span>
        </div>
        <div className="mt-4">
          <Progress value={data.totalSolved} max={data.totalQuestions} />
        </div>
      </div>

      <div className="glass rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-primary/15 to-accent/5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Next Up</div>
        <div className="mt-2">
          {data.nextQuestion.lastSolvedTitle && (
            <div className="text-xs text-muted-foreground">
              Last solved: <span className="text-white/80">{data.nextQuestion.lastSolvedTitle}</span>
            </div>
          )}
          <div className="mt-1 text-xl font-semibold text-white">{data.nextQuestion.title}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{data.nextQuestion.difficulty}</div>
        </div>
        <div className="mt-4">
          <Button asChild variant="primary" fullWidth>
            <a href={data.nextQuestion.leetcodeLink} target="_blank" rel="noreferrer">
              Solve Now <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
