/**
 * Metadata processing module using RxJS for concurrent pipeline processing.
 */

import {
  from,
  EMPTY,
  Observable,
  concatMap,
  retry,
  catchError,
  tap,
  filter,
} from 'rxjs';

interface MetadataItem {
  id: number;
  value: string;
}

// Modern TypeScript types
const metadataList: MetadataItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  value: `Item ${i}`,
}));

/**
 * Process a metadata item with simulated failure rate.
 */
function processMetadataItem(metadata: MetadataItem): Promise<string> {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.2) {
      reject(new Error(`Failed to process: ${JSON.stringify(metadata)}`));
      return;
    }
    
    setTimeout(() => {
      resolve(`Processed ${metadata.value}`);
    }, Math.random() * 200 + 100);
  });
}

/**
 * Handle processing errors by logging and returning empty observable.
 */
function handleProcessingError(error: Error, metadata: MetadataItem): Observable<string> {
  console.log(`[Error Handler] ${error.message} for ${JSON.stringify(metadata)}`);
  return EMPTY;
}

/**
 * Log processing progress.
 */
function logProgress(result: string): void {
  console.log(`🚀 [Progress] ${result}`);
}

/**
 * Callback for when all processing is completed.
 */
function onCompleted(): void {
  console.log('✅ All metadata processed.');
}

/**
 * Callback for when an unhandled error occurs in the stream.
 */
function onError(error: Error): void {
  console.log(`❌ Stream failed: ${error.message}`);
}

/**
 * Main function to run the metadata processing pipeline.
 */
export function main(): Promise<void> {
  return new Promise((resolve) => {
    let completed = 0;
    const total = metadataList.length;
    let timeoutId: NodeJS.Timeout;

    const logProgressWithCount = (result: string): void => {
      completed++;
      console.log(`🚀 [Progress] ${result} (${completed}/${total})`);
    };

    const onCompletedWithResolve = (): void => {
      console.log('✅ All metadata processed.');
      console.log(`🎉 Processing completed: ${completed}/${total} items processed successfully.`);
      clearTimeout(timeoutId);
      resolve();
    };

    const onErrorWithResolve = (error: Error): void => {
      console.log(`❌ Stream failed: ${error.message}`);
      clearTimeout(timeoutId);
      resolve();
    };

    // Set timeout for 30 seconds
    timeoutId = setTimeout(() => {
      console.log('❌ Timed out waiting for all processing to complete.');
      resolve();
    }, 30000);

    // Reactive pipeline using RxJS
    from(metadataList)
      .pipe(
        concatMap((metadata) =>
          from(processMetadataItem(metadata)).pipe(
            retry(2),
            catchError((error) => handleProcessingError(error, metadata)),
            filter((result): result is string => result !== undefined),
            tap(logProgressWithCount)
          )
        ),
        catchError((error) => {
          console.log(`❌ Unexpected error in pipeline: ${error.message}`);
          return EMPTY;
        })
      )
      .subscribe({
        complete: onCompletedWithResolve,
        error: onErrorWithResolve,
      });
  });
}

export { processMetadataItem, handleProcessingError, logProgress, onCompleted, onError, metadataList };

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}