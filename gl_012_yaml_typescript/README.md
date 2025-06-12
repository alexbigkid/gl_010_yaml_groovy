# GL 012 - TypeScript Implementation

TypeScript implementation of the GL 011 Python project, featuring:

- **Hello Global Logic**: Simple greeting function
- **Fizz Buzz**: Classic programming challenge implementation
- **Metadata Processing**: Reactive programming with RxJS for concurrent pipeline processing

## Project Structure

```
gl_012_yaml_typescript/
├── src/
│   ├── hello-global-logic.ts    # Hello Global Logic functionality
│   ├── fizz-buzz.ts             # Fizz Buzz implementation
│   ├── meta-data.ts             # Reactive metadata processing
│   └── index.ts                 # Main exports
├── tests/
│   ├── hello-global-logic.test.ts
│   ├── fizz-buzz.test.ts
│   └── meta-data.test.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Features

### Hello Global Logic
Simple function that prints "Hello Global Logic!" to the console.

### Fizz Buzz
Implementation of the classic Fizz Buzz challenge:
- Numbers divisible by 3 return "Fizz"
- Numbers divisible by 5 return "Buzz"
- Numbers divisible by both 3 and 5 return "FizzBuzz"
- All other numbers return the number as a string

### Metadata Processing
Advanced reactive programming example using RxJS:
- Concurrent processing of metadata items
- Simulated failure handling with retry logic
- Progress tracking and error handling
- Timeout management for long-running operations

## Development

### Prerequisites
- Node.js 20 or later
- npm

### Installation
```bash
npm install
```

### Development Scripts
```bash
# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

### Running Individual Components
```bash
# Hello Global Logic
npm run dev src/hello-global-logic.ts

# Fizz Buzz
npm run dev src/fizz-buzz.ts

# Metadata Processing
npm run dev src/meta-data.ts
```

## Testing

The project uses Jest for testing with comprehensive test coverage:
- Unit tests for all modules
- Mock implementations for external dependencies
- Async testing for reactive streams
- Edge case testing

Run tests with:
```bash
npm test
```

## Continuous Integration

GitHub Actions workflow includes:
- ESLint and Prettier checks
- TypeScript compilation
- Cross-platform testing (Ubuntu, macOS, Windows)
- Multiple Node.js versions (20, 22)
- Code coverage reporting with Codecov

## Dependencies

### Runtime Dependencies
- `rxjs`: Reactive Extensions for JavaScript

### Development Dependencies
- `typescript`: TypeScript compiler
- `jest`: Testing framework
- `ts-jest`: TypeScript preset for Jest
- `@types/jest`: Jest type definitions
- `eslint`: Code linting
- `prettier`: Code formatting
- `tsx`: TypeScript execution