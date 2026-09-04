import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — PrepForge" },
      { name: "description", content: "Create your PrepForge account and start forging your placement readiness." },
      { property: "og:title", content: "Create account — PrepForge" },
      { property: "og:description", content: "Create your PrepForge account and start forging your placement readiness." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#070605" }}
    >
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-semibold" style={{ color: "#fbf8f6" }}>
          Create an account
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#9b938d" }}>
          Registration is coming soon.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-semibold hover:underline"
          style={{ color: "#ff8a73" }}
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
