---
name: react
description: Patterns for implementing, reviewing, and refactoring React 19 with TypeScript in this project, including components, props, hooks, effects, memoization, backend integration, accessibility, and Tailwind CSS. Use when working in frontend React files, creating or changing components and hooks, reviewing state and effects, or assessing the quality of a React interface.
---

# React Rules

These rules apply to this project's React frontend code.

## Using This Skill

Apply these rules when creating, changing, or reviewing React code. Load examples only when needed:

- [Small Components and Explicit Props](references/examples/components.md)
- [Hooks, Effects, and Memoization](references/examples/hooks-effects.md)
- [Backend Access](references/examples/backend.md)
- [Accessibility](references/examples/accessibility.md)
- [Styling](references/examples/styling.md)
- [10 Additional React Best Practices](references/react-best-practices.md)

## Small, Reusable Components

- Create components with a single responsibility.
- Do not create components longer than 30 lines. Extract UI sections, business rules, or state into smaller components and hooks.
- Prefer names that express the component's role, such as `StatusCard`, `HealthMessage`, and `LoadingIndicator`.
- Reuse components for common behaviors and visual structures to avoid duplication.

See the [small component and explicit props examples](references/examples/components.md).

## Explicit Props

Avoid forwarding props with the spread operator because it hides the component API and may pass unexpected attributes.

Declare and use props explicitly.

See the [explicit props examples](references/examples/components.md).

## Hooks and Effects

- Prefer function components.
- Name custom hooks with the `use` prefix, such as `useApiHealth` or `useUsers`.
- Use `useEffect` only to synchronize React with external systems, such as requests, subscriptions, timers, or browser APIs.
- Do not use `useEffect` to calculate derived values, respond to click events, or maintain state that can be derived directly from props and existing state.

See the [hooks, effects, and memoization examples](references/examples/hooks-effects.md).

## Memoization

Use `useMemo` to avoid genuinely expensive calculations between re-renders. Dependencies must include every value used in the calculation. Do not use `useMemo` for simple operations, as it adds complexity without meaningful benefit.

See the [memoization examples](references/examples/hooks-effects.md).

## Backend Access

- Separate backend access from a component's presentation code.
- Put HTTP calls and response transformations in dedicated modules, such as `src/lib/api/health.ts`.
- Encapsulate loading, success, and error states in custom hooks.
- Components should consume hook state and handle presentation and interactions only.

See the [backend access examples](references/examples/backend.md).

## Accessibility

- Always provide appropriate `aria-*` accessibility properties for each element and its current state.
- Prefer semantic elements (`button`, `nav`, `main`, `section`, `form`) and add `aria-label`, `aria-live`, `aria-busy`, `aria-expanded`, or `aria-pressed` when appropriate.
- Interactive controls must indicate their state and have an accessible name.
- Announce asynchronous, loading, or error messages when needed.

See the [accessibility examples](references/examples/accessibility.md).

## Styling

- Use Tailwind CSS to style components.
- Prefer utility classes directly in JSX and clear conditional variants.
- Avoid inline CSS and component-specific stylesheets when Tailwind classes are sufficient.
- Keep component-related classes near their markup and provide focus, hover, disabled, and responsive states.

See the [styling examples](references/examples/styling.md).

## Additional Best Practices

Also apply the [10 Additional React Best Practices](references/react-best-practices.md), especially component purity, the Rules of Hooks, immutability, stable keys, state modeling, state sharing, functional updates, effect cleanup, state preservation, and judicious use of reducers.
