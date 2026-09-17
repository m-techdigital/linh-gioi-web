import { describe, expect, it } from "vitest";
import { contentEntries } from "./fixtures";
import {
  archiveNewsEntries,
  playerNewsEntries,
  publicRouteMatrix,
  publicLanguageContract,
  routePolicy,
} from "./public-ia";

describe("WEB-OPT-04 public IA/player-language contract v1.281", () => {
  it("classifies all 59 public routes exactly once", () => {
    expect(publicRouteMatrix).toHaveLength(59);
    expect(new Set(publicRouteMatrix.map((entry) => entry.route)).size).toBe(59);
    expect(publicRouteMatrix.every((entry) => ["product", "guide", "news", "support", "archive"].includes(entry.owner))).toBe(true);
  });

  it("keeps current web-program news out of primary player discovery", () => {
    const news = contentEntries.filter((entry) => entry.category === "news" && entry.status === "published");
    expect(news).toHaveLength(17);
    expect(playerNewsEntries()).toHaveLength(0);
    expect(archiveNewsEntries().map((entry) => entry.slug)).toEqual(news.map((entry) => entry.slug));
  });

  it("makes the fixture-only events route an intentional archive surface", () => {
    expect(routePolicy("/events")).toMatchObject({ owner: "archive", discovery: "archive", indexability: "noindex" });
    expect(routePolicy("/patch-notes")).toMatchObject({ owner: "archive", discovery: "archive", indexability: "noindex" });
  });

  it("defines player-language rules that keep engineering history out of primary discovery", () => {
    expect(publicLanguageContract.archiveOnlyTerms).toEqual(expect.arrayContaining(["WEB v", "fixture", "runtime", "e2e", "source-owned"]));
    expect(publicLanguageContract.trustTerms).toEqual(expect.arrayContaining(["checksum", "SHA256"]));
    expect(publicLanguageContract.preferredTerms["backend"]).toBeTruthy();
  });
});
