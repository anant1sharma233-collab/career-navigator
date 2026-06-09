import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { collegeService } from "@/services/collegeService";

export const Route = createFileRoute("/college/students")({
  head: () => ({ meta: [{ title: "Students — PrepForge" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const { data } = useQuery({ queryKey: ["college", "students"], queryFn: () => collegeService.getStudents() });
  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Students" subtitle="Manage and track every student on campus." />
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-muted-foreground text-xs uppercase tracking-wider">
            <tr className="border-b border-white/5">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Roll No</th>
              <th className="text-left p-4">Branch</th>
              <th className="text-left p-4">Year</th>
              <th className="text-left p-4">Readiness</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 text-white">{s.name}</td>
                <td className="p-4 text-muted-foreground">{s.rollNumber}</td>
                <td className="p-4 text-muted-foreground">{s.branch}</td>
                <td className="p-4 text-muted-foreground">Year {s.year}</td>
                <td className="p-4 text-white">{s.readiness}%</td>
                <td className="p-4">
                  <Badge tone={s.placed ? "success" : "warning"}>{s.placed ? "Placed" : "Active"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
