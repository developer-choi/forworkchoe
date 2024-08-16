/*************************************************************************************************************
 * 원본 코드는 react-playground 참조
 *************************************************************************************************************/

export type KeyboardEventSpecialKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey';
const SPECIAL_KEYS: KeyboardEventSpecialKey[] = ['shiftKey', 'metaKey', 'ctrlKey', 'altKey'];

export type MinimumKeyboardEvent = Pick<KeyboardEvent, 'key' | KeyboardEventSpecialKey>;
export type MinimumSpecialKeyEvent = Record<KeyboardEventSpecialKey, boolean>;

export interface MatchKeyboardEvent {
  key: string;
  specialKeys?: KeyboardEventSpecialKey[];
}

export function isMatchKeyboardEvent(event: MinimumKeyboardEvent, matchTarget: MatchKeyboardEvent) {
  if (event.key.toLowerCase() !== matchTarget.key.toLowerCase()) {
    return false;
  }

  return isMatchSpecialKey(event, matchTarget.specialKeys ?? []);
}

export function isMatchSpecialKey(event: MinimumSpecialKeyEvent, matchKeys: KeyboardEventSpecialKey[]) {
  const restKeys = SPECIAL_KEYS.filter(key => !matchKeys.includes(key));
  return matchKeys.every(key => event[key]) && restKeys.every(key => !event[key]);
}
