import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — PrepForge" },
      { name: "description", content: "Reset your PrepForge password and get back to your prep." },
      { property: "og:title", content: "Reset password — PrepForge" },
      { property: "og:description", content: "Reset your PrepForge password and get back to your prep." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#070605" }}
    >
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-semibold" style={{ color: "#fbf8f6" }}>
          Forgot password
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#9b938d" }}>
          Password recovery is coming soon.
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
