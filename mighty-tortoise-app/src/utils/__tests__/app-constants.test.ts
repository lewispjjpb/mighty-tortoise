import { STATE_MAP } from '../app-constants';

describe('STATE_MAP', () => {
  test('contains expected states', () => {
    expect(STATE_MAP).toBeDefined();
    expect(typeof STATE_MAP).toBe('object');
  });

  test('has string values', () => {
    Object.values(STATE_MAP).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });
});
