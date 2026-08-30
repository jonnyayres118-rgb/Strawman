import test from 'node:test';
import assert from 'node:assert/strict';
import { benchmarkForRole, COMMERCIAL_BENCHMARKS } from '../data/commercial-benchmarks.mjs';

test('recovered assumptions are not silently treated as approved pricing defaults', () => {
  assert.equal(COMMERCIAL_BENCHMARKS.assumptions.billableDaysPerYear.status, 'RECOVERED_CONTEXT');
  assert.equal(COMMERCIAL_BENCHMARKS.assumptions.onCostRate.status, 'RECOVERED_CONTEXT');
});

test('role benchmark registry starts empty until exact values are recovered or approved', () => {
  assert.deepEqual(Object.keys(COMMERCIAL_BENCHMARKS.roles), []);
  assert.equal(benchmarkForRole('principal-ai').status, 'MISSING_INPUT');
});

test('benchmark lookup returns fresh objects so deal editing cannot mutate registry state', () => {
  const a = benchmarkForRole('principal-ai');
  a.buyRate = 999;
  const b = benchmarkForRole('principal-ai');
  assert.equal(b.buyRate, null);
});

test('known operating assumptions can support future salary-to-cost calculations without inventing role salaries', () => {
  const days = COMMERCIAL_BENCHMARKS.assumptions.billableDaysPerYear.value;
  const onCost = COMMERCIAL_BENCHMARKS.assumptions.onCostRate.value;
  assert.equal(days, 167);
  assert.equal(onCost, 0.386);
  assert.equal(COMMERCIAL_BENCHMARKS.roles['ai-engineer'], undefined);
});
