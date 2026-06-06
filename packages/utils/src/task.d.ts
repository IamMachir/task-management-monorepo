/**
 * Task types and helper functions
 */
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'done' | 'cancelled';
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    assignee?: string;
    projectId?: string;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    tags?: string[];
}
export interface Project {
    id: string;
    name: string;
    description: string;
    color: string;
    createdAt: string;
}
export interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}
/** Tailwind background + text color classes for a priority */
export declare function getPriorityColor(priority: Priority): string;
/** Dot/indicator color for priority */
export declare function getPriorityDotColor(priority: Priority): string;
/** Sort order: high=0, medium=1, low=2 */
export declare function getPriorityOrder(priority: Priority): number;
/** Human-readable priority label */
export declare function getPriorityLabel(priority: Priority): string;
/** Tailwind classes for a status badge */
export declare function getStatusColor(status: Status): string;
/** Human-readable status label */
export declare function getStatusLabel(status: Status): string;
/** All possible statuses as an array */
export declare const ALL_STATUSES: Status[];
/** All possible priorities as an array */
export declare const ALL_PRIORITIES: Priority[];
/** Calculate the percentage of completed tasks */
export declare function calculateCompletion(tasks: Task[]): number;
/** Group tasks by status */
export declare function groupByStatus(tasks: Task[]): Record<Status, Task[]>;
/** Group tasks by priority */
export declare function groupByPriority(tasks: Task[]): Record<Priority, Task[]>;
/** Count tasks by status */
export declare function countByStatus(tasks: Task[]): Record<Status, number>;
