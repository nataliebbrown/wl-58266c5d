// ============ Study sessions (saved progress) ============

import { saveGeneralJournalEntry } from '@/lib/journalStorage';
import { fillTemplate, getMethod } from './methods';

export interface StudyPassageRef {
  book: string;
  chapter: number;
}

export interface StudySession {
  id: string;
  methodId: string;
  passage: StudyPassageRef;
  /** Character study */
  person?: string;
  characterId?: string;
  /** Word study: chosen word */
  word?: string;
  /** SOAP: chosen verse */
  verse?: { number: number; text: string };
  /** Answers by step id */
  answers: Record<string, string>;
  /** Portraits attribute ids chosen on the reveals-god step */
  attributeIds: string[];
  stepIndex: number;
  status: 'in-progress' | 'complete';
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  journalEntryId?: string;
}

const KEY = 'wl-study-sessions';

export function getSessions(): StudySession[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSession(id: string): StudySession | undefined {
  return getSessions().find(s => s.id === id);
}

export function saveSession(session: StudySession): void {
  const updated = { ...session, updatedAt: new Date().toISOString() };
  const rest = getSessions().filter(s => s.id !== session.id);
  try {
    localStorage.setItem(KEY, JSON.stringify([updated, ...rest].slice(0, 200)));
  } catch {
    /* storage unavailable */
  }
}

export function deleteSession(id: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(getSessions().filter(s => s.id !== id)));
  } catch {
    /* ignore */
  }
}

export function createSession(
  methodId: string,
  passage: StudyPassageRef,
  extra: { person?: string; characterId?: string } = {}
): StudySession {
  const now = new Date().toISOString();
  return {
    id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    methodId,
    passage,
    ...extra,
    answers: {},
    attributeIds: [],
    stepIndex: 0,
    status: 'in-progress',
    startedAt: now,
    updatedAt: now,
  };
}

export function passageLabel(p: StudyPassageRef): string {
  return `${p.book === 'Psalms' ? 'Psalm' : p.book} ${p.chapter}`;
}

/** Plain-text write-up of a finished study, for the journal. */
export function formatSessionForJournal(session: StudySession): { title: string; text: string } {
  const method = getMethod(session.methodId);
  const passage = passageLabel(session.passage);
  const vars = { person: session.person, word: session.word, passage };
  const lines: string[] = [];
  if (session.person) lines.push(`Person: ${session.person}`);
  if (session.verse) lines.push(`Verse: ${passage}:${session.verse.number} — “${session.verse.text}”`);
  if (session.word) lines.push(`Word: “${session.word}”`);
  if (lines.length) lines.push('');
  for (const step of method?.steps ?? []) {
    const answer = session.answers[step.id]?.trim();
    if (!answer) continue;
    lines.push(`${step.title}`);
    lines.push(`${fillTemplate(step.prompt, vars)}`);
    lines.push(answer);
    lines.push('');
  }
  return {
    title: `${method?.name ?? 'Study'} · ${session.person ? `${session.person} · ` : ''}${passage}`,
    text: lines.join('\n').trim(),
  };
}

/** Save the finished study to the journal (updates the same entry if saved before). */
export function saveSessionToJournal(session: StudySession): string {
  const { title, text } = formatSessionForJournal(session);
  const now = new Date().toISOString();
  const id = session.journalEntryId ?? `study-${session.id}`;
  saveGeneralJournalEntry({ id, title, text, createdAt: session.completedAt ?? now, updatedAt: now });
  return id;
}
