import { useState } from "react";
import Board from "../../components/Game/Board";
import MoveList from "../../components/Game/MoveList";

const GameMain = () => {
  const [historyMove, setHistoryMove] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = historyMove[currentMove];
  const nextMove = currentMove % 2 === 0;

  const handlePlay = (newSquare: (null | "X" | "O")[]) => {
    const nextHistory = [...historyMove.slice(0, currentMove + 1), newSquare];
    setHistoryMove(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (prevMove: number) => {
    console.log("prevMove", prevMove);
    setCurrentMove(prevMove);
  };

  return (
    <main>
      Tic-Tac-toe Game
      <Board nextMove={nextMove} squares={currentSquares} onPlay={handlePlay} />
      <div className="game-info">
        <MoveList history={historyMove} jumpMove={jumpTo} />
      </div>
    </main>
  );
};

export default GameMain;
