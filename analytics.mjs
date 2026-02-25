import { getSong, getListenEvents } from "./data.mjs";
import { countByKey, sumByKey, maxKeyByNumber } from "./utils.mjs";

export function getMostListenedSongByCount(userId) {
  const events = getListenEvents(userId);

  if (events.length === 0) return null;

  const counts = countByKey(events, (event) => event.song_id);

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
  const events = getListenEvents(userId);

  if (events.length === 0) return null;

  const totalBySong = sumByKey(
    events,
    (event) => event.song_id,
    (event) => getSong(event.song_id).duration_seconds,
  );

  let maxSongId = null;
  let maxSeconds = 0;

  for (const songId in totalBySong) {
    if (totalBySong[songId] > maxSeconds) {
      maxSeconds = totalBySong[songId];
      maxSongId = songId;
    }
  }

  const song = getSong(maxSongId);

  return {
    label: "Most listened song (time)",
    value: `${song.artist} - ${song.title}`,
  };
}

export function getMostListenedArtistByCount(userId) {
  const events = getListenEvents(userId);
  if (events.length === 0) return null;

  const countsByArtist = countByKey(events, (event) => {
    const song = getSong(event.song_id);
    return song.artist;
  });

  const topArtist = maxKeyByNumber(countsByArtist);

  return {
    label: "Most listened artist (count)",
    value: topArtist,
  };
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
