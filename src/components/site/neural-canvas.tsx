"use client";

import { useEffect, useRef } from "react";

/**
 * Futuristic neural-network background, drawn with the Canvas 2D API (no WebGL),
 * so it renders reliably on every machine. Drifting nodes link to nearby nodes;
 * cyan glowing nodes, violet links, gentle pointer parallax. Respects
 * prefers-reduced-motion (renders a single static frame).
 */
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const target = Math.min(110, Math.floor((width * height) / 14000));
      nodes = Array.from({ length: Math.max(28, target) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(1, rect?.width ?? window.innerWidth);
      height = Math.max(1, rect?.height ?? window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const LINK = 132;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        // gentle pointer attraction
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          n.x += dx * 0.0009;
          n.y += dy * 0.0009;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.7;
            ctx.strokeStyle = `rgba(150, 130, 255, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.shadowColor = "rgba(34, 211, 238, 0.95)";
      for (const n of nodes) {
        ctx.shadowBlur = 11;
        ctx.fillStyle = "rgba(150, 235, 252, 1)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />;
}
