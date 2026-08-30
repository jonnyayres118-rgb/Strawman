import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveCommercialRate } from '../lib/verified-rate-engine.mjs';

test('actual talent BUY can combine with an approved SELL override without losing provenance', () => {
  const rate = resolveCommercialRate({ roleId:'ai-engineer', talent:{ buyRate:725, source:'talent:verified-specialist' }, override:{ sellRate:1100, source:'deal:approved-sell' } });
  assert.equal(rate.status, 'VERIFIED');
  assert.equal(rate.buyRate, 725);
  assert.equal(rate.sellRate, 1100);
  assert.equal(rate.buySource, 'talent:verified-specialist');
  assert.equal(rate.sellSource, 'deal:approved-sell');
});

test('a partial rate never fabricates its missing counterpart', () => {
  const rate = resolveCommercialRate({ roleId:'data-engineer', talent:{ buyRate:650, source:'talent:actual' } });
  assert.equal(rate.status, 'MISSING_INPUT');
  assert.equal(rate.buyRate, 650);
  assert.equal(rate.sellRate, null);
});

test('deal BUY override takes precedence over talent and benchmark BUY while SELL can remain benchmarked', () => {
  const rate = resolveCommercialRate({ roleId:'data-engineer', benchmark:{ buyRate:600, sellRate:1000, source:'benchmark:v1' }, talent:{ buyRate:650, source:'talent:actual' }, override:{ buyRate:700, source:'deal:approved-buy' } });
  assert.equal(rate.buyRate, 700);
  assert.equal(rate.sellRate, 1000);
  assert.equal(rate.buySource, 'deal:approved-buy');
  assert.equal(rate.sellSource, 'benchmark:v1');
});
