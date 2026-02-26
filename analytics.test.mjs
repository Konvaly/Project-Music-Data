import assert from "node:assert/strict";
import test from "node:test";
import {
  getLongestStreak,
  getTopGenres,
  getEveryDaySongs,
  getFridayNightSongByCount,
  getFridayNightSongByTime,
} from "./analytics.mjs";
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

test("maxKeyByNumber breaks ties alphabetically", () => {
  const map = { b: 2, a: 2, c: 1 };
  assert.equal(maxKeyByNumber(map), "a");
});

test("getTopGenres uses dynamic label when fewer than 3 genres exist (User 2)", () => {
  const result = getTopGenres("2");

  assert.ok(result !== null);
  assert.equal(result.label, "Top genre"); // must not say “Top 3 genres”
  assert.equal(result.value, "Pop");
});

test("getEveryDaySongs returns null when no songs are listened to every active day (User 3)", () => {
  assert.equal(getEveryDaySongs("3"), null);
});

test("getEveryDaySongs returns sorted list for User 2", () => {
  const result = getEveryDaySongs("2");

  assert.ok(result !== null);
  assert.equal(result.label, "Every day songs");
  assert.equal(
    result.value,
    "Frank Turner - Photosynthesis, The Divine Comedy - Tonight We Fly",
  );
});

test("Friday night results are null when user has no Friday-night listens (User 3)", () => {
  assert.equal(getFridayNightSongByCount("3"), null);
  assert.equal(getFridayNightSongByTime("3"), null);
});
