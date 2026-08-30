# Strawman Commercial Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the depth of the original Strawman as a modular commercial configuration engine fed automatically by the 53-account Opportunity Engine.

**Architecture:** Keep opportunity intelligence and Outside-In as the front door, then generate an editable engagement model composed of role-level team members, scenarios and pure economics calculations. Role Library and Talent Network supply benchmark or actual rates; a separate whitelist mapper creates client-safe proposals so internal economics cannot leak.

**Tech Stack:** Next.js, React, JavaScript ES modules, Node test runner, Vercel previews.

**Spec:** `docs/superpowers/specs/2026-08-29-opportunity-engine-v2-design.md`

## Global Constraints

- Production remains untouched until the preview has been reviewed and accepted.
- All 53 active opportunities and their research must remain available.
- Core/Flex/Scale are classifications, not minimum team sizes; a one-person Core is valid.
- Economics are calculated per engagement team member, never from one blended average person.
- Benchmark BUY/SELL rates must be visibly distinguishable from assigned-talent actual rates.
- Client-safe output must never expose BUY rates, individual contractor costs, GP, GM, markup, bench assumptions, talent availability notes or internal economics.
- Generated recommendations remain editable; the machine proposes and Jonny decides.

---

### Task 1: Commercial domain model and calculator

**Files:**
- Create: `lib/commercial-model.mjs`
- Create: `tests/commercial-model.test.mjs`

**Interfaces:**
- Produces: `calculateMember(member)`, `calculateScenario(scenario)`, `cloneScenario(scenario, overrides)`, `validateMember(member)`.
- Member fields: `id`, `roleId`, `personId`, `layer`, `weeks`, `daysPerWeek`, `buyRate`, `sellRate`, `rateSource`, `phase`, `notes`.
- Scenario totals: `totalDays`, `revenue`, `cost`, `gp`, `gm`, `memberCount`.

- [ ] Write failing tests proving a one-person eight-week Core calculates total days, revenue, cost, GP and GM correctly; prove mixed allocations aggregate correctly; prove zero/negative weeks, days or rates are rejected.
- [ ] Run `node --test tests/commercial-model.test.mjs` and confirm failure because the module does not exist.
- [ ] Implement pure calculations using `totalDays = weeks * daysPerWeek`, `revenue = totalDays * sellRate`, `cost = totalDays * buyRate`, `gp = revenue - cost`, `gm = revenue ? gp / revenue : 0`; aggregate only calculated members.
- [ ] Implement `cloneScenario` with new scenario/member IDs while preserving editable commercial values.
- [ ] Run the test file and confirm PASS.
- [ ] Commit `feat: add role-level commercial model`.

### Task 2: Full Elastic Role Library

**Files:**
- Create: `data/roles.mjs`
- Create: `lib/roles.mjs`
- Create: `tests/roles.test.mjs`

**Interfaces:**
- Produces: `ROLE_LIBRARY`, `getRole(id)`, `listRoles()`, `resolveBenchmark(roleId, seniority)`.
- Role fields: `id`, `name`, `discipline`, `seniority`, `description`, `skills`, `buyRange`, `sellRange`, `defaultBuy`, `defaultSell`, `layers`.

- [ ] Write failing tests requiring Principal AI / AI Architect, AI Engineer, AI Infrastructure Engineer, AI Product Lead, Data Engineer, Data Scientist, MLOps Engineer, Cloud/DevOps Engineer, Product Manager, Product Designer/UX, Solution/Platform Architect, Software/Full-stack Engineer, Technical Delivery/Programme Lead and Security/Governance specialist.
- [ ] Add the catalogue with configurable benchmark ranges and defaults. Preserve known Elastic benchmark inputs where recoverable; where a role lacks a verified benchmark, mark rates as `null` instead of inventing a number.
- [ ] Implement lookup and benchmark resolution that returns an explicit missing-benchmark state rather than a blended fallback.
- [ ] Run `node --test tests/roles.test.mjs` and confirm PASS.
- [ ] Commit `feat: restore Elastic role catalogue`.

### Task 3: Talent Network as actual supply

**Files:**
- Create: `data/talent.mjs`
- Create: `lib/talent.mjs`
- Create: `tests/talent.test.mjs`

**Interfaces:**
- Produces: `listTalent()`, `getTalent(id)`, `findTalentForRole(roleId)`, `assignTalent(member, person)`.
- Person fields: `id`, `name`, `roleIds`, `skills`, `seniority`, `buyRate`, `availability`, `earliestStart`, `location`, `timezone`, `sectors`, `clearance`, `notes`.

- [ ] Write failing tests showing one person can fulfil multiple roles and assignment replaces benchmark BUY with actual BUY while preserving the scenario SELL rate unless deliberately overridden.
- [ ] Add the Talent data structure without fabricating real people or rates. Existing verified network entries may be migrated; otherwise begin empty with the full schema.
- [ ] Implement role matching and assignment with `rateSource: 'talent'` when an actual BUY rate exists.
- [ ] Run tests and confirm PASS.
- [ ] Commit `feat: model assignable Elastic talent`.

### Task 4: Capability Architect generates the smallest credible entry point

**Files:**
- Modify: `lib/architect.mjs`
- Create: `tests/architect.test.mjs`

**Interfaces:**
- Consumes: normalized Outside-In opportunity and Role Library.
- Produces: `{ outcome, reasoning, members, deferredCapability, deployment }` suitable for scenario creation.

- [ ] Write failing tests for three representative opportunity shapes: discovery uncertainty may recommend one AI Product Lead; data/integration delivery may recommend multiple Core roles; specialist capability may be deferred into Flex/Scale.
- [ ] Remove any hard-coded 2–3 or 3-person minimum behavior.
- [ ] Generate each recommendation with `reason`, `evidence`, and `condition` fields so role inclusion/deferment is explainable.
- [ ] Resolve economics from role-specific benchmarks only; missing benchmarks remain flagged for user input.
- [ ] Run architect and existing prospect tests and confirm PASS.
- [ ] Commit `feat: make capability recommendations modular`.

### Task 5: Engagement and scenario state

**Files:**
- Create: `lib/engagement.mjs`
- Create: `tests/engagement.test.mjs`

**Interfaces:**
- Produces: `createEngagement(opportunity, recommendation)`, `addMember`, `removeMember`, `duplicateMember`, `updateMember`, `moveMember`, `addScenario`, `duplicateScenario`, `updateScenario`.

- [ ] Write failing tests for one-person Core, adding/removing roles, moving Core→Flex, duplicating a member, duplicating a scenario and ensuring scenario edits do not mutate the original.
- [ ] Implement immutable engagement/scenario operations using stable IDs.
- [ ] Ensure every mutation recalculates the affected scenario through `calculateScenario`.
- [ ] Run tests and confirm PASS.
- [ ] Commit `feat: add modular engagement scenarios`.

### Task 6: Rebuild Strawman as a working commercial canvas

**Files:**
- Create: `components/strawman/StrawmanWorkspace.jsx`
- Create: `components/strawman/OutcomeEditor.jsx`
- Create: `components/strawman/TeamBuilder.jsx`
- Create: `components/strawman/TeamMemberCard.jsx`
- Create: `components/strawman/DeploymentEditor.jsx`
- Create: `components/strawman/CommercialSummary.jsx`
- Create: `components/strawman/ScenarioTabs.jsx`
- Modify: `app/page.js`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: engagement/scenario functions from Task 5, role/talent lookup from Tasks 2–3.
- Produces: fully editable selected scenario and `Create Client Proposal` action.

- [ ] Add a UI-level testable state fixture containing a one-person Land scenario and multi-role Recommended scenario.
- [ ] Replace the sterilised Strawman section with four clear working areas: Outcome, Team, Deployment, Commercials.
- [ ] Team cards expose role, Core/Flex/Scale, weeks, days/week, BUY, SELL, benchmark/actual badge, assign talent, duplicate, move and remove controls.
- [ ] Add `+ Add team member` with full Role Library selection and no minimum team constraint.
- [ ] Add scenario create/duplicate/select controls and persistent summary showing member count, duration, client investment, GP and GM.
- [ ] Preserve dark navigation/light working canvas and responsive behavior; do not redesign unrelated Opportunity screens.
- [ ] Run full tests and `npm run build`; confirm PASS.
- [ ] Commit `feat: restore deep Strawman workspace`.

### Task 7: Opportunity → generated Strawman handoff

**Files:**
- Modify: `app/page.js`
- Modify: `components/strawman/StrawmanWorkspace.jsx`
- Modify: `lib/engagement.mjs`
- Create: `tests/opportunity-to-strawman.test.mjs`

**Interfaces:**
- Consumes: selected opportunity, edited Outside-In and architect recommendation.
- Produces: initialized engagement with editable generated scenario.

- [ ] Write failing integration test proving selected opportunity research and edited Outside-In become the generated outcome, reasoning, deployment and initial scenario.
- [ ] Make `Build Strawman` initialize from the current edited Outside-In rather than a blank/default workspace.
- [ ] Preserve opportunity identity and source research so the user can navigate back without losing the commercial draft.
- [ ] Confirm a one-person recommendation opens as one person, not expanded to a pod.
- [ ] Run integration and full tests; confirm PASS.
- [ ] Commit `feat: connect Outside-In to generated Strawman`.

### Task 8: Client-safe proposal boundary

**Files:**
- Create: `lib/client-proposal.mjs`
- Create: `components/strawman/ClientProposal.jsx`
- Create: `tests/client-proposal.test.mjs`
- Modify: `app/page.js`

**Interfaces:**
- Produces: `toClientProposal(engagement, scenarioId)` whitelist DTO containing only approved client fields and SELL-side investment.

- [ ] Write a failing leakage test that recursively scans serialized client output for `buyRate`, `cost`, `gp`, `gm`, `markup`, talent notes, availability and internal assumptions.
- [ ] Implement explicit whitelist mapping for account, outcome, context, approach, phases, deliverables, role names/team shape, duration, approved assumptions and SELL-side investment.
- [ ] Build editable client proposal view from that DTO rather than hiding internal fields with CSS.
- [ ] Add print/PDF-safe styling and verify internal fields are absent from rendered client data.
- [ ] Run leakage and full tests; confirm PASS.
- [ ] Commit `feat: enforce client-safe proposal boundary`.

### Task 9: Preserve edited proposal state and export compatibility

**Files:**
- Create: `lib/proposal-state.mjs`
- Create: `tests/proposal-state.test.mjs`
- Modify: `components/strawman/ClientProposal.jsx`

**Interfaces:**
- Produces: proposal state that preserves user-edited copy, punctuation, section order, selected scenario, team shape, deployment and compatible image references.

- [ ] Write failing tests proving regenerated calculations do not overwrite user-edited proposal copy and client proposal never gains internal fields.
- [ ] Separate commercial source values from user-authored proposal overrides.
- [ ] Preserve section ordering and image metadata in the client-safe state model so PDF and future DOCX/Google Docs export consume the same safe DTO.
- [ ] Run tests and confirm PASS.
- [ ] Commit `feat: preserve editable client proposal state`.

### Task 10: End-to-end regression and preview verification

**Files:**
- Modify: `tests/prospects.test.mjs`
- Create: `tests/strawman-e2e.test.mjs`
- Modify: `package.json` if the build script does not already run tests.

**Interfaces:**
- Verifies all preceding interfaces as one workflow.

- [ ] Add regression assertions for exactly 53 opportunities, key comma/thousands cases, and rich Zema/AAB/TC Group research fields.
- [ ] Add end-to-end fixture: opportunity → Outside-In → one-person or modular recommendation → edit team → duplicate scenario → recalculate → client proposal.
- [ ] Assert internal/client separation recursively.
- [ ] Ensure CI/build executes the Node test suite before `next build`.
- [ ] Run `npm test` and `npm run build`; both must pass.
- [ ] Deploy only the isolated `opportunity-engine-v2-implementation` preview.
- [ ] Verify preview Opportunities, Outside-In, Build Strawman, add/remove member, scenario duplication, economics and client proposal manually.
- [ ] Confirm production deployment has not changed.
- [ ] Commit `test: verify full Opportunity to Strawman workflow`.
