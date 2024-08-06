import { LengthPipe } from './length.pipe';

describe('LengthPipe', () => {
  let pipe: LengthPipe;

  beforeEach(() => {
    pipe = new LengthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the length of a string', () => {
    expect(pipe.transform('Hello, World!')).toBe(13);
  });

  it('should return the length of an array', () => {
    expect(pipe.transform([1, 2, 3, 4, 5])).toBe(5);
  });

  it('should return 0 for non-string or non-array inputs', () => {
    expect(pipe.transform({})).toBe(0);
    expect(pipe.transform(123)).toBe(0);
    expect(pipe.transform(null)).toBe(0);
    expect(pipe.transform(undefined)).toBe(0);
  });
});
