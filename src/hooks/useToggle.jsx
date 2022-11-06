import { useState } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const clickToggle = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, setToggle, clickToggle];
};

export default useToggle;
