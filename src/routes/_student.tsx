import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import { CommandPalette } from "@/components/ui/CommandPalette";

export const Route = createFileRoute("/_student")({
  component: StudentLayout,
});

function StudentLayout() {
  // TODO: wire to useAuthStore once backend session is integrated.
  const userName = "Anant";
  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <div className="pl-[260px]">
        <Header userName={userName} />
        <main className="px-8 py-8">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
