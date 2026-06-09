import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, MapPin } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { recruiterService } from "@/services/recruiterService";

export const Route = createFileRoute("/recruiter/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PrepForge" }] }),
  component: JobsPage,
});

function JobsPage() {
  const { data } = useQuery({ queryKey: ["recruiter", "jobs2"], queryFn: () => recruiterService.getJobs() });
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Job Postings"
        subtitle="Create, edit, and manage your open roles."
        action={<Button><Plus className="w-4 h-4" /> New posting</Button>}
      />
      <div className="space-y-4">
        {data?.map((j) => (
          <Card key={j.id} className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">{j.title}</h3>
                <Badge tone={j.status === "Open" ? "success" : j.status === "Draft" ? "warning" : "default"}>{j.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{j.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                <span>{j.type}</span>
                <span>{j.applicants} applicants</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
