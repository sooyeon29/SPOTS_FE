import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handler = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  return [value, setValue, handler];
};
export default useInput;
