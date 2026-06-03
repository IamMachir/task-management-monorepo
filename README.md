# Task Management Monorepo

**Advanced Task Management System** built with a shared component architecture.

## Assignment Information

**Course:** SEng5306 — Component Based Software Development  
**Institution:** Adama Science and Technology University  
**Instructor:** Daniel Metiku Bekere  
**Assignment Type:** Group Laboratory Project (10% Weighting)  
**Submission:** May 2026

---

## Group Members

| Name | Student ID | Role |
|------|-----------|------|
| Machir Tadesse Woldemariam | UGE/27638/14 | Repository Lead |
| Abenezer Tewodros | UGE/27816/14 | Contributor |
| Efa Mirkana | UGE/27834/14 | Contributor |
| Musbah Rida | UGE/27831/14 | Contributor |
| Samuel Girma | UGE/27830/14 | Contributor |

---

## Features

### ✨ New Features (Sprint 1)

#### 1. **Dark Mode Toggle** 🌙
- Reusable `DarkModeToggle` component used across all apps
- Persists user preference to localStorage
- Respects system color scheme preference
- Smooth transition between light/dark themes
- Used in: **TeamFlow** & **PersonalFocus**

#### 2. **Bulk Task Operations** ✅
- Reusable `BulkTaskActions` component for multi-select workflows
- Select/deselect individual tasks
- Select all / clear all actions
- Bulk operations:
  - ✓ Mark multiple tasks as complete
  - 🗑️ Delete multiple tasks at once
  - 🎯 Change priority for multiple tasks
- Confirmation dialogs to prevent accidents
- Visual feedback for selected items
- Used in: **TeamFlow** & **PersonalFocus**

---

## Architecture

### Monorepo Structure

```
task-management-monorepo/
├── apps/
│   ├── feature-x/              TeamFlow (Kanban board with bulk ops)
│   │   ├── src/app/page.tsx    ← Uses DarkModeToggle & BulkTaskActions
│   │   └── package.json
│   └── feature-y/              PersonalFocus (Daily planner with bulk ops)
│       ├── src/app/page.tsx    ← Uses DarkModeToggle & BulkTaskActions
│       └── package.json
├── packages/
│   ├── ui-components/
│   │   ├── DarkModeToggle.tsx  ← New: Dark mode toggle button
│   │   ├── BulkTaskActions.tsx ← New: Multi-select task operations
│   │   ├── Button.tsx
│   │   ├── TaskCard.tsx
│   │   └── ...others
│   └── utils/
│       ├── theme.ts            ← New: Color constants & utilities
│       ├── bulkOperations.ts   ← New: Bulk edit helpers
│       ├── useDarkMode.ts      ← New: Dark mode React hook
│       ├── date.ts
│       ├── string.ts
│       └── ...others
├── turbo.json                  Turborepo config
├── pnpm-workspace.yaml         Monorepo workspace
└── README.md
```

---

## Technology Stack

- **Framework:** Next.js 15.0.3
- **Language:** TypeScript 5.6.3
- **Styling:** Tailwind CSS 3.4.14
- **Build Tool:** Turborepo 2.3.3
- **Package Manager:** pnpm 9.14.4
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v9+)

### Installation

```bash
# Clone repository
git clone https://github.com/IamMachir/task-management-monorepo.git
cd task-management-monorepo

# Install pnpm globally (if needed)
npm install -g pnpm

# Install dependencies
pnpm install
```

### Running the Apps

```bash
# Start both apps in dev mode
pnpm dev

# Available at:
# - http://localhost:3000  (TeamFlow - Feature X)
# - http://localhost:3001  (PersonalFocus - Feature Y)
```

### Running Tests

```bash
pnpm test
```

### Building for Production

```bash
pnpm build
```

---

## Component Usage

### Using DarkModeToggle

```tsx
import DarkModeToggle from '@repo/ui-components/DarkModeToggle';

export default function MyApp() {
  return (
    <header>
      <h1>My App</h1>
      <DarkModeToggle />
    </header>
  );
}
```

### Using BulkTaskActions

```tsx
import BulkTaskActions from '@repo/ui-components/BulkTaskActions';

export default function TaskManager() {
  const [tasks, setTasks] = useState([...]);

  return (
    <BulkTaskActions
      tasks={tasks}
      onBulkDelete={(ids) => setTasks(tasks.filter(t => !ids.includes(t.id)))}
      onBulkComplete={(ids) => {
        setTasks(tasks.map(t => ids.includes(t.id) ? {...t, status: 'completed'} : t));
      }}
      onBulkPriorityChange={(ids, priority) => {
        setTasks(tasks.map(t => ids.includes(t.id) ? {...t, priority} : t));
      }}
    />
  );
}
```

### Using useDarkMode Hook

```tsx
import { useDarkMode } from '@repo/utils/useDarkMode';

export default function MyComponent() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <div>
      <p>Dark mode is {isDark ? 'on' : 'off'}</p>
      <button onClick={toggleDark}>Toggle</button>
    </div>
  );
}
```

---

## Development Workflow

### Adding a New Component

1. Create component in `packages/ui-components/ComponentName.tsx`
2. Export from `packages/ui-components/index.ts`
3. Import in `apps/feature-x` or `apps/feature-y`
4. Both apps automatically have access via `@repo/ui-components`

### Adding a Utility Function

1. Add function to relevant file in `packages/utils/`
2. Export from `packages/utils/index.ts`
3. Import in apps via `@repo/utils`

### File Paths

- Shared components: `@repo/ui-components`
- Shared utilities: `@repo/utils`
- No need for relative paths like `../../../packages/`

---

## Features Roadmap

- [ ] Task recurrence (daily/weekly/monthly)
- [ ] Task dependencies and blocking
- [ ] Time tracking per task
- [ ] Advanced search and filters
- [ ] User authentication
- [ ] Collaborative comments
- [ ] Calendar view
- [ ] Mobile app (React Native)

---

## Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Tailwind CSS linting
- ✅ Component documentation
- ✅ Hook documentation

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Kill process: `lsof -i :3000` then `kill -9 <PID>` |
| Dependency errors | Delete `node_modules` and `pnpm-lock.yaml`, run `pnpm install` |
| Hot reload not working | Stop dev server, run `pnpm dev` again |

---

## License

MIT

---

## Submission Statement

This repository represents collaborative work completed by all group members for the SEng5306 Component Based Software Development laboratory assignment. Each member has contributed code, components, and utilities to the shared monorepo.

**Submission Date:** May 2026  
**Repository:** https://github.com/IamMachir/task-management-monorepo
