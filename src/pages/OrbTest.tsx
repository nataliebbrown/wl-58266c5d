import { useState } from 'react';
import { ChatOrb, OrbState } from '@/components/ChatOrb';

export default function OrbTest() {
  const [state, setState] = useState<OrbState>('idle');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center gap-12 p-8">
      <h1 className="text-white text-3xl font-light tracking-wide">ChatOrb Test</h1>
      
      {/* The Orb */}
      <ChatOrb state={state} size={300} />
      
      {/* State Controls */}
      <div className="flex gap-4">
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
      
      {/* Current State Display */}
      <p className="text-white/60 text-sm">
        Current state: <span className="text-white font-medium">{state}</span>
      </p>
    </div>
  );
}
