/**
 * @return from, to 사이의 자연수를 배열로 만들어 반환. from, to의 경계도 포함.
 * @example (-1, 4) => [-1, 0, 1, 2, 3, 4]
 * @example (4, -1) => [4, 3, 2, 1, 0, -1]
 */
export function range(from: number, to: number): number[] {
  
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  const length = max - min + 1;
  
  if (from > to)
    return [...new Array(length).keys()].map(num => num + min).reverse();
  
  else
    return [...new Array(length).keys()].map(num => num + min);
}
