# Accessibility Examples

## Loading Message

```tsx
function LoadingMessage() {
  return (
    <p role="status" aria-live="polite" aria-busy="true">
      Checking the API...
    </p>
  )
}
```
