import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PrepForge" },
      { name: "description", content: "Sign in to PrepForge — the career operating system for students." },
    ],
  }),
  component: LoginPage,
});

const stats = [
  { label: "Placement Readiness", value: "78%" },
  { label: "Student Rank", value: "#124 / 4,213" },
  { label: "Current Streak", value: "12 Days 🔥" },
  { label: "Students Joined", value: "10,000+" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Real call: await authService.login(email, password);
      await new Promise((r) => setTimeout(r, 600));
      navigate({ to: "/dashboard" });
    } catch {
      setErrors({ form: "We couldn't sign you in. Check your details and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(800px 600px at 10% 10%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(700px 500px at 90% 80%, rgba(99,102,241,0.30), transparent 60%), linear-gradient(180deg, #09090b, #0b0b14)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-xl gradient-primary glow-primary" />
          <span className="text-2xl font-semibold gradient-text tracking-tight">PrepForge</span>
        </motion.div>

        <div className="max-w-lg space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-semibold text-white tracking-tight leading-[1.05]"
          >
            Your career journey <span className="gradient-text">starts here.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-muted-foreground"
          >
            The career operating system for students — from first commit to first offer.
          </motion.p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                className="glass rounded-xl px-4 py-3"
              >
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-base text-white font-semibold">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PrepForge.</p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] glass-elevated rounded-2xl p-8 shadow-[0_20px_80px_-20px_rgba(124,58,237,0.45)]"
        >
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Continue your journey to placement.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="hover:text-white transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                <input type="checkbox" className="accent-[#7c3aed] w-3.5 h-3.5" />
                Remember me
              </label>
              <a href="#" className="text-[#a78bfa] hover:underline">
                Forgot password?
              </a>
            </div>

            {errors.form && <p className="text-xs text-danger">{errors.form}</p>}

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Continue Journey {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#10101a] px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <Button type="button" variant="google" fullWidth>
              <GoogleIcon /> Continue with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/login" className="text-[#a78bfa] hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.65 4-5.5 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.6 14.6 2.7 12 2.7 6.9 2.7 2.8 6.9 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
