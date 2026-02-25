export function countByKey(items, getKey) {
  const counts = {};

  for (const item of items) {
    const key = getKey(item);

    if (!counts[key]) {
      counts[key] = 0;
    }

    counts[key]++;
  }

  return counts;
}

export function sumByKey(items, getKey, getValue) {
  const totals = {};

  for (const item of items) {
    const key = getKey(item);
    const value = getValue(item);

    if (!totals[key]) {
      totals[key] = 0;
    }
    totals[key] += value;
  }

  return totals;
}

export function maxKeyByNumber(map) {
  let bestKey = null;
  let bestValue = -Infinity;

  for (const key in map) {
    const value = map[key];

    if (value > bestValue) {
      bestValue = value;
      bestKey = key;
      continue;
    }

    if (value === bestValue && bestKey !== null && key < bestKey) {
      bestKey = key;
    }
  }

  return bestKey;
}

export function isFridayNight(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDay();
  const hour = date.getHours();

  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

export function getLocalDateKey(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
