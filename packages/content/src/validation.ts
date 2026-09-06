import { contentEntries } from "./fixtures";
import type { ContentEntry } from "./types";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function findDuplicateSlugs(entries: ContentEntry[] = contentEntries) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.slug)) duplicates.add(entry.slug);
    seen.add(entry.slug);
  }
  return [...duplicates].sort();
}

export function findInvalidDates(entries: ContentEntry[] = contentEntries) {
  return entries.filter((entry) => Number.isNaN(Date.parse(entry.publishedAt))).map((entry) => entry.slug);
}

export function findInvalidSlugs(entries: ContentEntry[] = contentEntries) {
  return entries.filter((entry) => !SLUG_RE.test(entry.slug)).map((entry) => entry.slug);
}

export function assertContentFixturesValid(entries: ContentEntry[] = contentEntries) {
  const duplicates = findDuplicateSlugs(entries);
  const invalidDates = findInvalidDates(entries);
  const invalidSlugs = findInvalidSlugs(entries);
  if (duplicates.length || invalidDates.length || invalidSlugs.length) {
    throw new Error(`Invalid content fixtures: duplicates=${duplicates.join(",")}; invalidDates=${invalidDates.join(",")}; invalidSlugs=${invalidSlugs.join(",")}`);
  }
}
