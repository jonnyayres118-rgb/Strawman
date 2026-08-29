# Elastic Labs Opportunity Engine V2 Design

## Goal
Rebuild the recoverable source into the definitive Elastic Labs Opportunity Engine without changing the currently rolled-back production deployment until the replacement has been verified.

## Product flow
Opportunities → Outside-In → Capability Architect → Core/Flex/Scale → editable Strawman → internal economics / client-safe view → PDF.

Supporting areas: Talent Network, Engagements, Pattern Library / Learning Engine, Settings and Integrations where they support the core journey.

## Source of truth
The existing Elastic Labs Prospect Engine Google Sheet is the opportunity source of truth. Active Pipeline rows are read into the application and mapped without inventing missing prospect data. The application must show the complete active opportunity set rather than a hard-coded seed list.

## Opportunity workflow
The first screen answers who needs Elastic now, why now, what evidence supports that view, the key unknown and the next best action. Opportunity records retain the Sheet fields needed for trigger, rationale, ownership/backer, scale, complexity, buyer, contact, next action, Outside-In state, source/confidence and research status.

Lifecycle states support Researching, Qualified, Outside-In Draft, Ready for Review, Approved, Sent, Conversation, Opportunity, Won and Lost. Human approval remains required before an Outside-In is treated as approved/client-ready.

## Outside-In
Outside-In content separates observed evidence from hypotheses. The structure is Observation, Tension, Hypothesis, Question and What Elastic Labs would do. Unknowns remain explicit rather than being converted into assertions.

## Capability Architect
The architect reasons from the approved Outside-In rather than offering a generic staffing catalogue. It proposes the smallest credible Core, normally 2–3 roles, then conditional Flex capability and Scale only after proof. Core/Flex/Scale recommendations remain editable before they feed the Strawman.

## Strawman and economics
The Strawman is editable and preserves user-edited copy, team shape, scenarios and deployment assumptions. Internal economics can include delivery costs and commercial calculations. Client-safe rendering is produced from a whitelist model and must never expose BUY rates, GP, GM, markup, bench assumptions or other internal economics.

## Output
Client output is a polished PDF/print view. Google Docs is not part of this rebuild requirement.

## Supporting modules
Talent Network captures the specialist supply needed to fulfil recommended capability. Engagements represents active delivery after an opportunity converts. Pattern Library / Learning Engine captures reusable patterns with maturity states Hypothesised → Client-validated → Delivery-proven. Settings and Integrations expose only configuration needed by the application and Sheet connection.

## Brand and UX
Use the supplied Elastic Labs logo asset without recreating it. Preserve the established light content area, dark navigation and expert/professional product posture shown by the working deployment/reference screenshots. Do not redesign for novelty. Navigation should make the core intelligence and capability journey obvious.

## Architecture
Use the existing Next.js application as the rebuild base on an isolated branch. Split the large reconstructed page into focused modules for opportunities, Outside-In, architect, Strawman/economics and supporting navigation. Server-side Sheet retrieval normalises Pipeline rows into a typed application DTO. Client-safe proposal output uses a separate whitelist DTO rather than CSS hiding.

## Safety and deployment
The currently rolled-back production deployment remains untouched during development. Build and test V2 on a separate branch/preview. Verify the end-to-end workflow, prospect count/data mapping, internal/client separation, responsive layout and production build before replacing production. GitHub becomes the canonical source after acceptance.

## Acceptance criteria
1. Complete active Google Sheet opportunity set loads correctly, including the newest active prospects.
2. Search/filter/status navigation works across opportunities.
3. A selected opportunity can progress through Outside-In, Capability Architect and editable Strawman.
4. Core/Flex/Scale is generated from opportunity context and remains editable.
5. Internal economics cannot leak into client-safe output.
6. Client-safe PDF/print output works.
7. Supplied Elastic Labs logo renders at its natural proportions.
8. Supporting navigation/modules are restored sufficiently to preserve the richer product model.
9. Automated tests and production build pass.
10. Production is not changed until the preview has been reviewed and accepted.