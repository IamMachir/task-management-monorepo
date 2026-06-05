import type { Task, Priority, Status } from './task';
export interface FilterOptions {
    status?: Status | 'all';
    priority?: Priority | 'all';
    search?: string;
    assignee?: string;
    projectId?: string;
    overdue?: boolean;
}
export type SortField = 'title' | 'priority' | 'status' | 'dueDate' | 'createdAt';
export type SortDir = 'asc' | 'desc';
/**
 * Filter tasks based on the provided filter options
 */
export declare function filterTasks(tasks: Task[], filters: FilterOptions): Task[];
/**
 * Sort tasks by a given field and direction
 */
export declare function sortTasks(tasks: Task[], sortBy: SortField, dir?: SortDir): Task[];
/**
 * Search tasks by a text query across title, description, and tags
 */
export declare function searchTasks(tasks: Task[], query: string): Task[];
