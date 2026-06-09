import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { recruiterService } from "@/services/recruiterService";

export const Route = createFileRoute("/recruiter/candidates")({
  head: () => ({ meta: [{ title: "Candidates — PrepForge" }] }),
  component: CandidatesPage,
});

function CandidatesPage() {
  const { data } = useQuery({ queryKey: ["recruiter", "candidates"], queryFn: () => recruiterService.getCandidates() });
  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Candidates" subtitle="Browse vetted, interview-ready students." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((c) => (
          <Card key={c.id}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                {c.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{c.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{c.college} · {c.branch}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {c.skills.slice(0, 4).map((s) => (
                <Badge key={s} tone="primary">{s}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="text-muted-foreground">Readiness</span>
              <span className="text-white font-medium">{c.readiness}%</span>
            </div>
            <Button fullWidth size="sm">View profile</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
