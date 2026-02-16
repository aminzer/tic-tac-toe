# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A tic-tac-toe variant: 5-in-a-row on an infinite game board. Two players take turns placing marks (X/O). Built with React 18, TypeScript, Vite, and Emotion (CSS-in-JS). Deployed to GitHub Pages via HashRouter.

## Commands

```bash
yarn dev              # Dev server at localhost:5173
yarn build            # TypeScript check + Vite production build
yarn test             # Run all Jest tests
yarn codestyle        # Parallel ESLint + TypeScript check (used in CI)
yarn lint             # ESLint only
yarn lint:fix         # ESLint with auto-fix
yarn typescript:check # tsc --noEmit
```

There is no single-test runner configured; use `yarn test -- --testPathPattern=<pattern>` to run specific tests.

## Architecture

### Service Layer (`src/services/`)

**GameService** (`src/services/game/GameService.ts`) is the core orchestrator. It manages the game loop, tracks the mark matrix, current player, round status, and statistics. It uses a pub-sub pattern with `onCellMarkSet()` and `onRoundFinish()` subscribers to notify the UI of state changes.

**Player pattern** (Strategy): `Player` interface defines `getMark()` and `getNextCellToMark(markMatrix)`. `LocalHumanPlayer` returns a Promise that resolves when the human selects a cell. `LocalBotPlayer` exists for AI opponents. Players are injected into GameService.

**Win detection** (`src/services/cellSequence/getWinCellSequence/`): Checks all four directions (horizontal, vertical, two diagonals) from the last-placed cell using `calculateCellSequence` to find 5 consecutive marks.

### Data Structures

**Matrix** (`src/dataStructures/Matrix.ts`): Generic sparse matrix using `Map<string, T>`. Supports infinite expansion via `increaseMatrixSizeToIncludeCell()`, row/column iteration, cloning, and central cell calculation. This enables the unbounded game board.

### Component Hierarchy

`AppWrapper` provides HashRouter, Emotion ThemeProvider, and GlobalStyles. Routes: Home (`/`) and LocalMultiPlayerGame (`/game`). The `Game` component bridges GameService and UI, containing `Header` (round info, stats) and `Board` (cell grid, keyboard input).

### Keyboard Input

Board listens to global keydown. Player 1 (X): WASD + Space. Player 2 (O): Arrow keys + Enter. Key bindings are configured in `src/services/keyboard/`.

### Styling

Emotion CSS-in-JS with a theme (`src/library/design/theme/defaultTheme.ts`). Roboto Mono font. Color palette: purple backgrounds, cyan/yellow/pink accents.

## Path Aliases

`@app/*` maps to `src/*` (configured in both tsconfig.json and jest.config.js).

## CI/CD

**Verify** (`.github/workflows/verify.yml`): Runs on push/PR to main/dev. Tests on matrix of ubuntu/windows + Node 20/22. Runs `codestyle` then `test`.

**Deploy** (`.github/workflows/deploy.yaml`): After verify passes on main, builds with `VITE_BASE_URL_PATH=/tic-tac-toe/` and deploys to GitHub Pages.

## Testing

Jest with ts-jest and jsdom environment. Tests live in `__tests__/` directories next to source. Uses `@aminzer/describe-function-test` for BDD-style test naming via `formatTestName(__filename)`.

## Code Style

ESLint (Airbnb + TypeScript), Prettier (100 char width, single quotes). Arrow function components only (no class components or function declarations for components).
