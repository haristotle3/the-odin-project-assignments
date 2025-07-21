const fibs = (n) => {
  const fibArr = [];

  let first = -1;
  let second = 1;

  for (let i = 0; i < n; i++) {
    let fibValue = first + second;
    first = second;
    second = fibValue;
    fibArr.push(fibValue);
  }

  return fibArr;
};

const fibsRec = (n) => {
  if (n === 0) return [];
  else if (n === 1) return [0];
  else if (n === 2) return [0, 1];

  const fibsArr = fibsRec(n - 1);
  return [...fibsArr, fibsArr[(n - 1) - 2] + fibsArr[(n - 1) - 1]];
};

console.log(fibs(16));
console.log(fibsRec(16));
