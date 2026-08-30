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
Every BUY and SELL value carries provenance independently. Inputs may come from a recovered benchmark, an actual verified talent cost, or an explicit deal override. If either side is absent, the model remains MISSING_INPUT and does not infer the missing value. Explicit zero values are preserved where deliberately approved rather than treated as absent. Benchmark lookups are copied into deal state so editing a Strawman cannot mutate the underlying rate library.

A scenario can contain unresolved roles while being designed. The internal workspace shows verified subtotal economics and the exact missing roles, but a final scenario investment is unavailable until every included role is fully costed. Once complete, the internal view exposes final revenue, cost, GP and GM. Client proposal generation receives only the final investment and client-safe team/deployment fields.

## Must not be guessed
- Role-specific salary/BUY rates.
- Role-specific SELL rates.
- Seniority multipliers/bands where exact values are not recovered.
- Markup or target-margin defaults where exact values are not recovered.
