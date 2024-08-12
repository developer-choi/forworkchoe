import {ReactElement, ReactNode, useCallback, useState} from 'react';

export function useToggle(initial = false) {
  const [bool, setBool] = useState(initial);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool((prevState) => !prevState);
  }, []);

  return {
    bool,
    setTrue,
    setFalse,
    toggle,
  };
}

export function isReactElement(value: ReactNode) {
  try {
    const keys = Object.keys(value as any);
    return REACT_ELEMENT_KEYS.every(key => keys.includes(key));
  } catch (error) {
    return false;
  }
}

const REACT_ELEMENT_KEYS: (keyof ReactElement)[] = ['key', 'type', 'props'];
