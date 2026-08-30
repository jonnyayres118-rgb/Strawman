import test from 'node:test';
import assert from 'node:assert/strict';
import { findTalentForRole, assignTalent } from '../lib/talent.mjs';

const person = { id:'p1', name:'Example Specialist', roleIds:['ai-engineer','data-engineer'], buyRate:700, skills:[], seniority:'Senior', availability:'Available', earliestStart:null, location:'UK', timezone:'Europe/London', sectors:[], clearance:null, notes:'' };

test('one specialist can match multiple roles', () => {
  const network = [person];
  assert.equal(findTalentForRole('ai-engineer', network)[0].id, 'p1');
  assert.equal(findTalentForRole('data-engineer', network)[0].id, 'p1');
});

test('assignment replaces benchmark BUY but preserves SELL', () => {
  const member = { id:'m1', roleId:'ai-engineer', buyRate:650, sellRate:950, rateSource:'benchmark' };
  const assigned = assignTalent(member, person);
  assert.equal(assigned.personId, 'p1');
  assert.equal(assigned.buyRate, 700);
  assert.equal(assigned.sellRate, 950);
  assert.equal(assigned.rateSource, 'talent');
});