import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — PrepForge" }] }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="Leaderboard" subtitle="See how you rank across PrepForge." />
      <ComingSoon label="Leaderboard" />
    </div>
  ),
});
