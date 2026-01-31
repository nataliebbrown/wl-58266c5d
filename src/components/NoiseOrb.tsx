import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Color presets - Wholelicity earthy palette
const colorPresets = {
  default: {
    color1: '#C5B49B', // Khaki Beige
    color2: '#746653', // Olive Wood
    color3: '#DED1BA', // Pale Oak
  },
  sophia: {
    color1: '#C5B49B', // Khaki Beige
    color2: '#746653', // Olive Wood
    color3: '#8A7356', // Faded Copper
  },
  white: {
    color1: '#F4EFE6', // Soft Linen
    color2: '#DED1BA', // Pale Oak
    color3: '#C5B49B', // Khaki Beige
  },
  dark: {
    color1: '#746653', // Olive Wood
    color2: '#5A4C3A', // Stone Brown
    color3: '#8A7356', // Faded Copper
  },
};

// Noise function for vertex displacement
function noise(x: number, y: number, z: number): number {
  return Math.sin(x * 1.5) * Math.cos(y * 1.5) * Math.sin(z * 1.5);
}

// The deforming blob mesh
function DeformingBlob({ 
  noiseIntensity = 0.5, 
  speed = 1.0,
  color1 = '#ff6b9d',
  color2 = '#c06cff',
  color3 = '#4dd0e1',
}: { 
  noiseIntensity?: number;
  speed?: number;
  color1?: string;
  color2?: string;
  color3?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Store original positions
  const originalPositions = useRef<Float32Array | null>(null);

  // Create geometry and store original positions
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 64);
    return geo;
  }, []);

  // Store original positions on mount
  useEffect(() => {
    if (geometry) {
      originalPositions.current = geometry.attributes.position.array.slice() as Float32Array;
    }
  }, [geometry]);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color1: { value: new THREE.Color(color1) },
    color2: { value: new THREE.Color(color2) },
    color3: { value: new THREE.Color(color3) },
  }), [color1, color2, color3]);

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed;
    
    // Update shader time
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
    }

    // Deform vertices with noise
    if (meshRef.current && originalPositions.current) {
      const positions = geometry.attributes.position;
      const original = originalPositions.current;

      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = original[i3];
        const y = original[i3 + 1];
        const z = original[i3 + 2];

        const n = noise(
          x + time * 0.3,
          y + time * 0.2,
          z + time * 0.4
        ) * noiseIntensity;

        const length = Math.sqrt(x * x + y * y + z * z);
        const factor = 1 + n * 0.3;

        positions.array[i3] = (x / length) * length * factor;
        positions.array[i3 + 1] = (y / length) * length * factor;
        positions.array[i3 + 2] = (z / length) * length * factor;
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }

    // Auto-rotate
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
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
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vWorldPosition;
          
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 2.5);
            
            float mixValue = sin(vPosition.y * 1.5 + time * 0.5) * 0.5 + 0.5;
            float mixValue2 = cos(vPosition.x * 1.5 + time * 0.3) * 0.5 + 0.5;
            
            vec3 baseColor = mix(color1, color2, mixValue);
            baseColor = mix(baseColor, color3, mixValue2 * 0.3);
            
            // Check if it's a white/bright preset (all colors close to white)
            float avgColor = (baseColor.r + baseColor.g + baseColor.b) / 3.0;
            bool isWhitePreset = avgColor > 0.9;
            
            // Enhanced fresnel glow - subtle for white preset
            vec3 fresnelColor = isWhitePreset ? vec3(0.1, 0.1, 0.15) : vec3(0.5, 0.4, 0.6);
            vec3 finalColor = baseColor + fresnel * fresnelColor * (isWhitePreset ? 0.3 : 1.0);
            
            // Add subtle iridescence - minimal for white preset
            float iridescence = sin(vPosition.x * 3.0 + time) * (isWhitePreset ? 0.02 : 0.1);
            finalColor += vec3(iridescence, iridescence * 0.5, iridescence * 0.8);
            
            // Ensure white preset stays bright
            if (isWhitePreset) {
              finalColor = clamp(finalColor, vec3(0.85), vec3(1.0));
            }
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}

interface NoiseOrbProps {
  className?: string;
  size?: number | string;
  noiseIntensity?: number;
  speed?: number;
  preset?: 'default' | 'sophia' | 'white';
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function NoiseOrb({ 
  className = '', 
  size = 300,
  noiseIntensity = 0.5,
  speed = 1.0,
  preset = 'default',
  color1,
  color2,
  color3,
}: NoiseOrbProps) {
  // Use preset colors or custom colors
  const colors = useMemo(() => {
    const presetColors = colorPresets[preset];
    return {
      color1: color1 || presetColors.color1,
      color2: color2 || presetColors.color2,
      color3: color3 || presetColors.color3,
    };
  }, [preset, color1, color2, color3]);

  // Lighting colors based on preset - using new earthy palette
  const lightColors = useMemo(() => {
    if (preset === 'sophia') {
      return {
        key: '#C5B49B',    // Khaki Beige
        fill: '#8A7356',   // Faded Copper
        accent: '#DED1BA', // Pale Oak
      };
    }
    if (preset === 'white') {
      return {
        key: '#F4EFE6',    // Soft Linen
        fill: '#DED1BA',   // Pale Oak
        accent: '#C5B49B', // Khaki Beige
      };
    }
    return {
      key: '#C5B49B',    // Khaki Beige
      fill: '#8A7356',   // Faded Copper
      accent: '#DED1BA', // Pale Oak
    };
  }, [preset]);

  const containerStyle = useMemo(() => ({
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  }), [size]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light */}
        <ambientLight intensity={0.6} color="#fff5f0" />
        
        {/* Key light */}
        <pointLight position={[5, 5, 5]} intensity={1.5} color={lightColors.key} distance={100} />
        
        {/* Fill light */}
        <pointLight position={[-5, -5, -5]} intensity={1} color={lightColors.fill} distance={100} />
        
        {/* Accent light */}
        <pointLight position={[0, 5, -3]} intensity={0.5} color={lightColors.accent} distance={50} />
        
        {/* Front light for better visibility */}
        <directionalLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />
        
        <DeformingBlob 
          noiseIntensity={noiseIntensity} 
          speed={speed} 
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
        />
      </Canvas>
    </div>
  );
}
