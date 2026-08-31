import test from "node:test";
import assert from "node:assert/strict";
import { calculateEconomics, clientSafeCommercial } from "../lib/commercial.mjs";

test("economics stay incomplete until both BUY and SELL are supplied", () => {
  assert.equal(calculateEconomics({ buy: "", sell: "650", days: 60, people: 3 }).complete, false);
  assert.equal(calculateEconomics({ buy: "480", sell: "", days: 60, people: 3 }).complete, false);
});

test("economics calculate investment, GP and GM from manual rates", () => {
  const result = calculateEconomics({ buy: 480, sell: 650, days: 60, people: 3 });
  assert.equal(result.investment, 117000);
  assert.equal(result.grossProfit, 30600);
  assert.equal(result.grossMargin, 26.153846153846157);
});

test("client-safe commercial output exposes SELL investment only", () => {
  const safe = clientSafeCommercial({ buy: 480, sell: 650, days: 60, people: 3 });
  assert.deepEqual(safe, { complete: true, investment: 117000, sell: 650, days: 60, people: 3 });
  assert.equal("buy" in safe, false);
  assert.equal("grossProfit" in safe, false);
  assert.equal("grossMargin" in safe, false);
});
