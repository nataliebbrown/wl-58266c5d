import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Purple blob that floats around
function PurpleBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.4 + startOffset;
      meshRef.current.position.x = Math.sin(t) * 0.3;
      meshRef.current.position.y = Math.cos(t * 0.7) * 0.25;
      meshRef.current.position.z = Math.sin(t * 0.5) * 0.2;
      meshRef.current.scale.setScalar(0.5 + Math.sin(t * 0.8) * 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.4, 32, 32]} position={[0.2, 0.1, 0]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        speed={2}
        distort={0.4}
        radius={1}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </Sphere>
  );
}

// Pink blob
function PinkBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.35 + startOffset;
      meshRef.current.position.x = Math.cos(t * 0.8) * 0.25;
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.3;
      meshRef.current.position.z = Math.cos(t * 0.4) * 0.15;
      meshRef.current.scale.setScalar(0.45 + Math.cos(t * 0.7) * 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.35, 32, 32]} position={[-0.15, 0.2, 0.1]}>
      <MeshDistortMaterial
        color="#ec4899"
        speed={2.5}
        distort={0.5}
        radius={1}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </Sphere>
  );
}

// Teal blob
function TealBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.3 + startOffset;
      meshRef.current.position.x = Math.sin(t * 0.9) * 0.2;
      meshRef.current.position.y = Math.cos(t * 0.5) * 0.2 - 0.1;
      meshRef.current.position.z = Math.sin(t * 0.7) * 0.25;
      meshRef.current.scale.setScalar(0.4 + Math.sin(t * 0.6) * 0.08);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.38, 32, 32]} position={[0, -0.2, 0.15]}>
      <MeshDistortMaterial
        color="#2dd4bf"
        speed={1.8}
        distort={0.45}
        radius={1}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </Sphere>
  );
}

// Secondary purple blob
function LavenderBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.45 + startOffset;
      meshRef.current.position.x = Math.cos(t) * 0.15;
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.2;
      meshRef.current.position.z = Math.cos(t * 0.6) * 0.2;
      meshRef.current.scale.setScalar(0.35 + Math.cos(t * 0.5) * 0.08);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.32, 32, 32]} position={[-0.1, -0.1, -0.1]}>
      <MeshDistortMaterial
        color="#a78bfa"
        speed={2.2}
        distort={0.35}
        radius={1}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </Sphere>
  );
}

// Outer frosted glass shell
function FrostedShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshPhysicalMaterial
        color="#f5f3ff"
        transparent
        opacity={0.35}
        roughness={0.15}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={0.5}
        side={THREE.FrontSide}
      />
    </Sphere>
  );
}

// Inner soft glow core
function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={0.25}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.4}
      />
    </Sphere>
  );
}

// Outer glow halo
function OuterGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1.08 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      meshRef.current.scale.setScalar(scale);
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.08}>
      <meshBasicMaterial
        color="#c4b5fd"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Soft shadow underneath
function SoftShadow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshBasicMaterial) {
      meshRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} scale={[1, 0.35, 1]}>
      <circleGeometry args={[0.7, 32]} />
      <meshBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

interface FrostedOrbProps {
  className?: string;
  size?: number | string;
}

export default function FrostedOrb({ 
  className = '', 
  size = 300,
}: FrostedOrbProps) {
  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Soft ambient lighting */}
        <ambientLight intensity={0.8} color="#f5f3ff" />
        
        {/* Main light from front-top */}
        <directionalLight position={[2, 3, 5]} intensity={1} color="#ffffff" />
        
        {/* Purple accent lights */}
        <pointLight position={[2, 1, 2]} intensity={0.4} color="#a78bfa" distance={5} />
        <pointLight position={[-2, -1, 2]} intensity={0.3} color="#c4b5fd" distance={5} />
        
        {/* Pink accent */}
        <pointLight position={[-1, 2, 1]} intensity={0.3} color="#f472b6" distance={4} />
        
        {/* Back fill */}
        <directionalLight position={[0, 0, -3]} intensity={0.3} color="#e9d5ff" />
        
        <group>
          <OuterGlow />
          <FrostedShell />
          
          {/* Animated color blobs inside */}
          <PurpleBlob />
          <PinkBlob />
          <TealBlob />
          <LavenderBlob />
          
          <InnerCore />
          <SoftShadow />
        </group>
      </Canvas>
    </div>
  );
}
