/**
 * Tests for meta-data module.
 */

import {
  processMetadataItem,
  handleProcessingError,
  logProgress,
  onCompleted,
  onError,
  main,
  metadataList,
} from '../src/meta-data.js';

describe('meta-data', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });

  describe('processMetadataItem', () => {
    it('should process metadata item successfully', async () => {
      const metadata = { id: 1, value: 'Item 1' };
      
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const result = await processMetadataItem(metadata);
      expect(result).toBe('Processed Item 1');
    });

    it('should throw error for failure case', async () => {
      const metadata = { id: 1, value: 'Item 1' };
      
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      
      await expect(processMetadataItem(metadata)).rejects.toThrow('Failed to process');
    });
  });

  describe('handleProcessingError', () => {
    it('should log error and return empty observable', (done: () => void) => {
      const error = new Error('Test error');
      const metadata = { id: 1, value: 'Item 1' };

      const result = handleProcessingError(error, metadata);
      
      result.subscribe({
        next: () => {
          expect.fail('Should not emit any values');
        },
        complete: () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[Error Handler]')
          );
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Test error')
          );
          done();
        },
      });
    });
  });

  describe('logProgress', () => {
    it('should log progress message', () => {
      const result = 'Test progress message';
      
      logProgress(result);
      
      expect(consoleSpy).toHaveBeenCalledWith('🚀 [Progress] Test progress message');
    });
  });

  describe('onCompleted', () => {
    it('should log completion message', () => {
      onCompleted();
      
      expect(consoleSpy).toHaveBeenCalledWith('✅ All metadata processed.');
    });
  });

  describe('onError', () => {
    it('should log error message', () => {
      const error = new Error('Test error');
      
      onError(error);
      
      expect(consoleSpy).toHaveBeenCalledWith('❌ Stream failed: Test error');
    });
  });

  describe('metadataList', () => {
    it('should be properly initialized', () => {
      expect(metadataList).toHaveLength(10);
      expect(metadataList[0]).toEqual({ id: 0, value: 'Item 0' });
      expect(metadataList[9]).toEqual({ id: 9, value: 'Item 9' });
    });

    it('should have correct structure', () => {
      metadataList.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('value');
        expect(typeof item.id).toBe('number');
        expect(typeof item.value).toBe('string');
        expect(item.value).toMatch(/^Item \d+$/);
      });
    });
  });

  describe('main', () => {
    it('should complete successfully', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      
      await main();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🎉 Processing completed')
      );
    }, 10000);

    it('should handle timeout scenario', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      jest.spyOn(global, 'setTimeout').mockImplementation(((fn: Function) => {
        setTimeout(() => fn(), 0);
        return 1 as any;
      }) as any);
      
      await main();
      
      expect(consoleSpy).toHaveBeenCalled();
    }, 10000);
  });
});