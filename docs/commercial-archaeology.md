# Strawman commercial archaeology

## Recovered with confidence
- 167 billable days per year was part of the prior Elastic commercial model.
- 38.6% on-cost was part of the prior Elastic commercial model.
- Economics were role/seniority based, not one blended person rate.
- Internal modelling included BUY, SELL, revenue, cost, GP and GM.
- Client proposal output must expose SELL-side investment only.
- Scenario modelling supports lean/land, recommended and accelerated shapes.

Recovered contextual assumptions are recorded as RECOVERED_CONTEXT, not automatically promoted to approved pricing defaults. The salary-to-loaded-day-cost calculator is restored, but it produces a role cost only when an exact annual salary input has been recovered or approved and billable-day assumptions are valid.

## Commercial engine rule
Every BUY and SELL value carries provenance independently. Input precedence is explicit per side: a deal BUY override wins only for BUY; otherwise actual talent BUY can replace benchmark BUY; otherwise benchmark BUY is used. A deal SELL override wins only for SELL; otherwise benchmark SELL is used. This means changing client pricing never silently rewrites delivery cost.

If either side remains absent, the model stays MISSING_INPUT and does not infer the missing value. Explicit zero values are preserved where deliberately approved rather than treated as absent. Benchmark lookups are copied into deal state so editing a Strawman cannot mutate the underlying rate library.

A scenario can contain unresolved roles while being designed. The internal workspace shows verified subtotal economics, the unique missing role types and an unresolved-role count for the UI. A final scenario investment is unavailable until at least one role exists and every included role is fully costed. Once complete, the internal view exposes final revenue, cost, GP and GM. Client proposal generation receives only the final investment and client-safe team/deployment fields such as role, layer, phase, total days, weeks and days per week. Individual BUY/SELL rates never cross that boundary.

## Must not be guessed
- Role-specific salary/BUY rates.
- Role-specific SELL rates.
- Seniority multipliers/bands where exact values are not recovered.
- Markup or target-margin defaults where exact values are not recovered.
