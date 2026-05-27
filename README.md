# Task Management Dashboard — Monorepo

> **Course:** SEng5306 — Component Based Software Development
> **Instructor:** [@daniel-mitiku](https://github.com/daniel-mitiku)
> **Student:** Machir Tadesse Woldemariam · UGE/27638/14
> **University:** Adama Science and Technology University

---

## Overview

A full-stack **Task Management Dashboard** built as a modular monorepo. Two independent Next.js applications share a common UI component library and utility package, demonstrating component-based software development principles.

---

## Architecture

```
task-management-monorepo/
├── apps/
│   ├── feature-x/          # TeamFlow — Kanban team task dashboard (port 3000)
│   └── feature-y/          # PersonalFocus — Personal daily planner (port 3001)
├── packages/
│   ├── ui-components/      # Reusable React UI components (Tailwind + TypeScript)
│   └── utils/              # Shared utility functions (dates, filtering, storage…)
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml     # pnpm workspace definition
├── tsconfig.json           # Root TypeScript config
└── package.json            # Root package config
```

### Package Responsibilities

| Package | Role |
|---------|------|
| `@task-mono/ui-components` | Reusable React components — TaskCard, KanbanColumn, Sidebar, StatsCard, PriorityBadge, etc. |
| `@task-mono/utils` | Shared utility functions — date formatting, filtering, localStorage, ID generation, validation |
| `apps/feature-x` | **TeamFlow** — assembly only; imports all UI + utils from packages |
| `apps/feature-y` | **PersonalFocus** — assembly only; imports all UI + utils from packages |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Turborepo](https://turbo.build) | Monorepo build orchestration |
| [pnpm Workspaces](https://pnpm.io/workspaces) | Package management |
| [Next.js 15](https://nextjs.org) | React framework (App Router) |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Shadcn/ui](https://ui.shadcn.com) | UI component foundation |

---

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 9+

```bash
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/IamMachir/task-management-monorepo.git
cd task-management-monorepo

# Install all dependencies
pnpm install
```

### Development

```bash
# Run both apps simultaneously
pnpm dev

# Run individual apps
pnpm --filter feature-x dev   # TeamFlow      → http://localhost:3000
pnpm --filter feature-y dev   # PersonalFocus → http://localhost:3001
```

### Build

```bash
# Build all packages and apps
pnpm build

# Build a specific app
pnpm --filter feature-x build
```

---

## Apps

### feature-x — TeamFlow
Team-oriented Kanban board with drag-and-drop columns, task assignments, project switching, and statistics overview. See [apps/feature-x/README.md](apps/feature-x/README.md).

### feature-y — PersonalFocus
Personal productivity dashboard with a daily planner, priority-based task management, calendar scheduling, streak tracking, and productivity stats. See [apps/feature-y/README.md](apps/feature-y/README.md).

---

## Packages

### @task-mono/ui-components
Reusable UI components built with Tailwind CSS. See [packages/ui-components/README.md](packages/ui-components/README.md).

### @task-mono/utils
Shared utility functions. See [packages/utils/README.md](packages/utils/README.md).

---

## Adding New Components

```bash
# Create a new component in ui-components
touch packages/ui-components/src/components/MyComponent.tsx

# Export it from the package index
echo 'export { MyComponent } from "./components/MyComponent";' >> packages/ui-components/src/index.ts

# Import it in any app
import { MyComponent } from "@task-mono/ui-components";
```

---

## Adding New Utilities

```bash
# Create a utility file
touch packages/utils/src/myHelper.ts

# Export from index
echo 'export * from "./myHelper";' >> packages/utils/src/index.ts
```

---

*SEng5306 — Component Based Software Development | Adama Science and Technology University*
