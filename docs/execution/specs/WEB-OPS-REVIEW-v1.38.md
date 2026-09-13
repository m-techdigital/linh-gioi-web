# Ops review workspace v1.38

SELECT: current task v1.38. SPEC_LOCK: fill remaining empty Control Center and Trust & Safety compositions and make home workspace cards navigable. Control Center summarizes existing fixture queues with links to review surfaces; Trust & Safety presents one illustrative case, review steps and activity. Security reuses the same presentation-only approval steps. All data in ops-fixtures.ts; no new primitive, network, role semantics or mutation. Shared ProgressSteps is reused as its second app consumer. Keep historical boundary phrases and shared shell owners.

TDD source validator must fail for absent compositions before implementation; browser checks navigate home to review, inspect steps and disabled controls at desktop/mobile. Target Ops lint/types/build once; reuse Portal/Public evidence. Closure requires screenshots, HTTP, source-tree validators, artifacts/replay and git push. Next is WEB-08 external accepted contract gate, not another invented fixture backend.

Closure review: fix missing boundaryBadge on Portal /access after rendered-text RED; this is a scoped v1.36 follow-up. Portal lint/types/build and access browser/visual verification rerun because source changed.
