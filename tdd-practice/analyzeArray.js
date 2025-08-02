export default function analyzeArray(array) {
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  const roundedAvg = Math.floor((sum / array.length) * 100) / 100;
  return {
    average: roundedAvg,
    min: Math.min(...array),
    max: Math.max(...array),
    length: array.length,
  };
}
