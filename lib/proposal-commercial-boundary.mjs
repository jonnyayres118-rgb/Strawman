export function commercialProposalView(scenario = {}) {
  const isFullyCosted = scenario.isFullyCosted !== false && scenario.revenue != null;
  return {
    commercialStatus:isFullyCosted ? 'READY' : 'MISSING_INPUT',
    investment:isFullyCosted ? scenario.revenue : null,
    team:(scenario.members || []).map(member => ({ roleId:member.roleId, totalDays:member.totalDays ?? null, layer:member.layer ?? null, phase:member.phase ?? null }))
  };
}
