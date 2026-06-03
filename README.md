# Randomization Form

A small vanilla JS web component project for picking and shuffling items from a list. Built as a personal exercise to get more comfortable with web components, the `@scope` CSS pseudo-class, the JS Popover API, and form patterns. [See demo here](https://web-component-form.netlify.app/).

## What it does

- Add items to a list via a text input
- **Pick Random** — shuffles the list and returns the first result
- **Shuffle All** — shuffles and displays the full reordered list
- **Clear All** — resets all items, results, and input field to start fresh
- **Toast notifications** — contextual feedback for all actions

Randomization uses a Fisher-Yates shuffle algorithm for better distribution than `Math.random()`-only approaches.

## Getting started

1. Add the custom element tags to your HTML:

```html
<x-rando-form></x-rando-form>
<x-notification></x-notification>
```

2. Import and register the components:

```js
import { RandoForm } from "./components/RandoForm.js"
import { Notification } from "./components/Notification.js"
import { defineWebComponents } from "./lib/utils.js"

defineWebComponents([RandoForm, Notification])
```

## Components

### `<x-rando-form>`

The main form component. Users add items, then pick a random item or shuffle the entire list.

No public API — all interaction is through the rendered UI buttons.

### `<x-notification>`

A toast notification component built with the [JS Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using). Renders as an absolutely-positioned toast in the top-right corner and auto-dismisses after 4 seconds.

**Public API:**

```js
const notification = document.querySelector("x-notification")
notification.setMessage(msg, type)
```

| Parameter | Description |
|-----------|-------------|
| `msg` | The message text to display |
| `type` | Notification type: `"success"`, `"error"`, or `"attention"` |

## Tech notes

- Two custom elements (`<x-rando-form>` and `<x-notification>`) with no framework dependencies
- `@scope` CSS for component-scoped styles
- JS Popover API for toast notifications
- `handleEvent` pattern for event delegation
- `aria-live` regions for accessible result announcements
- Private class fields (`#`) for encapsulation
