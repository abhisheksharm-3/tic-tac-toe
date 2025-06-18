import Board from './Board';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#333333]">
      <h1 className="text-4xl font-extralight tracking-[0.3em] mb-16 text-[#333333]">
        TIC·TAC·TOE
      </h1>
      <div className="relative">
        <div className="absolute -inset-4 bg-[#f9f9f9] -z-10"></div>
        <Board />
      </div>
    </div>
  );
}

export default App;