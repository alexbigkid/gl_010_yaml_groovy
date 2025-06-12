/**
 * Hello Global Logic app.
 */

/**
 * Hello Global Logic function.
 */
export function hello(): void {
  console.log('Hello Global Logic!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  hello();
}