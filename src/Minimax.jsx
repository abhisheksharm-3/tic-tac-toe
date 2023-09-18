function isBoardFull(board) {
  return board.every((square) => square !== null);
}

function evaluate(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === 'X' ? -1 : 1;
    }
  }

  return 0;
}

function minimax(board, depth, isMaximizing) {
  const winner = evaluate(board);

  if (winner === 1) return 1;
  if (winner === -1) return -1;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const evaluation = minimax(board, depth + 1, false);
        board[i] = null;
        maxEval = Math.max(maxEval, evaluation);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const evaluation = minimax(board, depth + 1, true);
        board[i] = null;
        minEval = Math.min(minEval, evaluation);
      }
    }
    return minEval;
  }
}

export function findBestMove(board) {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
