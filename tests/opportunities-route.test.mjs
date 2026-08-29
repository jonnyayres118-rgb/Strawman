import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const route=fs.readFileSync(new URL('../app/api/opportunities/route.js', import.meta.url),'utf8');

test('opportunities route includes a bundled fallback for the full Sheet representation',()=>{
  assert.match(route,/pipeline-snapshot\.json/);
  assert.match(route,/fallback/);
});
