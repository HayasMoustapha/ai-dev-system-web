"use client";

import { useEffect, useRef } from "react";

/**
 * Futuristic neural-network background, drawn with the Canvas 2D API (no WebGL),
 * so it renders reliably on every machine. Drifting nodes link to nearby nodes;
 * bright signal pulses travel along the links (AI data-flow feel); gentle pointer
 * parallax. Designed to be mounted full-viewport behind the whole site.
 */
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; phase: number };
    // A pulse travels from node a to node b while they stay linked.
    type Pulse = { a: number; b: number; t: number; speed: number };

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const target = Math.min(120, Math.floor((width * height) / 13000));
      nodes = Array.from({ length: Math.max(32, target) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const LINK = 138;
    const MAX_PULSES = 22;

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 30000) {
          n.x += dx * 0.0010;
          n.y += dy * 0.0010;
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
            const o = (1 - dist / LINK) * 0.6;
            ctx.strokeStyle = `rgba(150, 130, 255, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // occasionally spawn a signal pulse along a strong link
            if (dist < LINK * 0.7 && pulses.length < MAX_PULSES && Math.random() < 0.0016) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.02 });
            }
          }
        }
      }

      // signal pulses (AI data-flow)
      ctx.shadowColor = "rgba(34, 211, 238, 1)";
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        const a = nodes[pulse.a];
        const b = nodes[pulse.b];
        // drop if endpoints drifted apart
        if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK * 1.15 || pulse.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        const fade = Math.sin(pulse.t * Math.PI); // bright in the middle
        ctx.shadowBlur = 14;
        ctx.fillStyle = `rgba(190, 245, 255, ${0.85 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes (gentle twinkle)
      ctx.shadowColor = "rgba(34, 211, 238, 0.95)";
      for (const n of nodes) {
        const tw = 0.7 + 0.3 * Math.sin(frame * 0.02 + n.phase);
        ctx.shadowBlur = 10 * tw;
        ctx.fillStyle = `rgba(150, 235, 252, ${0.85 * tw})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.0, 0, Math.PI * 2);
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
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />;
}
