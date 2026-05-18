// utils/uniqueSelector.js

export function createUniqueSelector(array) {
  let index = 0;

  return {
    next() {
      if (index >= array.length) return null;
      return array[index++];
    },
    hasNext() {
      return index < array.length;
    },
    reset() {
      index = 0;
    }
  };
}