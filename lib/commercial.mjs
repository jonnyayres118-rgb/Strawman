const toNumber = value => value === "" || value === null || value === undefined ? null : Number(value);

export function calculateEconomics({ buy, sell, days, people }) {
  const buyRate = toNumber(buy);
  const sellRate = toNumber(sell);
  const deliveryDays = Number(days || 0);
  const teamSize = Number(people || 0);
  const complete = Number.isFinite(buyRate) && Number.isFinite(sellRate) && buyRate >= 0 && sellRate > 0 && deliveryDays > 0 && teamSize > 0;
  if (!complete) return { complete: false, investment: null, grossProfit: null, grossMargin: null };
  const investment = sellRate * deliveryDays * teamSize;
  const cost = buyRate * deliveryDays * teamSize;
  const grossProfit = investment - cost;
  const grossMargin = (grossProfit / investment) * 100;
  return { complete: true, investment, cost, grossProfit, grossMargin };
}

export function clientSafeCommercial({ buy, sell, days, people }) {
  const result = calculateEconomics({ buy, sell, days, people });
  if (!result.complete) return { complete: false, investment: null, sell: null, days: Number(days || 0), people: Number(people || 0) };
  return { complete: true, investment: result.investment, sell: Number(sell), days: Number(days), people: Number(people) };
}
