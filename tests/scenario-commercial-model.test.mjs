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

test('fully verified one-person land scenario produces complete economics', () => {
  const result = calculateCommercialScenario({ name:'Land', members:[{ id:'lead', roleId:'ai-product-lead', layer:'core', weeks:8, daysPerWeek:2, commercial:{ buyRate:700, sellRate:1050, source:'approved' } }] });
  assert.equal(result.isFullyCosted, true);
  assert.equal(result.revenue, 16800);
  assert.equal(result.cost, 11200);
  assert.equal(result.gp, 5600);
  assert.equal(Math.round(result.gm * 1000)/10, 33.3);
});

test('duplicate unresolved roles are reported once for commercial attention', () => {
  const result = calculateCommercialScenario({ members:[
    { id:'eng1', roleId:'ai-engineer', weeks:4, daysPerWeek:2, commercial:null },
    { id:'eng2', roleId:'ai-engineer', weeks:8, daysPerWeek:3, commercial:null }
  ]});
  assert.deepEqual(result.missingInputs, ['ai-engineer']);
});

test('empty scenario is not considered fully costed', () => {
  const result = calculateCommercialScenario({ members:[] });
  assert.equal(result.isFullyCosted, false);
  assert.equal(result.revenue, null);
});

test('invalid commercial input prevents final scenario pricing', () => {
  const result = calculateCommercialScenario({ members:[{ id:'bad', roleId:'ai-engineer', weeks:4, daysPerWeek:2, commercial:{ buyRate:-1, sellRate:1000, source:'bad' } }] });
  assert.equal(result.isFullyCosted, false);
  assert.deepEqual(result.missingInputs, ['ai-engineer']);
  assert.equal(result.revenue, null);
});
