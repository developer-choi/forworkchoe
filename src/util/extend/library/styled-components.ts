export function shouldForwardPropCallback<T extends Object>(propKeyList: (keyof T)[]) {
  return function(propKey: string) {
    return !propKeyList.includes(propKey as any);
  };
}
