# 10 Additional React Best Practices

These practices complement the skill's original rules. They were compiled from official React documentation consulted on August 2, 2026.

## Contents

1. [Keep Components and Hooks Pure](#1-keep-components-and-hooks-pure)
2. [Follow the Rules of Hooks](#2-follow-the-rules-of-hooks)
3. [Treat Props and State as Immutable](#3-treat-props-and-state-as-immutable)
4. [Use Stable Keys in Lists](#4-use-stable-keys-in-lists)
5. [Model State Without Redundancy](#5-model-state-without-redundancy)
6. [Maintain a Single Source of Truth](#6-maintain-a-single-source-of-truth)
7. [Use Functional Updates When Needed](#7-use-functional-updates-when-needed)
8. [Clean Up Effects and Protect Async Requests](#8-clean-up-effects-and-protect-async-requests)
9. [Control State Preservation Intentionally](#9-control-state-preservation-intentionally)
10. [Extract Complex Logic into Pure Reducers](#10-extract-complex-logic-into-pure-reducers)

## 1. Keep Components and Hooks Pure

Make components and Hooks idempotent: given the same inputs, produce the same result. Do not perform side effects during rendering or mutate non-local values. Put mutations and effects in event handlers or Effects according to what caused the operation.

Source: [Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure).

## 2. Follow the Rules of Hooks

Call Hooks only at the top level of function components or custom Hooks. Do not call them inside conditions, loops, nested functions, handlers, `try`/`catch`/`finally` blocks, or after a conditional return. Keep `eslint-plugin-react-hooks` enabled to detect violations.

Source: [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).

## 3. Treat Props and State as Immutable

Do not directly mutate props, state, or objects and arrays stored in state. Create a new reference and pass it to the setter. For nested structures, copy each level needed to reach the changed value.

Source: [Updating Objects in State](https://react.dev/learn/updating-objects-in-state) and [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state).

## 4. Use Stable Keys in Lists

When rendering lists, use a stable, unique `key` derived from the item's identity. Avoid array indexes when items can be reordered, inserted, or removed, and never generate keys during rendering with `Math.random()` or equivalent values. Do not expect to receive `key` as a prop: pass the identifier under another prop name when the component also needs it.

Source: [Rendering Lists](https://react.dev/learn/rendering-lists).

## 5. Model State Without Redundancy

Keep only data that must persist between renders in state. Avoid derived, contradictory, or duplicated state; calculate information from props and existing state during rendering. Prefer shallow structures when they make updates clearer.

Source: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure).

## 6. Maintain a Single Source of Truth

When components need to coordinate the same data, keep the state in their closest common ancestor and pass the value and handlers through props. Define one owning component for each piece of information. Use controlled components when the parent must determine the child's behavior.

Source: [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components).

## 7. Use Functional Updates When Needed

When the next state depends on the previous state, use the functional form of the setter, such as `setCount((count) => count + 1)`. This is especially important when multiple updates are queued in the same event or when an update occurs asynchronously.

Source: [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates).

## 8. Clean Up Effects and Protect Async Requests

Every Effect that creates a subscription, timer, connection, or other external resource must return a cleanup that undoes the setup. For manually initiated asynchronous requests, abort the request or ignore stale results to avoid race conditions and state updates from an earlier operation.

Source: [useEffect](https://react.dev/reference/react/useEffect) and [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects).

## 9. Control State Preservation Intentionally

Remember that React associates state with a component's position in the render tree. Preserve state by maintaining structural identity; when a change represents a different entity and requires a reset, provide a different `key` for the appropriate subtree.

Source: [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state).

## 10. Extract Complex Logic into Pure Reducers

When many handlers update the same complex state, centralize transitions in a pure reducer function and use `useReducer`. Make each action represent a meaningful interaction or event, keep effects outside the reducer, and return new objects or arrays without mutation.

Source: [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer).
