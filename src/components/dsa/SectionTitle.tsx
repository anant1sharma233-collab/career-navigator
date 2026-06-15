export function SectionTitle({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 mt-2">
      <div>
        {eyebrow && <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{eyebrow}</p>}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
