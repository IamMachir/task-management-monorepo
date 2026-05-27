# @task-mono/utils

Shared utility library for the Task Management Monorepo.

## Usage

```ts
import {
  formatDate,
  isOverdue,
  daysUntilDue,
  generateId,
  filterTasks,
  sortTasks,
  getPriorityColor,
  getStatusColor,
  saveTasks,
  loadTasks,
  validateTask,
  truncate,
  capitalize,
} from '@task-mono/utils';
```

## Available Utilities

### Date Utilities (`date.ts`)
| Function | Description |
|----------|-------------|
| `formatDate(date)` | Format date as "Jan 15, 2025" |
| `formatDateShort(date)` | Format as "01/15/25" |
| `formatRelative(date)` | "2 days ago", "in 3 days" |
| `isOverdue(date)` | Returns true if date is in the past |
| `daysUntilDue(date)` | Number of days remaining (negative = overdue) |
| `isToday(date)` | Check if date is today |
| `startOfDay(date)` | Get start of day |

### String Utilities (`string.ts`)
| Function | Description |
|----------|-------------|
| `truncate(str, length)` | Truncate string with ellipsis |
| `capitalize(str)` | Capitalize first letter |
| `slugify(str)` | Convert to URL-friendly slug |
| `getInitials(name)` | Get initials from full name |
| `pluralize(count, word)` | "1 task" / "3 tasks" |

### Task Utilities (`task.ts`)
| Function | Description |
|----------|-------------|
| `getPriorityColor(priority)` | Tailwind color class for priority |
| `getPriorityOrder(priority)` | Sort order number |
| `getStatusColor(status)` | Tailwind color class for status |
| `getStatusLabel(status)` | Human-readable label |
| `calculateCompletion(tasks)` | Percentage of completed tasks |
| `groupByStatus(tasks)` | Group tasks by status |
| `groupByPriority(tasks)` | Group tasks by priority |

### Filter & Sort (`filter.ts`)
| Function | Description |
|----------|-------------|
| `filterTasks(tasks, filters)` | Filter by status/priority/search/assignee |
| `sortTasks(tasks, sortBy)` | Sort by date/priority/status/title |
| `searchTasks(tasks, query)` | Full-text search |

### Storage Utilities (`storage.ts`)
| Function | Description |
|----------|-------------|
| `saveTasks(tasks)` | Persist tasks to localStorage |
| `loadTasks()` | Load tasks from localStorage |
| `saveProjects(projects)` | Persist projects |
| `loadProjects()` | Load projects |
| `clearStorage()` | Clear all stored data |

### ID & Validation (`id.ts`, `validation.ts`)
| Function | Description |
|----------|-------------|
| `generateId()` | Generate unique ID |
| `generateShortId()` | Short 8-char ID |
| `validateTask(task)` | Validate task fields, returns errors |
| `isValidEmail(email)` | Email validation |
| `isValidDate(date)` | Date validation |
