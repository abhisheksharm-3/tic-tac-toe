import calculateWinner from './CalculateWinner';

/**
 * Checks if the board has no empty spaces
 * @param {Array} board - The current board state
 * @returns {boolean} - True if the board is full
 */
function isBoardFull(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) return false;
  }
  return true;
}

/**
 * Evaluates the current board state
 * @param {Array} board - The current board state
 * @returns {number} - 1 for O win, -1 for X win, 0 for no winner
 */
function evaluate(board) {
  const winner = calculateWinner(board);
  if (!winner) return 0;
  return winner === 'X' ? -1 : 1;
}

/**
 * Minimax algorithm with alpha-beta pruning for optimal move calculation
 * @param {Array} board - The current board state
 * @param {number} depth - Current recursion depth
 * @param {boolean} isMaximizing - Whether current player is maximizing
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @returns {number} - The evaluation score of the position
 */
function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
  // Create a cached copy of the board to avoid direct mutation
  const boardCopy = [...board];
  
  const winner = evaluate(boardCopy);
  
  // Terminal conditions
  if (winner !== 0) return winner;
  if (isBoardFull(boardCopy)) return 0;
  
  // Add early exit for deep recursion (optional safeguard)
  if (depth > 9) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i] === null) {
        boardCopy[i] = 'O';
        const evaluation = minimax(boardCopy, depth + 1, false, alpha, beta);
        boardCopy[i] = null;
        maxEval = Math.max(maxEval, evaluation);
        
        // Alpha-beta pruning
        alpha = Math.max(alpha, maxEval);
        if (beta <= alpha) break;
        
        // Early exit if winning move found
        if (maxEval === 1) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i] === null) {
        boardCopy[i] = 'X';
        const evaluation = minimax(boardCopy, depth + 1, true, alpha, beta);
        boardCopy[i] = null;
        minEval = Math.min(minEval, evaluation);
        
        // Alpha-beta pruning
        beta = Math.min(beta, minEval);
        if (beta <= alpha) break;
        
        // Early exit if losing move found
        if (minEval === -1) break;
      }
    }
    return minEval;
  }
}

/**
 * Finds the best move for the AI
 * @param {Array} board - The current board state
 * @returns {number} - The index of the best move
 */
export function findBestMove(board) {
  if (!board || board.length !== 9) {
    console.error('Invalid board state');
    return -1;
  }

  // Quick check: if board is empty, prioritize the center position
  if (board.every(square => square === null)) {
    return 4; // Center position
  }
  
  // Check for immediate winning move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      if (calculateWinner(board) === 'O') {
        board[i] = null;
        return i; // Return winning move immediately
      }
      board[i] = null;
    }
  }
  
  // Check for immediate blocking move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'X';
      if (calculateWinner(board) === 'X') {
        board[i] = null;
        return i; // Block opponent's winning move
      }
      board[i] = null;
    }
  }

  // Otherwise, use minimax for optimal play
  let bestMove = -1;
  let bestScore = -Infinity;
  const equalMoves = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
        equalMoves.length = 0;
        equalMoves.push(i);
      } else if (score === bestScore) {
        equalMoves.push(i);
      }
    }
  }

  // Choose randomly among equally good moves for unpredictability
  return equalMoves.length > 1 
    ? equalMoves[Math.floor(Math.random() * equalMoves.length)] 
    : bestMove;
}