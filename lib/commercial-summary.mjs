export function commercialSummary(scenario = {}) {
  const ready = scenario.isFullyCosted === true;
  const missingInputs = [...(scenario.missingInputs || [])];
  return {
    status:ready ? 'Fully costed' : 'Needs commercial inputs',
    verifiedSubtotal:{ revenue:scenario.verifiedRevenue ?? 0, cost:scenario.verifiedCost ?? 0, gp:scenario.verifiedGp ?? 0 },
    missingInputs,
    missingCount:missingInputs.length,
    finalInvestment:ready ? scenario.revenue : null,
    finalCost:ready ? scenario.cost : null,
    finalGp:ready ? scenario.gp : null,
    finalGm:ready ? scenario.gm : null
  };
}
