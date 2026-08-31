# Elastic Labs Strawman Builder Rebuild Design

## Purpose

Rebuild the Elastic Labs Strawman Builder around the proven functionality of the live Vercel deployment at `elastic-labs-strawman-builder-deplo.vercel.app`, while making the attached nine-page Elastic Labs client proposal the canonical visual output and preserving the richer commercial and capability-design functionality that has been lost from the simplified GitHub `main` application.

The product must optimise for one commercial outcome: move from evidence and client context to a credible, editable capability strawman and client-ready proposal in minutes.

The core operating loop is:

**Outside-In -> Mission -> Team -> Economics -> Flex -> Scenarios -> Proposal -> Export**

The product is not a CRM, prospecting platform, staffing marketplace, or generic proposal tool.

---

## Product principles

1. Start with the business mission, not available people.
2. Separate fact, inference, hypothesis and unknowns.
3. Recommend the smallest credible Core.
4. Add Flex only when evidence says specialist capability is needed.
5. Add Scale only after proof or when workload makes it necessary.
6. Keep hierarchy and ownership visible in the team design.
7. Allow every commercial assumption to be edited manually.
8. Keep internal economics completely separate from client-facing output.
9. The Builder thinks. The proposal template presents.
10. The proposal design must never drift because of future application changes.

---

## Functional baseline

The live Vercel deployment is the behavioural reference implementation for the following existing capabilities that must be preserved or re-created:

- saved opportunities
- client and opportunity context
- problem/challenge inputs
- role and capability taxonomy
- role benchmark rates
- hierarchy/team-shape visualisation
- Core/Flex classification
- fractional FTE counts
- utilisation assumptions
- multiple engagement models
- true buy-cost modelling
- manual sell-rate controls
- margin and markup controls
- gross profit and gross margin calculations
- central commercial assumptions
- overhead and contribution modelling
- cash-flow exposure modelling
- flexible deployment phases
- scenarios
- proposal editing and reordering
- standard proposal section library
- image/PDF insertion where client-safe
- internal/client view separation
- PDF export
- editable Google Docs handoff
- internal economics CSV export

The current simplified Opportunity Engine in GitHub `main` may provide useful Outside-In reasoning patterns, but it must not replace this richer functional baseline.

---

## Information architecture

The primary application navigation should be deliberately compact:

1. Dashboard
2. Client + Outside-In
3. Mission
4. Team
5. Team Shape
6. Economics
7. Flex + Deployment
8. Scenarios
9. Proposal
10. Export
11. Settings / Rate Card

Internal economic settings should not dominate the main workflow. Rate cards, overhead, utilisation and margin assumptions belong in Settings / Rate Card, with role-level overrides available during team pricing.

---

## 1. Dashboard

The dashboard stores and opens opportunities. It should show, at minimum:

- client
- opportunity / mission title
- status
- team size
- recommended monthly sell investment
- annualised sell value
- blended gross margin (internal only)
- target start date
- warning state where commercial guardrails fail

The dashboard is an internal workspace only.

---

## 2. Client + Outside-In

This replaces the current shallow opportunity form with an evidence-led intake.

### Client fields

- Client name
- Opportunity name
- Industry
- Location
- Primary contact
- Currency
- Expected start date
- Expected duration
- Status
- Notes

### Outside-In fields

- Trigger / observable change
- Evidence / known facts
- Exposure / likely consequence
- Tension / hypothesis
- Existing capability
- Known skills or capability gaps
- Critical unknown
- Discovery question
- Technology / platform context
- Regulatory / security context
- Location / time-zone requirement
- Urgency
- Budget indication

Each field must be editable and persist independently.

The UI must visibly distinguish FACT from HYPOTHESIS and UNKNOWN.

The product must never state an internal problem as fact unless the user explicitly entered it as confirmed information.

---

## 3. Mission

The mission is the bridge between Outside-In research and team design.

Required fields:

- Mission statement
- Desired business outcome
- 3-5 success outcomes
- What the client retains
- What Elastic Labs may provide
- Constraints
- Assumptions to validate

The mission statement should be written as an outcome, not a role request.

Example form:

> Create a repeatable integration capability that accelerates acquisition onboarding while protecting the permanent technology team's capacity.

The Mission view must allow the user to regenerate a draft from the Outside-In inputs, but regeneration is always explicit. Manual edits are preserved until the user chooses to regenerate.

---

## 4. Team Architect

The Team view is the commercial heart of the product.

Each role must support:

- role title
- capability family
- seniority
- quantity / FTE
- Core / Flex / Scale tier
- hierarchy level
- reporting / ownership relationship where relevant
- allocation %
- engagement model
- location
- start date
- duration
- key skills
- relevant experience
- industry experience
- why this role exists
- when this role is needed / activation condition
- notes
- benchmark salary
- benchmark contract day rate
- manual buy-rate override
- utilisation override
- pricing method
- target margin
- markup
- manual sell-rate override

Fractional FTE values such as 0.5 must work throughout every calculation and output.

### Team generation

The Builder may propose a team from the mission and Outside-In context, but the generated shape is a strawman only.

The reasoning sequence is:

1. determine the minimum ownership capability required from day one
2. determine delivery capability required from day one
3. classify specialist capability that can remain Flex
4. classify additional capacity that belongs in Scale
5. stress-test whether any role can be removed without making the mission non-credible

The generated team must not mechanically insert AI roles just because AI is mentioned.

---

## 5. Team Shape

The Team Shape page visualises hierarchy and purpose rather than a row of equal role cards.

The hierarchy should make the following visible:

- leadership / ownership
- delivery spine
- specialist Flex capability
- Scale capacity

Each visible role contains:

- count
- role title
- seniority
- tier

The user can increase/decrease FTE, duplicate, remove, change seniority and move between Core/Flex/Scale directly from this view.

The proposal version of the team must include concise content for:

- ROLE
- WHY IT EXISTS
- WHEN IT IS NEEDED

---

## 6. Rate Card and Economics

### Global rate card

Provide editable benchmark ranges for all supported role types and allow custom roles.

Default capability families include:

- AI / ML
- Data
- Infrastructure
- Product
- Delivery / Transformation
- Design / Service
- Specialist

The user must be able to add, edit and remove rate-card rows.

### Engagement models

At minimum preserve:

- Employee
- PAYE Contractor
- Outside IR35 Contractor
- Freelancer
- Agency Supplied Worker
- Partner/Subcontractor
- Employer of Record

### Cost model

True buy cost must support:

- salary or contractor day rate
- employer NI where relevant
- pension where relevant
- apprenticeship levy where relevant
- recruitment / sourcing
- insurance
- payroll / EOR
- legal / compliance
- training
- benefits
- management overhead
- equipment
- software
- other role-level assumptions

Billable-day calculations must account for working days, public holidays, annual leave, sickness allowance, training, internal allocation and target utilisation.

### Pricing controls

Each role supports three pricing methods:

1. target gross margin
2. markup
3. manual sell price

Changes must recalculate immediately.

### Internal output

The internal economics view must show:

- buy/day
- sell/day
- GP/day
- margin %
- markup %
- true annual buy cost
- monthly and annual sell value
- team GP
- blended GM
- revenue per head
- GP per head
- effective client day rate
- contribution after allocated overhead
- indicative cash exposure

### Guardrails

Warnings should include:

- role below minimum margin
- team below minimum blended margin
- high working-capital exposure
- concentration risk where relevant
- contractor employment-status review note

These are internal warnings only.

---

## 7. Flex + Deployment

The deployment model must show that the client does not need every capability at full utilisation for the whole engagement.

The user can create custom phases. A sensible default is:

- Discover / Prove
- Build
- Scale / Transfer

Each phase supports:

- phase name
- date/month range
- outcome / purpose
- deliverables
- active roles
- FTE/allocation changes by role where required

The system generates a role-aware capacity timeline from this data.

If no credible phase data exists, the proposal must omit the timeline rather than generate a meaningless or mostly blank page.

---

## 8. Scenarios

The product supports three client-facing scenario concepts:

### Core
Lowest fixed commitment. Best where the client already has significant internal capability.

### Recommended
The default starting point. Balanced ownership and delivery capacity while remaining lean.

### Scale
Expanded capability for accelerated delivery, higher workload or proven demand.

Each scenario must be editable independently.

A scenario is not simply a multiplier of the Recommended team. Users must be able to add/remove roles and change FTE within each scenario.

Client-visible scenario fields:

- option name
- use case
- people / FTE
- monthly sell investment
- duration where different
- flexibility level
- role composition
- recommended-starting-point label

Internal economics for every scenario remain available internally but never appear in the proposal.

---

## 9. Canonical Client Proposal

The attached nine-page Elastic Labs proposal defines the visual language and page discipline.

The generated proposal should default to the following narrative:

### Page 1 - Cover

- Elastic Labs brand
- client name
- mission / proposal title
- Initial capability strawman
- date
- prepared-for / location / confidentiality metadata

### Page 2 - The Moment / Opportunity

- observable change
- evidence / known facts
- resulting pressure
- operational implication
- What you already have
- The constraint
- The opportunity
- Our Read

FACT and HYPOTHESIS must remain distinguishable.

### Page 3 - The Mission + Recommended Team

- prominent mission statement
- success outcomes
- recommended embedded capability count
- Core/Flex/Scale team structure
- concise rationale
- client retains vs Elastic provides

If content density requires it, Mission and Team may occupy separate pages. The renderer should prefer readability over an arbitrary page count.

### Page 4 - Elastic Operating Model

- Core
- Flex
- Scale
- Operate
- "Knowledge stays. Capacity changes."

### Page 5 - Capacity Timeline

- role-aware deployment bars
- phase names and duration where useful
- Core vs Flex visual distinction

Omit this page when no useful phase data exists.

### Page 6 - Team Options

- Core
- Recommended
- Scale
- people
- monthly investment
- flexibility
- team composition
- Recommended visually highlighted

### Page 7 - Investment

Client sell only.

Show:

- recommended monthly investment
- included services
- annualised value where useful
- initial commitment
- initial contract value
- clear indicative-language caveat

Never show internal economics.

### Page 8 - Elastic Launch

Default stages:

1. Understand
2. Design
3. Integrate
4. Mobilise
5. Operate & Flex

Stages and durations remain editable.

### Page 9 - Next Steps

- Validate
- Refine
- Match
- Mobilise
- indicative mobilisation time
- assumptions
- Elastic Labs contact details

---

## Proposal design system

The proposal uses:

- warm white / off-white background
- predominantly black typography
- restrained Elastic Labs hot pink accent
- generous whitespace
- thin grey rules
- strong grid
- editorial typography
- large numerical typography where commercially useful
- restrained cards
- occasional black blocks only where they improve hierarchy

Avoid:

- gradients
- excessive rounded cards
- heavy shadows
- stock imagery
- generic AI imagery
- robots / glowing brains
- blue/purple SaaS styling
- dashboard-like client pages
- dense copy

The document should feel like a premium strategy and technology proposal, not recruitment collateral or a dashboard exported to PDF.

---

## Proposal editability

Proposal content is generated from structured Builder state but becomes separately editable in the Proposal view.

Rules:

- source data never silently overwrites edited proposal copy
- regeneration is always explicit
- team and investment modules can remain live-linked where this does not destroy manual narrative edits
- custom sections can be added, duplicated, reordered and removed
- standard reusable Elastic Labs sections can be inserted from a library
- compatible client-safe images can be inserted
- uploaded PDF pages may be appended to PDF output

The proposal renderer must faithfully render structured decisions rather than reinterpret them.

---

## Export system

Three primary outputs:

### 1. Client Proposal PDF

Requirements:

- intentional A4 pagination
- no browser chrome
- no application UI
- no buttons
- no clipping
- no cut-off tables
- no broken page breaks
- no strange font substitution
- no leaked internal values

Structured visual modules should not split across pages.

### 2. Google Docs-compatible editable output

Provide an editable client-safe document generated from the same proposal state.

Preferred behaviour:

- create/open an editable native Google Doc where configured
- preserve proposal section order and edited copy
- preserve client-safe images where technically compatible
- never include internal economics
- opening an existing linked Doc must not silently overwrite manual Google Docs edits
- updating an existing linked Doc must be a separate explicit action with a warning

If native Google Docs creation cannot be configured in a given deployment, provide a Google Docs-compatible DOCX download as the fallback rather than opening a blank Google Doc.

### 3. Internal Economics CSV

Contains role-level commercial modelling for internal analysis only.

---

## Client/internal separation

This requirement is absolute.

### Internal-only

- buy rate
- true buy cost
- GP
- GM
- markup
- margin assumptions
- on-costs
- bench assumptions
- utilisation economics
- overhead allocation
- contribution
- working-capital exposure
- internal notes

### Client-safe

- sell price
- monthly / total investment
- team
- hierarchy
- duration
- role allocation where useful
- scenarios
- deployment
- outcomes
- assumptions
- next steps

Any export test must explicitly assert that internal-only fields do not appear in client-facing HTML, PDF source state, Google Docs HTML or DOCX output.

---

## Persistence

Opportunities must persist reliably between sessions.

The rebuild should keep persistence behind a clear storage interface so browser-local persistence can later be replaced with Supabase or another shared backend without rewriting the business logic.

Initial implementation may preserve local persistence to minimise scope, provided the storage module is isolated.

---

## Architecture

The current live Vercel build is a large self-contained HTML/JS application. The rebuild should preserve its proven behaviour but split responsibilities into focused modules.

Recommended Next.js structure:

- `app/page.js` - application shell and route-level composition only
- `components/navigation/` - sidebar and top bar
- `components/opportunity/` - client, Outside-In and mission editors
- `components/team/` - role editor and hierarchy/team-shape views
- `components/economics/` - rate card, assumptions, pricing and commercial views
- `components/deployment/` - phases and capacity timeline
- `components/scenarios/` - scenario editor and comparison
- `components/proposal/` - proposal editor and canonical page renderers
- `components/export/` - export UI
- `lib/domain/` - types/schema and migrations
- `lib/architect/` - Outside-In -> mission -> team reasoning
- `lib/economics/` - pure pricing and cost calculations
- `lib/proposal/` - client-safe proposal model builders
- `lib/export/` - PDF, DOCX/Google Docs and CSV helpers
- `lib/storage/` - persistence adapter
- `lib/rates/` - default rate card and commercial assumptions
- `tests/` - unit and integration tests

Business calculations and proposal-safety rules must be pure functions where possible so they can be tested without rendering the UI.

---

## Migration strategy

Do not evolve the simplified current page by layering every feature into `app/page.js`.

Instead:

1. preserve the current repo on `main`
2. implement the rebuild on a dedicated feature branch
3. port the proven behaviours from the live Vercel deployment into modular components/functions
4. selectively reuse Outside-In reasoning from the current Opportunity Engine where it improves evidence discipline
5. validate the canonical proposal renderer against the attached nine-page output
6. merge only when the full workflow is functional and tested

No saved data from the current simple prototype is assumed to be production-critical, but any existing locally stored opportunity data should not crash the new application. Provide a defensive migration/defaulting layer.

---

## Testing requirements

At minimum add tests for:

- true buy-cost calculation
- billable-day calculation
- margin pricing
- markup pricing
- manual sell pricing
- fractional FTE
- role-level utilisation override
- blended team economics
- scenario economics
- phase/timeline generation
- Core/Flex/Scale classification persistence
- Outside-In fact/hypothesis fields
- proposal regeneration preserving manual edits unless explicitly triggered
- client-safe proposal projection
- client-safe export redaction
- Google Docs/DOCX projection excluding internal economics
- CSV including internal economics
- persistence migrations/defaults

Add at least one end-to-end workflow test covering:

**new opportunity -> Outside-In -> mission -> team -> pricing -> phases -> scenarios -> proposal -> export-ready state**

The build and automated test suite must pass before deployment.

---

## Acceptance criteria

The rebuild is acceptable when a user can:

1. create an opportunity from a real Outside-In
2. define or generate a mission
3. generate/edit a hierarchical Core/Flex/Scale team
4. price every role using benchmark or manual inputs
5. see internal buy/sell/margin economics instantly
6. change team quantities and see economics recalculate
7. configure role-aware deployment phases
8. build/edit Core, Recommended and Scale scenarios
9. edit proposal narrative without corrupting underlying economics
10. generate a client-safe proposal at the visual quality of the attached Elastic Labs output
11. export an editable Google Docs-compatible document
12. export a premium PDF
13. export internal economics separately
14. never expose buy, GP, GM, markup, bench or internal assumptions to the client-facing outputs

The intended recipient reaction is:

> They've understood the mission, designed exactly the capability we might need, and made it incredibly easy to see how we could start.
