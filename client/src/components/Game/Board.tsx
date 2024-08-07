import Square from "./Square";

interface BoardProps {
  nextMove: boolean;
  squares: (null | "X" | "O")[];
  onPlay: (newSquares: (null | "X" | "O")[]) => void;
}

const Board = ({ nextMove, squares, onPlay }: BoardProps) => {
  const calculateWinner = (square: (null | "X" | "O")[]) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c])
        return square[a];
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquare = [...squares];
    nextMove ? (newSquare[i] = "X") : (newSquare[i] = "O");
    onPlay(newSquare);
  };

  const winner = calculateWinner(squares);
  let status;
  winner
    ? (status = `Winner is ${winner}`)
    : (status = `${nextMove ? "X" : "O"} It's your move`);
  return (
    <>
      {status}
      <div className="game-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="game-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="game-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

export default Board;
