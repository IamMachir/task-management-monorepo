/**
 * Task types and helper functions
 */
// ── Priority helpers ──────────────────────────────────────────────
/** Tailwind background + text color classes for a priority */
export function getPriorityColor(priority) {
    const map = {
        high: 'bg-red-100 text-red-700 border-red-200',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        low: 'bg-green-100 text-green-700 border-green-200',
    };
    return map[priority];
}
/** Dot/indicator color for priority */
export function getPriorityDotColor(priority) {
    const map = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
    };
    return map[priority];
}
/** Sort order: high=0, medium=1, low=2 */
export function getPriorityOrder(priority) {
    return { high: 0, medium: 1, low: 2 }[priority];
}
/** Human-readable priority label */
export function getPriorityLabel(priority) {
    return capitalize(priority);
}
// ── Status helpers ─────────────────────────────────────────────────
/** Tailwind classes for a status badge */
export function getStatusColor(status) {
    const map = {
        'todo': 'bg-gray-100 text-gray-600 border-gray-200',
        'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
        'done': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'cancelled': 'bg-red-100 text-red-500 border-red-200',
    };
    return map[status];
}
/** Human-readable status label */
export function getStatusLabel(status) {
    const map = {
        'todo': 'To Do',
        'in-progress': 'In Progress',
        'done': 'Done',
        'cancelled': 'Cancelled',
    };
    return map[status];
}
/** All possible statuses as an array */
export const ALL_STATUSES = ['todo', 'in-progress', 'done', 'cancelled'];
/** All possible priorities as an array */
export const ALL_PRIORITIES = ['high', 'medium', 'low'];
// ── Aggregation helpers ────────────────────────────────────────────
/** Calculate the percentage of completed tasks */
export function calculateCompletion(tasks) {
    if (tasks.length === 0)
        return 0;
    const done = tasks.filter((t) => t.status === 'done').length;
    return Math.round((done / tasks.length) * 100);
}
/** Group tasks by status */
export function groupByStatus(tasks) {
    const groups = {
        'todo': [],
        'in-progress': [],
        'done': [],
        'cancelled': [],
    };
    tasks.forEach((t) => groups[t.status].push(t));
    return groups;
}
/** Group tasks by priority */
export function groupByPriority(tasks) {
    const groups = { high: [], medium: [], low: [] };
    tasks.forEach((t) => groups[t.priority].push(t));
    return groups;
}
/** Count tasks by status */
export function countByStatus(tasks) {
    const groups = groupByStatus(tasks);
    return {
        'todo': groups['todo'].length,
        'in-progress': groups['in-progress'].length,
        'done': groups['done'].length,
        'cancelled': groups['cancelled'].length,
    };
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
