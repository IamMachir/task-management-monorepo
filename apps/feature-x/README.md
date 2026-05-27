# feature-x — TeamFlow

> **SEng5306 — Component Based Software Development**
> Kanban-style team task management dashboard

## Overview

TeamFlow is a full-featured Kanban board for team collaboration. It demonstrates how individual Next.js apps can assemble rich interfaces using only shared packages — no local business logic.

## Architecture

```
apps/feature-x/
├── src/
│   ├── app/
│   │   ├── layout.tsx     ← Root layout with metadata
│   │   ├── page.tsx       ← Main assembly page (imports ONLY from packages)
│   │   └── globals.css    ← Tailwind base styles
│   └── data/
│       └── mockData.ts    ← Sample tasks, projects, team members
├── next.config.ts         ← transpilePackages config
├── tailwind.config.ts     ← Includes ui-components content path
└── package.json
```

## Features

- **Kanban Board** — Four columns: To Do, In Progress, Done, Cancelled
- **Task Cards** — Priority badges, status badges, due dates, assignee avatars
- **Search & Filter** — Real-time search + filter by status/priority
- **Create / Edit Tasks** — Modal form with validation
- **Delete Tasks** — Confirmation dialog
- **Statistics Dashboard** — Total, in-progress, completed counts + progress bar
- **Team Sidebar** — Navigation + project switcher + team avatars
- **Persistence** — Tasks saved to localStorage between sessions

## Shared Package Usage

```tsx
// ALL components come from @task-mono/ui-components
import {
  Sidebar, KanbanColumn, TaskModal, SearchInput,
  FilterBar, StatsCard, ProgressBar, ConfirmationDialog,
} from '@task-mono/ui-components';

// ALL utilities come from @task-mono/utils
import {
  groupByStatus, filterTasks, calculateCompletion,
  saveTasks, loadTasks,
} from '@task-mono/utils';
```

## Running

```bash
# From monorepo root
pnpm --filter feature-x dev

# Direct
cd apps/feature-x
pnpm dev
```

Runs at **http://localhost:3000**
