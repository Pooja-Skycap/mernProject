import { useState } from "react";
import Children from "./Children";

const Parent = () => {
  const [data, setData] = useState<string>("");
  const handleDatafromChild = (data: string) => {
    setData(data);
  };
  return (
    <div>
      <h1>Data from Child: {data}</h1>
      <Children onSend={handleDatafromChild} />
    </div>
  );
};

export default Parent;
