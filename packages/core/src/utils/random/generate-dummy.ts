import {randomIndex, shuffleArray} from '@/utils/random/index.ts';
import {range} from '@/utils/data/number.ts';

export type RandomCharType = (string | number)[] | 'ALPHABET' | 'NUMBER' | 'ALPHABET_AND_NUMBER';

/**
 * @param anagramArray 랜덤한 문자열을 만들 때 들어갈 요소들
 * @param length 랜덤한 문자열의 길이
 *
 * @example (['a', 'b', 'c'], 5) ==> return 'aabac'
 */
export function makeRandomString(anagramArray: RandomCharType, length: number): string {
  if (anagramArray instanceof Array && anagramArray.length <= 0) {
    throw new TypeError('anagramArray.length는 0 보다 커야합니다.');
  }

  const result = new Array<string>();
  let array: (string | number)[] = [];

  if (anagramArray instanceof Array) {
    array = anagramArray;

  } else {
    switch (anagramArray) {
      case 'ALPHABET':
        array = ALPHABET_LOWER.concat(ALPHABET_UPPER);
        break;

      case 'NUMBER':
        array = NUMBER;
        break;

      case 'ALPHABET_AND_NUMBER':
        array = ALPHABET_LOWER.concat(ALPHABET_UPPER, NUMBER);
        break;
    }
  }

  for (let i = 0; i < length; i++) {
    const index = randomIndex(array);
    result.push(String(array[index]));
  }

  return result.join('');
}

/**
 * @return 1 ~ length + 1 사이 값을 중복되지않게 length개 만큼 배열에 담아서 반환
 */
export function randomNumericArray(length: number): number[] {
  return shuffleArray(range(1, length + 1));
}

const ALPHABET_LOWER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const ALPHABET_UPPER = ALPHABET_LOWER.map(value => value.toUpperCase());
const NUMBER = range(0, 9).map(value => value.toString());
