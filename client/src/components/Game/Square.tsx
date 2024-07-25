import "./SquareComponent.css";
interface squareProps {
  value: null | string;
  onSquareClick: () => void;
}

const Square = ({ value, onSquareClick }: squareProps) => {
  return (
    <>
      <button className="squarebutton" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
};

export default Square;
