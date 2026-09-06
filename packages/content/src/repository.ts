import { contentEntries } from "./fixtures";
import type { ContentCategory, ContentEntry, ContentRepository } from "./types";

export class LocalContentRepository implements ContentRepository {
  private readonly entries: ContentEntry[];

  constructor(entries: ContentEntry[] = contentEntries) {
    this.entries = entries;
  }

  list(category?: ContentCategory) {
    const visible = this.entries.filter((entry) => entry.status === "published");
    return category ? visible.filter((entry) => entry.category === category) : visible;
  }

  featured(limit = 3) {
    return this.list().filter((entry) => entry.featured).slice(0, limit);
  }

  bySlug(slug: string) {
    return this.list().find((entry) => entry.slug === slug);
  }

  categories() {
    return [...new Set(this.entries.map((entry) => entry.category))].sort();
  }
}

export const localContentRepository = new LocalContentRepository();
