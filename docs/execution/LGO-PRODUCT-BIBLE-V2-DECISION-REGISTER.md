# LGO Product Bible v2 — Decision Register

Date: 2026-09-18
Status: REVIEW_REQUIRED
Purpose: separate source-consistent product direction from unresolved cross-document conflicts before new implementation.

## Decision state vocabulary

- LOCKED_BY_SOURCE: multiple current authoritative sources agree; implementation may plan against it.
- RECOMMENDED: assessment recommendation; owner acceptance still required.
- OPEN: source conflict exists; no implementation may silently choose.
- LEGACY_ONLY: supported for migration/history, not new product identity.

## D01 — Core product identity
State: LOCKED_BY_SOURCE

Linh Giới Online is a **2D Side-Scrolling Social Action MMORPG** with:
- Social MMORPG;
- Action;
- Progression;
- HD illustrated/anime 2D;
- side-view parallax maps;
- Linh Thành as social hub;
- Zone Network world structure.

This is consistent across current GDD, scenario production spine and runtime direction.
## D02 — Canonical player paths/classes
State: RECOMMENDED

Canonical runtime vocabulary:
- `vo` — Võ
- `kiem` — Kiếm
- `phap` — Pháp
- `co` — Cơ
- `linh` — Linh

Evidence:
- current Unity runtime/tests use five paths;
- current Java `CharacterClassCompatibility` accepts all five;
- legacy `class.martial` and `class.sword` already map to Võ/Kiếm.

Recommendation:
- all new writes use canonical five IDs;
- legacy IDs are LEGACY_ONLY migration inputs;
- player-facing Web/Admin never expose raw IDs.

Owner decision still required for whether Founder Alpha launches with all five paths or stages them.
## D03 — Founder Alpha class count
State: OPEN

Conflict:
- older GDD Founder Alpha section names only Sword/Martial;
- current 2D product direction and Character Hub are organized around five paths.

Options:
A. Alpha starts with all five paths.
B. Alpha launches with Võ/Kiếm and exposes Pháp/Cơ/Linh later.
C. All five exist at character identity level, but only a subset receives full combat kits initially.

Assessment recommendation:
Prefer C if production bandwidth is limited.
It preserves canonical identity without pretending all five combat pipelines are equally production-ready.

No implementation should infer one option until owner acceptance.
## D04 — Tutorial Shadow Slime
State: OPEN

Conflict:
- GDD + 2D Scenario Production Spine + current runtime: class skill is used to defeat Shadow Slime;
- Early Game Scenario Bible SCN-004: Shadow Slime is a non-combat warning and must not have HP/attack objective.

Assessment recommendation:
Keep **combat Shadow Slime** in the canonical tutorial because it closes movement -> skill -> combat -> return-to-town learning.
Move the ambient “Dấu vết Âm Khí” concept to a separate scenario/content ID instead of overloading Shadow Slime.

Required action after owner acceptance:
update/supersede the conflicting SCN-004 entry rather than leaving two authorities.
## D05 — Early-game canonical path
State: RECOMMENDED

Proposed canonical onboarding:
1. login;
2. character select;
3. enter Đông Môn;
4. meet Người Giữ Cổng;
5. training object;
6. movement;
7. jump;
8. dash;
9. class skill;
10. first combat;
11. return to Gate Keeper;
12. unlock Linh Thành / Quảng Trường.

This matches the current vertical-slice direction and preserves the city -> field -> city loop.

The exact reward/progression mutation after first combat remains OPEN until progression/inventory authority exists.
## D06 — World/map ID authority
State: OPEN

Current naming spans:
- design terms such as Linh Thành / Đông Môn / Đông Vực;
- runtime `Map01A`;
- product response `map-01a-cong-dong-lam` references in tests.

Required decision:
define stable machine IDs independently from display/localization names.

Recommendation:
`world/zone/map` IDs are backend/GameData contracts;
Vietnamese display names remain content/localization.
Web consumes both but never derives one from the other.
## D07 — Player Web product role
State: RECOMMENDED

Player Web is a **companion/player hub**, not a browser port of Unity gameplay.

Primary jobs:
- account/security;
- characters;
- progression/loadout;
- social/community;
- events;
- support.

Public Web remains marketing/content.
Gameplay remains Unity.

This aligns with existing Portal route investment and external MMORPG companion-site patterns.
## D08 — Admin product role
State: RECOMMENDED

Admin/Ops is a **Game Operations Console**, not a generic CRUD panel.

Primary jobs:
- Control Center;
- Player 360;
- support/triage;
- trust & safety;
- audit;
- world/session operations;
- LiveOps;
- economy only later.

No mutation opens before staff RBAC + audit + idempotency.
## D09 — Authority order
State: RECOMMENDED

For new system behavior:

1. Product Bible / accepted scenario decision
2. backend/GameData authority
3. published contract
4. Unity consumer
5. Player Web consumer
6. Admin consumer
7. E2E evidence

UI fixture shape never promotes itself into a canonical backend contract.
## D10 — Public Web
State: LOCKED_BY_CURRENT_OWNER_DIRECTION

Public Web optimization is paused/frozen.
No reassessment output here reopens public UI work.

Only contract-driven links/status/content may be revisited later if a new product task explicitly requires them.
## Owner decisions required before implementation planning is promoted

Required:
- D03 Founder Alpha class count/staging;
- D04 Shadow Slime tutorial conflict;
- D06 stable world/map ID policy.

Strongly recommended acceptance:
- D02 canonical five runtime IDs for new writes;
- D05 onboarding sequence;
- D07 Player Web companion role;
- D08 Admin operations-console role;
- D09 authority order.

Until these are accepted, roadmap phases can be estimated but not promoted into implementation tasks.
