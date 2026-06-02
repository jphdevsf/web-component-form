# Randomization Form

A small vanilla JS web component for picking and shuffling items from a list. Built as a personal exercise to get more comfortable with web components, the `@scope` CSS pseudo-class, and form patterns.

## What it does

- Add items to a list via a text input
- **Pick Random** — shuffles the list and returns the first result
- **Shuffle All** — shuffles and displays the full reordered list

Randomization uses a Fisher-Yates shuffle algorithm for better distribution than `Math.random()`-only approaches.

## Tech notes

- Custom element (`<x-rando-form>`) with no framework dependencies
- `@scope` CSS for component-scoped styles
- `handleEvent` pattern for event delegation
- `aria-live` regions for accessible result announcements
