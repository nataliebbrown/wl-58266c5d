import { getAllInsights, getTopThemes, type Insight } from './insights';

// ============ Types ============

export interface PatternNotice {
  type: 'theme-cluster' | 'recurring-question' | 'growth-arc';
  message: string;
  relatedThemes: string[];
  insightCount: number;
}

// ============ Pattern Analysis ============

/**
 * Analyze all saved insights for emerging patterns.
 * Returns the most significant pattern notice, if any.
 */
export function analyzePatterns(): PatternNotice | null {
  const insights = getAllInsights();
  if (insights.length < 3) return null;

  // 1. Check for theme clusters (most common pattern)
  const themes = getTopThemes(3);
  if (themes.length > 0 && themes[0].count >= 3) {
    return buildThemeClusterNotice(themes, insights.length);
  }

  // 2. Check for a growth arc (themes evolving over time)
  const arcNotice = detectGrowthArc(insights);
  if (arcNotice) return arcNotice;

  // 3. Check for recurring themes at lower threshold
  if (themes.length > 0 && themes[0].count >= 2) {
    return {
      type: 'theme-cluster',
      message: `I notice "${themes[0].theme}" coming up more than once. Something may be forming...`,
      relatedThemes: [themes[0].theme],
      insightCount: themes[0].count,
    };
  }

  return null;
}

// ============ Theme Cluster ============

function buildThemeClusterNotice(
  themes: Array<{ theme: string; count: number }>,
  totalInsights: number
): PatternNotice {
  const primary = themes[0];
  const secondary = themes.length > 1 ? themes[1] : null;

  let message: string;
  if (secondary && secondary.count >= 2) {
    message = `"${primary.theme}" and "${secondary.theme}" keep appearing together in your reflections. There might be something deeper God is revealing here...`;
  } else if (primary.count >= 5) {
    message = `"${primary.theme}" has become a strong thread in your journey \u2014 ${primary.count} insights and counting. This feels significant.`;
  } else {
    message = `"${primary.theme}" keeps showing up in your reflections. There might be something bigger forming here...`;
  }

  return {
    type: 'theme-cluster',
    message,
    relatedThemes: themes.filter(t => t.count >= 2).map(t => t.theme),
    insightCount: primary.count,
  };
}

// ============ Growth Arc ============

function detectGrowthArc(insights: Insight[]): PatternNotice | null {
  if (insights.length < 6) return null;

  // Look at the earliest and most recent insights to see if themes have evolved
  const earliest = insights.slice(-3);
  const latest = insights.slice(0, 3);

  const earlyThemes = new Set(earliest.map(i => i.theme.toLowerCase()));
  const lateThemes = new Set(latest.map(i => i.theme.toLowerCase()));

  // Check if themes have changed (growth arc = different themes over time)
  const unchanged = [...earlyThemes].filter(t => lateThemes.has(t));
  if (unchanged.length === 0 && earlyThemes.size > 0 && lateThemes.size > 0) {
    const earlyList = [...earlyThemes].slice(0, 2).join(' and ');
    const lateList = [...lateThemes].slice(0, 2).join(' and ');
    return {
      type: 'growth-arc',
      message: `Your journey started with ${earlyList}, and now you're exploring ${lateList}. I can see growth unfolding...`,
      relatedThemes: [...earlyThemes, ...lateThemes],
      insightCount: insights.length,
    };
  }

  return null;
}

/**
 * Get all pattern notices (can return multiple).
 * Currently returns at most 1 for simplicity.
 */
export function getAllPatternNotices(): PatternNotice[] {
  const notice = analyzePatterns();
  return notice ? [notice] : [];
}
