import { useState } from 'react';

const useCount = (INITIAL_STATE = 1) => {
  const [count, setCount] = useState(INITIAL_STATE);
  const handleClick = (evt) => {
    const { name } = evt.currentTarget;
    if (name === 'suma') {
      return setCount(count + 1);
    }
    if (count - 1 === 0) return;
    setCount(count - 1);
  };
  return {
    count,
    handleClick,
  };
};

export default useCount;
