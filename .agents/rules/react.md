# React Rules

These rules apply to this project's React frontend code.

## Small, Reusable Components

- Create components with a single responsibility.
- Do not create components longer than 30 lines. Extract UI sections, business rules, or state into smaller components and hooks.
- Prefer names that express a component's role, such as `StatusCard`, `HealthMessage`, and `LoadingIndicator`.
- Reuse components for common behavior and visual structures to avoid duplication.

Example of a small component:

```tsx
type StatusCardProps = {
  status: 'online' | 'offline'
}

export function StatusCard({ status }: StatusCardProps) {
  const label = status === 'online' ? 'API online' : 'API offline'
  const color = status === 'online' ? 'text-green-700' : 'text-red-700'

  return (
      <section aria-label="API status" className="rounded-lg border p-4">
      <p className={color}>{label}</p>
    </section>
  )
}
```

## Explicit Props

Avoid forwarding props with the spread operator because it hides the component API and may pass unexpected attributes:

```tsx
// Avoid
function Button(props: ButtonProps) {
  return <button {...props} />
}
```

Declare and use props explicitly:

```tsx
type ButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {label}
    </button>
  )
}
```

## Hooks and Effects

- Prefer function components.
- Name custom hooks with the `use` prefix, such as `useApiHealth` or `useUsers`.
- Use `useEffect` only to synchronize React with external systems, such as requests, subscriptions, timers, or browser APIs.
- Do not use `useEffect` to calculate derived values, respond to click events, or maintain state that can be derived directly from props and existing state.

Avoid an unnecessary effect:

```tsx
// Avoid: the value can be calculated during rendering
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])
```

Prefer:

```tsx
const fullName = `${firstName} ${lastName}`
```

## Memoization

Use `useMemo` to avoid genuinely expensive calculations between re-renders. Dependencies must include every value used in the calculation. Do not use `useMemo` for simple operations, as it adds complexity without meaningful benefit.

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.name.includes(searchTerm)),
  [users, searchTerm],
)
```

## Backend Access

- Separate backend access from a component's presentation code.
- Put HTTP calls and response transformations in dedicated modules, such as `src/lib/api/health.ts`.
- Encapsulate loading, success, and error states in custom hooks.
- Components should consume hook state and handle presentation and interactions only.

Example API access module:

```ts
export type Health = { status: string }

export async function fetchHealth(): Promise<Health> {
  const response = await fetch('http://localhost:3000/health')
  if (!response.ok) throw new Error('Could not reach the API')
  return response.json() as Promise<Health>
}
```

Example of a hook that contains integration logic:

```tsx
export function useApiHealth() {
  const [health, setHealth] = useState<Health | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .finally(() => setLoading(false))
  }, [])

  return { health, loading }
}
```

## Accessibility

- Always provide appropriate `aria-*` accessibility properties for each element and its current state.
- Prefer semantic elements (`button`, `nav`, `main`, `section`, `form`) and add `aria-label`, `aria-live`, `aria-busy`, `aria-expanded`, or `aria-pressed` when appropriate.
- Interactive controls must indicate their state and have an accessible name.
- Announce asynchronous, loading, or error messages when needed.

```tsx
function LoadingMessage() {
  return (
    <p role="status" aria-live="polite" aria-busy="true">
      Checking the API...
    </p>
  )
}
```

## Styling

- Use Tailwind CSS to style components.
- Prefer utility classes directly in JSX and clear conditional variants.
- Avoid inline CSS and component-specific stylesheets when Tailwind classes are sufficient.
- Keep component-related classes near their markup and provide focus, hover, disabled, and responsive states.

```tsx
<button
  type="button"
  aria-label="Refresh status"
  className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Refresh
</button>
```
