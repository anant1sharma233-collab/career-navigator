import { StackCard } from "./StackCard";
import type { StackId, TechStack } from "@/types/projects";

interface Props {
  stacks: TechStack[];
  selectedId: StackId | null;
  onSelect: (id: StackId) => void;
}

export function StackSelector({ stacks, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stacks.map((s) => (
        <StackCard key={s.id} stack={s} selected={selectedId === s.id} onSelect={onSelect} />
      ))}
    </div>
  );
}
