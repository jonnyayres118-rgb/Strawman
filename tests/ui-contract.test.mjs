import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page=fs.readFileSync(new URL('../app/page.js',import.meta.url),'utf8');

test('workflow exposes approved primary screens',()=>{
  for(const label of ['Dashboard','Client + Outside-In','Mission','Team','Team Shape','Economics','Flex + Deployment','Scenarios','Proposal','Export','Settings / Rate Card']) assert.ok(page.includes(label),label);
});

test('team workflow exposes Core Flex Scale',()=>{
  for(const label of ['Core','Flex','Scale']) assert.ok(page.includes(label));
});

test('export keeps internal economics separate',()=>{
  assert.ok(page.includes('Client Proposal'));
  assert.ok(page.includes('Internal Economics CSV'));
  assert.ok(page.includes('Download for Google Docs'));
});