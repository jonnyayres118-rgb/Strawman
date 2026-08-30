import test from 'node:test';
import assert from 'node:assert/strict';
import { architect } from '../lib/architect.mjs';

test('uncertain AI discovery can start with one AI Product Lead', () => {
  const result = architect({ trigger:'AI opportunity', unknown:'Unclear which use case to prioritise. Discovery is required to validate where to start.' });
  assert.equal(result.members.filter(x => x.layer === 'core').length, 1);
  assert.equal(result.members[0].roleId, 'ai-product-lead');
  assert.equal(result.deployment.weeks, 8);
  assert.equal(result.deployment.daysPerWeek, 2);
});

test('integration and fragmented data can justify multiple core capabilities', () => {
  const result = architect({ trigger:'Acquisition integration', tension:'Multiple systems and fragmented data need consolidation and integration.' });
  const core = result.members.filter(x => x.layer === 'core');
  assert.ok(core.length >= 2);
  assert.ok(core.some(x => x.roleId === 'solution-platform-architect'));
  assert.ok(core.some(x => x.roleId === 'data-engineer'));
});

test('specialist capability is deferred unless evidence makes it day-one critical', () => {
  const result = architect({ trigger:'AI automation', hypothesis:'Productionise a useful AI workflow after validating the use case.' });
  assert.ok(result.deferredCapability.some(x => ['ai-infrastructure-engineer','mlops-engineer','security-governance'].includes(x.roleId)));
});

test('recommendations carry reasoning, evidence, conditions and explicit benchmark status', () => {
  const result = architect({ trigger:'AI', hypothesis:'Validate an AI workflow' });
  for (const member of result.members) {
    assert.ok(member.reason);
    assert.ok(member.evidence);
    assert.ok(member.condition);
    assert.ok(['benchmark','missing-benchmark'].includes(member.rateStatus));
  }
  assert.ok(result.outcome);
  assert.ok(result.reasoning);
});
