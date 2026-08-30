import test from 'node:test';
import assert from 'node:assert/strict';
import { commercialSummary } from '../lib/commercial-summary.mjs';

test('workspace summary makes missing inputs explicit while retaining verified subtotal', () => {
  const summary = commercialSummary({ isFullyCosted:false, verifiedRevenue:16800, verifiedCost:11200, verifiedGp:5600, missingInputs:['ai-engineer'] });
  assert.equal(summary.status, 'Needs commercial inputs');
  assert.equal(summary.verifiedSubtotal.revenue, 16800);
  assert.deepEqual(summary.missingInputs, ['ai-engineer']);
  assert.equal(summary.finalInvestment, null);
});

test('fully costed summary exposes final internal economics', () => {
  const summary = commercialSummary({ isFullyCosted:true, verifiedRevenue:42000, verifiedCost:28000, verifiedGp:14000, revenue:42000, cost:28000, gp:14000, gm:1/3, missingInputs:[] });
  assert.equal(summary.status, 'Fully costed');
  assert.equal(summary.finalInvestment, 42000);
  assert.equal(summary.finalCost, 28000);
  assert.equal(summary.finalGp, 14000);
  assert.equal(summary.finalGm, 1/3);
});

test('summary reports unresolved role count for UI attention state', () => {
  const summary = commercialSummary({ isFullyCosted:false, missingInputs:['ai-engineer','data-engineer'] });
  assert.equal(summary.missingCount, 2);
});
