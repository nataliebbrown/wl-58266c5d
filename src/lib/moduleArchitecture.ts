/**
 * Module Architecture — Type definitions for future Wholelicity modules.
 *
 * Each module in the platform will implement this interface,
 * allowing the dashboard, navigation, and Sophia to interact
 * with any module through a common contract.
 *
 * This file is TYPES ONLY — no runtime code.
 * Modules will register themselves when they are built.
 */

import type { ModuleType } from '@/types/wholelicity';
import type { PersonaCode } from './personas';

// ============ Module Interface ============

export interface WholelicityModule {
  /** Unique identifier matching ModuleType. */
  id: ModuleType;

  /** Display name. */
  name: string;

  /** Short description for previews. */
  description: string;

  /** Route path (e.g. '/bible'). */
  route: string;

  /** Whether the module is currently enabled. */
  enabled: boolean;

  /** Version string for tracking feature rollouts. */
  version: string;

  /** Capabilities this module provides. */
  capabilities: ModuleCapability[];

  /** Sophia integration points. */
  sophia: ModuleSophiaConfig;
}

// ============ Capabilities ============

export type ModuleCapability =
  | 'insights'        // Can produce insights for the constellation
  | 'highlights'      // Supports highlighting/bookmarking content
  | 'community'       // Has shared/social features
  | 'sophia-context'  // Can provide context to Sophia conversations
  | 'patterns'        // Can detect/display patterns
  | 'daily-content'   // Provides daily-refreshing content
  | 'search'          // Content is searchable
  | 'offline';        // Can work without network

// ============ Sophia Integration ============

export interface ModuleSophiaConfig {
  /** System prompt additions when Sophia is operating in this module's context. */
  contextPromptTemplate: string;

  /** Pre-built prompts users can tap to ask Sophia about module content. */
  suggestedPrompts: string[];

  /** How Sophia's tone should adapt for this module. */
  toneAdjustment?: string;
}

// ============ Module Registry ============

export interface ModuleRegistry {
  /** Register a module. */
  register(module: WholelicityModule): void;

  /** Get a registered module by ID. */
  get(id: ModuleType): WholelicityModule | undefined;

  /** Get all registered modules. */
  getAll(): WholelicityModule[];

  /** Get modules enabled for a specific persona. */
  getForPersona(personaCode: PersonaCode): WholelicityModule[];

  /** Check if a module has a specific capability. */
  hasCapability(id: ModuleType, capability: ModuleCapability): boolean;
}

// ============ Module Events ============

/** Events a module can emit for cross-module communication. */
export type ModuleEvent =
  | { type: 'insight-created'; moduleId: ModuleType; insightId: string }
  | { type: 'highlight-created'; moduleId: ModuleType; reference: string }
  | { type: 'pattern-detected'; moduleId: ModuleType; pattern: string }
  | { type: 'content-shared'; moduleId: ModuleType; contentId: string }
  | { type: 'sophia-context-updated'; moduleId: ModuleType; context: Record<string, unknown> };

export interface ModuleEventBus {
  emit(event: ModuleEvent): void;
  on(type: ModuleEvent['type'], handler: (event: ModuleEvent) => void): () => void;
}
