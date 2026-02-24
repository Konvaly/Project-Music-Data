// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { countUsers } from "./common.mjs";
import { getUserIDs } from "./data.mjs";
import {
  getMostListenedArtistByCount,
  getMostListenedSongByCount,
} from "./analytics.mjs";

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
      const pEl = document.createElement("p");
      pEl.textContent = `${mostListenedSong.label}: ${mostListenedSong.value}`;
      resultsEl.appendChild(pEl);
    }
  });

  statusEl.textContent = `There are ${countUsers()} users`;
};
