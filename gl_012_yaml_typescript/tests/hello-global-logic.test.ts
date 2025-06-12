/**
 * Tests for hello-global-logic module.
 */

import { hello } from '../src/hello-global-logic.js';

describe('hello-global-logic', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should print correct message', () => {
    hello();
    
    expect(consoleSpy).toHaveBeenCalledWith('Hello Global Logic!');
  });

  it('should be a callable function', () => {
    expect(typeof hello).toBe('function');
  });
});