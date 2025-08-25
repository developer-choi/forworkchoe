import {useEffect} from 'react';
import {isMatchKeyboardShortcut, type KeyboardShortcut} from '@/utils/event/keyboard.ts';

/**
 * Custom hook to handle keyboard events matching a specific keyboard shortcut.
 *
 * @param keyboardShortcut - The target key and special key combination to match against the keyboard event.
 * @param callback - The function to be called when the keyboard event matches the specified shortcut.
 */
export function useKeyboardShortcut(keyboardShortcut: KeyboardShortcut, callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMatchKeyboardShortcut(event, keyboardShortcut)) {
        return;
      }

      callback(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keyboardShortcut]);
}
