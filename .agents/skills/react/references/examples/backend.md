# Backend Access Examples

## Example API Access Module

```ts
export type Health = { status: string }

export async function fetchHealth(): Promise<Health> {
  const response = await fetch('http://localhost:3000/health')
  if (!response.ok) throw new Error('Could not reach the API')
  return response.json() as Promise<Health>
}
```

## Example Hook Containing Integration Logic

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
