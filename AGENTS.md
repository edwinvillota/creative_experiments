# AGENTS.md

Guidelines for AI agents working in this codebase.

## Project Overview

- **Framework**: React 19 + TypeScript + Vite
- **Package Manager**: Yarn (use `yarn`, not `npm`)
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library (jsdom environment)
- **Linting**: ESLint + Prettier with Husky pre-commit hooks

## Commands

### Development

```bash
yarn dev          # Start development server
yarn build        # TypeScript check + Vite production build
yarn preview      # Preview production build locally
yarn lint         # Run ESLint (fails on any warnings)
```

### Testing

```bash
yarn vitest                           # Run all tests in watch mode
yarn vitest run                       # Run all tests once
yarn vitest run src/path/to/file.test.ts   # Run a single test file
yarn vitest run -t "test name"        # Run tests matching pattern
yarn vitest run --coverage            # Run with coverage report
```

Tests are configured in `vite.config.ts` with:

- Global test APIs (no imports needed for `describe`, `it`, `expect`)
- jsdom environment for DOM testing
- Setup file: `vitest.setup.ts` (extends matchers, cleanup after each)

## Code Style Guidelines

### Naming Conventions

| Element         | Convention                  | Example                     |
| --------------- | --------------------------- | --------------------------- |
| Interfaces      | Prefix with `I`             | `ICanvasProps`, `IVector`   |
| Type aliases    | Prefix with `T`             | `TMenuState`, `TPallete`    |
| Type parameters | Prefix with `T`             | `<TData>`, `<TObject>`      |
| Variables       | camelCase                   | `canvasRef`, `isOpen`       |
| Constants       | UPPER_CASE                  | `PATHS`, `BASE_PATH`        |
| Components      | PascalCase                  | `Canvas`, `TableHeader`     |
| Hooks           | camelCase with `use` prefix | `useCanvas`, `useMenuStore` |
| Enum members    | PascalCase                  | `MyEnum.SomeValue`          |

### Import Organization

Imports are auto-sorted by `eslint-plugin-simple-import-sort`. Order:

1. External packages (react, libraries)
2. Internal aliases (`@/...`)
3. Relative imports (`./`, `../`)

```typescript
import { FC, useCallback, useEffect } from 'react';
import { useCanvas } from '@/common/hooks';
import { TableBody } from './TableBody';
```

### Formatting (Prettier)

- **Single quotes** for strings
- **2 spaces** for indentation
- **Trailing commas** (ES5 style)
- **80 character** line width
- **Always use parentheses** around arrow function parameters
- **Bracket spacing** in objects: `{ foo: bar }`

### ESLint Rules

- **No `console.log`** - Remove all console statements
- **No unused imports** - Automatically flagged as errors
- **Unused variables** - Prefix with `_` to ignore: `_unusedVar`
- **React Hooks rules** - Enforced (deps arrays, rules of hooks)
- **Max warnings: 0** - All warnings treated as errors in CI

## Project Structure

### Path Alias

Use `@/` to reference the `src/` directory:

```typescript
import { useCanvas } from '@/common/hooks';
import { Vector2D } from '@/common/classes';
```

### Directory Layout

```
src/
├── common/          # Shared code (classes, hooks, utils, types, contexts)
├── components/
│   ├── layouts/     # Page layout components
│   ├── molecules/   # Small reusable components
│   └── organisms/   # Complex feature components
├── routes/          # React Router configuration
├── screens/         # Page-level components
├── store/client/    # Zustand stores
└── mocks/           # Mock data for testing/dev
```

### Barrel Exports

Each directory uses `index.ts` for re-exports:

```typescript
// src/common/hooks/index.ts
export * from './useCanvas';
export * from './useResizeObserver';
```

## Patterns

### React Context Pattern

```typescript
interface IMyContext {
  value: string;
  setValue: (v: string) => void;
}

const [useMyContext, Provider] = createRequiredContext<IMyContext>();
export { Provider, useMyContext };
```

### Zustand Store Pattern

```typescript
import { create } from 'zustand';
import { createSelectors } from './createSelectors';

type TMyState = { count: number };
type TMyActions = { increment: () => void };

const useMyStoreBase = create<TMyState & TMyActions>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export const useMyStore = createSelectors(useMyStoreBase);
```

### Component Props Pattern

```typescript
interface IComponentProps {
  required: string;
  optional?: number;
}

export const Component: FC<IComponentProps> = ({ required, optional = 0 }) => {
  // ...
};
```

## Error Handling

- Throw descriptive `Error` objects with clear messages
- Use early returns for guard clauses
- Validate inputs at function boundaries

```typescript
if (value === 0) {
  throw new Error('Cannot divide by zero.');
}
```

## Testing Guidelines

Place tests in `__tests__` directories adjacent to source files.

```typescript
// src/common/utils/__tests__/classnames.test.ts
import { classnames } from '..';

describe('classnames', () => {
  it('should handle basic case', () => {
    expect(classnames('foo', 'bar')).toBe('foo bar');
  });
});
```

### React Component Testing

```typescript
import { render, screen } from '@testing-library/react';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText('value')).toBeInTheDocument();
  });
});
```
