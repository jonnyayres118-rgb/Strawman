import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveCommercialRate, priceMember } from '../lib/verified-rate-engine.mjs';

test('missing role economics remain missing rather than inventing a fee', () => {
  const rate = resolveCommercialRate({ roleId: 'ai-product-lead' });
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
