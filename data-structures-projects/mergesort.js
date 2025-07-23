const merge = (leftArr, rightArr) => {
  let lp = 0,
    rp = 0;
  const sortedArr = [];
  while (lp < leftArr.length && rp < rightArr.length) {
    if (leftArr[lp] <= rightArr[rp]) {
      sortedArr.push(leftArr[lp++]);
    } else {
      sortedArr.push(rightArr[rp++]);
    }
  }

  while (lp < leftArr.length) {
    sortedArr.push(leftArr[lp++]);
  }

  while (rp < rightArr.length) {
    sortedArr.push(rightArr[rp++]);
  }

  return sortedArr;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const leftSorted = mergeSort(arr.slice(0, mid));
  const rightSorted = mergeSort(arr.slice(mid));
  const sorted = merge(leftSorted, rightSorted);

  return sorted;
};

// const testArr = [5, 3, 1, 2, 6, 7, 8, 4];
const testArr = [3, 2, 1, 13, 8, 5, 0, 1];
// const testArr = [105, 79, 100, 110, 29];

console.log(testArr);
console.log(mergeSort(testArr));
