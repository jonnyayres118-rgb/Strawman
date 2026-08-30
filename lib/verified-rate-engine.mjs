export function resolveCommercialRate({ roleId, benchmark = null, talent = null, override = null } = {}) {
  const source = override || talent || benchmark;
  if (!source || source.buyRate == null || source.sellRate == null) {
    return { roleId, status:'MISSING_INPUT', buyRate:null, sellRate:null, source:null };
  }
  return { roleId, status:'VERIFIED', buyRate:Number(source.buyRate), sellRate:Number(source.sellRate), source:source.source || 'verified' };
}

export function priceMember(member, source) {
  const rate = resolveCommercialRate({ roleId:member.roleId, override:source });
  if (rate.status !== 'VERIFIED') return { ...member, ...rate, totalDays:Number(member.weeks||0)*Number(member.daysPerWeek||0), revenue:null, cost:null, gp:null, gm:null, rateSource:null };
  const totalDays = Number(member.weeks) * Number(member.daysPerWeek);
  const revenue = totalDays * rate.sellRate;
  const cost = totalDays * rate.buyRate;
  const gp = revenue - cost;
  return { ...member, buyRate:rate.buyRate, sellRate:rate.sellRate, totalDays, revenue, cost, gp, gm:revenue ? gp/revenue : 0, rateSource:rate.source, rateStatus:rate.status };
}
