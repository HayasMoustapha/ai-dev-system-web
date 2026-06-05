"use client";

import { Canvas } from "@react-three/fiber";
import { NeuralScene } from "./neural-scene";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 62 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <NeuralScene />
    </Canvas>
  );
}
