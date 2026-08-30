function numeric(value){ return value == null ? null : Number(value); }

export function resolveCommercialRate({ roleId, benchmark = null, talent = null, override = null } = {}) {
  const buyCandidate = override?.buyRate != null ? override : talent?.buyRate != null ? talent : benchmark?.buyRate != null ? benchmark : null;
  const sellCandidate = override?.sellRate != null ? override : benchmark?.sellRate != null ? benchmark : talent?.sellRate != null ? talent : null;
  if (!buyCandidate || !sellCandidate) {
    return { roleId, status:'MISSING_INPUT', buyRate:numeric(buyCandidate?.buyRate), sellRate:numeric(sellCandidate?.sellRate), buySource:buyCandidate?.source || null, sellSource:sellCandidate?.source || null, source:null };
  }
  return { roleId, status:'VERIFIED', buyRate:numeric(buyCandidate.buyRate), sellRate:numeric(sellCandidate.sellRate), buySource:buyCandidate.source || 'verified', sellSource:sellCandidate.source || 'verified', source:buyCandidate.source === sellCandidate.source ? (buyCandidate.source || 'verified') : 'mixed-verified-sources' };
}

export function priceMember(member, source) {
  const rate = resolveCommercialRate({ roleId:member.roleId, override:source });
  const totalDays = Number(member.weeks || 0) * Number(member.daysPerWeek || 0);
  if (rate.status !== 'VERIFIED') return { ...member, ...rate, totalDays, revenue:null, cost:null, gp:null, gm:null, rateSource:null };
  const revenue = totalDays * rate.sellRate;
  const cost = totalDays * rate.buyRate;
  const gp = revenue - cost;
  return { ...member, ...rate, totalDays, revenue, cost, gp, gm:revenue ? gp/revenue : 0, rateSource:rate.source };
}
