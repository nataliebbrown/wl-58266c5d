import { useState, useEffect } from 'react';

// ============ Types ============

export type TimePeriod = 'dawn' | 'morning' | 'midday' | 'evening' | 'night';

export interface TimeConfig {
  period: TimePeriod;
  hours: [number, number]; // [start, end) in 24h
  gradient: string;
  textColor: string;
  greeting: string;
  orbGlow: string;
  scripture: { text: string; ref: string };
  suggestedActions: string[];
}

// ============ Configuration ============

export const TIME_CONFIGS: Record<TimePeriod, TimeConfig> = {
  dawn: {
    period: 'dawn',
    hours: [5, 7],
    gradient: 'linear-gradient(135deg, #FFF8E7 0%, #FFE4B5 50%, #FFA07A 100%)',
    textColor: '#2D3748',
    greeting: 'The morning is new with mercy...',
    orbGlow: 'soft-gold',
    scripture: {
      text: '"His mercies are new every morning."',
      ref: '— Lamentations 3:23',
    },
    suggestedActions: ['Begin Morning Reflection', 'Continue yesterday\'s conversation'],
  },
  morning: {
    period: 'morning',
    hours: [7, 12],
    gradient: 'linear-gradient(135deg, #F5F0E8 0%, #DED1BA 50%, #C5B49B 100%)',
    textColor: '#2D3748',
    greeting: 'Good morning',
    orbGlow: 'warm-brown',
    scripture: {
      text: '"The steadfast love of the Lord never ceases..."',
      ref: '— Lamentations 3:22',
    },
    suggestedActions: ['Continue Our Chat', 'Something New', 'Explore on My Own'],
  },
  midday: {
    period: 'midday',
    hours: [12, 17],
    gradient: 'linear-gradient(135deg, #EDE8E0 0%, #D4C9B8 50%, #C5B49B 100%)',
    textColor: '#2D3748',
    greeting: 'A moment of peace in your day',
    orbGlow: 'clear-amber',
    scripture: {
      text: '"Be still, and know that I am God."',
      ref: '— Psalm 46:10',
    },
    suggestedActions: ['Quick wisdom for my situation', '5-minute reflection', 'Continue what we started'],
  },
  evening: {
    period: 'evening',
    hours: [17, 21],
    gradient: 'linear-gradient(135deg, #5A4C3A 0%, #756653 50%, #8A7356 100%)',
    textColor: '#F8F6F0',
    greeting: 'As the day settles...',
    orbGlow: 'rich-amber',
    scripture: {
      text: '"Let the peace of Christ rule in your hearts."',
      ref: '— Colossians 3:15',
    },
    suggestedActions: ['Reflect on today', 'Continue exploring', 'Rest'],
  },
  night: {
    period: 'night',
    hours: [21, 5], // wraps past midnight
    gradient: 'linear-gradient(135deg, #1E1F1A 0%, #262721 50%, #3D3E35 100%)',
    textColor: '#F4EFE6',
    greeting: 'Rest in His presence',
    orbGlow: 'warm-ember',
    scripture: {
      text: '"He gives to His beloved sleep."',
      ref: '— Psalm 127:2',
    },
    suggestedActions: ['I need comfort', 'I\'m wrestling with something', 'Just want to talk'],
  },
};

// ============ Detection ============

let overridePeriod: TimePeriod | null = null;

/** Override the time period for testing/development. Pass null to clear. */
export function setTimePeriodOverride(period: TimePeriod | null): void {
  overridePeriod = period;
}

/** Get the current time period based on local time (or override). */
export function getTimePeriod(hour?: number): TimePeriod {
  if (overridePeriod) return overridePeriod;

  const h = hour ?? new Date().getHours();

  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 7 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'midday';
  if (h >= 17 && h < 21) return 'evening';
  return 'night'; // 21-4
}

/** Get the full config for the current time period. */
export function getTimeConfig(period?: TimePeriod): TimeConfig {
  const p = period ?? getTimePeriod();
  return TIME_CONFIGS[p];
}

// ============ React Hook ============

/**
 * React hook that returns the current time period and its config.
 * Re-evaluates when the period boundary is crossed.
 */
export function useTimePeriod() {
  const [period, setPeriod] = useState<TimePeriod>(getTimePeriod());
  const [config, setConfig] = useState<TimeConfig>(getTimeConfig());

  useEffect(() => {
    // Check every minute for period changes
    const interval = setInterval(() => {
      const current = getTimePeriod();
      if (current !== period) {
        setPeriod(current);
        setConfig(getTimeConfig(current));
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [period]);

  return { period, config };
}
