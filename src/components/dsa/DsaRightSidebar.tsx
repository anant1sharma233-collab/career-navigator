import { Bookmark, Activity, RefreshCw, TrendingUp } from "lucide-react";
import type { SidebarData } from "@/services/dsaService";

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const w = 100, h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7">
      <defs>
        <linearGradient id="sp-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8a65" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff8a65" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="#ff8a65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sp-grad)" />
    </svg>
  );
}

function MiniBars({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm gradient-primary" style={{ height: `${(v / max) * 100}%`, opacity: 0.6 + (i / data.length) * 0.4 }} />
      ))}
    </div>
  );
}

export function DsaRightSidebar({ data }: { data: SidebarData }) {
  return (
    <aside className="glass rounded-3xl p-5 space-y-6 sticky top-4">
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Activity className="w-4 h-4 text-primary" /> Recent Activity</h3>
        <ul className="mt-3 space-y-2">
          {data.recent.map((r) => (
            <li key={r.id} className="flex items-center justify-between text-xs">
              <span className="text-white/90 truncate">{r.problemName}</span>
              <span className="text-muted-foreground shrink-0 ml-2">{r.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Bookmark className="w-4 h-4 text-primary" /> Bookmarked</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.bookmarks.map((b) => (
            <span key={b.id} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 cursor-pointer">{b.name}</span>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-warning" />
          <div>
            <p className="text-sm font-semibold text-white">Revision Queue</p>
            <p className="text-xs text-muted-foreground">{data.revisionCount} items pending</p>
          </div>
        </div>
        <button className="text-xs rounded-lg bg-white/5 hover:bg-white/10 px-3 py-1.5 text-white">Review</button>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><TrendingUp className="w-4 h-4 text-success" /> Weekly</h3>
          <span className="text-xs text-success">+{data.weeklyDelta}%</span>
        </div>
        <Spark data={data.weeklyProgress} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">Monthly Growth</h3>
          <span className="text-xs text-success">+{data.monthlyDelta}%</span>
        </div>
        <MiniBars data={data.monthlyGrowth} />
      </section>
    </aside>
  );
}
