import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveCommercialRate } from '../lib/verified-rate-engine.mjs';

test('actual talent BUY can combine with an approved SELL override without losing provenance', () => {
  const rate = resolveCommercialRate({
    roleId:'ai-engineer',
    talent:{ buyRate:725, source:'talent:verified-specialist' },
    override:{ sellRate:1100, source:'deal:approved-sell' }
  });
  assert.equal(rate.status, 'VERIFIED');
  assert.equal(rate.buyRate, 725);
  assert.equal(rate.sellRate, 1100);
  assert.equal(rate.buySource, 'talent:verified-specialist');
  assert.equal(rate.sellSource, 'deal:approved-sell');
});
