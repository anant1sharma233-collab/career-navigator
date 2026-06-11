import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * CosmicBackground — animated stars + parallax + ambient glows.
 * Pure presentation; no props. Drop behind login content (absolute fill).
 */
export function CosmicBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Generate 3 star layers (parallax depth).
  const layers = useMemo(
    () => [
      { count: 120, size: 1, opacity: 0.5, depth: 6 },
      { count: 80, size: 1.5, opacity: 0.75, depth: 14 },
      { count: 40, size: 2.2, opacity: 1, depth: 28 },
    ],
    [],
  );

  const stars = useMemo(
    () =>
      layers.map((layer, li) =>
        Array.from({ length: layer.count }).map((_, i) => ({
          id: `${li}-${i}`,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: layer.size,
          opacity: layer.opacity,
          depth: layer.depth,
          delay: Math.random() * 4,
          duration: 2 + Math.random() * 4,
        })),
      ),
    [layers],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        drift: 20 + Math.random() * 60,
        duration: 18 + Math.random() * 22,
        delay: Math.random() * 10,
        hue: Math.random() > 0.5 ? "rgba(168,139,250,0.35)" : "rgba(34,211,238,0.30)",
      })),
    [],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 100% 100%, rgba(34,211,238,0.22), transparent 55%)," +
            "radial-gradient(900px 700px at 0% 40%, rgba(124,58,237,0.22), transparent 60%)," +
            "linear-gradient(180deg, #05060f 0%, #07091a 45%, #050615 100%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
          }}
          animate={{ y: [0, -p.drift, 0], x: [0, p.drift / 3, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Star layers with parallax */}
      {stars.map((layer, li) => {
        const offsetX = (mouse.x - 0.5) * layers[li].depth;
        const offsetY = (mouse.y - 0.5) * layers[li].depth;
        return (
          <div
            key={li}
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ transform: `translate3d(${offsetX}px, ${offsetY}px, 0)` }}
          >
            {layer.map((s) => (
              <motion.span
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  width: s.size,
                  height: s.size,
                  opacity: s.opacity,
                  boxShadow: `0 0 ${s.size * 3}px rgba(255,255,255,0.6)`,
                }}
                animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: s.delay,
                }}
              />
            ))}
          </div>
        );
      })}

      {/* Cyan glow bottom-right */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Purple glow left */}
      <motion.div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
