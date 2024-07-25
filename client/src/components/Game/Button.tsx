const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];

interface ButtonProps {
  count: number;
  onClick: () => void;
}

const Button = ({ count, onClick }: ButtonProps) => {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      {count}
      <button onClick={onClick}>Button</button>
    </>
  );
};

export default Button;
