import {randomNumber} from '@/utils/random';

export function randomBoolean(percent = 50): boolean {
  return Math.random() < percent / 100;
}

export function randomHexColor() {
  return '#' + new Array(6).fill('').map(() => randomNumber(1, 2 ** 4 - 1).toString(16)).join('');
}
