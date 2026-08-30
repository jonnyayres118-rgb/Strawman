# Strawman commercial engine review

Scope review against the approved modular Strawman spec.

## Covered
- One-person Core is valid.
- Core, Flex and Scale are editable labels, not minimum team rules.
- Each team member carries independent role, allocation, duration, BUY and SELL values.
- Live revenue, cost, GP and GM calculate from individual team members.
- Full initial Elastic role catalogue is present.
- Unverified benchmark rates remain missing instead of using a blended fallback.
- Talent schema supports actual BUY rates and multi-role mapping.
- Scenarios duplicate team state independently in the interactive workspace.
- Opportunity research can initialise a generated engagement.
- Client proposal uses an explicit safe payload and excludes BUY, cost, GP and GM.
- Proposal copy state survives commercial sync.
- Dedicated /strawman-preview route enables isolated visual review.

## Deliberately not claimed
- No production deployment or merge.
- No fabricated contractor roster or rates.
- No claim that browser-level interaction tests have run. Node regression tests are present in-repo and Vercel build verification is required after branch update.
