# LGO Wave 0 Closure & DB Promotion Readiness v1

Date: 2026-09-18
Task: T-c039a2bde791
Status: CURRENT PROMOTION AUTHORITY
Umbrella Mission: MS-57a638c72421

## 1. Verdict

DB-01 is **NOT dependency-ready yet**.

The reason is not database/tooling uncertainty and not Web planning. The remaining hard blockers are two Game-side authority audits that were explicitly parked by owner reprioritization during the visual-first UIF rework:

- T-c4009a021967 — GAME SYS-02 domain/data authority audit
- T-ed0cad5a8f31 — GAME SYS-03 ID/version/error compatibility audit

DB-01 task T-ece40c175753 currently depends on:
- SYS-01
- SYS-02
- SYS-03

SYS-01 is now DONE.
SYS-02 and SYS-03 are not complete.

Do not bypass those dependencies.
## 2. Wave-0 gate matrix

| Gate | Authority/task | Current state | Evidence / source | Promotion effect |
|---|---|---|---|---|
| SYS-01 Product Bible conflict closure | T-d16dddff2b45 | DONE | Product Bible v2 commit a66a67a4; closure authority 3a50d4fa; fresh coordinator review 5/5 tests + Product Bible validator + GameData VALID | satisfied |
| SYS-02 canonical domain/write ownership — architecture | Web T-9f13d5b84287 | DONE | commit 698185a0; evidence 5bc567643e79464795061ae829decdda | architecture ready |
| SYS-02 current Game-source authority audit | Game T-c4009a021967 | PARKED / ASSIGNED | owner reprioritized; no production change; WIP preserved by Game | BLOCKS DB-01 |
| SYS-03 canonical ID/version/error policy — architecture | Web T-e6cbde903e06 | DONE | commit f2910616; evidence 62468df2bb1547bfb2a16adb92a742ab | policy ready |
| SYS-03 Game compatibility audit | Game T-ed0cad5a8f31 | PARKED / ASSIGNED | not executed/closed | BLOCKS DB-01 |
| SYS-04 system/database architecture acceptance | Mission decision MDEC-22388444031c + baseline | ACCEPTED | Web commit 31c8200c; owner-approved PostgreSQL/Flyway/jOOQ/Testcontainers/pgAdmin architecture | satisfied at architecture level |
| DB-01 implementation runbook | Web T-365e3e605441 | DONE | commit 9ef5621b; evidence 039ef8c6f5c24aad87f7cf5347764d03 | implementation ready once gates clear |
| DB-01 Game implementation | T-ece40c175753 | ASSIGNED | no source mutation yet | WAIT |
## 3. SYS-01 independent closure review

SYS-01 had remained in REVIEW although source/evidence were complete.

Fresh read-only coordinator review on 2026-09-18:
- Game HEAD equals origin/feature/2d at 3a50d4faa95b823e15c0b1c88252088ed79d9a71;
- Product Bible v2 authority files are clean;
- Product Bible focused tests: 5/5 PASS;
- validate_lgo_product_bible_v2.py: PASS;
- validate_gamedata.py: VALID;
- original task evidence remains recorded on T-d16dddff2b45.

Under owner auto-approval authority, SYS-01 was moved REVIEW → DONE.

No Game source changed during this review.
## 4. What SYS-02 still must close

The Web architecture matrix already defines target ownership, but it cannot replace the Game source audit.

Game SYS-02 must close current implementation facts such as:
- players-v4.json account/character/runtime ownership;
- auth-credentials-v1.json credential ownership;
- current registration cross-file coordination;
- in-memory session/recovery state;
- realtime non-durable authority;
- legacy XYZ/yaw versus Map01A lane/facing compatibility;
- absence/presence of durable progression/inventory/equipment paths;
- any duplicate writers that changed since the earlier checkpoint.

Earlier Mission checkpoint MM-77bcafc34839 is useful evidence, but the task was owner-parked before formal closure.

DB migration must not be based only on the Web target architecture.
## 5. What SYS-03 still must close

The Web policy already defines target semantics:
- five canonical class IDs;
- legacy aliases;
- content-zone vs runtime-playable-map IDs;
- public/internal/realtime IDs;
- DB/GameData/REST/protobuf version axes;
- target stable error codes.

Game SYS-03 still needs exact source compatibility evidence across:
- Java API;
- Unity consumers;
- GameData registry;
- current error/status behavior;
- account/character IDs;
- map/runtime IDs;
- protocol/version boundaries.

This audit ensures DB/API migration does not normalize away valid compatibility paths.
## 6. Why DB-01 remains blocked even though it is infrastructure-only

The DB-01 runbook itself is safe and narrow:
- PostgreSQL 18.6;
- pgAdmin 9.18;
- localhost-only exposure;
- persistent volumes;
- no product schema;
- no JDBC/Flyway/jOOQ in DB-01;
- live pgAdmin ERD/tooling proof.

However the accepted program sequencing explicitly requires Wave-0 authority lock before physical DB work begins.

Changing that dependency now would be a governance exception, not an implementation optimization.

No exception is justified while independent Web/Data/Game visual work exists.

Therefore:
**keep DB-01 queued, do not create a shadow DB-00 task, do not duplicate DB setup in another repo/worktree.**
## 7. Independent work that remains allowed

While SYS-02/03 are parked, the program can continue:

### Game
- UIF visual-first chain;
- art/runtime evidence;
- independent design tasks that do not change shared data authority.

### Web/Data
- Player Web/Admin product/visual design;
- contract intake planning;
- verification tooling;
- external reference research;
- evidence/governance improvements that have real current need.

### Shared Mission
- answer/review cross-sandbox ASK messages;
- gameplay/scenario/class/skill roadmap reconciliation;
- record decisions/findings.

Not allowed before SYS-02/03 close:
- PostgreSQL product implementation;
- Flyway/jOOQ integration;
- IAM schema migration;
- JSON persistence cutover.
## 8. Promotion procedure when Game visual reprioritization releases the gates

1. Resume Game SYS-02 from preserved WIP/current source.
2. Post START and findings to Umbrella Mission.
3. Close SYS-02 with exact source/evidence.
4. Run Game SYS-03 against the then-current source.
5. Reconcile any policy delta with Web canonical ID/version/error policy.
6. Close SYS-03.
7. Re-check DB-01 ports/images/Docker/current Game source.
8. Promote T-ece40c175753.
9. Implement DB-01 only in Game worktree.
10. Capture PostgreSQL + pgAdmin live runtime/ERD evidence.
11. Commit/push/evidence DB-01.
12. Advance DB-02.

No need to re-run completed Web architecture tasks unless Game audits find a concrete mismatch.
## 9. Acceptance

This promotion matrix is valid when:
- SYS-01 closure is independently verified;
- SYS-02/03 parked status is recorded exactly;
- SYS-04 owner-approved architecture is distinguished from Game source audits;
- DB-01 is explicitly blocked for dependency reasons, not vague waiting;
- no duplicate DB implementation task is opened;
- independent next work is documented;
- Mission is updated;
- artifact is committed/pushed/evidenced.
