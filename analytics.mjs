import { getSong, getListenEvents } from "./data.mjs";

export function getMostListenedSongByCount(userId) {
  const events = getListenEvents(userId);

  if (events.length === 0) return null;

  const counts = {};

  for (const event of events) {
    const songId = event.song_id;

    if (!counts[songId]) {
      counts[songId] = 0;
    }

    counts[songId]++;
  }

  let maxSongId = null;
  let maxCount = 0;

  for (const songId in counts) {
    if (counts[songId] > maxCount) {
      maxCount = counts[songId];
      maxSongId = songId;
    }
  }

  const song = getSong(maxSongId);

  return {
    label: "Most listened song (count)",
    value: `${song.artist} - ${song.title}`,
  };
}

export function getMostListenedSongByTime(userId) {
  return null;
}

export function getMostListenedArtistByCount(userId) {
  return null;
}

export function getMostListenedArtistByTime(userId) {
  return null;
}

export function getFridayNightSongByCount(userId) {
  return null;
}

export function getFridayNightSongByTime(userId) {
  return null;
}

export function getLongestStreak(userId) {
  return null;
}

export function getEveryDaySongs(userId) {
  return null;
}

export function getTopGenres(userId) {
  return null;
}
