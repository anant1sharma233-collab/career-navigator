import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Home,
  Code2,
  Rocket,
  BookOpen,
  Trophy,
  Briefcase,
  User as UserIcon,
} from "lucide-react";
import { PortalShell } from "@/components/common/PortalShell";

export const Route = createFileRoute("/_student")({
  component: StudentLayout,
});

const nav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/dsa", label: "DSA", icon: Code2 },
  { to: "/projects", label: "Projects", icon: Rocket },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: UserIcon },
];

function StudentLayout() {
  // TODO: wire to useAuthStore once backend session is integrated.
  const userName = "Anant";
  return (
    <PortalShell
      brand="PrepForge"
      brandHref="/dashboard"
      nav={nav}
      userName={userName}
      cta={{ label: "Upgrade to Premium" }}
    >
      <Outlet />
    </PortalShell>
  );
}
