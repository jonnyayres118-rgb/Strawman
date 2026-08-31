import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoleEconomics, calculateTeamEconomics, calculateCashExposure, defaultCommercialAssumptions } from '../lib/strawman.mjs';

const assumptions = defaultCommercialAssumptions();

test('fractional FTE scales monthly sell value', () => {
  const full = calculateRoleEconomics({ role:'Data Engineer', count:1, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:600, pricingMethod:'manual', manualSellDay:900 }, assumptions);
  const half = calculateRoleEconomics({ role:'Data Engineer', count:0.5, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:600, pricingMethod:'manual', manualSellDay:900 }, assumptions);
  assert.equal(Math.round(half.sellMonthly), Math.round(full.sellMonthly / 2));
});

test('manual sell rate overrides margin pricing', () => {
  const result = calculateRoleEconomics({ role:'AI Engineer', count:1, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:650, pricingMethod:'manual', manualSellDay:1000 }, assumptions);
  assert.equal(result.sellPerDay, 1000);
});

test('target margin pricing derives sell from true buy', () => {
  const result = calculateRoleEconomics({ role:'Product Lead', count:1, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:600, pricingMethod:'margin', targetMarginPct:25 }, assumptions);
  assert.ok(result.sellPerDay > result.buyPerDay);
  assert.ok(Math.abs(result.marginPct - 25) < 0.1);
});

test('team economics and cash exposure aggregate role costs', () => {
  const team = calculateTeamEconomics([
    { role:'Lead', count:1, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:700, pricingMethod:'manual', manualSellDay:1000 },
    { role:'Engineer', count:2, allocationPct:100, engagementModel:'Outside IR35 Contractor', contractDayRateBenchmark:500, pricingMethod:'manual', manualSellDay:750 }
  ], assumptions);
  const cash = calculateCashExposure(team, 60, 30);
  assert.equal(team.headcount, 3);
  assert.ok(team.sellMonthly > team.buyMonthly);
  assert.ok(cash.maxExposure > 0);
});