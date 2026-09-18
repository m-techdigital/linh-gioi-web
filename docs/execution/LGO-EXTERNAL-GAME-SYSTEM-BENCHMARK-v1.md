# LGO External Game/System Benchmark v1

Date: 2026-09-18
Task: T-0801f59f1dce
Status: RESEARCH BASELINE — EXTERNAL REFERENCES ARE NOT LGO AUTHORITY

## 1. Scope discipline

This benchmark separates three scopes:

A. **IN-GAME** — Unity runtime UI, responsive layout, safe area, touch controls, action-game HUD.
B. **GAME PRODUCT** — class identity, skill/progression, tutorial/story flow, equipment/cosmetics, social/community loops.
C. **WEB/OPS** — companion web, staff operations, RBAC, audit, world/session observability.

A pattern is classified:
- ADOPT — directly compatible with an accepted LGO principle.
- ADAPT — useful reference but needs LGO-specific design.
- REJECT — conflicts with LGO authority, security or complexity budget.

External systems are evidence/reference, never automatic product authority.
## 2. IN-GAME — Unity UI Toolkit

Official sources:
- Unity 6 UI Toolkit Layouts: https://docs.unity3d.com/Manual/best-practice-guides/ui-toolkit-for-advanced-unity-developers/layouts.html
- Unity 6 PanelSettings: https://docs.unity3d.com/6000.0/ScriptReference/UIElements.PanelSettings.html
- Unity Screen.safeArea: https://docs.unity3d.com/ScriptReference/Screen-safeArea.html
- Unity Input System On-Screen controls: https://docs.unity3d.com/Packages/com.unity.inputsystem@1.4/api/UnityEngine.InputSystem.OnScreen.html

Observed from Unity:
- PanelSettings owns runtime panel rendering and scale settings.
- scale mode/reference resolution can scale the panel with screen size.
- UI Toolkit layout uses Yoga/Flexbox; min/max sizes, grow/shrink, wrap and parent-child layout are separate from global panel scale.
- safe area is a read-only runtime screen rectangle and requires coordinate conversion for UI Toolkit.
- Input System exposes dedicated OnScreenButton and OnScreenStick controls.

### LGO verdict

ADOPT:
- safe area as a first-class runtime layout constraint.
- relative/flex layout for composition within owned containers.
- explicit on-screen touch controls for mobile landscape.
- shared UI styles/UXML/USS to reduce per-screen numeric drift.

ADAPT:
- PanelSettings scale/reference-resolution is engine infrastructure only.
- named PCWide / Tablet / MobileLandscape product profiles remain LGO design authority.
- screen/component variants own composition.

REJECT:
- one PanelSettings/global scalar as the complete responsive design system.
- reducing touch controls/text indefinitely to preserve desktop composition.
## 3. IN-GAME — concrete implication for current UIF chain

The current LGO Game decision is supported by the Unity model:

Panel/global scale:
- can normalize the panel against resolution;
- cannot decide what information/panel arrangement should change.

Composition:
- stays in screen variants and flex/layout rules.

Safe area:
- is not a scale percentage;
- must be applied independently.

Touch:
- is a distinct input/presentation concern.

Therefore the UIF-02R architecture should preserve:
- semantic profile;
- shared tokens;
- screen-specific layout variants;
- root-scale invariant;
- safe-area constraint;
- touch floor.

Hub-specific occupancy values remain evidence from that Hub, not global rules for Auth/Select/HUD.
## 4. GAME PRODUCT — Dungeon Fighter Online

Official sources:
- DFO Getting Started / Character Creation: https://www.dfoneople.com/gameinfo/guide/Getting-Started/Character-Creation
- DFO Characters: https://www.dfoneople.com/gameinfo/character/all
- DFO character landing/reference: https://www.dfoneople.com/pr/landing/character
- DFO Leveling guide: https://www.dfoneople.com/gameinfo/guide/Start-Leveling%21/Basic-Leveling/Leveling

Observed:
- character creation presents character role and main skills as part of class choice;
- DFO has many classes/advancements with distinct combat styles;
- its tutorial/background can differ by class;
- scenario/Act quests form a clear progression path;
- official leveling guidance includes a reset-to-dungeon-entrance command rather than arbitrary player coordinate editing.

### LGO verdict

ADOPT:
- class choice should communicate combat identity through role + representative actions, not lore/name only.
- shared tutorial spine can contain Path-specific combat teaching.
- “unstuck” should target a canonical safe entrance/checkpoint, not raw coordinate editing.

ADAPT:
- use class-specific tutorial differences only around combat identity; do not duplicate the entire LGO onboarding five times.
- DFO skill/class depth is a long-running-game reference, not Founder Alpha scope.

REJECT:
- copying DFO's class/advancement count or progression complexity into early LGO.
- treating a convenient reset command as permission for arbitrary operator position mutation.
## 5. GAME PRODUCT — Lost Ark

Official sources:
- About Lost Ark: https://www.playlostark.com/en-us/game/about
- Class introduction: https://www.playlostark.com/en-gb/news/articles/intro-to-character-classes

Observed:
- classes are differentiated by gameplay style/strength/weakness as well as visual identity;
- action combat coexists with crafting, guild/social systems and world/group activities;
- abilities have a multi-tier customization system, demonstrating depth can live within a bounded skill set rather than requiring endless action-button growth.

### LGO verdict

ADOPT:
- class identity must stay mechanically readable.
- action depth and social/world systems can coexist without making every system part of the tutorial.

ADAPT:
- long-term LGO skill progression can include meaningful upgrades/branches as an alternative to “new button every milestone”.
- this can help reconcile owner 10-level progression intent with a bounded active loadout.

REJECT:
- importing Lost Ark's endgame progression/economy complexity.
- treating its class structure as a template for LGO's five Paths.
## 6. GAME PRODUCT — Final Fantasy XIV

Official sources:
- FFXIV Job Guide: https://na.finalfantasyxiv.com/jobguide/battle
- The Lodestone Community: https://na.finalfantasyxiv.com/lodestone/community/
- Community Finder: https://na.finalfantasyxiv.com/lodestone/community_finder/

Observed:
- combat jobs are grouped by clear party/combat role and expose actions/traits/job gauges;
- the Lodestone is a companion/community web ecosystem with character/community/finder content rather than browser gameplay;
- community tools distinguish persistent organizations and communication groups.

### LGO verdict

ADOPT:
- class/Path documentation should make role/action identity explicit.
- Player Web should remain a companion/account/community surface, not browser combat.

ADAPT:
- future LGO Web social features can expose community discovery/context after social backend authority exists.
- future class pages can show real unlocked actions/progression without duplicating gameplay.

REJECT:
- copying FFXIV party-role taxonomy onto LGO Paths where it conflicts with their own combat identities.
## 7. GAME PRODUCT — Guild Wars 2 Wardrobe

Official source:
- ArenaNet Wardrobe System: https://www.guildwars2.com/en-gb/news/introducing-the-wardrobe-system/

Observed:
- stat-bearing gear and cosmetic appearance are conceptually separated;
- players can preview appearance before applying it;
- skins are collected in an account-wide wardrobe in GW2.

### LGO verdict

ADOPT:
- preview must be temporary until Apply succeeds.
- cosmetic appearance should remain separable from combat/stat equipment.

ADAPT:
- account-wide cosmetic ownership is a useful reference, not an LGO decision.
- LGO must separately decide account-vs-character ownership and migration semantics.

REJECT:
- assuming GW2 transmutation currency/account rules belong in LGO.
## 8. WEB/OPS — PlayFab Game Manager

Official sources:
- PlayFab user roles: https://learn.microsoft.com/en-us/xbox/playfab/identity/dev-identity/permissions/playfab-user-roles
- PlayFab audit logs: https://learn.microsoft.com/en-us/xbox/playfab/live-service-management/gamemanager/audit-logs
- PlayFab player data: https://learn.microsoft.com/en-us/gaming/playfab/player-progression/player-data/
- PlayFab live service management: https://learn.microsoft.com/en-us/gaming/playfab/live-service-management/

Observed:
- Game Manager roles are permission collections assigned per title;
- areas/actions can be read-only or editable based on permissions;
- audit logs record important/destructive developer actions and expose actor/time/type/details;
- player data distinguishes client-write, server-write/client-read and server-internal access;
- LiveOps management is separate from ordinary player-facing game state.

### LGO verdict

ADOPT:
- separate staff identity/RBAC.
- read-only vs edit/action capabilities.
- audit privileged changes.
- explicitly classify data by who may write/read it.

ADAPT:
- LGO uses domain-specific capabilities such as player.read, session.revoke, support.assign, liveops.publish.
- LGO Java/PostgreSQL remains authority; do not import PlayFab as the storage platform merely to copy these patterns.

REJECT:
- UI permission hiding without backend enforcement.
## 9. WEB/OPS — Nakama Console

Official source:
- Nakama Console: https://heroiclabs.com/docs/nakama/getting-started/console/

Observed:
- Console separates dashboard metrics, players, groups, storage, chat, matches, notifications and settings;
- player accounts are searchable;
- authoritative matches expose runtime state/connected players;
- console users can have different roles such as Administrator/Developer/Maintainer/View Only;
- the console can edit/delete player/storage data.

### LGO verdict

ADOPT:
- separate operator work areas by operational question/domain.
- searchable Player 360-style starting point.
- runtime/match/session observation as an explicit operations surface.
- permission profiles for staff.

ADAPT:
- LGO Player 360 should aggregate read models from canonical domains.
- destructive actions require reason/idempotency/audit/runbook beyond a generic console button.

REJECT:
- generic direct storage-object editing as LGO Admin's normal mutation model.
- exposing DB/storage shape as the business workflow.
## 10. WEB/OPS — Amazon GameLift Servers

Official sources:
- Monitoring overview: https://docs.aws.amazon.com/gameliftservers/latest/developerguide/monitoring-overview.html
- CloudWatch GameLift metrics: https://docs.aws.amazon.com/gameliftservers/latest/developerguide/monitoring-cloudwatch.html
- Game/player sessions console: https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-console-game-player-sessions-metrics.html

Observed:
- hosting health, game-session activity, player-session activity and capacity are explicit operational metrics;
- monitoring is separated across console views, telemetry, CloudWatch and logs;
- session inspection/control is an operations concern, not a player-profile field.

### LGO verdict

ADOPT:
- Game Operations should show source/freshness and real runtime/session metrics.
- read-only observation should precede broad control commands.
- operational metrics need domain/source identity, not fixture counts.

ADAPT:
- LGO does not need GameLift to copy the conceptual separation.
- use LGO's own realtime/runtime observability until hosting architecture warrants managed services.
## 11. Cross-reference conclusions

### Strongly reinforced existing LGO choices
- IN-GAME responsive = panel/runtime scale + semantic profiles + composition variants + safe area, not one scalar.
- Five Paths need tactical/skill identity, not only visual identity.
- Tutorial should share common onboarding but may branch narrowly for Path-specific combat teaching.
- cosmetic preview/apply should stay distinct from equipment/stat authority.
- Player Web is a companion surface.
- Admin is domain/workflow oriented with RBAC/audit.
- world/session operations should start read-only and freshness-aware.

### Useful changes to LGO backlog
1. GAME-DESIGN-01 should explicitly include class-selection role/main-skill preview plus Path-specific tutorial combat beat.
2. ADM-05 unstuck design should use canonical safe checkpoint/entrance semantics, never arbitrary position editing.
3. GAME-DESIGN-02 should evaluate “new skill vs meaningful skill upgrade/branch” at 10-level milestones so active-button count stays bounded.
4. PWEB social/community expansion should remain post-social-backend and companion-oriented.
5. GAME-ART/equipment design should preserve preview/apply and stat/cosmetic separation without deciding account-wide ownership prematurely.
## 12. What is intentionally NOT adopted

- DFO class count/advancement complexity.
- Lost Ark endgame gearing/economy.
- FFXIV party-role taxonomy.
- GW2 account-wide cosmetic ownership as an automatic LGO rule.
- PlayFab as required backend/storage platform.
- Nakama generic storage editing.
- GameLift as required hosting platform.
- any reference game's numeric balance/cooldown/reward values.
- any website-responsive rule as direct Unity runtime UI geometry.

LGO Product Bible/owner decisions remain authority.
## 13. Evidence-quality notes

Preferred sources in this benchmark are official/first-party:
- Unity documentation;
- Neople/DFO;
- Amazon Games/Lost Ark;
- Square Enix FFXIV/Lodestone;
- ArenaNet/Guild Wars 2;
- Microsoft PlayFab;
- Heroic Labs Nakama;
- AWS GameLift.

Where official sources describe a mature system, the benchmark extracts principles only.

No source proves that LGO currently implements the referenced feature.
## 14. Mission review questions

Game should answer only from current LGO authority/source:

A. Does the current Founder Alpha tutorial design allow the shared onboarding spine to branch into a small Võ/Kiếm-specific combat teaching beat without duplicating the whole tutorial?

B. For future Admin unstuck, is there a current canonical safe spawn/checkpoint authority that can support reset-to-safe-place semantics, or must GAME-DESIGN/world work define one first?

C. Is there any current accepted source that already decides cosmetic ownership account-wide vs per-character? If not, keep it OPEN despite the GW2 reference.

D. Does current Game progression design allow meaningful skill upgrade/branch at a 10-level milestone, or has owner intent already required “brand-new skill button” at every milestone?

E. Does current UIF-02R implementation already model Screen.safeArea/cutout separately from profile/layout composition? If not, should that become a specific follow-up gate before mobile final acceptance?

This benchmark does not block current visual work. Any unanswered row is WAITING_CROSS_SANDBOX while other tasks continue.
## 15. Acceptance

Complete when:
- each scope is clearly labeled IN-GAME / GAME PRODUCT / WEB/OPS;
- at least three credible first-party references support each relevant scope;
- factual source observations are separate from LGO recommendations;
- every recommendation is ADOPT/ADAPT/REJECT;
- no external mechanic silently overrides Product Bible/owner direction;
- concrete LGO task implications are identified;
- targeted Game questions are posted using Mission ASK protocol;
- research artifact is evidenced, committed and pushed.
