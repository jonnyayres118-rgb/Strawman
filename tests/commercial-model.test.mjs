import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMember, calculateScenario, cloneScenario, validateMember } from '../lib/commercial-model.mjs';

const member = (overrides = {}) => ({
  id: 'm1', roleId: 'ai-product-lead', personId: null, layer: 'core',
  weeks: 8, daysPerWeek: 2, buyRate: 750, sellRate: 1050,
  rateSource: 'benchmark', phase: 'Discover', notes: '', ...overrides
});

test('one-person Core calculates role-level economics', () => {
  const result = calculateMember(member());
  assert.equal(result.totalDays, 16);
  assert.equal(result.revenue, 16800);
  assert.equal(result.cost, 12000);
  assert.equal(result.gp, 4800);
  assert.equal(result.gm, 4800 / 16800);
});

test('scenario aggregates different roles and allocations', () => {
  const scenario = calculateScenario({ id: 's1', name: 'Recommended', members: [
    member(),
    member({ id: 'm2', roleId: 'data-engineer', weeks: 4, daysPerWeek: 3, buyRate: 600, sellRate: 850 })
  ]});
  assert.equal(scenario.totalDays, 28);
  assert.equal(scenario.revenue, 27000);
  assert.equal(scenario.cost, 19200);
  assert.equal(scenario.gp, 7800);
  assert.equal(scenario.gm, 7800 / 27000);
  assert.equal(scenario.memberCount, 2);
});

test('invalid commercial inputs are rejected', () => {
  for (const patch of [{ weeks: 0 }, { daysPerWeek: -1 }, { buyRate: -1 }, { sellRate: 0 }]) {
    assert.throws(() => validateMember(member(patch)));
  }
});

test('cloneScenario creates independent scenario and member ids', () => {
  const source = { id: 's1', name: 'Land', members: [member()] };
  const copy = cloneScenario(source, { id: 's2', name: 'Recommended' });
  assert.equal(copy.id, 's2');
  assert.equal(copy.name, 'Recommended');
  assert.notEqual(copy.members[0].id, source.members[0].id);
  copy.members[0].weeks = 12;
  assert.equal(source.members[0].weeks, 8);
});