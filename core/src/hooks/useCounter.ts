import {useCallback, useState} from 'react';

export interface UseCounterParam {
  initial?: number;
  multiple?: number;
}

export default function useCounter(params?: UseCounterParam) {
  const {initial = 0, multiple = 1} = params ?? {};
  const [count, setCount] = useState(initial);

  const increase = useCallback(() => {
    setCount(prevState => {
      return (prevState + 1) * multiple;
    });
  }, [multiple]);

  const decrease = useCallback(() => {
    setCount(prevState => {
      return (prevState - 1) * multiple;
    });
  }, [multiple]);

  return {
    count,
    increase,
    decrease
  };
}
