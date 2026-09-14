# LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-REPORT-v1.93

Status: WEB_CLOSED.

Task: WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93.

v1.93 creates a professional UI/UX layout design reference for the homepage so future visual work has a clear target. It also adds browser/e2e coverage that the live homepage hero renders as a visible split hero in the first viewport instead of relying only on source or computed style checks.

Evidence recorded for closure:

- RED browser/e2e reproduced missing saved homepage design reference asset.
- GREEN browser/e2e passed after adding the design reference and verifying live homepage hero dimensions.
- Source validator covers design reference files, e2e file and handoff docs.
- Desktop/mobile e2e covers reference availability, hero/h1/CTA/scene visible boxes, horizontal overflow and font caps.

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
