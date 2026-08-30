import test from 'node:test';
import assert from 'node:assert/strict';
import { listRoles, getRole, resolveBenchmark } from '../lib/roles.mjs';

test('full Elastic capability catalogue is present', () => {
  const names = listRoles().map(r => r.name);
  for (const name of ['Principal AI / AI Architect','AI Engineer','AI Infrastructure Engineer','AI Product Lead','Data Engineer','Data Scientist','MLOps Engineer','Cloud / DevOps Engineer','Product Manager','Product Designer / UX','Solution / Platform Architect','Software / Full-stack Engineer','Technical Delivery / Programme Lead','Security / Governance Specialist']) assert.ok(names.includes(name), name);
});

test('unknown benchmark is explicit rather than averaged', () => {
  const result = resolveBenchmark('ai-engineer');
  assert.equal(result.status, 'missing-benchmark');
  assert.equal(result.buyRate, null);
  assert.equal(result.sellRate, null);
  assert.equal(getRole('ai-engineer').discipline, 'AI');
});