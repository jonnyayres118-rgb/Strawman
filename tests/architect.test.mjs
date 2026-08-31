import test from 'node:test';
import assert from 'node:assert/strict';
import {architect} from '../lib/architect.mjs';

test('core is deliberately small',()=>assert.ok(architect({trigger:'acquisition integration'}).core.length<=3));
test('flex is conditional',()=>assert.ok(architect({trigger:'AI automation'}).flex.every(x=>x.activation)));
test('scale requires proof',()=>assert.ok(architect({trigger:'AI'}).scale.every(x=>/proof|proved|workload/i.test(x.condition))));
test('every role explains why and when it exists',()=>{
  const result=architect({trigger:'acquisition',mission:'Create repeatable integration capability'});
  assert.ok([...result.core,...result.flex,...result.scale].every(x=>x.why&&x.activation));
});
test('non AI mission does not mechanically insert AI into Core',()=>{
  const result=architect({trigger:'manufacturing capacity expansion',mission:'Improve operational workflow and data integration'});
  assert.equal(result.core.some(x=>/AI/i.test(x.role)),false);
});
test('returns explicit Core Flex and Scale tiers',()=>{
  const result=architect({trigger:'data consolidation',mission:'Unify operational data'});
  assert.ok(result.core.every(x=>x.tier==='core'));
  assert.ok(result.flex.every(x=>x.tier==='flex'));
  assert.ok(result.scale.every(x=>x.tier==='scale'));
});