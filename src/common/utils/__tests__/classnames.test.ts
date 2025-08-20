import { classnames } from '..';

describe('Classnames utils', () => {
  it('should work with strings', () => {
    const result = classnames('flex flex-col', 'border-2');

    expect(result).toBe('flex flex-col border-2');
  });

  it('should work with tuples', () => {
    const result = classnames([true, 'flex']);

    expect(result).toBe('flex');
  });

  it('should ignore false conditions in tuples', () => {
    const result = classnames([false, 'hidden'], [true, 'block']);
    expect(result).toBe('block');
  });

  it('should handle a mix of strings and tuples', () => {
    const result = classnames('foo', [true, 'bar'], [false, 'baz'], 'qux');
    expect(result).toBe('foo bar qux');
  });

  it('should return an empty string if no arguments are provided', () => {
    const result = classnames();
    expect(result).toBe('');
  });

  it('should handle empty strings and ignore them', () => {
    const result = classnames('', [true, 'foo'], '');
    expect(result).toBe('foo');
  });

  it('should handle multiple true tuples', () => {
    const result = classnames([true, 'a'], [true, 'b'], [true, 'c']);
    expect(result).toBe('a b c');
  });

  it('should handle only false tuples', () => {
    const result = classnames([false, 'a'], [false, 'b']);
    expect(result).toBe('');
  });

  it('should handle duplicate class names', () => {
    const result = classnames('foo', [true, 'foo'], [true, 'bar']);
    expect(result).toBe('foo foo bar');
  });

  it('should handle fallback classnames', () => {
    const resultTrue = classnames('foo', [true, 'isTrue', 'isFalse']);

    expect(resultTrue).toBe('foo isTrue');

    const resutlFalse = classnames('foo', [false, 'isTrue', 'isFalse']);
    expect(resutlFalse).toBe('foo isFalse');
  });
});
