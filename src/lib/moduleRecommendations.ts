import type { ModuleType } from '@/types/wholelicity';
import type { PersonaCode } from './personas';

// ============ Types ============

export interface ModuleRecommendation {
  module: ModuleType;
  priority: number; // 1 = highest
  reason: string;
}

// ============ Module Rankings Per Persona ============

const PERSONA_MODULE_RANKINGS: Record<PersonaCode, ModuleRecommendation[]> = {
  'curious-seeker': [
    { module: 'wisdom', priority: 1, reason: 'Sophia can answer your questions in a conversational, pressure-free way.' },
    { module: 'formation', priority: 2, reason: 'Build foundational spiritual habits at your own pace.' },
    { module: 'community', priority: 3, reason: 'Connect with others on a similar journey.' },
    { module: 'timewalk', priority: 4, reason: 'Experience the stories of the Bible in an immersive way.' },
    { module: 'patterns', priority: 5, reason: 'See how themes connect across Scripture.' },
    { module: 'translation', priority: 6, reason: 'Explore cultural context behind the text.' },
  ],

  'devoted-explorer': [
    { module: 'patterns', priority: 1, reason: 'Discover connections you have never noticed in familiar passages.' },
    { module: 'wisdom', priority: 2, reason: 'Sophia will challenge you to go deeper.' },
    { module: 'translation', priority: 3, reason: 'See familiar texts through a cross-cultural lens.' },
    { module: 'formation', priority: 4, reason: 'Strengthen spiritual disciplines you already practice.' },
    { module: 'timewalk', priority: 5, reason: 'Walk through the historical world behind the text.' },
    { module: 'community', priority: 6, reason: 'Share your discoveries with others.' },
  ],

  'shepherd-guide': [
    { module: 'wisdom', priority: 1, reason: 'Sophia supports sermon prep, counseling, and personal renewal.' },
    { module: 'community', priority: 2, reason: 'Tools for leading small groups and building community.' },
    { module: 'patterns', priority: 3, reason: 'Biblical patterns enrich your teaching.' },
    { module: 'formation', priority: 4, reason: 'Tend your own soul amid the demands of ministry.' },
    { module: 'translation', priority: 5, reason: 'Cultural bridge-building for diverse congregations.' },
    { module: 'timewalk', priority: 6, reason: 'Bring historical context alive for your community.' },
  ],

  'scholar-pilgrim': [
    { module: 'patterns', priority: 1, reason: 'Systematic analysis of intertextual connections.' },
    { module: 'translation', priority: 2, reason: 'Original language tools and cross-cultural hermeneutics.' },
    { module: 'wisdom', priority: 3, reason: 'Sophia engages with scholarly nuance and primary sources.' },
    { module: 'timewalk', priority: 4, reason: 'Reconstruct the historical world of the text.' },
    { module: 'formation', priority: 5, reason: 'Let academic study feed devotional life.' },
    { module: 'community', priority: 6, reason: 'Share research with fellow learners.' },
  ],

  'thoughtful-questioner': [
    { module: 'wisdom', priority: 1, reason: 'A safe space for honest, no-agenda questions with Sophia.' },
    { module: 'formation', priority: 2, reason: 'Explore spiritual practices without pressure.' },
    { module: 'timewalk', priority: 3, reason: 'See how people in history wrestled with the same questions.' },
    { module: 'patterns', priority: 4, reason: 'Follow threads of meaning across the Bible.' },
    { module: 'community', priority: 5, reason: 'Connect with others who share your questions.' },
    { module: 'translation', priority: 6, reason: 'Explore different cultural perspectives on faith.' },
  ],

  'wounded-healer': [
    { module: 'wisdom', priority: 1, reason: 'Sophia will sit with you in the tension and point toward hope.' },
    { module: 'formation', priority: 2, reason: 'Gentle spiritual rhythms for difficult seasons.' },
    { module: 'community', priority: 3, reason: 'You do not have to walk through this alone.' },
    { module: 'timewalk', priority: 4, reason: 'Discover how God met others in their darkest moments.' },
    { module: 'patterns', priority: 5, reason: 'See redemption patterns woven through Scripture.' },
    { module: 'translation', priority: 6, reason: 'Cultural insights into lament and restoration.' },
  ],

  'formation-seeker': [
    { module: 'formation', priority: 1, reason: 'Build and track intentional spiritual disciplines.' },
    { module: 'patterns', priority: 2, reason: 'Notice growth patterns in your own journey.' },
    { module: 'wisdom', priority: 3, reason: 'Sophia helps connect insights across conversations.' },
    { module: 'community', priority: 4, reason: 'Grow alongside others pursuing formation.' },
    { module: 'timewalk', priority: 5, reason: 'Learn from the spiritual practices of historical believers.' },
    { module: 'translation', priority: 6, reason: 'Broaden your understanding of global spiritual practice.' },
  ],
};

// ============ Public API ============

/**
 * Get module recommendations ranked for a specific persona.
 */
export function getModuleRecommendations(personaCode: PersonaCode): ModuleRecommendation[] {
  return PERSONA_MODULE_RANKINGS[personaCode] ?? PERSONA_MODULE_RANKINGS['curious-seeker'];
}

/**
 * Get the top N recommended modules for a persona.
 */
export function getTopModules(personaCode: PersonaCode, count: number = 3): ModuleRecommendation[] {
  return getModuleRecommendations(personaCode).slice(0, count);
}

/**
 * Get the primary (highest-priority) module for a persona.
 */
export function getPrimaryModule(personaCode: PersonaCode): ModuleRecommendation {
  return getModuleRecommendations(personaCode)[0];
}

/**
 * Check if a specific module is in the top N for a persona.
 */
export function isHighPriorityModule(
  personaCode: PersonaCode,
  module: ModuleType,
  topN: number = 3
): boolean {
  return getTopModules(personaCode, topN).some(r => r.module === module);
}
