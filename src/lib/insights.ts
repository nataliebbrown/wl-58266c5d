// ============ Types ============

export interface Insight {
  id: string;
  title: string;
  content: string;
  theme: string;
  tags: string[];
  source: InsightSource;
  conversationId?: string;
  createdAt: string;
}

export interface InsightSource {
  type: 'chat' | 'bible' | 'reflection';
  /** e.g. "John 3:16" or conversation snippet */
  reference?: string;
}

// ============ Constants ============

const STORAGE_KEY = 'wholelicity-insights';

// ============ CRUD ============

export function getAllInsights(): Insight[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

export function getInsight(id: string): Insight | null {
  const all = getAllInsights();
  return all.find(i => i.id === id) ?? null;
}

export function saveInsight(insight: Omit<Insight, 'id' | 'createdAt'>): Insight {
  const all = getAllInsights();
  const newInsight: Insight = {
    ...insight,
    id: `insight-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  all.unshift(newInsight); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newInsight;
}

export function deleteInsight(id: string): void {
  const all = getAllInsights().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getInsightCount(): number {
  return getAllInsights().length;
}

// ============ Theme Analysis ============

/** Get the most common themes across all insights. */
export function getTopThemes(limit = 5): Array<{ theme: string; count: number }> {
  const insights = getAllInsights();
  const counts: Record<string, number> = {};

  for (const insight of insights) {
    if (insight.theme) {
      counts[insight.theme] = (counts[insight.theme] || 0) + 1;
    }
    for (const tag of insight.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Simple pattern notice: surfaces when 2+ insights share a theme or tag. */
export function getPatternNotice(): string | null {
  const themes = getTopThemes(1);
  const total = getInsightCount();

  if (total < 3 || themes.length === 0) return null;
  if (themes[0].count < 2) return null;

  const topTheme = themes[0].theme;
  const count = themes[0].count;

  if (count >= 4) {
    return `${topTheme} keeps appearing in your reflections. There might be something deeper God is revealing here...`;
  }
  if (count >= 2) {
    return `I notice ${topTheme} coming up more than once. Something may be forming...`;
  }
  return null;
}

// ============ Growth Stage ============

export type ConstellationStage =
  | 'empty'         // 0 insights
  | 'first-stars'   // 1-5
  | 'clusters'      // 6-15
  | 'emerging'      // 16-30
  | 'rich';         // 30+

export function getConstellationStage(): ConstellationStage {
  const count = getInsightCount();
  if (count === 0) return 'empty';
  if (count <= 5) return 'first-stars';
  if (count <= 15) return 'clusters';
  if (count <= 30) return 'emerging';
  return 'rich';
}
