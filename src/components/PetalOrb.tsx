import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Create a petal shape using LatheGeometry with a custom curve
function createPetalGeometry() {
  // Define the petal profile curve
  const points: THREE.Vector2[] = [];
  const segments = 32;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Create a teardrop/petal shape
    const angle = t * Math.PI;
    const x = Math.sin(angle) * (1 - t * 0.3); // Width varies along length
    const y = t * 2 - 1; // Height from -1 to 1
    points.push(new THREE.Vector2(x * 0.4, y));
  }
  
  // Create lathe geometry (rotate profile around Y axis)
  const geometry = new THREE.LatheGeometry(points, 32, 0, Math.PI * 2);
  
  // Scale to make it more petal-like (flatten it)
  geometry.scale(1, 1, 0.3);
  
  return geometry;
}

// Custom shader material for gradient coloring based on position
const petalVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const petalFragmentShader = `
  uniform vec3 uColor1; // Purple (top)
  uniform vec3 uColor2; // Pink (middle)
  uniform vec3 uColor3; // Gold (bottom)
  uniform float uTime;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  
  void main() {
    // Gradient based on Y position
    float t = (vPosition.y + 1.0) / 2.0; // Normalize to 0-1
    
    vec3 color;
    if (t > 0.5) {
      // Upper half: purple to pink
      color = mix(uColor2, uColor1, (t - 0.5) * 2.0);
    } else {
      // Lower half: gold to pink
      color = mix(uColor3, uColor2, t * 2.0);
    }
    
    // Add fresnel rim lighting
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    
    // Add slight iridescence
    color += fresnel * vec3(0.3, 0.2, 0.4) * 0.5;
    
    // Glossy highlight
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 64.0);
    color += spec * vec3(1.0, 0.95, 0.9) * 0.4;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Individual petal component
function Petal({ 
  rotationY, 
  rotationZ,
  scale = 1,
  delay = 0
}: { 
  rotationY: number;
  rotationZ: number;
  scale?: number;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const geometry = useMemo(() => createPetalGeometry(), []);
  
  const uniforms = useMemo(() => ({
    uColor1: { value: new THREE.Color('#8b5cf6') }, // Purple
    uColor2: { value: new THREE.Color('#ec4899') }, // Pink
    uColor3: { value: new THREE.Color('#f59e0b') }, // Gold/Amber
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      // Gentle pulsing motion
      meshRef.current.rotation.z = rotationZ + Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.3 + delay) * 0.05;
      // Subtle scale pulsing
      const pulseScale = scale * (1 + Math.sin(time * 0.4) * 0.03);
      meshRef.current.scale.setScalar(pulseScale);
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0, rotationY, rotationZ]}
      scale={scale}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={petalVertexShader}
        fragmentShader={petalFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Alternative petal using physical material for better reflections
function GlossyPetal({ 
  rotationY, 
  rotationZ,
  tiltX = 0,
  scale = 1,
  delay = 0,
  colorTop,
  colorBottom,
}: { 
  rotationY: number;
  rotationZ: number;
  tiltX?: number;
  scale?: number;
  delay?: number;
  colorTop: string;
  colorBottom: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Create elongated sphere geometry for petal
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    // Stretch to make petal shape
    geo.scale(0.35, 1.2, 0.15);
    return geo;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + delay;
      // Gentle undulating motion
      groupRef.current.rotation.z = rotationZ + Math.sin(time * 0.5) * 0.08;
      groupRef.current.rotation.x = tiltX + Math.sin(time * 0.3) * 0.05;
    }
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      // Subtle scale pulsing
      const pulseScale = 1 + Math.sin(time * 0.4) * 0.02;
      meshRef.current.scale.set(scale * pulseScale, scale * pulseScale, scale);
    }
  });

  return (
    <group ref={groupRef} rotation={[tiltX, rotationY, rotationZ]}>
      <mesh ref={meshRef} geometry={geometry} scale={scale}>
        <meshPhysicalMaterial
          color={colorBottom}
          metalness={0.1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// The complete petal orb arrangement
function PetalOrbGroup() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Define petal configurations - arrange like butterfly/flower
  const petals = useMemo(() => [
    // Back petals (purple-dominant)
    { rotationY: 0, rotationZ: -0.4, tiltX: 0.3, scale: 1.1, colorTop: '#7c3aed', colorBottom: '#a78bfa', delay: 0 },
    { rotationY: Math.PI, rotationZ: 0.4, tiltX: 0.3, scale: 1.1, colorTop: '#7c3aed', colorBottom: '#a78bfa', delay: 0.5 },
    
    // Middle petals (pink)
    { rotationY: Math.PI * 0.5, rotationZ: -0.2, tiltX: -0.2, scale: 1, colorTop: '#ec4899', colorBottom: '#f472b6', delay: 1 },
    { rotationY: Math.PI * 1.5, rotationZ: 0.2, tiltX: -0.2, scale: 1, colorTop: '#ec4899', colorBottom: '#f472b6', delay: 1.5 },
    
    // Front petals (pink to gold gradient effect)
    { rotationY: Math.PI * 0.25, rotationZ: 0.5, tiltX: -0.4, scale: 0.95, colorTop: '#f472b6', colorBottom: '#fbbf24', delay: 2 },
    { rotationY: Math.PI * 0.75, rotationZ: -0.5, tiltX: -0.4, scale: 0.95, colorTop: '#f472b6', colorBottom: '#fbbf24', delay: 2.5 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow overall rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {petals.map((petal, index) => (
        <GlossyPetal
          key={index}
          rotationY={petal.rotationY}
          rotationZ={petal.rotationZ}
          tiltX={petal.tiltX}
          scale={petal.scale}
          colorTop={petal.colorTop}
          colorBottom={petal.colorBottom}
          delay={petal.delay}
        />
      ))}
    </group>
  );
}

interface PetalOrbProps {
  className?: string;
  size?: number | string;
}

export default function PetalOrb({ 
  className = '', 
  size = 300,
}: PetalOrbProps) {
  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Soft ambient lighting */}
        <ambientLight intensity={0.5} color="#fff5f5" />
        
        {/* Main key light */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        
        {/* Purple accent from top-left */}
        <directionalLight position={[-3, 4, 2]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[-2, 2, 3]} intensity={0.4} color="#8b5cf6" distance={8} />
        
        {/* Pink accent from right */}
        <pointLight position={[3, 0, 2]} intensity={0.5} color="#ec4899" distance={8} />
        
        {/* Gold accent from bottom */}
        <directionalLight position={[0, -3, 3]} intensity={0.5} color="#fbbf24" />
        <pointLight position={[0, -2, 2]} intensity={0.4} color="#f59e0b" distance={6} />
        
        {/* Back fill */}
        <directionalLight position={[0, 0, -5]} intensity={0.3} color="#fce7f3" />
        
        {/* Environment for reflections */}
        <Environment preset="studio" />
        
        <PetalOrbGroup />
      </Canvas>
    </div>
  );
}
