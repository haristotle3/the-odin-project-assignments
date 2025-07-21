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

console.log(fibs(8));
