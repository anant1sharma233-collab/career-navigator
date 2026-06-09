import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, CalendarClock, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { recruiterService } from "@/services/recruiterService";

export const Route = createFileRoute("/recruiter/dashboard")({
  head: () => ({ meta: [{ title: "Recruiter — PrepForge" }] }),
  component: RecruiterDashboard,
});

function RecruiterDashboard() {
  const { data: jobs } = useQuery({ queryKey: ["recruiter", "jobs"], queryFn: () => recruiterService.getJobs() });
  const { data: candidates } = useQuery({ queryKey: ["recruiter", "cands"], queryFn: () => recruiterService.getCandidates() });
  const { data: interviews } = useQuery({ queryKey: ["recruiter", "ints"], queryFn: () => recruiterService.getInterviews() });
  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: jobs?.filter((j) => j.status === "Open").length ?? 0 },
    { icon: Users, label: "Candidates", value: candidates?.length ?? 0 },
    { icon: CalendarClock, label: "Interviews", value: interviews?.length ?? 0 },
    { icon: TrendingUp, label: "Match Rate", value: "78%" },
  ];
  return (
    <div className="space-y-8 pb-12">
      <PageHeader title="Recruiter Overview" subtitle="Your pipeline at a glance." />
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
    </div>
  );
}
