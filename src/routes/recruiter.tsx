import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Users, Briefcase, CalendarClock } from "lucide-react";
import { PortalShell } from "@/components/common/PortalShell";

export const Route = createFileRoute("/_recruiter")({
  component: RecruiterLayout,
});

const nav = [
  { to: "/recruiter/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/recruiter/candidates", label: "Candidates", icon: Users },
  { to: "/recruiter/jobs", label: "Jobs", icon: Briefcase },
  { to: "/recruiter/interviews", label: "Interviews", icon: CalendarClock },
];

function RecruiterLayout() {
  return (
    <PortalShell
      brand="PrepForge"
      brandHref="/recruiter/dashboard"
      nav={nav}
      userName="Recruiter"
    >
      <Outlet />
    </PortalShell>
  );
}
