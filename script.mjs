import { getUserIDs, getListenEvents } from "./data.mjs";
import {
  getMostListenedSongByCount,
  getMostListenedSongByTime,
  getMostListenedArtistByCount,
  getMostListenedArtistByTime,
  getFridayNightSongByCount,
  getFridayNightSongByTime,
  getLongestStreak,
  getEveryDaySongs,
  getTopGenres,
} from "./analytics.mjs";

function renderAnswerSection(resultsEl, label, value) {
  const sectionEl = document.createElement("section");

  const headingEl = document.createElement("h3");
  headingEl.textContent = label;

  const valueEl = document.createElement("p");
  valueEl.textContent = value;

  sectionEl.appendChild(headingEl);
  sectionEl.appendChild(valueEl);

  resultsEl.appendChild(sectionEl);
}

window.onload = function () {
  const statusEl = document.querySelector("#status");
  const userSelectEl = document.querySelector("#userSelect");

  const userIDs = getUserIDs();
  for (const userID of userIDs) {
    const optionEl = document.createElement("option");
    optionEl.value = userID;
    optionEl.textContent = `User ${userID}`;
    userSelectEl.appendChild(optionEl);
  }

  userSelectEl.addEventListener("change", function () {
    const resultsEl = document.querySelector("#results");
    const statusEl = document.querySelector("#status");

    resultsEl.innerHTML = "";
    const userId = userSelectEl.value;

    if (userId === "") {
      statusEl.textContent = "Choose a user";
      return;
    }

    const events = getListenEvents(userId);
    if (events.length === 0) {
      statusEl.textContent = "This user didn't listen to any songs.";
      return;
    }

    statusEl.textContent = `Selected User ${userSelectEl.value}`;

    const mostListenedSong = getMostListenedSongByCount(userId);
    if (mostListenedSong !== null) {
      renderAnswerSection(
        resultsEl,
        mostListenedSong.label,
        mostListenedSong.value,
      );
    }

    const mostListenedSongByTime = getMostListenedSongByTime(userId);
    if (mostListenedSongByTime !== null) {
      renderAnswerSection(
        resultsEl,
        mostListenedSongByTime.label,
        mostListenedSongByTime.value,
      );
    }

    const mostListenedArtistByCount = getMostListenedArtistByCount(userId);
    if (mostListenedArtistByCount !== null) {
      renderAnswerSection(
        resultsEl,
        mostListenedArtistByCount.label,
        mostListenedArtistByCount.value,
      );
    }

    const mostListenedArtistByTime = getMostListenedArtistByTime(userId);
    if (mostListenedArtistByTime !== null) {
      renderAnswerSection(
        resultsEl,
        mostListenedArtistByTime.label,
        mostListenedArtistByTime.value,
      );
    }

    const fridayNightSongByCount = getFridayNightSongByCount(userId);
    if (fridayNightSongByCount !== null) {
      renderAnswerSection(
        resultsEl,
        fridayNightSongByCount.label,
        fridayNightSongByCount.value,
      );
    }

    const fridayNightSongByTime = getFridayNightSongByTime(userId);
    if (fridayNightSongByTime !== null) {
      renderAnswerSection(
        resultsEl,
        fridayNightSongByTime.label,
        fridayNightSongByTime.value,
      );
    }

    const longestStreak = getLongestStreak(userId);
    if (longestStreak !== null) {
      renderAnswerSection(resultsEl, longestStreak.label, longestStreak.value);
    }

    const everyDaySongs = getEveryDaySongs(userId);
    if (everyDaySongs !== null) {
      renderAnswerSection(resultsEl, everyDaySongs.label, everyDaySongs.value);
    }

    const topGenres = getTopGenres(userId);
    if (topGenres !== null) {
      renderAnswerSection(resultsEl, topGenres.label, topGenres.value);
    }
  });

  statusEl.textContent = `There are ${countUsers()} users`;
};
