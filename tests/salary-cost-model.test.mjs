import test from 'node:test';
import assert from 'node:assert/strict';
import { salaryToLoadedDayCost } from '../lib/salary-cost-model.mjs';

test('verified annual salary converts to loaded day cost using recovered operating assumptions', () => {
  const result = salaryToLoadedDayCost({ annualSalary:100000, billableDaysPerYear:167, onCostRate:0.386, source:'approved-salary-band' });
  assert.equal(result.status, 'VERIFIED');
  assert.equal(result.loadedAnnualCost, 138600);
  assert.equal(Math.round(result.loadedDayCost * 100)/100, 829.94);
});

test('missing salary stays missing', () => {
  const result = salaryToLoadedDayCost({ annualSalary:null, billableDaysPerYear:167, onCostRate:0.386 });
  assert.equal(result.status, 'MISSING_INPUT');
  assert.equal(result.loadedDayCost, null);
});

test('invalid billable days cannot create a cost', () => {
  const result = salaryToLoadedDayCost({ annualSalary:100000, billableDaysPerYear:0, onCostRate:0.386 });
  assert.equal(result.status, 'MISSING_INPUT');
  assert.equal(result.loadedDayCost, null);
});
