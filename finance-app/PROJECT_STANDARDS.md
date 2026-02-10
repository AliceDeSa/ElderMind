# ElderMind Finance App - Project Standards & Best Practices

This document outlines the architectural patterns, coding standards, and best practices for the ElderMind Finance App. Adhering to these guidelines ensures code consistency, maintainability, and a high standard of excellence for future development.

## 1. Technology Stack

- **Core**: React 18+ (Functional Components with Hooks), TypeScript.
- **Build Tool**: Vite.
- **Styling**: Tailwind CSS.
- **Routing**: React Router DOM.
- **State Management**: Context API (for global state like Auth, Theme, Finance Data).
- **Backend/Service**: Supabase (implied by `supabase` directory).
- **Icons**: Lucide React.
- **Internationalization**: i18next (implied by `useTranslation` usage).
- **PWA**: Progressive Web App capabilities enabled.

## 2. Project Structure

```
src/
├── components/     # Reusable UI components (Button, Input, etc.)
├── context/        # React Context providers (AuthContext, FinanceProvider)
├── features/       # Feature-specific modules (e.g., GroceryPage)
├── hooks/          # Custom React hooks (useAuth, useGroceries)
├── layouts/        # Page layouts (DashboardLayout)
├── pages/          # Application pages (Dashboard, Login, Goals)
├── services/       # API and service integration logic
├── types/          # TypeScript type definitions and interfaces
└── utils/          # Helper functions and utilities
```

## 3. Naming Conventions

- **Files & Directories**:
  - Components/Pages: `PascalCase` (e.g., `Dashboard.tsx`, `Button.tsx`).
  - Hooks: `camelCase` prefixed with `use` (e.g., `useAuth.ts`).
  - Utilities/Functions: `camelCase` (e.g., `formatCurrency.ts`).
- **Code**:
  - Components: `PascalCase`.
  - Interfaces/Types: `PascalCase` (e.g., `User`, `TransactionProps`).
  - Variables/Functions: `camelCase`.
  - Constants: `UPPER_SNAKE_CASE` (for true constants).

## 4. Coding Standards

### TypeScript
- **Strict Typing**: Avoid `any` whenever possible. Define interfaces for props and state.
- **Explicit Returns**: Define return types for functions where complex or ambiguous.
- **Props Interface**: Define a `Props` interface for components, even if empty (for future extensibility) or use `React.FC<Props>`.
  ```tsx
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary';
  }
  ```

### Components
- **Functional Components**: Use strict functional components with hooks.
- **Destructuring**: Destructure props in the function signature.
- **Export**: Use `export default` for page/major components, named exports for utilities/types.
- **Clean Code**: Keep components small and focused. Extract logic to custom hooks.

### Styling (Tailwind CSS)
- **Utility-First**: Use Tailwind utility classes for styling.
- **Configuration**: Use the centralized `tailwind.config.js` for colors and fonts to ensure consistency.
- **Colors**: Use semantic names like `bg-primary`, `text-textTitle`, `bg-surfaceCard` instead of hardcoded hex values or generic colors.
- **Dark Mode**: The app is designed with a dark theme by default (`bg-background`).

### State Management
- **Local State**: Use `useState` for component-level state.
- **Global State**: Use `Context API` for state shared across multiple features.
- **Server State**: Use custom hooks to manage data fetching and synchronization.

## 5. Excellence & UX Patterns

- **Feedback**: always provide visual feedback for user actions (loading states, success/error notifications).
- **Accessibility**: Ensure buttons have `aria-label` if they are icon-only. Use semantic HTML.
- **Responsiveness**: All pages must be fully responsive (Mobile First approach).
- **Performance**: Optimize images and use lazy loading for routes (`React.lazy`) if bundle size grows.
- **Error Handling**: Use `try/catch` blocks in async operations and display user-friendly error messages.

## 6. Git & Workflow

- **Commits**: Use descriptive commit messages.
- **Reviews**: Verify code against these standards before merging.
- **Refactoring**: Continuously improve legacy code (e.g., converting `.jsx` to `.tsx`).
