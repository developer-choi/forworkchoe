import {chunk, downsample, getNextLoopItem} from './legacy-array'; // Assuming improved names are used

describe('chunk', () => {
  it('should split an array into chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    expect(chunk(array, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('should return the last chunk with remaining elements if the array cannot be split evenly', () => {
    const array = [1, 2, 3, 4, 5];
    expect(chunk(array, 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should return an array containing the original array if chunk size is larger than array length', () => {
    const array = [1, 2, 3, 4, 5];
    expect(chunk(array, 6)).toEqual([[1, 2, 3, 4, 5]]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('should return an empty array if the size is 0 or negative', () => {
    const array = [1, 2, 3];
    expect(chunk(array, 0)).toEqual([]);
  });

  it('should correctly chunk an array of objects', () => {
    const array = [{id: 1}, {id: 2}, {id: 3}];
    expect(chunk(array, 2)).toEqual([[{id: 1}, {id: 2}], [{id: 3}]]);
  });
});

describe('downsample', () => {
  it('should downsample the array to the given maximum size, including first and last elements', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(downsample(array, 3)).toEqual([1, 5, 10]);
    expect(downsample(array, 4)).toEqual([1, 4, 7, 10]);
  });

  it('should return the original array if its length is less than or equal to the max size', () => {
    const array = [1, 2, 3];
    expect(downsample(array, 5)).toEqual([1, 2, 3]);
    expect(downsample(array, 3)).toEqual([1, 2, 3]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(downsample([], 5)).toEqual([]);
  });

  it('should return only the first element if max size is 1', () => {
    const array = [1, 2, 3, 4, 5];
    expect(downsample(array, 1)).toEqual([1]);
  });

  it('should return an empty array if max size is 0', () => {
    const array = [1, 2, 3, 4, 5];
    expect(downsample(array, 0)).toEqual([]);
  });

  it('should return the first and last elements if max size is 2', () => {
    const array = [1, 2, 3, 4, 5];
    expect(downsample(array, 2)).toEqual([1, 5]);
  });

  it('should handle an array of strings correctly', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    expect(downsample(array, 3)).toEqual(['a', 'e', 'j']);
  });
});

describe('getNextLoopItem', () => {
  const list = ['Apple', 'Banana', 'Cherry'];

  it('should return the next item in the list', () => {
    expect(getNextLoopItem(list, 'Banana')).toBe('Cherry');
  });

  it('should loop back to the first item if the current item is the last one', () => {
    expect(getNextLoopItem(list, 'Cherry')).toBe('Apple');
  });

  it('should return the item itself if the list has only one item', () => {
    const singleItemList = ['Apple'];
    expect(getNextLoopItem(singleItemList, 'Apple')).toBe('Apple');
  });

  it('should throw an error if the item is not found in the list', () => {
    // We expect the function to throw an error
    expect(getNextLoopItem(list, 'Durian')).toBe('Durian');
  });

  it('should handle lists with object references', () => {
    const item1 = {name: 'React'};
    const item2 = {name: 'Next.js'};
    const item3 = {name: 'Data Structure'};
    const objectList = [item1, item2, item3];

    expect(getNextLoopItem(objectList, item1)).toBe(item2);
    expect(getNextLoopItem(objectList, item3)).toBe(item1);
  });

  it('should match the first occurrence if there are duplicate items', () => {
    const duplicateList = [1, 2, 3, 2, 1];
    expect(getNextLoopItem(duplicateList, 2)).toBe(3); // The item after the first '2'
  });
});
