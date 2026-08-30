import test from 'node:test';
import assert from 'node:assert/strict';
import { commercialProposalView } from '../lib/proposal-commercial-boundary.mjs';

test('client commercial view exposes investment but never delivery economics', () => {
  const view = commercialProposalView({ isFullyCosted:true, revenue:42000, cost:28000, gp:14000, gm:1/3, members:[{ roleId:'ai-product-lead', sellRate:1050, buyRate:700, totalDays:16 }] });
  assert.equal(view.investment, 42000);
  const raw = JSON.stringify(view);
  for (const secret of ['buyRate','cost','gp','gm','sellRate']) assert.equal(raw.includes(secret), false);
});

test('client proposal refuses to publish a partial scenario price', () => {
  const view = commercialProposalView({ isFullyCosted:false, revenue:null, verifiedRevenue:16800, missingInputs:['ai-engineer'], members:[] });
  assert.equal(view.investment, null);
  assert.equal(view.commercialStatus, 'MISSING_INPUT');
});
