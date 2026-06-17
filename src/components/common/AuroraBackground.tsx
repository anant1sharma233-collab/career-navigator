import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport animated aurora background.
 * - Pure CSS keyframe animation (GPU-accelerated transforms + filters)
 * - Pauses while the tab is hidden (document.hidden)
 * - z-index: -1, pointer-events: none — clicks pass through
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onVis = () => {
      if (!ref.current) return;
      ref.current.style.animationPlayState = document.hidden ? "paused" : "running";
      // also pause children
      ref.current.querySelectorAll<HTMLElement>("[data-aurora-blob]").forEach((el) => {
        el.style.animationPlayState = document.hidden ? "paused" : "running";
      });
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="aurora-root pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div data-aurora-blob className="aurora-blob aurora-blob-1" />
      <div data-aurora-blob className="aurora-blob aurora-blob-2" />
      <div data-aurora-blob className="aurora-blob aurora-blob-3" />
    </div>
  );
}
