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
