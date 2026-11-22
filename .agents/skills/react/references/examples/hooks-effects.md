# Hooks, Effects, and Memoization Examples

## Avoid an Unnecessary Effect

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

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.name.includes(searchTerm)),
  [users, searchTerm],
)
```
