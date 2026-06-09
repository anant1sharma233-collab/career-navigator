import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PrepForge" }] }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="Jobs" subtitle="Matched opportunities tailored to your profile." />
      <ComingSoon label="Job board" />
    </div>
  ),
});
