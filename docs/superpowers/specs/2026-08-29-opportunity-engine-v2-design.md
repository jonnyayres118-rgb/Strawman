# Elastic Labs Opportunity Engine V2 Design

## Goal
Build the definitive Elastic Labs Opportunity Engine by combining the current 53-account intelligence engine with the depth and working-canvas feel of the original Strawman product. Production remains untouched until the replacement is verified and approved.

## Product principle
The Opportunity Engine is the intelligence front-end. Strawman is the commercial creation engine.

Primary flow:

Opportunities → Outside-In → Build Strawman → generated commercial workspace → modular team → live economics → scenarios → client proposal.

The machine proposes; Jonny decides. Generated content is always an editable starting point rather than a locked answer.

## Opportunity source of truth
The application owns the opportunity dataset. The current 53 active opportunities and their research are bundled into the platform rather than depending on Google Sheets at runtime. Opportunity records preserve the full research needed for trigger, rationale, ownership/backer, scale, complexity, buyer, contact, next action, Outside-In state, source/confidence and research status.

Future opportunity updates are made in the platform/repository source of truth.

## Opportunity workflow
The first screen answers who needs Elastic now, why now, what evidence supports that view, the key unknown and the next best action.

Lifecycle states support Researching, Qualified, Outside-In Draft, Ready for Review, Approved, Sent, Conversation, Opportunity, Won and Lost. Human approval remains required before an Outside-In is treated as approved/client-ready.

## Outside-In
Outside-In separates observed evidence from hypotheses. The structure is Observation, Tension, Hypothesis, Question and What Elastic Labs would do. Unknowns remain explicit rather than being converted into assertions.

A prominent Build Strawman action converts the selected account research and Outside-In into a first commercial recommendation rather than opening a blank builder.

## Generated Strawman
The initial Strawman should propose:
- the client problem and commercial context;
- the outcome Elastic could create;
- the smallest credible entry point;
- a recommended team shape;
- conditional capability that may be needed later;
- deployment phases and duration;
- an initial commercial scenario;
- the reasoning behind the recommendation.

The generator must prefer the smallest credible way to create the first useful outcome. A one-person engagement is valid. There is no minimum three-person Core rule.

## Modular Core, Flex and Scale
Core, Flex and Scale are classifications and recommendations, not prescribed team sizes.

Core means capability required from the start. It may contain one person or many.

Flex means specialist capability switched on only when a phase or problem requires it.

Scale means additional capability that could be introduced after the initial work proves valuable.

Every engagement team member can be added, removed, duplicated, reassigned, moved between Core/Flex/Scale and independently configured. Users can change role, assigned person, days per week, duration, BUY rate and SELL rate.

This supports a land → prove → expand commercial motion rather than forcing every prospect into a large pod.

## Role Library
Restore a full Elastic capability catalogue rather than a handful of generic roles. Initial catalogue should include at minimum:
- Principal AI / AI Architect
- AI Engineer
- AI Infrastructure Engineer
- AI Product Lead / AI Product Manager
- Data Engineer
- Data Scientist
- MLOps Engineer
- Cloud / DevOps Engineer
- Product Manager
- Product Designer / UX
- Solution / Platform Architect
- Software Engineer / Full-stack Engineer
- Technical Delivery / Programme Lead
- Security / Governance specialist

The catalogue is extensible. Each role holds capability/discipline, seniority, description, skills, default BUY range, default SELL range and typical Core/Flex/Scale applicability. Benchmark rates are configurable and must not be presented as actual contractor costs unless an actual person is assigned.

## Talent Network
Talent Network represents actual specialists who may fulfil roles. A person can map to multiple roles.

Each person can hold name, role capabilities, skills/technologies, seniority, actual BUY/day, availability, earliest start, location/timezone, sector experience, clearance and internal notes.

The Strawman initially works from role benchmarks. At a later commercial stage, Assign Talent can replace a benchmark role with a real person and their actual economics.

## Engagement team member model
The engagement team member is the atomic commercial unit. It stores:
- role;
- optional assigned person;
- Core/Flex/Scale classification;
- phase/start timing;
- weeks or start/end dates;
- days per week;
- total billable days;
- BUY/day;
- SELL/day;
- revenue;
- delivery cost;
- gross profit;
- gross margin;
- notes/assumptions.

Economics are calculated per team member and then aggregated. Do not use a single blended average person as the underlying commercial model.

## Commercial workspace
Strawman is a working commercial canvas with four primary editable areas:

### Outcome
What Elastic is there to achieve, the hypothesis being tested, deliverables and success criteria.

### Team
Fully modular Core/Flex/Scale role cards with add, remove, duplicate, move and assign-talent controls.

### Deployment
Phases, timing, duration and role allocation by phase.

### Commercials
Live role-level economics. Changing a role, rate, allocation or duration immediately recalculates revenue, cost, GP and GM.

A persistent engagement summary shows team size, duration, client investment, GP and GM.

## Scenarios
Users can create, duplicate and compare multiple commercial scenarios, including patterns such as Land, Recommended and Accelerated. These are editable labels, not fixed templates.

Each scenario has its own team shape, allocation, duration and economics. Duplicating a scenario creates an editable copy so alternative commercial shapes can be tested quickly.

## Recommendation reasoning
The Capability Architect must explain why each proposed capability is present and what evidence or hypothesis caused it to be recommended.

It should also explain why capability is deferred. Example: start with an AI Product Lead because the immediate uncertainty is problem definition; add Data Engineering only if discovery confirms a data-integration requirement.

This reasoning remains internal unless explicitly selected for client-safe copy.

## Internal economics
Internal economics include individual BUY/day, SELL/day, total days, revenue, cost, GP, GM and internal assumptions. Totals are derived from the individual engagement team members.

BUY and SELL values remain editable at engagement level so a benchmark can be overridden for a particular opportunity without changing the master role library.

## Client proposal
Create Client Proposal transforms an approved Strawman into a polished editable client proposition.

Client output is downstream of the commercial model and is created from an explicit whitelist DTO. It may include client/account, outcome, context, approach, phases, deliverables, team roles, team shape, duration, assumptions approved for the client and SELL-side investment.

It must never include BUY rates, individual contractor costs, GP, GM, markup, bench assumptions, talent availability notes or other internal economics.

The client proposal preserves user-edited copy, punctuation, section order, selected scenario, team shape, deployment and compatible uploaded images.

## Output
Primary client output is a polished client-safe proposal and print/PDF view. Export architecture should remain compatible with an editable DOCX/Google Docs workflow, but the commercial model and client-safe separation are the priority of this rebuild.

## Supporting modules
Talent Network supports supply against recommended capability. Engagements represents active delivery after conversion. Pattern Library / Learning Engine captures reusable patterns with maturity states Hypothesised → Client-validated → Delivery-proven. Settings exposes role benchmarks and relevant commercial defaults. Integrations should exist only where they support the core workflow.

## UX
Preserve the current Opportunity Engine as the intelligence doorway, but make the Strawman workspace feel like the stronger original working product rather than a static report.

The key working screen should make team composition and economics tactile: editable role cards, immediate calculations, clear scenario controls and a persistent commercial summary. Depth should be progressively disclosed rather than removed.

Do not redesign for novelty. Use the established light content area, dark navigation and expert/professional Elastic Labs posture.

## Architecture
Use the existing Next.js application on the isolated V2 branch. Keep focused modules with explicit boundaries:
- opportunity data and intelligence;
- Outside-In;
- recommendation/Capability Architect;
- role library;
- talent network;
- engagement/scenario model;
- economics calculator;
- Strawman workspace;
- client-safe proposal mapper/rendering.

Commercial calculations should be pure/testable functions. Client-safe output must use a separate whitelist DTO rather than CSS hiding.

## Error handling and data integrity
Missing role benchmarks should be surfaced rather than silently replaced with arbitrary averages. Missing actual talent rates should fall back only to the selected role benchmark and be visibly marked as benchmark economics. Invalid allocations or durations should be prevented or flagged before proposal generation.

Opportunity research remains evidence-led; missing research stays unknown rather than being invented.

## Safety and deployment
Production remains untouched during development. Build and test on the V2 implementation branch and preview deployment. Verify the full workflow before replacing production.

## Acceptance criteria
1. All 53 active opportunities and their research remain available and correctly mapped.
2. A selected opportunity can progress from Outside-In to a generated, editable Strawman.
3. Generated Strawman proposes the smallest credible entry point and permits a one-person Core.
4. Full Elastic role catalogue is available and extensible.
5. Team members can be added, removed, duplicated and moved between Core/Flex/Scale.
6. Every team member has independent allocation, duration, BUY and SELL economics.
7. Role benchmark economics can be replaced by actual assigned-talent economics.
8. Revenue, cost, GP and GM recalculate correctly from role-level data.
9. Multiple scenarios can be created, duplicated, edited and compared.
10. Recommendation reasoning explains why roles are included or deferred.
11. User-edited outcome, team, deployment and proposal copy persist through the workflow.
12. Client-safe output is generated from an explicit whitelist and cannot expose BUY rates, GP, GM, markup, bench assumptions or talent notes.
13. Proposal/print output is polished and client-safe.
14. Automated tests cover role-level calculations, one-person engagements, scenario isolation and internal/client separation.
15. Production is not changed until the preview has been reviewed and accepted.