// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { countUsers } from "./common.mjs";
import { getUserIDs } from "./data.mjs";
import {
  getMostListenedSongByCount,
  getMostListenedSongByTime,
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
  });

  statusEl.textContent = `There are ${countUsers()} users`;
};
