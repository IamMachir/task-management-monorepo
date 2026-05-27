# @task-mono/ui-components

Reusable React UI components for the Task Management Dashboard.

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Styled button with variants (primary, secondary, danger, ghost) |
| `Input` | Text input with label and error state |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown select input |
| `TaskCard` | Displays task with title, priority, status, due date |
| `TaskModal` | Create/edit task form in a modal overlay |
| `KanbanColumn` | Drag-and-drop Kanban column container |
| `PriorityBadge` | Colored badge showing task priority |
| `StatusBadge` | Colored badge showing task status |
| `ProgressBar` | Horizontal progress indicator |
| `ProgressCircle` | Circular progress indicator |
| `Sidebar` | Navigation sidebar with project list |
| `FilterBar` | Toolbar for filtering tasks |
| `SearchInput` | Search input with icon |
| `UserAvatar` | User avatar with initials or image |
| `StatsCard` | Metric card with title, value, and trend |
| `EmptyState` | Empty state placeholder with icon and CTA |
| `ConfirmationDialog` | Confirm/cancel modal dialog |

## Usage

```tsx
import {
  TaskCard,
  PriorityBadge,
  StatusBadge,
  StatsCard,
  ProgressBar,
} from '@task-mono/ui-components';

function MyPage() {
  return (
    <div>
      <StatsCard title="Total Tasks" value={24} trend="+3 this week" />
      <TaskCard
        task={{
          id: '1',
          title: 'Design new dashboard',
          description: 'Create wireframes for the new UI',
          priority: 'high',
          status: 'in-progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        onEdit={(task) => console.log('edit', task)}
        onDelete={(id) => console.log('delete', id)}
      />
    </div>
  );
}
```
