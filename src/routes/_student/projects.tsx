import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/projects")({
  head: () => ({ meta: [{ title: "Projects — PrepForge" }] }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="Project Journey" subtitle="Build a portfolio that gets you hired." />
      <ComingSoon label="Project library" />
    </div>
  ),
});
