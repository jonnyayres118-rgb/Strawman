import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page=fs.readFileSync(new URL('../app/page.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');

test('workflow exposes approved primary sections',()=>{
  for(const label of ['Dashboard','Client + Outside-In','Mission','Team','Team Shape','Economics','Flex + Deployment','Scenarios','Proposal','Export','Settings / Rate Card']) assert.ok(page.includes(label),label);
});

test('builder is a continuous jump-to-section canvas',()=>{
  assert.ok(page.includes('builder-section'));
  assert.ok(page.includes('scrollIntoView'));
  assert.ok(page.includes('Collapse section'));
});

test('Outside-In import is the front door to the builder',()=>{
  for(const label of ['Import Outside-In','Upload PDF, DOCX or TXT','Paste Outside-In','Parse Outside-In','Import Review','Apply to Builder']) assert.ok(page.includes(label),label);
});

test('Outside-In import preserves evidence confidence and selective refresh',()=>{
  for(const label of ['FACT','INFERENCE','HYPOTHESIS','UNKNOWN','Imported confidently','Still unknown','Regenerate from Outside-In','Evidence','Mission','Team hypothesis']) assert.ok(page.includes(label),label);
});

test('team workflow exposes Core Flex Scale and client supplied capability',()=>{
  for(const label of ['Core','Flex','Scale','Provided by client']) assert.ok(page.includes(label),label);
});

test('deployment planner exposes role by month timeline and monthly economics',()=>{
  for(const label of ['Capability Deployment Planner','Start month','End month','Monthly commercial curve','Client investment','Gross margin']) assert.ok(page.includes(label),label);
});

test('phases are outcome led',()=>{
  for(const label of ['Discover & Prove','Build & Embed','Scale & Transfer','Exit criteria','Deliverables']) assert.ok(page.includes(label),label);
});

test('scenarios are independently editable and copyable',()=>{
  for(const label of ['LEAN','RECOMMENDED','ACCELERATED','Copy Recommended']) assert.ok(page.includes(label),label);
});

test('team reasoning explains composition and change conditions',()=>{
  for(const label of ['Why these roles','Why this hierarchy','Why this size','What we deliberately have not included','What would change the team']) assert.ok(page.includes(label),label);
});

test('proposal print CSS flows sections rather than forcing every section to a page',()=>{
  assert.ok(css.includes('break-inside:avoid'));
  assert.ok(!css.includes('.proposal-page{page-break-after:always'));
});

test('export keeps internal economics separate',()=>{
  assert.ok(page.includes('Client Proposal'));
  assert.ok(page.includes('Internal Economics CSV'));
  assert.ok(page.includes('Download for Google Docs'));
});