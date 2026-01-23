import { useState, Suspense, lazy } from 'react';
import { ChatOrb, OrbState } from '@/components/ChatOrb';

const FrostedOrb = lazy(() => import('@/components/FrostedOrb'));
const TwistedOrb = lazy(() => import('@/components/TwistedOrb'));
const PetalOrb = lazy(() => import('@/components/PetalOrb'));
const BlobOrb = lazy(() => import('@/components/BlobOrb'));
const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

type OrbType = 'chat' | 'frosted' | 'twisted' | 'petal' | 'blob' | 'noise';

export default function OrbTest() {
  const [state, setState] = useState<OrbState>('idle');
  const [orbType, setOrbType] = useState<OrbType>('noise');

  const bgClasses = {
    chat: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    frosted: 'bg-gradient-to-br from-slate-100 via-purple-50 to-slate-100',
    twisted: 'bg-gradient-to-br from-purple-950 via-gray-900 to-amber-950',
    petal: 'bg-gradient-to-br from-amber-200 via-orange-100 to-amber-200',
    blob: 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950',
    noise: 'bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950',
  };

  const isLightBg = orbType === 'frosted' || orbType === 'petal';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-8 p-8 transition-colors duration-500 ${bgClasses[orbType]}`}>
      <h1 className={`text-3xl font-light tracking-wide ${isLightBg ? 'text-gray-800' : 'text-white'}`}>
        Orb Test
      </h1>
      
      {/* Toggle between orb types */}
      <div className="flex gap-2 flex-wrap justify-center max-w-2xl">
        <button
          onClick={() => setOrbType('chat')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'chat'
              ? 'bg-white text-gray-900'
              : isLightBg 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          ChatOrb
        </button>
        <button
          onClick={() => setOrbType('frosted')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'frosted'
              ? 'bg-purple-600 text-white'
              : isLightBg 
              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          FrostedOrb
        </button>
        <button
          onClick={() => setOrbType('twisted')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'twisted'
              ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white'
              : isLightBg 
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          TwistedOrb
        </button>
        <button
          onClick={() => setOrbType('petal')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'petal'
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white'
              : isLightBg 
              ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          PetalOrb
        </button>
        <button
          onClick={() => setOrbType('blob')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'blob'
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white'
              : isLightBg 
              ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          BlobOrb
        </button>
        <button
          onClick={() => setOrbType('noise')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            orbType === 'noise'
              ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white'
              : isLightBg 
              ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          NoiseOrb ✨
        </button>
      </div>
      
      {/* The Orb */}
      <div className="relative">
        <Suspense fallback={
          <div className="w-[350px] h-[350px] flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-purple-500/30 animate-pulse" />
          </div>
        }>
          {orbType === 'noise' ? (
            <NoiseOrb size={350} noiseIntensity={0.5} speed={1} preset="sophia" />
          ) : orbType === 'blob' ? (
            <BlobOrb size={350} variant="distorted" />
          ) : orbType === 'petal' ? (
            <PetalOrb size={350} />
          ) : orbType === 'twisted' ? (
            <TwistedOrb size={350} />
          ) : orbType === 'frosted' ? (
            <FrostedOrb size={300} />
          ) : (
            <ChatOrb state={state} size={300} />
          )}
        </Suspense>
      </div>
      
      {/* State Controls - only for ChatOrb */}
      {orbType === 'chat' && (
        <div className="flex gap-4 flex-wrap justify-center">
          {(['idle', 'listening', 'thinking', 'speaking'] as OrbState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                state === s
                  ? 'bg-white text-gray-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}
      
      {/* Description */}
      <p className={`text-sm text-center max-w-md ${isLightBg ? 'text-gray-600' : 'text-white/60'}`}>
        {orbType === 'noise' ? (
          <span>
            <span className="font-medium text-cyan-400">NoiseOrb</span> — Vertex-deformed sphere with animated noise displacement
          </span>
        ) : orbType === 'blob' ? (
          <span>
            <span className="font-medium text-pink-400">BlobOrb</span> — Organic distorted sphere with iridescent colors
          </span>
        ) : orbType === 'petal' ? (
          <span>
            <span className="font-medium text-pink-600">PetalOrb</span> — Organic flower-like petals with purple → pink → gold gradient
          </span>
        ) : orbType === 'twisted' ? (
          <span>
            <span className="font-medium text-amber-400">TwistedOrb</span> — Stacked rotating layers with brand colors
          </span>
        ) : orbType === 'frosted' ? (
          <span>
            <span className="font-medium text-purple-600">FrostedOrb</span> — Frosted glass with swirling color blobs
          </span>
        ) : (
          <span>
            <span className="font-medium text-white">ChatOrb</span> — State: {state}
          </span>
        )}
      </p>
    </div>
  );
}
