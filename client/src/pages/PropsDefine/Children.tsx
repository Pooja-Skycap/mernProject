import { FC } from "react";

interface ChildProps {
  onSend: (data: string) => void;
}
const Children: FC<ChildProps> = ({ onSend }) => {
  const handleButton = () => {
    const data = "Hello from child!";
    onSend(data);
  };
  return <button onClick={handleButton}>Send</button>;
};

export default Children;
