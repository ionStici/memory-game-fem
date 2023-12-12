export function filterElByIndexes(array, indicesToRemove) {
  indicesToRemove.sort((a, b) => b - a);

  for (const index of indicesToRemove) {
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
    }
  }

  return array;
}
