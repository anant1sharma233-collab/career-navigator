import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

export const Route = createFileRoute("/_student/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PrepForge" },
      { name: "description", content: "Manage your PrepForge account, notifications, and verification preferences." },
      { property: "og:title", content: "Settings — PrepForge" },
      { property: "og:description", content: "Manage your PrepForge account, notifications, and verification preferences." },
    ],
  }),
  component: () => (
    <div className="space-y-8">
      <PageHeader title="Settings" subtitle="Account, notifications, and preferences." />
      <ComingSoon label="Settings" />
    </div>
  ),
});
