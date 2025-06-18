// Shared winning line patterns
const WINNING_LINES = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

/**
 * Determines if there is a winner in the tic-tac-toe board
 * @param {Array} squares - The current board state
 * @returns {string|null} - The winner ('X' or 'O') or null if no winner
 */
function calculateWinner(squares) {
  if (!squares || squares.length !== 9) {
    return null;
  }

  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default calculateWinner;