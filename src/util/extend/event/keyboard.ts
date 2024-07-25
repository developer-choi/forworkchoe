/*************************************************************************************************************
 * 원본 코드는 react-playground 참조
 *************************************************************************************************************/

export type SpecialKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey';
const SPECIAL_KEYS: SpecialKey[] = ['shiftKey', 'metaKey', 'ctrlKey', 'altKey'];

export interface KeyboardShortcut {
  key: string;
  specialKeys?: SpecialKey[];
}

/**
 * Checks if a given keyboard event matches the specified keyboard shortcut.
 *
 * @param event - The keyboard event, compatible with both React.KeyboardEvent and window.addEventListener's KeyboardEvent.
 * @param shortcut - The target key and special key combination to match against the event.
 * @returns True if the event matches the specified key and special key combination, false otherwise.
 * @example (event, {key: 'A', specialKeys: ['ctrlKey']}) ==> Returns true if the user presses 'A' while holding the Control key (and not any other special keys like alt, meta, or shift).
 * @example (event, {key: 'Delete'}) ==> Returns true if the user presses the 'Delete' key without holding any special keys.
 */
export function isMatchKeyboardEvent(event: Pick<KeyboardEvent, 'key' | SpecialKey>, shortcut: KeyboardShortcut): boolean {
  if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) {
    return false;
  }

  return isMatchingSpecialKeys(event, shortcut.specialKeys ?? []);
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

/**
 * Checks if the special keys in a given keyboard event match the specified special key combination.
 *
 * @param event - An object representing the state of special keys (ctrlKey, altKey, metaKey, shiftKey).
 * @param specialKeys - The list of special keys that should be pressed.
 * @returns True if the specified special keys are pressed and no other special keys are pressed, false otherwise.
 */
function isMatchingSpecialKeys(event: Record<SpecialKey, boolean>, specialKeys: SpecialKey[]): boolean {
  const remainingKeys = SPECIAL_KEYS.filter(key => !specialKeys.includes(key));
  return specialKeys.every(key => event[key]) && remainingKeys.every(key => !event[key]);
}
