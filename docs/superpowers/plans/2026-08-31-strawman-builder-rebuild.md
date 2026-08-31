# Elastic Labs Strawman Builder Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Elastic Labs Strawman Builder as a modular Next.js application that preserves the rich commercial modelling of the reference Vercel build and generates the canonical Elastic Labs client proposal.

**Architecture:** Keep the application client-first and lightweight, but separate domain logic from UI. `lib/` owns capability architecture, commercials, proposal state, client-safe sanitisation and defaults. `app/page.js` orchestrates the workflow and `app/globals.css` implements the Elastic Labs UI and A4 proposal design. All client outputs are produced from a sanitised proposal model so internal economics cannot leak.

**Tech Stack:** Next.js 16.3, React 19.2, Node built-in test runner, browser localStorage persistence, browser print/PDF export with native print CSS.

**Spec:** `docs/superpowers/specs/2026-08-31-strawman-builder-rebuild-design.md`

## Global Constraints

- Workflow: Outside-In -> Mission -> Team -> Economics -> Flex -> Scenarios -> Proposal -> Export.
- Start from mission, not available talent.
- Support Core, Flex and Scale as distinct capability tiers.
- Preserve fractional FTE throughout calculations and rendering.
- All commercial assumptions and role prices are manually overridable.
- Internal-only fields must never appear in client-facing proposal data or export.
- Proposal styling follows the attached nine-page Elastic Labs design: warm off-white, black typography, restrained hot pink, editorial spacing, no SaaS-dashboard feel.
- Proposal copy is editable and never silently overwritten after manual editing.
- Avoid em dashes in generated client copy.
- No CRM, prospecting or Apollo functionality in this application.

---

### Task 1: Domain defaults and commercial engine

**Files:**
- Create: `lib/strawman.mjs`
- Test: `tests/strawman.test.mjs`

**Interfaces:**
- Produces: `createOpportunity()`, `defaultRateCard`, `defaultCommercialAssumptions`, `calculateRoleEconomics(role, assumptions)`, `calculateTeamEconomics(roles, assumptions)`, `calculateCashExposure(teamEconomics, clientTermsDays, talentTermsDays)`.

- [ ] Write failing tests for fractional FTE economics, manual sell-rate override, target-margin pricing, and cash exposure.
- [ ] Verify the new tests fail because `lib/strawman.mjs` does not exist.
- [ ] Implement the minimal defaults and economics functions.
- [ ] Run `npm test` and confirm the commercial tests pass alongside the existing architect test.
- [ ] Commit with `feat: add Strawman commercial engine`.

### Task 2: Mission-led capability architect

**Files:**
- Modify: `lib/architect.mjs`
- Modify: `tests/architect.test.mjs`
- Test: `tests/strawman.test.mjs`

**Interfaces:**
- Consumes: Outside-In and mission fields from `createOpportunity()`.
- Produces: `architect(input)` returning `{pattern, confidence, rationale, core, flex, scale}` where each role includes `role`, `seniority`, `why`, `activation`, `tier`, and `hierarchy`.

- [ ] Add failing tests proving the architect does not mechanically insert AI roles, always separates Core/Flex/Scale, and supplies role rationale and activation condition.
- [ ] Run `npm test` and confirm the new assertions fail against the existing architect.
- [ ] Extend the architect with mission-led patterns for integration, AI/product, data/platform and transformation/general capability.
- [ ] Run `npm test` and confirm all architect tests pass.
- [ ] Commit with `feat: make capability architect mission led`.

### Task 3: Client-safe proposal model

**Files:**
- Create: `lib/proposal.mjs`
- Test: `tests/proposal.test.mjs`

**Interfaces:**
- Consumes: opportunity, roles, scenarios, phases and calculated team economics.
- Produces: `buildProposalModel(opportunity, economics, architectResult)` and `assertClientSafe(model)`.

- [ ] Write failing tests for canonical proposal sections and forbidden internal keys.
- [ ] Verify failure before production code.
- [ ] Implement proposal model generation for Cover, Moment, Mission, Team, Operating Model, Timeline, Options, Investment, Launch and Next Steps.
- [ ] Ensure timeline returns `null` when no credible role-aware phase data exists.
- [ ] Ensure all generated strings replace em dashes with commas, colons or hyphens.
- [ ] Run `npm test` and confirm proposal tests pass.
- [ ] Commit with `feat: add client safe proposal model`.

### Task 4: Rebuild the application workflow

**Files:**
- Replace: `app/page.js`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes domain interfaces from Tasks 1-3.
- Produces workflow screens: Dashboard, Client + Outside-In, Mission, Team, Team Shape, Economics, Flex + Deployment, Scenarios, Proposal, Export, Settings / Rate Card.

- [ ] Add lightweight source-level tests in `tests/ui-contract.test.mjs` checking navigation labels, Core/Flex/Scale controls and client/internal export labels.
- [ ] Verify they fail against the simplified current UI.
- [ ] Replace the simplified Opportunity Engine screen with the approved workflow.
- [ ] Add persistent opportunity state using localStorage with a versioned key and safe hydration.
- [ ] Add editable Outside-In and Mission fields.
- [ ] Add role editing for count, tier, hierarchy, seniority, allocation, engagement model, rates, rationale and activation.
- [ ] Add hierarchy visualisation with direct quantity/tier edits.
- [ ] Add internal economics and guardrails.
- [ ] Add role-aware phases and deployment timeline controls.
- [ ] Add independently editable Core, Recommended and Scale scenarios.
- [ ] Run `npm test` and confirm the UI contract tests pass.
- [ ] Commit with `feat: rebuild Strawman Builder workflow`.

### Task 5: Canonical proposal renderer and exports

**Files:**
- Modify: `app/page.js`
- Modify: `app/globals.css`
- Test: `tests/proposal.test.mjs`
- Test: `tests/ui-contract.test.mjs`

**Interfaces:**
- Consumes: client-safe proposal model only.
- Produces: editable proposal preview, print/PDF view, Google Docs-compatible HTML download, internal CSV download.

- [ ] Add failing tests asserting forbidden words/fields do not appear in client HTML generator source and required proposal page labels do.
- [ ] Verify tests fail before adding export code.
- [ ] Implement an A4 print renderer matching the canonical nine-page Elastic Labs visual system.
- [ ] Make the capacity timeline conditional and omit blank pages.
- [ ] Implement proposal-copy editing without overwriting source data until explicit regeneration.
- [ ] Implement client-safe HTML download suitable for opening/importing into Google Docs as a fallback.
- [ ] Preserve internal CSV separately.
- [ ] Run `npm test` and confirm all tests pass.
- [ ] Commit with `feat: add canonical proposal renderer and exports`.

### Task 6: Build, deployment and regression verification

**Files:**
- Modify only if build errors identify a concrete issue.

**Interfaces:**
- Produces: a Vercel preview deployment for `feature/strawman-builder-rebuild`.

- [ ] Inspect the branch diff against `main` and confirm only Strawman rebuild files and docs changed.
- [ ] Deploy the branch/project through Vercel.
- [ ] Check build logs and require a READY deployment before claiming success.
- [ ] Fetch the deployed page and verify it contains Dashboard, Client + Outside-In, Mission, Team, Economics, Scenarios, Proposal and Export.
- [ ] Verify the client proposal UI does not contain BUY rate, GP, GM, markup or bench-assumption labels.
- [ ] Verify the proposal includes The Moment, The Mission, A Team Built Around the Mission, The Elastic Operating Model, Capacity Timeline when applicable, Team Options, Investment, The Elastic Launch and Next Steps.
- [ ] Report any functionality that still depends on Vercel/Google credentials rather than silently claiming it works.
