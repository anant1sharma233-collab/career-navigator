import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AvatarUploader } from "@/components/student/AvatarUploader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_student/profile")({
  head: () => ({ meta: [{ title: "Profile — PrepForge" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState("Anant Kumar");
  const [bio, setBio] = useState("CSE undergrad. Building toward a full-stack role.");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const skills = ["React", "TypeScript", "Node.js", "DSA", "System Design"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 pb-12 max-w-5xl"
    >
      <PageHeader title="Your Profile" subtitle="How recruiters and your college see you." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <AvatarUploader value={avatarUrl} onChange={setAvatarUrl} fallback={name} />
          <h2 className="mt-5 text-lg font-semibold text-white">{name}</h2>
          <p className="text-sm text-muted-foreground">{bio}</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> Bengaluru, IN
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 w-full">
            <a className="rounded-lg border border-white/10 bg-white/5 py-2 inline-flex items-center justify-center text-muted-foreground hover:text-white" href="#" aria-label="Email"><Mail className="w-4 h-4" /></a>
            <a className="rounded-lg border border-white/10 bg-white/5 py-2 inline-flex items-center justify-center text-muted-foreground hover:text-white" href="#" aria-label="GitHub"><Github className="w-4 h-4" /></a>
            <a className="rounded-lg border border-white/10 bg-white/5 py-2 inline-flex items-center justify-center text-muted-foreground hover:text-white" href="#" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
          </div>
        </Card>

        {/* Form card */}
        <Card className="lg:col-span-2 space-y-5">
          <div>
            <h3 className="text-base font-semibold text-white">Account details</h3>
            <p className="text-sm text-muted-foreground">Update what shows on your public profile.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Email">
              <Input type="email" defaultValue="anant@prepforge.dev" />
            </Field>
            <Field label="College">
              <Input defaultValue="IIT Delhi" />
            </Field>
            <Field label="Graduation year">
              <Input type="number" defaultValue={2025} />
            </Field>
          </div>
          <Field label="Bio">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-3 text-sm text-white placeholder:text-muted-foreground/70 outline-hidden transition-colors focus:border-primary/60 focus:bg-white/[0.05]"
            />
          </Field>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} tone="primary">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
