import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/subjects")({
  head: () => ({ meta: [{ title: "Subjects — PrepForge" }] }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="Subject Journey" subtitle="Core CS subjects, semester by semester." />
      <ComingSoon label="Subject catalog" />
    </div>
  ),
});
