import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCommercialScenario } from '../lib/scenario-commercial-model.mjs';

test('scenario totals verified members and reports unresolved roles separately', () => {
  const result = calculateCommercialScenario({ members:[
    { id:'lead', roleId:'ai-product-lead', weeks:8, daysPerWeek:2, commercial:{ buyRate:700, sellRate:1050, source:'approved' } },
    { id:'eng', roleId:'ai-engineer', weeks:6, daysPerWeek:3, commercial:null }
  ]});
  assert.equal(result.verifiedRevenue, 16800);
  assert.equal(result.verifiedCost, 11200);
  assert.equal(result.verifiedGp, 5600);
  assert.deepEqual(result.missingInputs, ['ai-engineer']);
  assert.equal(result.isFullyCosted, false);
  assert.equal(result.revenue, null);
});
