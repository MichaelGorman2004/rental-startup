# Frontend Rules - S-Tier Quality Standards
> **Philosophy**: Components = pure UI. Logic = hooks. Zero hardcoded values. If Google would flag it, we reject it.

---

## 1. File Structure (MANDATORY)
```
features/auth/
├── components/      # UI only, <15 lines
├── hooks/          # ALL logic
├── types/          # TypeScript interfaces
├── constants/      # Enums, messages, config
├── utils/          # Pure functions
└── index.ts        # Barrel exports
```
**Rules**: Never define constants/types/utils in components • Feature-based organization • One file = one export • Files <300 lines

---

## 2. TypeScript (Zero Tolerance)
- **Strict mode enabled** - `noImplicitAny`, `strictNullChecks`, `noImplicitReturns`
- **ZERO `any` types** - Use `unknown` if necessary
- **Explicit prop interfaces** - No shortcuts, no god objects
- **Type guards** - Runtime validation where needed

```typescript
// ✅ GOOD
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ BAD
interface Props { data?: any; [key: string]: any; }
```

---

## 3. Functions (<15 Lines Law)
**Target**: <15 lines per function (first `{` to last `}`)
**Extract**: Complex conditionals, repeated logic → named helpers immediately
**Naming**: `verbNoun` format - `formatCurrency`, `handleSubmit`, `validateEmail`

```typescript
// ✅ PERFECT - Logic in hook
const LoginForm: React.FC = () => {
  const { email, password, handleSubmit, isLoading } = useLogin();
  return <Stack><TextInput value={email} /><Button onClick={handleSubmit} /></Stack>;
};

// ❌ REJECT - Logic in component
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async () => { /* 20 lines */ };
  return <form>...</form>;
};
```

---

## 4. React Architecture
### State Management
- **Local UI**: `useState` (toggles, inputs)
- **Complex**: `useReducer` (forms, state machines)
- **Global**: Zustand/Context (user, theme)
- **Server**: React Query (API, cache)
- **NO prop drilling** >2 levels

### Performance (MANDATORY)
- `React.memo` - Components receiving object/array/function props
- `useMemo` - Expensive calculations, objects/arrays passed as props
- `useCallback` - Functions passed to memoized children
- `useEffect` - NEVER for derived state (use `useMemo` or render calculation)

---

## 5. Mantine UI (The Golden Rules)
- **NO** raw HTML (`div`, `span`, `button`) → Use `Box`, `Text`, `Button`
- **NO** hardcoded colors → Use `theme.colors.*`
- **NO** pixel values → Use `theme.spacing.*` (`xs` `sm` `md` `lg` `xl`)
- **NO** inline styles → Use Mantine props (`mt`, `p`, `c`)

```typescript
// ✅ PERFECT
<Stack gap="md" p="lg">
  <Text c="gray.7" fw={600}>Title</Text>
  <Button variant="filled" color="blue.6">Submit</Button>
</Stack>

// ❌ REJECT
<div style={{ padding: '24px' }}>
  <span style={{ color: '#888' }}>Title</span>
  <button style={{ background: '#0066cc' }}>Submit</button>
</div>
```

---

## 6. Imports (Auto-Enforced Order)
```typescript
// 1. React/Node
import { useState } from 'react';
// 2. External (alphabetical)
import { Button } from '@mantine/core';
// 3. Internal absolute (alphabetical)
import { useAuth } from '@/features/auth';
// 4. Relative (alphabetical)
import { LoginForm } from './LoginForm';
```

---

## 7. Error Handling
- **Boundaries**: Wrap every feature root in `<ErrorBoundary>`
- **Validation**: Zod schemas + React Hook Form
- **Messages**: In constants files (never inline strings)

```typescript
// constants/auth-errors.ts
export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  EDU_REQUIRED: 'Student organizations must use a .edu email',
} as const;
```

---

## 8. Auto-Reject Checklist
1. Functions >15 lines
2. Components >150 lines
3. Any `any` types
4. Hardcoded styles/values
5. Logic in component (not hook)
6. Missing `useCallback`/`useMemo` on props
7. Prop drilling >2 levels
8. Raw HTML elements
9. Inline constants/types
10. Unused imports/variables

---

## 9. Accessibility (Non-Negotiable)
- **ARIA labels** on all interactive elements
- **Keyboard nav** - Tab order logical, Enter/Space work
- **Focus management** - Visible indicators, trap in modals
- **Color contrast** - WCAG AA (4.5:1 text, 3:1 UI)

```typescript
// ✅ Accessible
<Button aria-label="Close modal" onClick={handleClose}><IconX /></Button>

// ❌ Inaccessible
<div onClick={handleClose}>×</div>
```

---

## 10. Performance Budgets
- **Initial bundle**: <200kb gzipped
- **Route bundle**: <50kb gzipped
- **Strategies**: Code splitting (`React.lazy`), debounce (500ms search), virtualize (>50 items)

---

## Quick Reference
```
✅ DO                           ❌ DON'T
───────────────────────────────────────────
Logic in hooks                 Logic in components
<15 lines/function            Giant functions
Named exports                 Default exports
Mantine primitives            Raw HTML
Theme tokens                  Hardcoded values
Constants file                Inline strings/numbers
Strict TypeScript             any types
React.memo/useCallback        Unnecessary re-renders
```

**Remember**: Code is read 10x more than written. Clarity > Cleverness.
