import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbMeshProps {
  scale?: number;
  speed?: number;
  distort?: number;
}

// Main translucent orb body - light cream center
function OrbMesh({ scale = 1, speed = 0.5, distort = 0.35 }: OrbMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Gentle organic wobble
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
      meshRef.current.rotation.y += 0.0015;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.18) * 0.08;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale}>
      <MeshDistortMaterial
        color="#fff9f6"
        speed={speed}
        distort={distort}
        radius={1}
        roughness={0.05}
        metalness={0.02}
        transparent
        opacity={0.88}
      />
    </Sphere>
  );
}

// Golden rim glow - right/lower-right side dominant
function GoldenRimGlow() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
      glowRef.current.scale.setScalar(scale * 1.03);
      // Subtle rotation to create moving rim effect
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Sphere ref={glowRef} args={[1, 48, 48]} scale={1.03} position={[0.02, -0.01, 0]}>
      <meshBasicMaterial
        color="#f5a623"
        transparent
        opacity={0.35}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Peachy-pink rim glow - upper-left area
function PeachRimGlow() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.35 + 1) * 0.012;
      glowRef.current.scale.setScalar(scale * 1.04);
      glowRef.current.rotation.z = -state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Sphere ref={glowRef} args={[1, 48, 48]} scale={1.04} position={[-0.015, 0.02, 0]}>
      <meshBasicMaterial
        color="#ffb5a0"
        transparent
        opacity={0.28}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Outer soft glow halo
function OuterHalo() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      glowRef.current.scale.setScalar(scale * 1.12);
      if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
        glowRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
      }
    }
  });

  return (
    <Sphere ref={glowRef} args={[1, 32, 32]} scale={1.12}>
      <meshBasicMaterial
        color="#ffd4a8"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Inner soft core glow
function InnerCore() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
      glowRef.current.scale.setScalar(scale * 0.85);
    }
  });

  return (
    <Sphere ref={glowRef} args={[1, 32, 32]} scale={0.85}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.5}
      />
    </Sphere>
  );
}

interface AnimatedOrbProps {
  className?: string;
  size?: number | string;
  speed?: number;
  distort?: number;
}

export default function AnimatedOrb({ 
  className = '', 
  size = 200,
  speed = 0.4,
  distort = 0.4,
}: AnimatedOrbProps) {
  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Soft ambient light for overall illumination */}
          <ambientLight intensity={1.0} color="#fff5f0" />
          
          {/* Main front light - creates the bright center */}
          <directionalLight position={[0, 0, 5]} intensity={1.4} color="#ffffff" />
          
          {/* Golden rim light from right/bottom */}
          <directionalLight position={[4, -3, 2]} intensity={0.8} color="#f5a623" />
          <pointLight position={[2, -1.5, 1]} intensity={0.5} color="#ffa726" distance={5} />
          
          {/* Peachy-pink rim light from upper-left */}
          <directionalLight position={[-3, 3, 2]} intensity={0.6} color="#ffb5a0" />
          <pointLight position={[-1.5, 1.5, 1]} intensity={0.4} color="#ff9a8b" distance={5} />
          
          {/* Back fill light */}
          <directionalLight position={[0, 0, -3]} intensity={0.3} color="#ffeee6" />
          
          <group>
            <OuterHalo />
            <GoldenRimGlow />
            <PeachRimGlow />
            <OrbMesh speed={speed} distort={distort} />
            <InnerCore />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
