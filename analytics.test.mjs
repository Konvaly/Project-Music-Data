import assert from "node:assert/strict";
import test from "node:test";
import { getLongestStreak } from "./analytics.mjs";
import { maxKeyByNumber } from "./utils.mjs";

test("getLongestStreak returns null for a user with no listens (User 4)", () => {
  assert.equal(getLongestStreak("4"), null);
});

test("getLongestStreak finds the longest consecutive streak for User 2", () => {
  const result = getLongestStreak("2");

  assert.ok(result !== null);
  assert.equal(result.label, "Longest streak song");
  assert.ok(result.value.includes("Frank Turner - I Still Believe"));
  assert.ok(result.value.includes("(length: 44)"));
});

test("maxKeyByNumber breaks ties alphabetically (deterministic)", () => {
  const map = { b: 2, a: 2, c: 1 };
  assert.equal(maxKeyByNumber(map), "a");
});
