import { getSong, getListenEvents } from "./data.mjs";
import {
  countByKey,
  sumByKey,
  maxKeyByNumber,
  isFridayNight,
} from "./utils.mjs";

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
  const events = getListenEvents(userId);
  if (events.length === 0) return null;

  const totalByArtist = sumByKey(
    events,
    (event) => getSong(event.song_id).artist,
    (event) => getSong(event.song_id).duration_seconds,
  );

  const topArtist = maxKeyByNumber(totalByArtist);

  return {
    label: "Most listened artist (time)",
    value: topArtist,
  };
}

export function getFridayNightSongByCount(userId) {
  const events = getListenEvents(userId);

  if (events.length === 0) return null;

  const fridayNightEvents = events.filter((event) =>
    isFridayNight(event.timestamp),
  );

  if (fridayNightEvents.length === 0) return null;

  const counts = countByKey(fridayNightEvents, (event) => event.song_id);
  const topSongId = maxKeyByNumber(counts);

  const song = getSong(topSongId);

  return {
    label: "Friday night song (count)",
    value: `${song.artist} - ${song.title}`,
  };
}

export function getFridayNightSongByTime(userId) {
  const events = getListenEvents(userId);

  if (events.length === 0) return null;

  const fridayNightEvents = events.filter((event) => event.timestamp);

  if (fridayNightEvents.length === 0) return null;

  const totalsBySong = sumByKey(
    fridayNightEvents,
    (event) => event.song_id,
    (event) => getSong(event.song_id).duration_seconds,
  );

  const topSongId = maxKeyByNumber(totalsBySong);
  const song = getSong(topSongId);

  return {
    label: "Friday night song (time)",
    value: `${song.artist} - ${song.title}`,
  };
}

export function getLongestStreak(userId) {
  const events = getListenEvents(userId);
  if (events.length === 0) return null;

  let currentSongId = events[0].song_id;
  let currentStreak = 1;

  let bestSongId = currentSongId;
  let bestStreak = 1;

  for (let i = 1; i < events.length; i++) {
    const songId = events[i].song_id;

    if (songId === currentSongId) {
      currentStreak++;
    } else {
      currentSongId = songId;
      currentStreak = 1;
    }

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
      bestSongId = currentSongId;
    } else if (currentStreak === bestStreak && currentSongId < bestSongId) {
      bestSongId = currentSongId;
    }
  }

  const song = getSong(bestSongId);

  return {
    label: "Longest streak song",
    value: `${song.artist} - ${song.title} (length: ${bestStreak})`,
  };
}

export function getEveryDaySongs(userId) {
  return null;
}

export function getTopGenres(userId) {
  return null;
}
