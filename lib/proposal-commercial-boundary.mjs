export function commercialProposalView(scenario = {}) {
  const isFullyCosted = scenario.isFullyCosted !== false && scenario.revenue != null;
  return {
    commercialStatus:isFullyCosted ? 'READY' : 'MISSING_INPUT',
    investment:isFullyCosted ? scenario.revenue : null,
    team:(scenario.members || []).map(member => ({
      roleId:member.roleId,
      layer:member.layer ?? null,
      phase:member.phase ?? null,
      totalDays:member.totalDays ?? null,
      weeks:member.weeks ?? null,
      daysPerWeek:member.daysPerWeek ?? null
    }))
  };
}
