import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Users, Layers, BarChart3 } from "lucide-react";
import { PortalShell } from "@/components/common/PortalShell";

export const Route = createFileRoute("/college")({
  component: CollegeLayout,
});

const nav = [
  { to: "/college/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/college/students", label: "Students", icon: Users },
  { to: "/college/cohorts", label: "Cohorts", icon: Layers },
  { to: "/college/analytics", label: "Analytics", icon: BarChart3 },
];

function CollegeLayout() {
  return (
    <PortalShell
      brand="PrepForge"
      brandHref="/college/dashboard"
      nav={nav}
      userName="Dr. Mehta"
    >
      <Outlet />
    </PortalShell>
  );
}
