import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addPortraitEntry, countByAttribute, deletePortraitEntry, getPortraitEntries } from './portraits';

describe('Portraits of God', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
    });
  });

  it('requires text and at least one attribute', () => {
    expect(addPortraitEntry({ attributeIds: [], text: 'God is good', source: 'journal' })).toBeNull();
    expect(addPortraitEntry({ attributeIds: ['good'], text: '   ', source: 'journal' })).toBeNull();
    expect(getPortraitEntries()).toHaveLength(0);
  });

  it('stores entries newest first, counts by attribute, and deletes', () => {
    const a = addPortraitEntry({ attributeIds: ['faithful'], text: 'He kept His promise to Abraham.', reference: 'Genesis 21', source: 'study' })!;
    addPortraitEntry({ attributeIds: ['faithful', 'loving'], text: 'His mercies never fail.', source: 'meditation' });
    const entries = getPortraitEntries();
    expect(entries[0].text).toBe('His mercies never fail.');
    expect(countByAttribute(entries)).toEqual({ faithful: 2, loving: 1 });
    deletePortraitEntry(a.id);
    expect(getPortraitEntries()).toHaveLength(1);
  });
});
