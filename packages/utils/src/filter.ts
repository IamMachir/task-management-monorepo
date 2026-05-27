import type { Task, Priority, Status } from './task';
import { getPriorityOrder } from './task';
import { containsIgnoreCase } from './string';

export interface FilterOptions {
  status?:   Status | 'all';
  priority?: Priority | 'all';
  search?:   string;
  assignee?: string;
  projectId?: string;
  overdue?:  boolean;
}

export type SortField = 'title' | 'priority' | 'status' | 'dueDate' | 'createdAt';
export type SortDir   = 'asc' | 'desc';

/**
 * Filter tasks based on the provided filter options
 */
export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
  return tasks.filter((task) => {
    if (filters.status   && filters.status   !== 'all' && task.status   !== filters.status)   return false;
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.assignee && task.assignee !== filters.assignee) return false;
    if (filters.projectId && task.projectId !== filters.projectId) return false;

    if (filters.overdue && task.dueDate) {
      if (new Date(task.dueDate) > new Date()) return false;
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim();
      const matchesTitle = containsIgnoreCase(task.title, q);
      const matchesDesc  = containsIgnoreCase(task.description, q);
      const matchesTags  = task.tags?.some((tag) => containsIgnoreCase(tag, q)) ?? false;
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }

    return true;
  });
}

/**
 * Sort tasks by a given field and direction
 */
export function sortTasks(tasks: Task[], sortBy: SortField, dir: SortDir = 'asc'): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    let cmp = 0;

    switch (sortBy) {
      case 'title':
        cmp = a.title.localeCompare(b.title);
        break;
      case 'priority':
        cmp = getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
        break;
      case 'status': {
        const statusOrder = { 'in-progress': 0, todo: 1, done: 2, cancelled: 3 };
        cmp = statusOrder[a.status] - statusOrder[b.status];
        break;
      }
      case 'dueDate': {
        const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        cmp = da - db;
        break;
      }
      case 'createdAt':
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return dir === 'asc' ? cmp : -cmp;
  });

  return sorted;
}

/**
 * Search tasks by a text query across title, description, and tags
 */
export function searchTasks(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  return filterTasks(tasks, { search: query });
}
