import { describe, expect, it } from "vitest";
import { publicRouteMatrix } from "./public-ia";
import { publicMetadataForRoute } from "./public-metadata";

describe("WEB-OPT-05 public metadata source v1.282", () => {
  it("gives every indexable route unique truthful metadata", () => {
    const indexable = publicRouteMatrix.filter((entry) => entry.indexability === "index");
    expect(indexable).toHaveLength(40);
    const metadata = indexable.map((entry) => publicMetadataForRoute(entry.route));
    expect(metadata.every((entry) => Boolean(entry.title && entry.description && entry.canonical))).toBe(true);
    expect(new Set(metadata.map((entry) => entry.description)).size).toBe(metadata.length);
  });

  it("keeps archive routes canonical but explicitly noindex", () => {
    const archive = publicRouteMatrix.filter((entry) => entry.indexability === "noindex");
    expect(archive).toHaveLength(19);
    for (const route of archive) {
      expect(publicMetadataForRoute(route.route)).toMatchObject({ canonical: route.route, index: false });
    }
  });
});
