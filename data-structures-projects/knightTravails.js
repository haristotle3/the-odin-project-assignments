function isWithinBounds(currentNode) {
  const [x, y] = [currentNode[0], currentNode[1]];
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function arrayEqual(x, y) {
  const arr1 = JSON.stringify(x);
  const arr2 = JSON.stringify(y);

  return arr1 === arr2;
}

// function neighbouringNodes(currentNode) {
//   const [x, y] = [currentNode[0], currentNode[1]];

//   const neighbourDist = [
//     [2, 1],
//     [2, -1],
//     [-2, 1],
//     [-2, -1],
//     [1, 2],
//     [-1, 2],
//     [1, -2],
//     [-1, -2],
//   ];

//   const neighbours = [];

//   for (let neiDist of neighbourDist) {
//     const neighbourNode = [x + neiDist[0], y + neiDist[1]];
//     if (isWithinBounds(neighbourNode)) neighbours.push(neighbourNode);
//   }

//   return neighbours;
// }

// function breadthFirstSearch(start, end, queue) {
//   const visited = new Array(8).fill(new Array(8).fill(false));

//   while (queue.length > 0) {
//     const currentNode = queue.shift();
//     const [x, y] = [currentNode[0], currentNode[1]];

//     if (!visited[x][y]) {
//       if (arrayEqual(currentNode, end)) {
//         return currentNode;
//       }

//       visited[x][y] = true;

//       for (let neighbour of neighbouringNodes(currentNode)) {
//         queue.push(neighbour);
//       }
//     } else {
//       return null;
//     }
//   }
// }

function knightMoves(start, end) {
  const queue = [start];
  return breadthFirstSearch(start, end, queue);
}
