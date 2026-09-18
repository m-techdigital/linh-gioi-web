#!/usr/bin/env python3
"""Guard for WEB-OPT-22 content fixture modularization v1.299."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]
DOMAINS=("product","editorial","support","release","historical")
EXPECTED=(
 "PROVISIONAL_WEB_FIXTURE","NOT_CANONICAL_BACKEND_CONTRACT","publicHeroStats","worldPillars","playerJourneySteps",
 "publicRoadmapItems","visualPolishItems","responsiveBreakpoints","publicPageFocus","communityPrinciples",
 "worldStoryChapters","beginnerGuideSections","downloadStatusNotes","supportFaqs","communityReadinessSteps",
 "supportTopics","downloadReadiness","contentEntries","downloadBuilds","contentDetailSections","guideDetailSteps",
 "downloadTrustGates","releaseEvidenceRequirements","statusTrustSurfaces","playerSupportExpectations",
 "communityOnboardingPaths","communityFeedbackChannels","roadmapDecisionGates","stagedReleaseMessages",
 "publicContentHubs","playerEntryQuestions","publicRouteGroups","gameplayLoopStages","beginnerExpectations",
 "guideWorldNavigationLinks","gameplayScopeBoundaries","playerSafetyPrinciples","supportIssuePaths",
 "closedTestSupportExpectations","communityConductRules","accessibilityReadabilityPrinciples","routeReadabilityChecks",
 "mobileScannabilityRules","focusOrderCheckpoints","performanceCopyBudgetPrinciples","staticRouteCompositionRules",
 "perceivedLoadSignals","mobileDensityBudgets","routeContinuityBridges","conversionSafeCtas","journeyFrictionChecks",
 "pageCohesionCheckpoints","playerTrustSignals","releaseNarrativeStages","closedTestReadinessChecks",
 "trustJourneyCheckpoints","releaseReadinessHubItems","ownerReleaseGates","testerExpectationCopy",
 "releaseSurfaceAlignment","closedTesterChecklist","safeFeedbackTemplates","knownLimitationNotes",
 "deviceReportTemplateFields","faqDiscoveryGroups","faqHelpfulnessPrompts","issueCategoryRoutes","noSearchBackendNotes",
 "downloadExplainers","statusExplainers","gameExperiencePillars","classPaths","worldRouteStops","narrativeChapters",
 "sampleSessionBeats","publicGameArtAssets","homeDiscoveryMoments"
)

def read(rel):
 p=ROOT/rel
 if not p.is_file():ERRORS.append("missing "+rel);return ""
 return p.read_text(encoding="utf-8")

def exports(text):
 return re.findall(r"^export const ([A-Za-z0-9_]+)",text,re.M)

def main():
 ERRORS.clear()
 facade=read("packages/content/src/fixtures.ts")
 for domain in DOMAINS:
  marker=f'export * from "./fixtures/{domain}";'
  if marker not in facade:ERRORS.append("fixture facade missing "+marker)
 if re.search(r"^export const ",facade,re.M):ERRORS.append("fixture facade still owns data declarations")
 if facade and len(facade.splitlines())>12:ERRORS.append("fixture facade remains too large")
 owned=[]
 for domain in DOMAINS:
  text=read(f"packages/content/src/fixtures/{domain}.ts")
  owned.extend(exports(text))
 if owned:
  if len(owned)!=len(EXPECTED):ERRORS.append(f"expected {len(EXPECTED)} owned exports, found {len(owned)}")
  if len(set(owned))!=len(owned):ERRORS.append("fixture exports have duplicate domain owners")
  missing=sorted(set(EXPECTED)-set(owned));extra=sorted(set(owned)-set(EXPECTED))
  if missing:ERRORS.append("missing fixture exports: "+", ".join(missing))
  if extra:ERRORS.append("unexpected fixture exports: "+", ".join(extra))
 helper=read("tools/web_fixture_source.py")
 for marker in ("FIXTURE_DOMAIN_FILES","def fixture_source","fixtures/product.ts","fixtures/editorial.ts","fixtures/support.ts","fixtures/release.ts","fixtures/historical.ts"):
  if marker not in helper:ERRORS.append("logical fixture-source helper missing "+marker)

 manifest_raw=read("tools/web_active_suite_manifest_v1298.json")
 try:manifest=json.loads(manifest_raw) if manifest_raw else {}
 except json.JSONDecodeError:manifest={}
 active=set(manifest.get("active",{}).get("validators",[]))
 if "validate_web_opt_content_fixture_modularization_v1299.py" not in active:
  ERRORS.append("v1.299 validator not registered in active-suite authority")
 offenders=[]
 for name in active:
  p=ROOT/"tools"/name
  if not p.is_file():continue
  text=p.read_text(encoding="utf-8")
  if "packages/content/src/fixtures.ts" in text and name!="validate_web_opt_content_fixture_modularization_v1299.py":
   if "fixture_source(ROOT)" not in text:offenders.append(name)
 if offenders:ERRORS.append("active validators still inspect physical fixture monolith: "+", ".join(sorted(offenders)))
 test=read("packages/content/src/fixture-modules.test.ts")
 for marker in ("uses a small stable facade over five domain owners","assigns every existing fixture export to exactly one domain","keeps the package public export facade unchanged"):
  if marker not in test:ERRORS.append("fixture module test missing "+marker)
 index=read("packages/content/src/index.ts")
 if '} from "./fixtures";' not in index:ERRORS.append("package public fixture facade changed")
 if ERRORS:
  print("WEB OPT CONTENT FIXTURE MODULARIZATION v1.299 VALIDATION FAIL")
  for e in ERRORS:print("- "+e)
  return 1
 print("WEB OPT CONTENT FIXTURE MODULARIZATION v1.299 VALIDATION PASS")
 print(f"domains={len(DOMAINS)} exports={len(EXPECTED)} active_fixture_guard_migrations=21")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
