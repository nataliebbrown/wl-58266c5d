import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Sphere, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Chat orb states
export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface ChatOrbProps {
  state?: OrbState;
  size?: number;
  className?: string;
}

// Custom pearlescent shader material
const PearlescentMaterial = shaderMaterial(
  {
    uTime: 0,
    uDistort: 0.3,
    uSpeed: 1.5,
    uColor1: new THREE.Color('#fff9f6'),
    uColor2: new THREE.Color('#D4A030'),
    uColor3: new THREE.Color('#C2703C'),
    uFresnelPower: 2.5,
  },
  // Vertex shader
  `
    uniform float uTime;
    uniform float uDistort;
    uniform float uSpeed;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vDisplacement;
    
    // Simplex 3D noise
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      // Multi-layered noise for organic movement
      float t = uTime * uSpeed;
      float noise1 = snoise(position * 1.2 + t * 0.3) * 0.5;
      float noise2 = snoise(position * 2.4 + t * 0.5) * 0.25;
      float noise3 = snoise(position * 4.8 + t * 0.7) * 0.125;
      
      float displacement = (noise1 + noise2 + noise3) * uDistort;
      vDisplacement = displacement;
      
      vec3 newPosition = position + normal * displacement;
      vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uFresnelPower;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vDisplacement;
    
    void main() {
      // Fresnel effect for rim glow
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), uFresnelPower);
      
      // Iridescent color shift based on view angle and position
      float iridescence = dot(vNormal, viewDirection) * 0.5 + 0.5;
      iridescence += sin(vPosition.y * 3.0 + uTime * 0.5) * 0.1;
      
      // Base gradient from center to edge
      float gradientFactor = length(vPosition) * 0.5;
      gradientFactor += vDisplacement * 0.5;
      
      // Mix colors for pearlescent effect
      vec3 coreColor = mix(uColor1, uColor2, gradientFactor * 0.5);
      vec3 rimColor = mix(uColor2, uColor3, iridescence);
      vec3 finalColor = mix(coreColor, rimColor, fresnel);
      
      // Add subtle internal glow
      float internalGlow = 1.0 - gradientFactor * 0.3;
      finalColor += uColor1 * internalGlow * 0.2;
      
      // Specular highlight
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float spec = pow(max(dot(reflect(-lightDir, vNormal), viewDirection), 0.0), 32.0);
      finalColor += vec3(1.0) * spec * 0.5;
      
      // Subtle subsurface scattering effect
      float sss = pow(max(dot(-viewDirection, vNormal), 0.0), 1.5) * 0.3;
      finalColor += uColor2 * sss;
      
      gl_FragColor = vec4(finalColor, 0.95);
    }
  `
);

extend({ PearlescentMaterial });

// State configurations
const stateConfigs = {
  idle: {
    distort: 0.15,
    speed: 0.8,
    fresnelPower: 2.5,
    color1: '#fffcfa',
    color2: '#D4A030',
    color3: '#C2703C',
  },
  listening: {
    distort: 0.2,
    speed: 1.5,
    fresnelPower: 2.0,
    color1: '#fffcfa',
    color2: '#5B9BD5',
    color3: '#7BC8F6',
  },
  thinking: {
    distort: 0.25,
    speed: 2.5,
    fresnelPower: 3.0,
    color1: '#fffef8',
    color2: '#D4A030',
    color3: '#FFD700',
  },
  speaking: {
    distort: 0.3,
    speed: 3.5,
    fresnelPower: 2.0,
    color1: '#fffcfa',
    color2: '#D4A030',
    color3: '#C2703C',
  },
};

interface OrbMeshProps {
  state: OrbState;
}

// Main pearlescent orb
function MainOrb({ state }: OrbMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const config = stateConfigs[state];
  
  const targetValues = useRef({
    distort: config.distort,
    speed: config.speed,
    fresnelPower: config.fresnelPower,
    color1: new THREE.Color(config.color1),
    color2: new THREE.Color(config.color2),
    color3: new THREE.Color(config.color3),
  });
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      
      // Smooth transitions
      const t = targetValues.current;
      t.distort = config.distort;
      t.speed = config.speed;
      t.fresnelPower = config.fresnelPower;
      t.color1.set(config.color1);
      t.color2.set(config.color2);
      t.color3.set(config.color3);
      
      materialRef.current.uDistort += (t.distort - materialRef.current.uDistort) * 0.05;
      materialRef.current.uSpeed += (t.speed - materialRef.current.uSpeed) * 0.05;
      materialRef.current.uFresnelPower += (t.fresnelPower - materialRef.current.uFresnelPower) * 0.05;
      materialRef.current.uColor1.lerp(t.color1, 0.05);
      materialRef.current.uColor2.lerp(t.color2, 0.05);
      materialRef.current.uColor3.lerp(t.color3, 0.05);
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[1, 128, 128]}>
      {/* @ts-ignore */}
      <pearlescentMaterial
        ref={materialRef}
        transparent
        uDistort={config.distort}
        uSpeed={config.speed}
        uFresnelPower={config.fresnelPower}
        uColor1={new THREE.Color(config.color1)}
        uColor2={new THREE.Color(config.color2)}
        uColor3={new THREE.Color(config.color3)}
      />
    </Sphere>
  );
}

// Inner luminous core
function InnerCore({ state }: OrbMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = stateConfigs[state];
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.setScalar(0.7 + pulse);
      meshRef.current.rotation.y -= 0.003;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[0.7, 64, 64]}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

// Outer glow halo
function OuterGlow({ state }: OrbMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = stateConfigs[state];
  const currentColor = useRef(new THREE.Color(config.color2));
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 1.5) * 0.05;
      meshRef.current.scale.setScalar(1.3 + pulse);
      
      // Smooth color transition
      currentColor.current.lerp(new THREE.Color(config.color2), 0.05);
      (meshRef.current.material as THREE.MeshBasicMaterial).color = currentColor.current;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[1.2, 32, 32]}>
      <meshBasicMaterial
        color={config.color2}
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

// Atmospheric haze
function AtmosphericHaze({ state }: OrbMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = stateConfigs[state];
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 0.8 + 1) * 0.03;
      meshRef.current.scale.setScalar(1.5 + pulse);
      meshRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[1.4, 32, 32]}>
      <meshBasicMaterial
        color={config.color3}
        transparent
        opacity={0.04}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

export function ChatOrb({ state = 'idle', size = 200, className = '' }: ChatOrbProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, 2]} intensity={0.6} color="#D4A030" />
        <pointLight position={[0, -5, -5]} intensity={0.3} color="#C2703C" />
        
        <group scale={0.75}>
          <AtmosphericHaze state={state} />
          <OuterGlow state={state} />
          <InnerCore state={state} />
          <MainOrb state={state} />
        </group>
      </Canvas>
    </div>
  );
}

export default ChatOrb;
