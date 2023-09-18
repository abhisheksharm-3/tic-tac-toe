import React from 'react';
import Board from './Board';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090909] text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-blue-400">Tic <span className="text-red-400">Tac</span> Toe</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <Board />
      </div>
    </div>
  );
}

export default App;
