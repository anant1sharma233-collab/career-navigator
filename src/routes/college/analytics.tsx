import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { collegeService } from "@/services/collegeService";

export const Route = createFileRoute("/college/analytics")({
  head: () => ({ meta: [{ title: "Analytics — PrepForge" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { data } = useQuery({ queryKey: ["college", "analytics2"], queryFn: () => collegeService.getAnalytics() });
  if (!data) return null;
  const max = Math.max(...data.readinessTrend.map((t) => t.value));
  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Analytics" subtitle="How your campus is trending." />
      <Card>
        <h3 className="text-base font-semibold text-white mb-5">Readiness Trend</h3>
        <div className="flex items-end gap-3 h-48">
          {data.readinessTrend.map((t) => (
            <div key={t.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg gradient-primary"
                style={{ height: `${(t.value / max) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{t.month}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
