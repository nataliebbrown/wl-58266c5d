import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated blob with iridescent shader
function IridescentBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorA: { value: new THREE.Color('#ff6b9d') }, // Pink
      colorB: { value: new THREE.Color('#c06cff') }, // Purple
      colorC: { value: new THREE.Color('#4dd0e1') }, // Cyan
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      meshRef.current.rotation.y += 0.003;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vWorldPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 colorA;
          uniform vec3 colorB;
          uniform vec3 colorC;
          
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vWorldPosition;
          
          void main() {
            // Fresnel effect for glossy edges
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
            
            // Animated color mixing based on position and time
            float colorMix = sin(vPosition.y * 2.0 + time * 0.5) * 0.5 + 0.5;
            float colorMix2 = sin(vPosition.x * 2.0 + time * 0.3) * 0.5 + 0.5;
            
            vec3 baseColor = mix(colorA, colorB, colorMix);
            baseColor = mix(baseColor, colorC, colorMix2 * 0.5);
            
            // Add iridescent shimmer
            vec3 iridescence = vec3(
              sin(time * 0.5 + vPosition.x * 3.0) * 0.5 + 0.5,
              sin(time * 0.7 + vPosition.y * 3.0) * 0.5 + 0.5,
              sin(time * 0.3 + vPosition.z * 3.0) * 0.5 + 0.5
            );
            
            // Combine everything
            vec3 finalColor = baseColor + fresnel * 0.4 + iridescence * 0.15;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// Distorted blob version with MeshDistortMaterial
function DistortedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 64]} />
      <MeshDistortMaterial
        color="#ff6b9d"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

interface BlobOrbProps {
  className?: string;
  size?: number | string;
  variant?: 'iridescent' | 'distorted';
}

export default function BlobOrb({ 
  className = '', 
  size = 300,
  variant = 'distorted',
}: BlobOrbProps) {
  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4dd0e1" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ff6b9d"
        />
        
        {variant === 'iridescent' ? <IridescentBlob /> : <DistortedBlob />}
      </Canvas>
    </div>
  );
}
