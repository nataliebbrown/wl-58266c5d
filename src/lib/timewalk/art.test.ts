import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS } from '../bibleApi';
import { ERAS } from './eras';
import { LIFE_TOPICS } from './dailyLife';

const ROOT = path.resolve(__dirname, '../../..');
const picks = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/data/timewalk-art-picks.json'), 'utf8')) as {
  id: string;
  era?: string;
  life?: string;
  kind: string;
  caption: string;
  artist?: string;
  ref?: [string, number, number];
}[];
const art = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/timewalk/art.json'), 'utf8')) as Record<string, { license: string; thumb: string; large: string; source: string; kind: string }>;

describe('TimeWalk images', () => {
  it('every pick has a unique id, a known place to show, and a caption', () => {
    const eras = new Set(ERAS.map(e => e.id));
    const topics = new Set(LIFE_TOPICS.map(t => t.id));
    expect(new Set(picks.map(p => p.id)).size).toBe(picks.length);
    for (const p of picks) {
      expect(p.era ? eras.has(p.era) : topics.has(p.life!), p.id).toBe(true);
      expect(['art', 'photo', 'artifact']).toContain(p.kind);
      expect(p.caption.length).toBeGreaterThan(3);
      if (p.kind !== 'photo') expect(p.artist, `${p.id} needs an artist or culture`).toBeTruthy();
    }
  });

  it('artwork references point to real chapters', () => {
    for (const p of picks.filter(p => p.ref)) {
      const book = BIBLE_BOOKS.find(b => b.name === p.ref![0]);
      expect(book, p.id).toBeTruthy();
      expect(p.ref![1]).toBeLessThanOrEqual(book!.chapters);
    }
  });

  it('every pick resolved with an open license and standard image sizes', () => {
    for (const p of picks) {
      const a = art[p.id];
      expect(a, `${p.id} missing from art.json`).toBeTruthy();
      expect(a.license).toMatch(/^(Public domain|CC0|CC BY(-SA)? \d)/);
      expect(a.source).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
      for (const url of [a.thumb, a.large]) {
        const m = url.match(/\/(\d+)px-/);
        if (m) expect([250, 330, 500, 960, 1280, 1920]).toContain(Number(m[1]));
        expect(url).not.toMatch(/\?/);
      }
    }
  });

  it('every era has artwork and most daily-life topics have a photo', () => {
    for (const e of ERAS) expect(picks.some(p => p.era === e.id), e.id).toBe(true);
    const covered = LIFE_TOPICS.filter(t => picks.some(p => p.life === t.id)).length;
    expect(covered).toBeGreaterThanOrEqual(LIFE_TOPICS.length - 4);
  });
});
