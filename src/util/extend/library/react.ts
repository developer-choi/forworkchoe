import {ReactElement, ReactNode} from 'react';

export function isReactElement(value: ReactNode) {
  try {
    const keys = Object.keys(value as any);
    return REACT_ELEMENT_KEYS.every(key => keys.includes(key));
  } catch (error) {
    return false;
  }
}

const REACT_ELEMENT_KEYS: (keyof ReactElement)[] = ['key', 'type', 'props'];
