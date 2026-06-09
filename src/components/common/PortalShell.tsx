import { type ReactNode } from "react";
import { PortalSidebar, type NavItem } from "./PortalSidebar";
import { Header } from "./Header";
import { CommandPalette } from "@/components/ui/CommandPalette";
import type { UserRole } from "@/types";

interface PortalShellProps {
  brand: string;
  brandHref: string;
  nav: NavItem[];
  userName: string;
  roleBadge?: UserRole;
  cta?: { label: string; onClick?: () => void };
  children: ReactNode;
}

export function PortalShell({ brand, brandHref, nav, userName, cta, children }: PortalShellProps) {
  return (
    <div className="min-h-screen gradient-surface">
      <PortalSidebar brand={brand} brandHref={brandHref} items={nav} cta={cta} />
      <div className="pl-[260px]">
        <Header userName={userName} />
        <main className="px-8 py-8">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
