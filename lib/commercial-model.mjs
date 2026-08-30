import { randomUUID } from 'node:crypto';

export function validateMember(member) {
  const positive = ['weeks', 'daysPerWeek', 'sellRate'];
  for (const key of positive) {
    if (!Number.isFinite(Number(member[key])) || Number(member[key]) <= 0) throw new Error(`${key} must be greater than zero`);
  }
  if (!Number.isFinite(Number(member.buyRate)) || Number(member.buyRate) < 0) throw new Error('buyRate cannot be negative');
  if (!['core', 'flex', 'scale'].includes(String(member.layer).toLowerCase())) throw new Error('layer must be core, flex or scale');
  return true;
}

export function calculateMember(member) {
  validateMember(member);
  const totalDays = Number(member.weeks) * Number(member.daysPerWeek);
  const revenue = totalDays * Number(member.sellRate);
  const cost = totalDays * Number(member.buyRate);
  const gp = revenue - cost;
  return { ...member, totalDays, revenue, cost, gp, gm: revenue ? gp / revenue : 0 };
}

export function calculateScenario(scenario) {
  const members = (scenario.members || []).map(calculateMember);
  const totals = members.reduce((a, m) => ({
    totalDays: a.totalDays + m.totalDays,
    revenue: a.revenue + m.revenue,
    cost: a.cost + m.cost,
    gp: a.gp + m.gp
  }), { totalDays: 0, revenue: 0, cost: 0, gp: 0 });
  return { ...scenario, members, ...totals, gm: totals.revenue ? totals.gp / totals.revenue : 0, memberCount: members.length };
}

export function cloneScenario(scenario, overrides = {}) {
  const id = overrides.id || randomUUID();
  const members = (scenario.members || []).map(member => ({ ...member, id: randomUUID() }));
  return calculateScenario({ ...scenario, ...overrides, id, members });
}