"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 48;
const STAR_COUNT = 1500;
const LINK_DIST = 2.3;
const BOUND = new THREE.Vector3(5.4, 3.2, 2.2);

/**
 * Real-time "neural network" field: drifting nodes that link to nearby nodes,
 * over a faint star cloud. Cyan nodes + violet links on deep space, additive
 * blending for the glow. Lightweight (no postprocessing) so it never stutters.
 */
export function NeuralScene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const nodes = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, () => ({
        p: new THREE.Vector3(
          (Math.random() - 0.5) * BOUND.x * 2,
          (Math.random() - 0.5) * BOUND.y * 2,
          (Math.random() - 0.5) * BOUND.z * 2,
        ),
        v: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
        ),
      })),
    [],
  );

  const built = useMemo(() => {
    // Stars
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 24;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: new THREE.Color("#9fb4ff"),
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);

    // Node points
    const nodePos = new Float32Array(NODE_COUNT * 3);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: new THREE.Color("#22d3ee"),
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);

    // Links
    const linkPos = new Float32Array(NODE_COUNT * NODE_COUNT * 6);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    const linkMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#a78bfa"),
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const links = new THREE.LineSegments(linkGeo, linkMat);

    return { stars, nodePoints, nodeGeo, nodePos, links, linkGeo, linkPos };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const b = built;
    return () => {
      b.stars.geometry.dispose();
      (b.stars.material as THREE.Material).dispose();
      b.nodeGeo.dispose();
      (b.nodePoints.material as THREE.Material).dispose();
      b.linkGeo.dispose();
      (b.links.material as THREE.Material).dispose();
    };
  }, [built]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const { nodeGeo, nodePos, linkGeo, linkPos } = built;

    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      n.p.addScaledVector(n.v, delta * 60);
      if (Math.abs(n.p.x) > BOUND.x) n.v.x *= -1;
      if (Math.abs(n.p.y) > BOUND.y) n.v.y *= -1;
      if (Math.abs(n.p.z) > BOUND.z) n.v.z *= -1;
      nodePos[i * 3] = n.p.x;
      nodePos[i * 3 + 1] = n.p.y;
      nodePos[i * 3 + 2] = n.p.z;
    }
    nodeGeo.attributes.position.needsUpdate = true;

    let ptr = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].p.distanceToSquared(nodes[j].p) < LINK_DIST * LINK_DIST) {
          linkPos[ptr++] = nodes[i].p.x;
          linkPos[ptr++] = nodes[i].p.y;
          linkPos[ptr++] = nodes[i].p.z;
          linkPos[ptr++] = nodes[j].p.x;
          linkPos[ptr++] = nodes[j].p.y;
          linkPos[ptr++] = nodes[j].p.z;
        }
      }
    }
    linkGeo.setDrawRange(0, ptr / 3);
    linkGeo.attributes.position.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y += delta * 0.05;
      group.current.rotation.x += (pointer.current.y * 0.18 - group.current.rotation.x) * 0.04;
      group.current.position.x += (pointer.current.x * 0.4 - group.current.position.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <primitive object={built.stars} />
      <primitive object={built.links} />
      <primitive object={built.nodePoints} />
    </group>
  );
}
