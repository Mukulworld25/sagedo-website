import { useEffect, RefObject } from "react";

// Zero React re-renders pointer-driven tilt hook.
// Writes directly to CSS custom properties (--rx, --ry, --mx, --my) inside a single requestAnimationFrame loop.
export function useTilt(ref: RefObject<HTMLElement | null>, max = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let rect = el.getBoundingClientRect();
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
      
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.01 ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const enter = () => {
      rect = el.getBoundingClientRect();
      el.style.willChange = "transform";
    };

    const move = (e: PointerEvent) => {
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tx = (px - 0.5) * 2 * max;
      ty = -(py - 0.5) * 2 * max;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      kick();
    };

    const leave = () => {
      tx = 0;
      ty = 0;
      el.style.willChange = "";
      kick();
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, max]);
}
