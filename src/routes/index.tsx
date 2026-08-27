import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { SmokeBackground } from "@/components/auth/SmokeBackground";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/config/routes.config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — PrepForge" },
      { name: "description", content: "Sign in to PrepForge — your placement readiness, forged." },
      { property: "og:title", content: "Sign in — PrepForge" },
      {
        property: "og:description",
        content: "Sign in to PrepForge — your placement readiness, forged.",
      },
    ],
  }),
  component: LoginPage,
});

const STATS = [
  { value: "10,000+", label: "Students" },
  { value: "78%", label: "Avg. Readiness" },
  { value: "#1", label: "Placement Tracker" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password, remember });
      navigate({ to: ROUTES.student.dashboard });
    } catch (err) {
      setError((err as Error).message ?? "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "#070605" }}>
      <style>{`
        .pf-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          padding: 12px 14px;
          font-size: 14px;
          color: #f7f4f1;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .pf-input::placeholder { color: #6d655f; }
        .pf-input:focus {
          border-color: rgba(255,91,74,0.55);
          box-shadow: 0 0 0 3px rgba(255,68,51,0.12);
        }
      `}</style>

      <SmokeBackground />

      {/* Vignette to keep text readable over smoke */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(120% 90% at 50% 40%, rgba(7,6,5,0.10), rgba(7,6,5,0.78) 70%, rgba(7,6,5,0.94) 100%)",
        }}
      />

      <div
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10"
        style={{ zIndex: 2 }}
      >
        {/* LEFT — Brand / value prop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold"
              style={{
                background: "linear-gradient(135deg,#ff3b30,#7f1d1d)",
                color: "#fbf8f6",
              }}
            >
              P
            </div>
            <span className="text-xl font-semibold tracking-tight" style={{ color: "#fbf8f6" }}>
              PrepForge
            </span>
          </div>

          <p
            className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#8d847d" }}
          >
            Career Operating System
          </p>

          <h1
            className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "#fbf8f6" }}
          >
            Your placement
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#ff5b4a,#ff8a65,#ffb199)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              readiness
            </span>
            , forged.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed" style={{ color: "#bdb5af" }}>
            Track DSA, aptitude and projects in one place. See exactly what's missing between you and
            the offer you want — then go close the gap.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-4 py-3"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-sm font-semibold" style={{ color: "#f7f4f1" }}>
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px]" style={{ color: "#9b938d" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="w-full"
        >
          <div className="mx-auto w-full max-w-md">
            {/* Gradient border wrapper */}
            <div
              className="rounded-2xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,91,74,0.55), rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02))",
              }}
            >
              <div
                className="rounded-2xl p-7 sm:p-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,15,14,0.92), rgba(12,9,8,0.92))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#8d847d" }}
                >
                  Welcome back
                </p>
                <h2 className="mt-2 text-2xl font-semibold" style={{ color: "#fbf8f6" }}>
                  Sign in to continue
                </h2>
                <p className="mt-1.5 text-sm" style={{ color: "#9b938d" }}>
                  Pick up your prep right where you left off.
                </p>

                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@college.edu"
                      className="pf-input"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Password">
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pf-input pr-20"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold flex items-center gap-1"
                        style={{ color: "#ff8a73" }}
                      >
                        {showPw ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" /> Show
                          </>
                        )}
                      </button>
                    </div>
                  </Field>

                  <div className="flex items-center justify-between pt-1">
                    <label
                      className="flex cursor-pointer select-none items-center gap-2 text-xs"
                      style={{ color: "#9b938d" }}
                    >
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        style={{ accentColor: "#ff4433" }}
                        className="h-3.5 w-3.5"
                      />
                      Remember me
                    </label>
                    <Link
                      to={ROUTES.forgotPassword}
                      className="text-xs font-semibold hover:underline"
                      style={{ color: "#ff8a73" }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div
                      className="rounded-xl px-3 py-2.5 text-xs"
                      style={{
                        border: "1px solid rgba(255,68,51,0.35)",
                        background: "rgba(255,68,51,0.10)",
                        color: "#ff8a73",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg,#ff4433,#c81e1e)",
                      color: "#fbf8f6",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <span
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "#8d847d" }}
                    >
                      or
                    </span>
                    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.03)",
                      color: "#f7f4f1",
                    }}
                  >
                    <GoogleIcon /> Continue with Google
                  </button>
                </form>
              </div>
            </div>

            <p className="mt-6 text-center text-sm" style={{ color: "#9b938d" }}>
              New here?{" "}
              <Link
                to={ROUTES.register}
                className="font-semibold hover:underline"
                style={{ color: "#ff8a73" }}
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "#8d847d" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.82-.07-1.6-.21-2.36H12v4.46h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.72Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.86-3c-1.07.72-2.45 1.15-4.08 1.15-3.13 0-5.79-2.11-6.74-4.96H1.28v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.26 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.28a12 12 0 0 0 0 10.74l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.63l3.98 3.09C6.21 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
