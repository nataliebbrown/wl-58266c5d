import type { ModuleType } from '@/types/wholelicity';

// ============ Types ============

export interface WaitlistEntry {
  module: ModuleType;
  signedUpAt: string;
}

// ============ Storage ============

const STORAGE_KEY = 'wl-waitlist';

function loadEntries(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: WaitlistEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// ============ Public API ============

export function isOnWaitlist(module: ModuleType): boolean {
  return loadEntries().some(e => e.module === module);
}

export function joinWaitlist(module: ModuleType): void {
  const entries = loadEntries();
  if (entries.some(e => e.module === module)) return;
  entries.push({ module, signedUpAt: new Date().toISOString() });
  saveEntries(entries);
}

export function leaveWaitlist(module: ModuleType): void {
  const entries = loadEntries();
  saveEntries(entries.filter(e => e.module !== module));
}

export function getWaitlistModules(): ModuleType[] {
  return loadEntries().map(e => e.module);
}

export function getWaitlistCount(): number {
  return loadEntries().length;
}
