import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { collegeService } from "@/services/collegeService";

export const Route = createFileRoute("/college/cohorts")({
  head: () => ({ meta: [{ title: "Cohorts — PrepForge" }] }),
  component: CohortsPage,
});

function CohortsPage() {
  const { data } = useQuery({ queryKey: ["college", "cohorts"], queryFn: () => collegeService.getCohorts() });
  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Cohorts" subtitle="Track readiness across batches and branches." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-white">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.studentCount} students</p>
              </div>
              <span className="text-xs text-muted-foreground">Class of {c.year}</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Avg. Readiness</span>
                  <span className="text-white">{c.averageReadiness}%</span>
                </div>
                <Progress value={c.averageReadiness} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Placement Rate</span>
                  <span className="text-white">{c.placementRate}%</span>
                </div>
                <Progress value={c.placementRate} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
