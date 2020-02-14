import { useEffect, useState } from "react";

let id = 0;
const genID = () => ++id;

const useID = () => {
  const [id, setID] = useState<number>();
  useEffect(() => setID(genID()), []);
  return id;
};

export default useID;
