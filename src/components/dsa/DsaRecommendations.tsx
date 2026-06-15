import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { DsaRecommendation } from "@/services/dsaService";

export function DsaRecommendations({ recs }: { recs: DsaRecommendation[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-white">Recommended for you today</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recs.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            className="glass rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-semibold">{r.title}</h3>
              <div className="rounded-lg gradient-primary p-1.5 text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {r.problems.map((p) => (
                <span key={p} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/80">{p}</span>
              ))}
            </div>
            <Link
              to="/dsa/journey/$topicId"
              params={{ topicId: r.topic }}
              className="mt-auto inline-flex items-center justify-center gap-1 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)] hover:translate-y-[-1px] transition-transform"
            >
              {r.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
