import { useState, useEffect } from 'react';
import calculateWinner from './CalculateWinner';
import { findBestMove } from './Minimax';

function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (winner || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const startNewGame = () => {
    setSquares(initialSquares);
    setIsXNext(true);
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const bestMove = findBestMove(squares);
      if (bestMove !== -1) {
        const newSquares = squares.slice();
        newSquares[bestMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [isXNext, squares, winner]);


  const statusClass = winner ? 'text-green-500' : 'text-red-500';

  return (
    <div className="text-center my-8">
      <div className={`font-bold text-4xl mb-6 ${statusClass}`}>
        {winner ? `Winner: ${winner}` : squares.every((square) => square) ? 'TIE' : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="grid grid-cols-3 gap-4 w-64 mx-auto">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="w-20 h-20 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleClick(i)}
          >
            {squares[i]}
          </div>
        ))}
      </div>
      <button
        onClick={startNewGame}
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Start New Game
      </button>
    </div>
  );
}

export default Board;
