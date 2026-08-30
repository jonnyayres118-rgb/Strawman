function numeric(value){ return value == null ? null : Number(value); }
function invalidNumber(value){ return value != null && !Number.isFinite(Number(value)); }

export function resolveCommercialRate({ roleId, benchmark = null, talent = null, override = null } = {}) {
  const buyCandidate = override?.buyRate != null ? override : talent?.buyRate != null ? talent : benchmark?.buyRate != null ? benchmark : null;
  const sellCandidate = override?.sellRate != null ? override : benchmark?.sellRate != null ? benchmark : talent?.sellRate != null ? talent : null;
  const buyRate = numeric(buyCandidate?.buyRate);
  const sellRate = numeric(sellCandidate?.sellRate);
  if (invalidNumber(buyCandidate?.buyRate) || invalidNumber(sellCandidate?.sellRate) || (buyRate != null && buyRate < 0) || (sellRate != null && sellRate < 0)) {
    return { roleId, status:'INVALID_INPUT', buyRate, sellRate, buySource:buyCandidate?.source || null, sellSource:sellCandidate?.source || null, source:null };
  }
  if (!buyCandidate || !sellCandidate) return { roleId, status:'MISSING_INPUT', buyRate, sellRate, buySource:buyCandidate?.source || null, sellSource:sellCandidate?.source || null, source:null };
  return { roleId, status:'VERIFIED', buyRate, sellRate, buySource:buyCandidate.source || 'verified', sellSource:sellCandidate.source || 'verified', source:buyCandidate.source === sellCandidate.source ? (buyCandidate.source || 'verified') : 'mixed-verified-sources' };
}

export function priceMember(member, source) {
  const rate = resolveCommercialRate({ roleId:member.roleId, override:source });
  const weeks = Number(member.weeks);
  const daysPerWeek = Number(member.daysPerWeek);
  if (!Number.isFinite(weeks) || !Number.isFinite(daysPerWeek) || weeks <= 0 || daysPerWeek <= 0) return { ...member, ...rate, rateStatus:'INVALID_INPUT', totalDays:null, revenue:null, cost:null, gp:null, gm:null, rateSource:null };
  const totalDays = weeks * daysPerWeek;
  if (rate.status !== 'VERIFIED') return { ...member, ...rate, rateStatus:rate.status, totalDays, revenue:null, cost:null, gp:null, gm:null, rateSource:null };
  const revenue = totalDays * rate.sellRate;
  const cost = totalDays * rate.buyRate;
  const gp = revenue - cost;
  return { ...member, ...rate, rateStatus:rate.status, totalDays, revenue, cost, gp, gm:revenue ? gp/revenue : 0, rateSource:rate.source };
}
