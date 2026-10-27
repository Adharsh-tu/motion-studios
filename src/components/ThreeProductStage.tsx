import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';

interface ThreeProductStageProps {
  color?: string;
  accentColor?: string;
  width?: number;
  height?: number;
}

export const ThreeProductStage: React.FC<ThreeProductStageProps> = ({
  color = '#6366f1',
  accentColor = '#06b6d4',
  width = 240,
  height = 240
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frame = useCurrentFrame();

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;
    cameraRef.current = camera;

    // 2. WebGL Renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Floating 3D Geometric Prism / Chamfered Card
    const geometry = new THREE.BoxGeometry(1.6, 1.6, 0.2);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.15,
      metalness: 0.7,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // 4. Orbiting Gyro Ring
    const ringGeo = new THREE.TorusGeometry(1.3, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);
    ringRef.current = ring;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(accentColor), 2.5, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [width, height, color, accentColor]);

  // Frame-accurate synchronization
  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    if (meshRef.current) {
      meshRef.current.rotation.y = (frame * 0.03);
      meshRef.current.rotation.x = 0.35 + Math.sin(frame * 0.04) * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = (frame * 0.02) + 0.8;
      ringRef.current.rotation.y = (frame * -0.04);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [frame]);

  return (
    <div
      ref={mountRef}
      style={{
        width,
        height,
        filter: `drop-shadow(0 15px 30px ${color}55)`
      }}
      className="relative flex items-center justify-center pointer-events-none"
    />
  );
};
