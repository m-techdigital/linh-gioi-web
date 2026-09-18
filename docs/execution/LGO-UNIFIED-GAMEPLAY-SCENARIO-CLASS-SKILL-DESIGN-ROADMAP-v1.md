# LGO Unified Gameplay / Scenario / Class / Skill / Design Roadmap v1

Date: 2026-09-18
Status: DRAFT — WAITING_CROSS_SANDBOX REVIEW
Task: `T-f9c2c132c769`
Umbrella Mission: `MS-57a638c72421`

## 1. Authority model

This roadmap reconciles three distinct sources and does not pretend they are identical:

1. **CURRENT AUTHORITY** — current Product Bible v2, GDD, 2D Direction Lock, Scenario Production Spine, Map A-Z and accepted runtime/data contracts.
2. **OWNER LONG-TERM INTENT** — repeated owner decisions from prior LGO sandbox discussions about Lv100 progression, modular equipment/art, five classes, PC/mobile presentation, visual/runtime evidence and production workflow.
3. **HISTORICAL / SUPERSEDED / OPEN** — old 3D direction, old two-class identity interpretation, historical names/boards and unresolved naming/content mappings.

Current source wins implementation compatibility; owner long-term intent remains product-design input and must not be discarded merely because current runtime has not implemented it yet.
## 2. Product spine — CURRENT AUTHORITY

LGO is a **2D Side-Scrolling Social Action MMORPG** with three equal pillars:

- Social MMORPG
- Action
- Progression

North Star:
- Linh Thành is the persistent social hub and a place worth returning to.
- Âm Giới Xâm Lăng is the long-term social-action signature event.
- The game must not collapse into “only kill mobs”.
- Zone Network replaces a seamless open world.

Core loop:

`Login → Character → Linh Thành → Social/Adventure → Combat/Objective → Reward → Upgrade/Identity → Return to City → New Content`
## 3. Canonical onboarding / story spine

### Opening
- dark screen / bell;
- purple fracture above Linh Thành;
- city talismans react;
- camera introduces city/NPC/player/spirit/technology/magic;
- Âm Giới portal appears;
- cut to Linh Thành – Đông Môn.

### Tutorial — Linh Thành / Đông Môn
1. spawn;
2. approach Người Giữ Cổng;
3. dialogue;
4. approach Bia/Đá Luyện;
5. movement;
6. jump;
7. dash;
8. use class skill;
9. fight Shadow Slime;
10. return to NPC;
11. open Linh Thành.

### Chapter 1 — Vết Nứt Đông Môn
Linh Thành → Đông Môn → Linh Lâm.
Threats: Shadow Slime, Corrupted Spirit, Lost Merchant thread.
End target: Mini Boss Linh Thú Biến Dị + Âm Giới Fragment.

### Chapter 2 — Những Cánh Cổng Không Thuộc Về Thế Giới Này
The same anomaly is interpreted differently by each Path:
- Võ protects people;
- Kiếm hunts the responsible force;
- Pháp studies portal structure;
- Cơ measures/analyzes energy;
- Linh senses voices/presence beyond the gate.

### Chapter 3 — Âm Giới Xâm Lăng
Shared world-event direction:
- multiple portals;
- channel/instance participation;
- cooperative objectives;
- World Boss;
- server-owned contribution/reward;
- city warning → crisis → restoration.

This is the story spine to preserve unless a later owner decision explicitly supersedes it.
## 4. Map hierarchy and rollout

### CURRENT AUTHORITY
High-level long-term nodes include:
- Linh Thành;
- Đông Vực;
- Linh Sơn;
- Pháp Vực;
- Tây Vực;
- Cổ Di Tích;
- Âm Giới;
- later high-level regions such as Thiên Vực / Thượng Giới.

Linh Thành districts include:
- Đông Môn;
- Quảng Trường;
- Học Viện;
- Đền Linh;
- Khu Dân Cư;
- Khu Rèn;
- Thương Phố;
- Khu Bang Hội;
- Cảng Linh Thuyền;
- later other gates.

### First production route
`Linh Thành – Đông Môn → Training Field → Linh Lâm → Cổ Di Tích → Âm Giới`

Not every node opens immediately. Shell/preview does not equal backend/product completion.

### Naming/history conflict — OPEN
Older owner/runtime history uses **Đông Lâm / Cổng Đông Lâm**, including the current stable runtime ID `map-01a-cong-dong-lam`.
Current narrative authority uses **Linh Thành – Đông Môn** and authoring-local key `dong-mon`.

Rule:
- do not rename `map-01a-cong-dong-lam`;
- do not assume Đông Lâm == Đông Môn by string similarity;
- historical boards/content must be mapped through an explicit provenance/containment decision;
- Product Bible v2 already establishes that stable runtime IDs are not silently renamed for narrative cleanup.
## 5. Five canonical Paths

| Path | Core combat identity | Readability/VFX direction | Alpha/content staging |
|---|---|---|---|
| Võ | close-range pressure, combo, stagger/break, counter | orange/gold, dust, impact, shockwave | combat-complete Founder Alpha |
| Kiếm | speed, sword technique, mobility, counter/combo | sword trail, afterimage, aura, precise hit | combat-complete Founder Alpha |
| Pháp | ranged elemental, AoE, control | fire/ice/lightning/spirit/barrier/gravity | canonical identity; post-Alpha combat completeness unless roadmap changes |
| Cơ | ranged technology, gun/mechanics, deployables | turret/mine/drone/cannon/rail shot | canonical identity; later combat completeness |
| Linh | summon/support/control/purification | heal/buff/shield/summon/bind/debuff | canonical identity; later combat completeness |

Canonical new-write IDs:
`vo`, `kiem`, `phap`, `co`, `linh`.

Legacy read compatibility:
`class.martial → vo`, `class.sword → kiem`.

Founder Alpha limits combat-complete Paths, not identity vocabulary.
## 6. Skill progression — separate from visual progression

### CURRENT ALPHA LOADOUT DIRECTION
Per character:
- basic attack chain;
- dodge;
- four active skills;
- one ultimate;
- one spirit skill.

Current source does not provide production-ready damage/cooldown/balance for all skills.

### LONG-TERM OWNER INTENT
Prior owner discussions repeatedly required:
- level-cap direction to Lv100;
- at each 10-level milestone from Lv10 → Lv100, at least one meaningful new skill or meaningful gameplay progression;
- outfit/gear/accessory complexity also changes visibly at those milestones.

### Important separation
`LGO-CLASS-PROGRESSION-RULES-v1.0.md` explicitly defines its Lv1/Lv10…Lv100 rows as **visual progression milestones, not skill unlocks**.

Therefore the unified model has two independent tracks:

**Track A — Gameplay skill progression**
- own design/spec;
- unlock cadence;
- tactical role;
- targeting;
- resource/cooldown;
- animation phases;
- server/GameData authority;
- input and failure semantics.

**Track B — Visual/equipment progression**
- Lv001 + Lv010…Lv100 visual milestones;
- silhouette/material/module changes;
- weapon/accessory/VFX evolution;
- no assumption that a visual milestone itself grants a skill.

A future dedicated skill-progression spec must map the owner’s 10-level cadence without overloading the visual progression file.
## 7. Skill production contract

Before a skill is production-opened, define:

- stable skill ID;
- Vietnamese display name;
- tactical role;
- input intent;
- target/range/shape;
- windup → impact → recover;
- cooldown/resource;
- cancel/interruption;
- invalid-state behavior;
- icon;
- VFX;
- SFX;
- PC input;
- mobile landscape input;
- authority owner;
- GameData/protocol/server dependencies;
- hit/miss/retry/reconnect tests.

Planning visual concepts do not determine damage/cooldown numbers.

Prototype/local visual feedback must remain distinguishable from server-authoritative combat.
## 8. Character/equipment production model

### CURRENT + OWNER-REPEATED RULES
- only two canonical base bodies: Male/Female;
- five classes share base/skeleton DNA rather than five independent bodies;
- equipment is detachable and mixable;
- no skin/body baked into equipment;
- hair/body/base remain separate;
- VFX is separate from equipment PNG;
- item/slot ownership is explicit;
- full-outfit boards are review references, not item extraction sources;
- no crop/slice of composite design boards into production sprites.

Canonical 10 equipment slots:
1. main weapon;
2. head/hair;
3. inner top;
4. outer top;
5. lower body;
6. waist/belt;
7. arm guard;
8. footwear;
9. shoulder/chest guard;
10. class accessory.

Visual progression uses 11 milestones:
Lv001 + Lv010 → Lv100.

Every milestone should have readable structural/material change, not hue-shift only.

Owner-history production expectation also requires male/female item sets to remain independently usable and a removed item to leave a valid base character, not expose broken body geometry.
## 9. Animation / puppet direction

Canonical direction:
- 2D skeletal animation + sprite swapping;
- shared locomotion;
- class-specific combat animation.

Shared locomotion target:
Idle, Walk, Run, Jump Start, Jump/Air, Fall, Land, Dash, Turn, Interact, Sit, Emote, Hit, Knockback, Death, Respawn.

Owner-history hard lesson:
- do not redraw/reinterpret the base during motion;
- preserve base face/body/scale/pivots;
- equipment must follow the same registered source space/rig;
- do not use “pretty generated art” that cannot survive modular runtime swapping;
- visual runtime evidence is required for motion/equipment claims.

Current source also records prior scale/registration failures; root scale/rotation and source registration must be treated as contract-level production concerns.
## 10. PC / mobile presentation

### Owner platform rule
- PC and mobile are separate presentation targets.
- Mobile target is **landscape**, not portrait.
- Mobile uses two-thumb touch composition.
- PC uses keyboard/mouse.
- Do not create one layout then merely shrink/crop it for mobile.

### Shared responsive principle
Use shared window/profile tokens:
- safe area;
- type scale;
- spacing;
- control size;
- world/HUD occupancy;
- touch reach;
- camera/profile rules.

Player-visible UI changes require:
- PC capture;
- tablet/intermediate capture where applicable;
- mobile landscape capture;
- by-eye comparison to canonical design;
- technical non-overlap tests;
- visual acceptance separately.

A technically fitting screen can still fail visual acceptance.
## 11. Founder Alpha vs Soft Launch vs long-term

Do not conflate these scopes.

### Founder Alpha
CURRENT AUTHORITY:
- Võ + Kiếm combat-complete;
- level 1–20;
- one social city;
- two field zones;
- one dungeon;
- one signature world event;
- basic attack/dodge;
- four active skills;
- one ultimate;
- one spirit skill;
- inventory/equipment/loot;
- party/friend/chat;
- guild-lite;
- crafting/market/housing only in deliberately bounded forms.

The Alpha goal is to prove the full social-action loop, not to ship every long-term class/zone/level.

### Soft Launch direction — historical design input
A prior narrative/design document records an earlier direction of:
- Võ / Kiếm / Pháp first;
- Cơ / Linh later.

This is **not** the current Founder Alpha rule and should not overwrite Product Bible v2.
It remains useful as post-Alpha rollout history until a new owner decision replaces it.

### Long-term
- all five classes combat-complete;
- Lv100 progression;
- full visual progression;
- deeper city/social/economy/world-event systems;
- additional regions and endgame zones.

The roadmap must always label which horizon a task belongs to.
## 12. Unified content-production slices

The recommended content approach is **vertical story slices**, not “finish every skill, then every NPC, then every item”.

### Slice S0 — Visual/runtime foundation recovery
Current Game lane:
UIF-R00 → UIF-02R → Auth → Select → Hub → HUD → World → rendered quality → decomposition → final fidelity gate.

Goal:
restore truthful visual authority across PC/tablet/mobile without changing closed auth/persistence/gameplay behavior.

Parallel system work:
database/contract/Web/Admin architecture continues independently.

### Slice S1 — Arrival and identity
Player understands:
- where they are;
- who they are;
- which Path identity they have;
- what the next action is.

Includes:
- login/character select;
- spawn at Đông Môn;
- Người Giữ Cổng;
- first dialogue;
- canonical class presentation.

### Slice S2 — Movement and class expression
- movement;
- jump;
- dash;
- one class action;
- readable input/HUD;
- no fake server reward.

Founder Alpha priority:
Võ + Kiếm.

### Slice S3 — Shadow Slime combat tutorial
- class skill against a real tutorial target;
- readable telegraph/result;
- server-authoritative combat path when opened;
- return to NPC;
- unlock/open Linh Thành presentation.

### Slice S4 — First field / Chapter 1
- Linh Lâm;
- real objective;
- combat failure/success;
- first meaningful reward;
- progression/inventory transaction;
- return-to-city loop.

### Slice S5 — Build and identity
- inventory;
- equipment;
- cosmetic preview/apply;
- modular runtime;
- no item loss;
- no stat change from cosmetic preview.

### Slice S6 — Linh Thành social loop
- Quảng Trường;
- friend/party/chat;
- guild-lite when backend exists;
- support/operations surfaces in parallel;
- city feels inhabited rather than a menu hub.

### Slice S7 — Vết Nứt Đông Môn completion
- Linh Lâm → mini boss;
- Âm Giới Fragment;
- chapter progression;
- first coherent post-tutorial narrative closure.

### Slice S8 — Portal escalation / Chapter 2
- class-specific perspectives;
- broader zones;
- Pháp/Cơ/Linh combat/content production can start according to accepted rollout.

### Slice S9 — Âm Giới Xâm Lăng
- shared warning;
- event state;
- multi-role contribution;
- World Boss;
- authoritative reward;
- restoration state.

This is the signature social-action proof, not an early prototype shortcut.
## 13. Class production sequence

### Founder Alpha
1. Võ — combat-complete.
2. Kiếm — combat-complete.

Each must have:
- canonical identity;
- starter visual kit;
- modular equipment;
- locomotion;
- core combat animation;
- accepted skill loadout;
- server/GameData combat semantics;
- PC/mobile input;
- runtime evidence.

### Post-Alpha candidate sequence
3. Pháp
4. Cơ
5. Linh

This order follows current 2D roadmap/history, but future owner approval may change release order without changing the five canonical identities.

### Per-class content expansion
For each class:
- Lv001 baseline;
- Lv010…Lv100 visual progression;
- gameplay skill progression track;
- weapon/VFX identity;
- male/female compatibility;
- 10 equipment slots;
- cross-level mixing;
- animation/rig validation;
- icon/loadout/paper-doll support.

Do not create 50–70 production skills/icons at once. Expand one tested combat interaction at a time, then grow the kit.
## 14. Skill roadmap

### Alpha skill design
For Võ and Kiếm:
- define complete Alpha loadout semantics;
- implement one skill at a time through GameData/protocol/server/Unity;
- keep Vietnamese labels;
- capture PC/mobile gameplay evidence;
- reject “visual pulse = skill complete”.

### Long-term skill cadence
Owner intent:
- every 10-level milestone should feel mechanically meaningful.

Required future task:
**Canonical Lv1–100 Skill Progression Spec**.

It should decide:
- exact unlock level per skill;
- active/passive/ultimate/spirit distinction;
- replacement/upgrade vs new slot;
- per-class count;
- cross-class power budget;
- tutorial/quest prerequisites;
- respec policy;
- PvE/PvP variance if PvP later opens.

Until that spec exists:
- no exact damage/cooldown/unlock number should be inferred from concept boards;
- visual Lv10/Lv20/... boards do not prove skill unlocks.
## 15. Map/content roadmap

### Near-term production focus
1. Đông Môn tutorial quality.
2. Linh Thành hub readability and authentic social composition.
3. Linh Lâm first field.
4. Cổ Di Tích / dungeon-thread entry.
5. Âm Giới as later story/event destination.

### City district policy
Existing district shells/previews are useful topology references but are not production systems.

Examples:
- Học Viện can visually exist before skill backend.
- Thương Phố can visually exist before economy.
- Khu Rèn can visually exist before crafting.
- Khu Bang Hội can visually exist before guild backend.

A location appearing in the map does not authorize its system.

### Map production gate
Every production map requires:
- stable typed ID;
- display name;
- level band;
- route nodes;
- parallax/layer plan;
- collision;
- spawn/interaction layout;
- safe-area/HUD readability;
- runtime smoke;
- visual evidence;
- backend guard for unopened systems.
## 16. Status classification

### CURRENT AUTHORITY / KEEP
- 2D Side-Scrolling Social Action MMORPG.
- HD anime/illustrated, non-pixel-art.
- five canonical identities.
- Founder Alpha Võ + Kiếm combat-complete.
- Linh Thành social hub.
- Đông Môn tutorial.
- Shadow Slime combat.
- Chapter 1–3 spine.
- Zone Network.
- modular 2D character/equipment.
- GameData/server ownership boundaries.
- runtime visual evidence requirement.

### OWNER LONG-TERM INTENT / PRESERVE
- Lv100 direction.
- meaningful 10-level progression cadence.
- skill growth separate from visual growth.
- separate male/female usable equipment sets.
- 10 detachable equipment slots/assets per visual milestone direction.
- modular base that remains valid when gear is removed.
- PC/mobile landscape distinct presentation.
- real runtime/player-visible progress each implementation batch.

### SUPERSEDED
- return to 3D/Meshy player-character pipeline.
- two-class identity schema.
- `class.arcane/class.tech/class.spirit` as canonical modern product IDs.
- Shadow Slime as only a non-combat marker.
- composite design board used directly as runtime asset.
- technical test green treated as sufficient visual acceptance.

### OPEN / NEED CROSS-SANDBOX OR OWNER DECISION
- exact semantic/provenance mapping of historical “Đông Lâm/Cổng Đông Lâm” narrative boards to current Đông Môn/Map01A.
- exact Lv1–100 gameplay skill unlock table.
- exact Soft Launch class release order after Founder Alpha.
- long-term ownership of cosmetics at account vs character level.
- exact rarity/stat/drop/crafting/market numbers.
- exact class-switch/Path-change policy.
- canonical no-gear base presentation: Scenario Production Spine describes basic hair + neutral gray/default shorts/socks, while the current 2D Module Standard explicitly says its present fallback still contains the locked Võ base hair/clothing and is not the neutral underlayer. This must be resolved as an art/runtime source-authority decision before production modular-equipment closure.
## 17. Unified system + content delivery order

This content roadmap does not replace `LGO-UNIFIED-MASTER-ROADMAP-v3.md`; it supplies the product/content spine.

### Parallel Track A — Game visual/runtime
Current UIF visual-first recovery.
Then vertical slices S1→S4.

### Parallel Track B — Data/backend
PostgreSQL/pgAdmin → Flyway/Testcontainers/jOOQ → IAM/session/character → progression/inventory.

### Parallel Track C — Contracts
OpenAPI/errors/generated client → Unity/Web compatibility.

### Parallel Track D — Player Web/Admin
Real auth/account/character → sessions → progression/inventory → support/admin read/safe ops.

### Parallel Track E — Art/content
Base/rig/equipment/animation/map assets produced only for the next playable slice.

Synchronization points:
- account/character;
- Map01A reconnect;
- tutorial progression;
- combat reward/inventory;
- support;
- LiveOps/world event.

No track waits for another entire roadmap. It waits only for the specific authority it consumes.
## 18. Task implications

Already registered / ongoing:
- Game UIF visual rework chain.
- SYS-01 Product Bible closure.
- SYS-02 domain/data authority audit.
- Web/Data database/contract readiness.
- DB-01 runbook.
- OpenAPI intake readiness.

New follow-up tasks recommended from this reconciliation:
1. `T-0b4981ebbc77` — **GAME-DESIGN-01 — Canonical Founder Alpha Võ/Kiếm combat kit spec**
2. `T-9a9210f42da5` — **GAME-DESIGN-02 — Lv1–100 skill progression policy/spec**
3. `T-6d23b9172b20` — **GAME-DESIGN-03 — Historical Đông Lâm ↔ Đông Môn content provenance reconciliation**
4. `T-6f243112f6d6` — **GAME-DESIGN-04 — Chapter 1 playable content/state matrix**
5. `T-a71b9aa38251` — **GAME-ART-01 — Five-class modular visual progression audit against current source packs**
6. `T-179b161a7d67` — **GAME-MAP-01 — Linh Lâm production map design pack**
7. `T-f49ca5611794` — **GAME-NARRATIVE-01 — Chapter 1 NPC/dialogue/state authority pack**

These should be task-created only with dependency links and repo ownership; this roadmap task itself does not mutate Game source.
## 19. Evidence policy for content work

Every player-visible production task:
- approved design/state matrix;
- exact source/base;
- RED→GREEN behavior tests where logic changes;
- actual runtime capture;
- PC/tablet/mobile as applicable;
- manual visual review against canonical authority;
- asset provenance;
- no placeholder/fake-claim leakage;
- compact evidence;
- exact commit/push.

For pure design tasks:
- owner-history/source reconciliation;
- decision register;
- explicit non-claims;
- implementation dependency;
- Mission cross-review.

Docs/validators cannot substitute for a playable/visual gate when the task changes what the player sees.
## 20. Cross-sandbox review request

Game sandbox should verify:
- current source compatibility with the story/map sequence;
- whether any active source supersedes the historical Soft Launch Võ/Kiếm/Pháp direction;
- whether “Đông Lâm” has a current authoritative semantic mapping beyond the stable runtime ID name;
- whether any current class/skill content contradicts the long-term cadence;
- whether current visual rework changes any shared design-system principle in this roadmap.

Unresolved rows remain `WAITING_CROSS_SANDBOX`.
They do not block independent database/contract/Web work.

## 21. Acceptance target

The task can close only when:
- the three authority layers are clearly separated;
- scenario/map/class/skill/equipment/platform roadmap is internally consistent;
- Founder Alpha vs post-Alpha/Lv100 are not conflated;
- historical conflicts are not silently rewritten;
- Game sandbox has reviewed current-source compatibility or explicitly reports no additional conflict;
- resulting follow-up tasks are registered with dependencies;
- docs are evidenced, committed and pushed.

Until Game review arrives, this document remains a draft and this task is parked rather than falsely closed.
