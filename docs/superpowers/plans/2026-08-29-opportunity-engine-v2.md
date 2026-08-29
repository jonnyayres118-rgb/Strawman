# Elastic Labs Opportunity Engine V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the richer Elastic Labs Opportunity Engine on an isolated branch, backed by the live Prospect Engine Sheet, while leaving rolled-back production untouched until acceptance.

**Architecture:** Retain Next.js and extract the reconstructed single-page app into focused feature modules. A server-side Sheet adapter normalises Pipeline rows into a single opportunity DTO; downstream Outside-In, capability and proposal modules consume that DTO. Client output is generated from an explicit whitelist DTO so internal economics cannot leak.

**Tech Stack:** Next.js 15, React, JavaScript modules, Node test runner, Google Sheets gviz CSV endpoint, browser print/PDF.

**Spec:** `docs/superpowers/specs/2026-08-29-opportunity-engine-v2-design.md`

## Global Constraints
- Do not alter the currently rolled-back production deployment during implementation.
- Use the supplied Elastic Labs logo asset as-is and preserve its natural aspect ratio.
- The Google Sheet Pipeline is the opportunity source of truth; do not invent missing prospect data.
- Human approval is required before Outside-In content is client-ready.
- Client-safe output must never include BUY rates, GP, GM, markup, bench assumptions or internal economics.
- No Google Docs export in this rebuild.
- No redesign for novelty; preserve the established expert Elastic Labs visual language.

---

### Task 1: Establish isolated V2 source and opportunity contract

**Files:**
- Create: `lib/opportunity.mjs`
- Create: `test/opportunity.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `mapPipelineRow(headers: string[], row: string[]): Opportunity`; `isActiveOpportunity(opportunity): boolean`.

- [ ] Write failing tests asserting Pipeline headers map Company, Score, Status, Wedge, Owner / Backer, Employees, Revenue, 12m Growth, Tech / Data Bench, Complexity, Trigger, Why Elastic, Key Unknown, Best Discovery Question, Primary Buyer, Buyer Name, LinkedIn / Contact, Last Touch, Next Action, Next Action Date, Outside-In, Source / Confidence, Notes, Last Researched and Active?.
- [ ] Run `node --test test/opportunity.test.mjs` and verify failure before implementation.
- [ ] Implement `mapPipelineRow` using a header lookup and numeric Score coercion; retain empty cells as empty strings rather than inferred values.
- [ ] Implement active filtering so only explicit `FALSE` is excluded.
- [ ] Run the test and commit the passing contract.

### Task 2: Build server-side live Sheet adapter

**Files:**
- Create: `lib/csv.mjs`
- Create: `lib/prospect-sheet.mjs`
- Create: `app/api/opportunities/route.js`
- Create: `test/csv.test.mjs`
- Create: `test/prospect-sheet.test.mjs`

**Interfaces:**
- Consumes: `mapPipelineRow`, `isActiveOpportunity`.
- Produces: `parseCsv(text): string[][]`; `normalisePipelineCsv(text): Opportunity[]`; GET `/api/opportunities` → `{ opportunities, syncedAt }`.

- [ ] Write CSV tests covering quoted commas, escaped quotes, CRLF and empty cells.
- [ ] Write normalisation tests with multiple Pipeline rows including one `Active?=FALSE` row.
- [ ] Verify tests fail.
- [ ] Implement a dependency-free CSV parser and normaliser.
- [ ] Implement API GET using the existing Sheet ID and `gviz/tq?tqx=out:csv&sheet=Pipeline`, `cache: "no-store"`, returning a non-200 JSON error without substituting invented data when retrieval fails.
- [ ] Run all tests and commit.

### Task 3: Restore application shell and brand

**Files:**
- Create: `components/AppShell.js`
- Create: `components/Sidebar.js`
- Create: `components/Brand.js`
- Create: `components/UserCard.js`
- Modify: `app/globals.css`
- Modify: `app/page.js`
- Add binary asset outside text-only GitHub tooling: `public/elastic-labs-logo.png` from supplied `Elastic Labs(1).png`.

**Interfaces:**
- Produces: navigation keys `opportunities`, `outside-in`, `strawman`, `talent`, `engagements`, `patterns`, `learning`, `settings`, `integrations`.

- [ ] Build the dark sidebar/light workspace shell with Intelligence, Capability and System groupings.
- [ ] Render the supplied logo via `next/image` or `<img>` with `width:auto`, constrained height and `object-fit:contain`; never reconstruct the mark in CSS/text.
- [ ] Restore user/navigation affordances without wiring placeholder destructive actions.
- [ ] Verify responsive navigation and commit.

### Task 4: Rebuild Opportunities workspace

**Files:**
- Create: `features/opportunities/OpportunitiesPage.js`
- Create: `features/opportunities/OpportunityTable.js`
- Create: `features/opportunities/OpportunityDetail.js`
- Create: `features/opportunities/useOpportunities.js`
- Modify: `app/page.js`

**Interfaces:**
- Consumes: GET `/api/opportunities`.
- Produces: selected `Opportunity` passed to Outside-In.

- [ ] Add a hook that fetches opportunities, exposes loading/error/syncedAt and supports manual refresh.
- [ ] Add search across company, wedge, trigger, buyer and owner/backer.
- [ ] Add status tabs/filtering while retaining the source status string.
- [ ] Render score, company, trigger/why-now, status and next action in the table; show full evidence, unknown, discovery question, buyer/contact and confidence in detail view.
- [ ] Add `Build Outside-In` as an explicit human action for the selected opportunity.
- [ ] Test filtering/selection logic, run production build and commit.

### Task 5: Rebuild Outside-In workflow

**Files:**
- Create: `features/outside-in/outsideIn.mjs`
- Create: `features/outside-in/OutsideInPage.js`
- Create: `test/outside-in.test.mjs`

**Interfaces:**
- Consumes: `Opportunity`.
- Produces: `OutsideInDraft { observation, tension, hypothesis, question, elasticResponse, approvalState }`.

- [ ] Write tests proving observation is derived only from supplied evidence fields and unknowns remain labelled as unknowns.
- [ ] Implement deterministic draft construction from Trigger, Complexity, Why Elastic, Key Unknown and Best Discovery Question without fabricating facts.
- [ ] Build editable fields and approval states Draft → Ready for Review → Approved.
- [ ] Prevent downstream client-ready use until approved.
- [ ] Run tests/build and commit.

### Task 6: Rebuild Capability Architect and Core/Flex/Scale

**Files:**
- Refactor: `lib/architect.mjs`
- Create: `features/architect/CapabilityArchitect.js`
- Create: `test/architect.test.mjs`

**Interfaces:**
- Consumes: approved `OutsideInDraft`, `Opportunity`.
- Produces: `CapabilityPlan { core[], flex[], scale[], rationale }`.

- [ ] Write tests asserting Core defaults to the smallest credible 2–3 role team and Flex/Scale are conditional.
- [ ] Retain the existing role catalogue/economic assumptions where recoverable, but separate role recommendation from pricing.
- [ ] Make all role selections, quantities and rationale editable.
- [ ] Add clear `Core`, `Flex` and `Scale` explanations tied to the opportunity rather than generic staffing copy.
- [ ] Run tests/build and commit.

### Task 7: Rebuild editable Strawman and internal economics

**Files:**
- Create: `features/strawman/strawman.mjs`
- Create: `features/strawman/StrawmanPage.js`
- Create: `features/strawman/EconomicsPanel.js`
- Create: `test/strawman.test.mjs`

**Interfaces:**
- Consumes: `Opportunity`, approved `OutsideInDraft`, `CapabilityPlan`.
- Produces: editable `Strawman`; internal `Economics`.

- [ ] Write tests for preserving edited copy/team shape/scenarios and recalculating economics from explicit inputs.
- [ ] Build editable proposition, outcomes, team, deployment and scenario sections.
- [ ] Keep BUY-side and margin calculations in an internal economics object/panel only.
- [ ] Run tests/build and commit.

### Task 8: Enforce client-safe proposal boundary and PDF/print view

**Files:**
- Create: `features/proposal/clientProposal.mjs`
- Create: `features/proposal/ClientProposal.js`
- Create: `test/client-proposal.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Strawman plus SELL-side client investment fields.
- Produces: `ClientProposalDTO` containing only whitelisted client-safe properties.

- [ ] Write a test that recursively serialises `ClientProposalDTO` and asserts forbidden keys/values for buyRate, gp, gm, markup and bench assumptions are absent.
- [ ] Implement whitelist construction rather than object spreading/internal-field deletion.
- [ ] Build polished print layout and `window.print()` PDF action.
- [ ] Verify print CSS excludes application navigation and internal controls.
- [ ] Run tests/build and commit.

### Task 9: Restore supporting product modules

**Files:**
- Create: `features/talent/TalentNetwork.js`
- Create: `features/engagements/Engagements.js`
- Refactor/Create: `features/patterns/PatternLibrary.js`
- Create: `features/learning/LearningEngine.js`
- Create: `features/system/Settings.js`
- Create: `features/system/Integrations.js`

**Interfaces:**
- Talent exposes role/skill/availability/rate/timezone/clearance/industry/stack/seniority/earliest-start fields.
- Pattern maturity enum: `Hypothesised | Client-validated | Delivery-proven`.

- [ ] Move recoverable pattern data out of the reconstructed monolith.
- [ ] Build useful read/edit surfaces for talent and pattern maturity without inventing external records.
- [ ] Build Engagements as the post-conversion workspace using only locally entered/available engagement data.
- [ ] Settings/Integrations show the Prospect Engine connection and configuration state; no fake connected-service claims.
- [ ] Run build and commit.

### Task 10: End-to-end verification and preview deployment

**Files:**
- Modify only files required by failures discovered during verification.

**Interfaces:**
- Produces: a Vercel preview URL for review; production remains unchanged.

- [ ] Run `npm test` and require zero failures.
- [ ] Run `npm run build` and require exit code 0.
- [ ] Verify the live Sheet returns the complete active set and spot-check Lawfront, AAB and the newest active prospect against source fields.
- [ ] Verify Opportunities → Outside-In → Architect → Strawman → Client Proposal manually in preview.
- [ ] Verify client-safe serialised output contains none of the forbidden internal economics fields.
- [ ] Verify supplied logo proportions and desktop/mobile shell against the reference screenshots.
- [ ] Deploy the V2 branch as preview only and record the preview URL.
- [ ] Do not promote to production until user acceptance.
