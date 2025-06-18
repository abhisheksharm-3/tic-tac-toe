import { useState, useEffect } from 'react';
import calculateWinner from './CalculateWinner';
import { findBestMove } from './Minimax';

function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (winner || squares[i] || isAnimating) return;
    
    setIsAnimating(true);
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const startNewGame = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSquares(initialSquares);
      setIsXNext(true);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (!isXNext && !winner && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        const bestMove = findBestMove(squares);
        if (bestMove !== -1) {
          const newSquares = squares.slice();
          newSquares[bestMove] = 'O';
          setSquares(newSquares);
          setIsXNext(true);
        }
        setIsAnimating(false);
      }, 500);
    }
  }, [isXNext, squares, winner, isAnimating]);

  const getStatusText = () => {
    if (winner) return `${winner} wins`;
    if (squares.every((square) => square)) return `draw`;
    return `${isXNext ? 'x' : 'o'}`;
  };

  return (
    <div className="text-center">
      <div className="text-xs font-light tracking-[0.25em] mb-10 text-[#999999]">
        {getStatusText()}
      </div>
      
      <div className="w-[270px] mx-auto">
        <div className="grid grid-cols-3 gap-[1px] bg-[#eeeeee]">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="w-[89px] h-[89px] flex items-center justify-center bg-white cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-[#fafafa]"
              onClick={() => handleClick(i)}
            >
              {squares[i] === 'X' && (
                <span className="text-3xl font-extralight text-[#333333] transform transition-all duration-300 ease-out">✕</span>
              )}
              {squares[i] === 'O' && (
                <span className="text-3xl font-extralight text-[#333333] transform transition-all duration-300 ease-out">○</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={startNewGame}
        className="mt-12 py-3 px-10 text-[11px] tracking-[0.25em] text-[#999999] hover:text-[#333333] transition-colors duration-300 uppercase font-light focus:outline-none"
        disabled={isAnimating}
      >
        New Game
      </button>
    </div>
  );
}

export default Board;