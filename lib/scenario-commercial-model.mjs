import { priceMember } from './verified-rate-engine.mjs';

export function calculateCommercialScenario(scenario = {}) {
  const members = (scenario.members || []).map(member => priceMember(member, member.commercial));
  const missingInputs = [...new Set(members.filter(member => member.rateStatus !== 'VERIFIED').map(member => member.roleId))];
  const verified = members.filter(member => member.rateStatus === 'VERIFIED');
  const verifiedRevenue = verified.reduce((sum, member) => sum + member.revenue, 0);
  const verifiedCost = verified.reduce((sum, member) => sum + member.cost, 0);
  const verifiedGp = verifiedRevenue - verifiedCost;
  const isFullyCosted = members.length > 0 && missingInputs.length === 0;
  return {
    ...scenario,
    members,
    missingInputs,
    isFullyCosted,
    verifiedRevenue,
    verifiedCost,
    verifiedGp,
    revenue:isFullyCosted ? verifiedRevenue : null,
    cost:isFullyCosted ? verifiedCost : null,
    gp:isFullyCosted ? verifiedGp : null,
    gm:isFullyCosted ? (verifiedRevenue ? verifiedGp / verifiedRevenue : 0) : null
  };
}
