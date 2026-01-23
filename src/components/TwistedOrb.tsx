import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Individual twisted disc layer
function TwistedLayer({ 
  index, 
  totalLayers, 
  color,
  baseRotation 
}: { 
  index: number; 
  totalLayers: number;
  color: string;
  baseRotation: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Position along the z-axis (spread layers front to back)
  const zPosition = (index - totalLayers / 2) * 0.12;
  
  // Each layer gets progressively more rotation
  const layerRotation = (index / totalLayers) * Math.PI * 0.8;
  
  // Scale - slightly smaller at the edges, larger in middle
  const distFromCenter = Math.abs(index - totalLayers / 2) / (totalLayers / 2);
  const scale = 1 - distFromCenter * 0.15;

  useFrame((state) => {
    if (meshRef.current) {
      // Animate the twist - each layer rotates at slightly different speed
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.z = layerRotation + baseRotation + Math.sin(time * 0.3 + index * 0.2) * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.2 + index * 0.1) * 0.05;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, zPosition]}
      rotation={[0, 0, layerRotation]}
      scale={scale}
    >
      <torusGeometry args={[0.8, 0.15, 16, 100]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.3}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Center sphere core
function CoreSphere({ baseRotation }: { baseRotation: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + baseRotation;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshPhysicalMaterial
        color="#5b21b6"
        metalness={0.4}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  );
}

// The complete twisted orb group
function TwistedOrbGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const totalLayers = 12;
  
  // Brand color gradient: gold -> amber -> orange -> purple -> deep purple
  const colors = useMemo(() => {
    const colorStops = [
      '#fbbf24', // Amber/Gold
      '#f59e0b', // Orange-gold
      '#d97706', // Warm amber
      '#c2703c', // Terracotta (brand)
      '#9333ea', // Purple
      '#7c3aed', // Violet
      '#6d28d9', // Deep violet
      '#5b21b6', // Deep purple
      '#4c1d95', // Darkest purple
    ];
    
    return Array.from({ length: totalLayers }, (_, i) => {
      const t = i / (totalLayers - 1);
      const colorIndex = t * (colorStops.length - 1);
      const lowerIndex = Math.floor(colorIndex);
      const upperIndex = Math.min(lowerIndex + 1, colorStops.length - 1);
      const blend = colorIndex - lowerIndex;
      
      const lowerColor = new THREE.Color(colorStops[lowerIndex]);
      const upperColor = new THREE.Color(colorStops[upperIndex]);
      
      return `#${lowerColor.lerp(upperColor, blend).getHexString()}`;
    });
  }, []);

  // Animate the whole group rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + 0.2;
    }
  });

  const baseRotation = 0;

  return (
    <group ref={groupRef}>
      <CoreSphere baseRotation={baseRotation} />
      {colors.map((color, index) => (
        <TwistedLayer
          key={index}
          index={index}
          totalLayers={totalLayers}
          color={color}
          baseRotation={baseRotation}
        />
      ))}
    </group>
  );
}

interface TwistedOrbProps {
  className?: string;
  size?: number | string;
}

export default function TwistedOrb({ 
  className = '', 
  size = 300,
}: TwistedOrbProps) {
  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting for glossy reflections */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#fbbf24" />
        <directionalLight position={[0, 5, -5]} intensity={0.3} color="#a78bfa" />
        <pointLight position={[3, 0, 3]} intensity={0.5} color="#f59e0b" distance={10} />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#8b5cf6" distance={10} />
        
        {/* Environment map for realistic reflections */}
        <Environment preset="studio" />
        
        <TwistedOrbGroup />
      </Canvas>
    </div>
  );
}
