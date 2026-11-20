const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const BASE_URL = 'https://api.elevenlabs.io/v1';
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel – warm, natural female voice
const MODEL_ID = 'eleven_multilingual_v2';

const audioCache = new Map<string, string>();

export function isElevenLabsAvailable(): boolean {
  return !!API_KEY;
}

export async function synthesizeSpeech(
  text: string,
  options?: {
    voiceId?: string;
    stability?: number;
    similarityBoost?: number;
  }
): Promise<string> {
  const voiceId = options?.voiceId || DEFAULT_VOICE_ID;
  const cacheKey = `${voiceId}:${text}`;

  const cached = audioCache.get(cacheKey);
  if (cached) return cached;

  if (!API_KEY) throw new Error('ElevenLabs API key not configured');

  const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: options?.stability ?? 0.5,
        similarity_boost: options?.similarityBoost ?? 0.75,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(cacheKey, url);
  return url;
}
