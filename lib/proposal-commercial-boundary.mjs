export function commercialProposalView(scenario = {}) {
  return {
    investment: scenario.revenue ?? null,
    team: (scenario.members || []).map(member => ({ roleId:member.roleId, totalDays:member.totalDays ?? null, layer:member.layer ?? null, phase:member.phase ?? null }))
  };
}
