import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BIBLE_BOOKS } from './bibleApi';
import { OSIS, confidenceLevel } from './bibleGeo';

const DATA_DIR = path.resolve(__dirname, '../../public/data/bible-geo');

describe('bibleGeo', () => {
  it('maps every Bible book to an existing places file', () => {
    for (const book of BIBLE_BOOKS) {
      const osis = OSIS[book.name];
      expect(osis, `${book.name} has no OSIS code`).toBeTruthy();
      expect(fs.existsSync(path.join(DATA_DIR, 'places', `${osis}.json`)), `${osis}.json missing`).toBe(true);
    }
  });

  it('ships a basemap whose polygons are wound for d3 (no inverted shapes)', async () => {
    const { geoArea } = await import('d3-geo');
    const basemap = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'basemap.json'), 'utf8'));
    for (const f of [...basemap.land.features, ...basemap.lakes.features]) {
      expect(geoArea(f)).toBeLessThan(2 * Math.PI);
    }
  });

  it('indexes places by chapter and verse (Acts 13 includes Paphos at v. 6)', () => {
    const acts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'places', 'Acts.json'), 'utf8'));
    const ch13: [string, number[]][] = acts.chapters['13'];
    const paphos = ch13.find(([id]) => acts.places[id].n === 'Paphos');
    expect(paphos?.[1]).toContain(6);
  });

  it('buckets confidence scores', () => {
    expect(confidenceLevel(1000)).toBe('confident');
    expect(confidenceLevel(500)).toBe('likely');
    expect(confidenceLevel(120)).toBe('uncertain');
  });
});
