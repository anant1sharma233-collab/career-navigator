import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/dsa")({
  head: () => ({ meta: [{ title: "DSA — PrepForge" }] }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="DSA Journey" subtitle="Problems, patterns, and progress." />
      <ComingSoon label="DSA workspace" />
    </div>
  ),
});
