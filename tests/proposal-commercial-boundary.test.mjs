import test from 'node:test';
import assert from 'node:assert/strict';
import { commercialProposalView } from '../lib/proposal-commercial-boundary.mjs';

test('client commercial view exposes investment but never delivery economics', () => {
  const view = commercialProposalView({ revenue:42000, cost:28000, gp:14000, gm:1/3, members:[{ roleId:'ai-product-lead', sellRate:1050, buyRate:700, totalDays:16 }] });
  assert.equal(view.investment, 42000);
  const raw = JSON.stringify(view);
  assert.equal(raw.includes('buyRate'), false);
  assert.equal(raw.includes('cost'), false);
  assert.equal(raw.includes('gp'), false);
  assert.equal(raw.includes('gm'), false);
  assert.equal(raw.includes('sellRate'), false);
});
