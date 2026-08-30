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
