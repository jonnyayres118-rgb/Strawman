import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveCommercialRate, priceMember } from '../lib/verified-rate-engine.mjs';
import { benchmarkForRole, COMMERCIAL_BENCHMARKS } from '../data/commercial-benchmarks.mjs';

test('missing role economics remain missing rather than inventing a fee', () => {
  const benchmark = benchmarkForRole('ai-product-lead');
  const rate = resolveCommercialRate({ roleId:'ai-product-lead', benchmark });
  assert.equal(rate.status, 'MISSING_INPUT');
  assert.equal(rate.buyRate, null);
  assert.equal(rate.sellRate, null);
});

test('verified benchmark prices an engagement member using explicit source values', () => {
  const member = priceMember({ roleId:'ai-product-lead', weeks:8, daysPerWeek:2 }, { buyRate:700, sellRate:1050, source:'verified-source' });
  assert.equal(member.totalDays, 16);
  assert.equal(member.revenue, 16800);
  assert.equal(member.cost, 11200);
  assert.equal(member.gp, 5600);
  assert.equal(member.rateSource, 'verified-source');
});

test('recovered operating assumptions are explicit and provenance-labelled', () => {
  assert.equal(COMMERCIAL_BENCHMARKS.assumptions.billableDaysPerYear.value, 167);
  assert.equal(COMMERCIAL_BENCHMARKS.assumptions.onCostRate.value, 0.386);
  assert.match(COMMERCIAL_BENCHMARKS.assumptions.onCostRate.status, /RECOVERED/);
});

test('zero BUY remains a valid explicit value rather than being treated as missing', () => {
  const rate = resolveCommercialRate({ roleId:'founder', override:{ buyRate:0, sellRate:1200, source:'approved' } });
  assert.equal(rate.status, 'VERIFIED');
  assert.equal(rate.buyRate, 0);
  assert.equal(rate.sellRate, 1200);
});

test('negative commercial rates are invalid', () => {
  assert.equal(resolveCommercialRate({ roleId:'bad', override:{ buyRate:-1, sellRate:1000, source:'bad' } }).status, 'INVALID_INPUT');
  assert.equal(resolveCommercialRate({ roleId:'bad', override:{ buyRate:500, sellRate:-1, source:'bad' } }).status, 'INVALID_INPUT');
});
