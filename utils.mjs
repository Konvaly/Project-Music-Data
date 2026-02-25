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
