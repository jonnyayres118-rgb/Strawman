export function commercialSummary(scenario = {}) {
  const ready = scenario.isFullyCosted === true;
  return {
    status:ready ? 'Fully costed' : 'Needs commercial inputs',
    verifiedSubtotal:{ revenue:scenario.verifiedRevenue ?? 0, cost:scenario.verifiedCost ?? 0, gp:scenario.verifiedGp ?? 0 },
    missingInputs:[...(scenario.missingInputs || [])],
    finalInvestment:ready ? scenario.revenue : null,
    finalCost:ready ? scenario.cost : null,
    finalGp:ready ? scenario.gp : null,
    finalGm:ready ? scenario.gm : null
  };
}
