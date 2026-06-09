import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, Award, TrendingUp, Building2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { collegeService } from "@/services/collegeService";

export const Route = createFileRoute("/college/dashboard")({
  head: () => ({ meta: [{ title: "College — PrepForge" }] }),
  component: CollegeDashboard,
});

function CollegeDashboard() {
  const { data } = useQuery({ queryKey: ["college", "analytics"], queryFn: () => collegeService.getAnalytics() });
  if (!data) return null;
  const stats = [
    { icon: Users, label: "Total Students", value: data.totalStudents.toLocaleString() },
    { icon: Award, label: "Avg. Readiness", value: `${data.averageReadiness}%` },
    { icon: TrendingUp, label: "Placement Rate", value: `${data.placementRate}%` },
    { icon: Building2, label: "Top Recruiters", value: `${data.topRecruiters.length}+` },
  ];
  return (
    <div className="space-y-8 pb-12">
      <PageHeader title="College Overview" subtitle="Your campus, at a glance." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="!p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <s.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-semibold text-white">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="text-base font-semibold text-white mb-4">Top Recruiters</h3>
        <div className="flex flex-wrap gap-2">
          {data.topRecruiters.map((r) => (
            <span key={r} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white">{r}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}
