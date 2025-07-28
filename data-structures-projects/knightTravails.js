function isWithinBounds(currentNode) {
  const [x, y] = [currentNode[0], currentNode[1]];
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function arrayEqual(x, y) {
  const arr1 = JSON.stringify(x);
  const arr2 = JSON.stringify(y);

  return arr1 === arr2;
}

function neighbouringNodes(currentNode) {
  const [x, y] = [currentNode[0], currentNode[1]];

  const neighbourDist = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];

  const neighbours = [];

  for (let neiDist of neighbourDist) {
    const neighbourNode = [x + neiDist[0], y + neiDist[1]];
    if (isWithinBounds(neighbourNode)) neighbours.push(neighbourNode);
  }

  return neighbours;
}

function getMoves(currentNode, parentMatrix) {
  let moves = 0;
  let [wx, wy] = [currentNode[0], currentNode[1]];

  while (parentMatrix[wx][wy][0] !== null && parentMatrix[wx][wy][1] !== null) {
    [wx, wy] = parentMatrix[wx][wy];
    moves++;
  }

  return moves;
}

function pathToCoordinatesMapper(path) {
  const xAxisMap = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxisMap = [8, 7, 6, 5, 4, 3, 2, 1];

  const pathString = path.map((node) => {
    const x = node[0];
    const y = node[1];
    return "N" + xAxisMap[x] + yAxisMap[y];
  });

  return pathString;
}

function getPath(currentNode, parentMatrix) {
  const pathArr = [];
  let [wx, wy] = [currentNode[0], currentNode[1]];

  while (parentMatrix[wx][wy][0] !== null && parentMatrix[wx][wy][1] !== null) {
    pathArr.push([wx, wy]);
    [wx, wy] = parentMatrix[wx][wy];
  }
  pathArr.push([wx, wy]);
  pathArr.reverse();
  return pathToCoordinatesMapper(pathArr);
}

function breadthFirstSearch(end, queue) {
  const visited = Array.from(Array(8), () => new Array(8).fill(false));
  const enqueued = Array.from(Array(8), () => new Array(8).fill(false));
  const parent = Array.from(Array(8), () => new Array(8).fill([null, null]));

  while (queue.length > 0) {
    const currentNode = queue.shift();

    const [x, y] = [currentNode[0], currentNode[1]];
    enqueued[x][y] = false;

    if (!visited[x][y]) {
      if (arrayEqual(currentNode, end)) {
        return {
          moves: getMoves(currentNode, parent),
          path: getPath(currentNode, parent),
        };
      }

      visited[x][y] = true;

      for (let neighbour of neighbouringNodes(currentNode)) {
        const [nx, ny] = [neighbour[0], neighbour[1]];
        if (!visited[nx][ny] && !enqueued[nx][ny]) {
          queue.push(neighbour);
          enqueued[nx][ny] = true;
          parent[nx][ny] = [x, y];
        }
      }
    }
  }
  console.log(totalMoves);

  return false;
}

function knightMoves(start, end) {
  if (!isWithinBounds(end)) {
    console.log("Unreachable!");
    return null;
  }

  const queue = [start];
  const pathObject = breadthFirstSearch(end, queue);

  console.log(`You made it in ${pathObject.moves} moves! Here's your path:`);
  pathObject.path.forEach((node) => {
    console.log(node);
  });

  return 0;
}

knightMoves([0, 0], [2, 2]);
