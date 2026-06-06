/**
 * Date utility functions for the Task Management Dashboard
 */
/**
 * Format a date as "Jan 15, 2025"
 */
export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
/**
 * Format a date as "01/15/25"
 */
export function formatDateShort(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    });
}
/**
 * Format a date as a relative string: "2 days ago", "in 3 days", "today"
 */
export function formatRelative(date) {
    const d = new Date(date);
    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0)
        return 'today';
    if (diffDays === 1)
        return 'tomorrow';
    if (diffDays === -1)
        return 'yesterday';
    if (diffDays > 0)
        return `in ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
}
/**
 * Returns true if the given date is in the past (overdue)
 */
export function isOverdue(date) {
    return new Date(date).getTime() < Date.now();
}
/**
 * Returns the number of days until the due date (negative = overdue)
 */
export function daysUntilDue(date) {
    const diffMs = new Date(date).getTime() - Date.now();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
/**
 * Returns true if the date is today
 */
export function isToday(date) {
    const d = new Date(date);
    const now = new Date();
    return (d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate());
}
/**
 * Returns true if the date is this week (within next 7 days)
 */
export function isThisWeek(date) {
    const days = daysUntilDue(date);
    return days >= 0 && days <= 7;
}
/**
 * Get the start of the given day (midnight)
 */
export function startOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}
/**
 * Format a date for use in <input type="date"> value attribute
 */
export function toInputDate(date) {
    return new Date(date).toISOString().split('T')[0];
}
/**
 * Get today's date as an ISO date string (YYYY-MM-DD)
 */
export function todayIso() {
    return new Date().toISOString().split('T')[0];
}
