import {makeRandomString, type RandomCharType} from '@/utils/random/generate-dummy.ts';

// yarn test src/utils/random/generate-dummy.test.ts
describe('makeRandomString', () => {
  describe('General cases', () => {
    it('should generate a string of specified length from a custom array', () => {
      const anagramArray: RandomCharType = ['a', 'b', 'c', 1, 2];
      const length = 10;
      const result = makeRandomString(anagramArray, length);

      expect(result).toHaveLength(length);
      expect(result).toMatch(/^[abc12]+$/);
    });

    it('should generate an alphabetic string when type is "ALPHABET"', () => {
      const length = 20;
      const result = makeRandomString('ALPHABET', length);

      expect(result).toHaveLength(length);
      expect(result).toMatch(/^[a-zA-Z]+$/);
    });

    it('should generate a numeric string when type is "NUMBER"', () => {
      const length = 15;
      const result = makeRandomString('NUMBER', length);

      expect(result).toHaveLength(length);
      expect(result).toMatch(/^[0-9]+$/);
    });

    it('should generate an alphanumeric string when type is "ALPHABET_AND_NUMBER"', () => {
      const length = 25;
      const result = makeRandomString('ALPHABET_AND_NUMBER', length);

      expect(result).toHaveLength(length);
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe('Edge cases', () => {
    it('should return an empty string when length is 0', () => {
      expect(makeRandomString(['a', 'b', 'c'], 0)).toBe('');
    });

    it('should throw a TypeError when anagramArray is empty', () => {
      expect(() => makeRandomString([], 5)).toThrow(TypeError);
    });
  });
});
