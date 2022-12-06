function createMove([x, y], xDiff, yDiff) {
  const [x1, y1] = [x + xDiff, y + yDiff];
  return x1 < 0 || x1 > 7 || y1 < 0 || y1 > 7 ? null : [x1, y1];
}

const moveOptions = [
  [1, 2],
  [-1, 2],
  [1, -2],
  [-1, -2],
  [2, 1],
  [-2, 1],
  [2, -1],
  [-2, -1],
];

class spaceNode {
  constructor(position) {
    this.position = position;
    for (let i = 0; i < 8; i++) {
      const [xDiff, yDiff] = moveOptions[i];
      this[`move${i}`] = createMove(this.position, xDiff, yDiff);
    }
  }
}

function createBoard() {
  let board = {};
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      board[[x, y]] = new spaceNode([x, y]);
    }
  }

  for (const key of Object.keys(board)) {
    for (const [move, coord] of Object.entries(board[key])) {
      if (move === 'position') continue;
      if (coord !== null) {
        board[key][move] = board[coord];
      }
    }
  }

  return board;
}

const board = createBoard();

function knightMoves(start, end) {
  if (
    [start, end]
      .flat()
      .some((input) => input > 7 || input < 0 || isNaN(input)) ||
    !Array.isArray(start) ||
    !Array.isArray(end) ||
    start.length !== 2 ||
    end.length !== 2
  ) {
    throw new Error('Invalid Input');
  }
  const queue = [[board[start], []]];
  while (queue.length) {
    const [pointer, traversal] = queue.shift();
    if (pointer.position[0] === end[0] && pointer.position[1] === end[1]) {
      return [...traversal, pointer.position];
    }
    for (const [key, value] of Object.entries(pointer)) {
      if (key !== 'position' && value !== null) {
        queue.push([value, [...traversal, pointer.position]]);
      }
    }
  }
}
