import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-surface px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Error 404</p>
        <h1 className="mt-2 text-5xl font-semibold text-white tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This route doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-95 transition-opacity"
          >
            Back to PrepForge
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center gradient-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-white">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Try again
          </button>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PrepForge — Career Operating System for Students" },
      { name: "description", content: "PrepForge: the career operating system for students. DSA, projects, subjects, and placements in one premium workspace." },
      { name: "theme-color", content: "#09090b" },
      { property: "og:title", content: "PrepForge — Career Operating System" },
      { property: "og:description", content: "The career operating system for students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
