# feature-y — PersonalFocus

> **SEng5306 — Component Based Software Development**
> Personal productivity and daily planner dashboard

## Overview

PersonalFocus is a personal productivity dashboard for individuals. It provides a daily planner, habit tracker, and priority-based task management — all assembled from shared packages.

## Architecture

```
apps/feature-y/
├── src/
│   ├── app/
│   │   ├── layout.tsx     ← Root layout
│   │   ├── page.tsx       ← Main page — imports ONLY from packages
│   │   └── globals.css    ← Tailwind + gradient background
│   └── data/
│       └── mockData.ts    ← Personal tasks and habit data
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Features

- **Week Calendar Strip** — Visual 7-day week with task indicators per day
- **Tab View** — Switch between Today / Upcoming / All tasks
- **Habit Tracker** — Daily habits with streak counting and progress bar
- **Progress Circle** — Visual completion percentage for today's tasks
- **Priority Breakdown** — Progress bars showing distribution across priorities
- **Task Cards** — Create, edit, delete, and mark tasks as done
- **Statistics** — Today's tasks, completed count, habits done, best streak
- **Search** — Filter tasks by keyword in real time

## Shared Package Usage

```tsx
// ALL components come from @task-mono/ui-components
import {
  TaskCard, TaskModal, SearchInput, StatsCard,
  ProgressBar, ProgressCircle, PriorityBadge,
  EmptyState, ConfirmationDialog, Button,
} from '@task-mono/ui-components';

// ALL utilities come from @task-mono/utils
import {
  filterTasks, calculateCompletion, countByStatus,
  formatDate, isToday, generateId, todayIso,
  saveTasks, loadStreak, pluralize,
} from '@task-mono/utils';
```

## Running

```bash
# From monorepo root
pnpm --filter feature-y dev

# Direct
cd apps/feature-y
pnpm dev
```

Runs at **http://localhost:3001**
