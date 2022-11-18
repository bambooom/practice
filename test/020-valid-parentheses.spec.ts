import { isValid, isValid2 } from '../leetcode/020-valid-parentheses';

describe('validate parentheses', () => {
  test('() is valid', () => {
    expect(isValid('()')).toBe(true);
  });
  test('(){}[] is valid', () => {
    expect(isValid('(){}[]')).toBe(true);
  });
  test('(] is invalid', () => {
    expect(isValid('(]')).toBe(false);
  });
  test('[ is invalid', () => {
    expect(isValid('[')).toBe(false);
  });
});

describe('validate parentheses 2', () => {
  test('() is valid', () => {
    expect(isValid2('()')).toBe(true);
  });
  test('(){}[] is valid', () => {
    expect(isValid2('(){}[]')).toBe(true);
  });
  test('(] is invalid', () => {
    expect(isValid2('(]')).toBe(false);
  });
  test('[ is invalid', () => {
    expect(isValid2('[')).toBe(false);
  });
});
