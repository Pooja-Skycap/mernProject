interface MoveProps {
  history: (null | undefined)[][];
  jumpMove: (move: number) => void;
}
const MoveList = ({ history, jumpMove }: MoveProps) => {
  return (
    <ol>
      {history.map((_s, move) => (
        <li key={move}>
          <button onClick={() => jumpMove(move)}>
            {move > 0 ? `Go to ${move} move` : `Go to Game Start`}
          </button>
        </li>
      ))}
    </ol>
  );
};

export default MoveList;
