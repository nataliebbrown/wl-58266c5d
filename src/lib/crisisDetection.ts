// ============ Types ============

export type CrisisLevel = 'none' | 'low' | 'medium' | 'high';

export interface CrisisResult {
  detected: boolean;
  level: CrisisLevel;
  matchedPhrase?: string;
}

// ============ Keyword Lists ============

const HIGH_RISK = [
  'suicide', 'suicidal', 'kill myself', 'end my life',
  'want to die', 'better off dead', 'not worth living',
  'no reason to live', 'end it all',
];

const MEDIUM_RISK = [
  'self-harm', 'hurt myself', 'cutting myself', 'overdose',
  'being abused', 'domestic violence', 'he hits me', 'she hits me',
  'sexually assaulted', 'being hurt',
];

const LOW_RISK = [
  'hopeless', 'no hope', 'can\'t go on',
  'abuse', 'violence', 'trapped',
  'nobody cares', 'all alone',
];

// ============ Spiritual False Positive Phrases ============
// These phrases contain crisis keywords but are normal spiritual language.
// They should NOT trigger crisis detection.

const SPIRITUAL_FALSE_POSITIVES = [
  'dying to self',
  'dying to sin',
  'die to self',
  'die to sin',
  'crucified with christ',
  'crucified with him',
  'put to death the deeds',
  'put to death the old',
  'old self must die',
  'dead to sin',
  'dead to the world',
  'death to self',
  'death of self',
  'lose my life to find it',
  'lose his life',
  'take up your cross',
  'take up his cross',
  'take up my cross',
  'living sacrifice',
  'the death of christ',
  'christ died for',
  'jesus died for',
  'he died for',
  'wages of sin is death',
  'death has no sting',
  'death is swallowed',
  'spiritual death',
  'death and resurrection',
  'valley of the shadow of death',
  'psalm 23',
  'kill the flesh',
  'kill sin',
  'mortify the deeds',
  'suffering of christ',
  'fellowship of his sufferings',
  'paul suffered',
  'persecution',
  'dark night of the soul',
  'desert season',
  'wilderness season',
  'spiritual warfare',
];

// ============ Detection ============

/**
 * Detect potential crisis in user message.
 * Filters out spiritual language false positives.
 */
export function detectCrisis(message: string): CrisisResult {
  const lower = message.toLowerCase();

  // First, check if the message matches any spiritual false positive phrases.
  // If the ENTIRE context around a keyword is spiritual, don't flag it.
  const isSpiritualContext = SPIRITUAL_FALSE_POSITIVES.some(phrase =>
    lower.includes(phrase)
  );

  // Check high risk
  for (const keyword of HIGH_RISK) {
    if (lower.includes(keyword)) {
      // If it's a spiritual context AND the keyword appears only within that context,
      // we suppress the alert. But if there are other indicators, still flag it.
      if (isSpiritualContext && !hasAdditionalCrisisIndicators(lower, keyword)) {
        continue;
      }
      return { detected: true, level: 'high', matchedPhrase: keyword };
    }
  }

  // Check medium risk
  for (const keyword of MEDIUM_RISK) {
    if (lower.includes(keyword)) {
      if (isSpiritualContext && !hasAdditionalCrisisIndicators(lower, keyword)) {
        continue;
      }
      return { detected: true, level: 'medium', matchedPhrase: keyword };
    }
  }

  // Check low risk
  for (const keyword of LOW_RISK) {
    if (lower.includes(keyword)) {
      if (isSpiritualContext && !hasAdditionalCrisisIndicators(lower, keyword)) {
        continue;
      }
      return { detected: true, level: 'low', matchedPhrase: keyword };
    }
  }

  return { detected: false, level: 'none' };
}

/**
 * Check if there are additional crisis indicators beyond the matched keyword
 * that suggest this is a genuine crisis rather than spiritual language.
 */
function hasAdditionalCrisisIndicators(message: string, matchedKeyword: string): boolean {
  // Remove the matched keyword and check if other concerning patterns remain
  const remaining = message.replace(matchedKeyword, '');

  const additionalIndicators = [
    'please help', 'i need help', 'emergency',
    'right now', 'tonight', 'today',
    'plan to', 'going to', 'about to',
    'can\'t take it', 'can\'t do this',
    'hurting', 'in pain', 'scared',
  ];

  return additionalIndicators.some(indicator => remaining.includes(indicator));
}
