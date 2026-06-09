import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { recruiterService } from "@/services/recruiterService";

export const Route = createFileRoute("/recruiter/interviews")({
  head: () => ({ meta: [{ title: "Interviews — PrepForge" }] }),
  component: InterviewsPage,
});

function InterviewsPage() {
  const { data } = useQuery({ queryKey: ["recruiter", "interviews"], queryFn: () => recruiterService.getInterviews() });
  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Interviews" subtitle="Upcoming and recent conversations." />
      <div className="space-y-3">
        {data?.map((i) => (
          <Card key={i.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <CalendarClock className="w-4.5 h-4.5 text-white/80" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">{i.candidateName} · {i.round}</p>
                <p className="text-xs text-muted-foreground">{i.jobTitle} · {new Date(i.scheduledAt).toLocaleString()}</p>
              </div>
            </div>
            <Badge tone={i.status === "Scheduled" ? "primary" : i.status === "Completed" ? "success" : "danger"}>{i.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
