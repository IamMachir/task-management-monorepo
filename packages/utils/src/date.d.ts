/**
 * Date utility functions for the Task Management Dashboard
 */
/**
 * Format a date as "Jan 15, 2025"
 */
export declare function formatDate(date: string | Date): string;
/**
 * Format a date as "01/15/25"
 */
export declare function formatDateShort(date: string | Date): string;
/**
 * Format a date as a relative string: "2 days ago", "in 3 days", "today"
 */
export declare function formatRelative(date: string | Date): string;
/**
 * Returns true if the given date is in the past (overdue)
 */
export declare function isOverdue(date: string | Date): boolean;
/**
 * Returns the number of days until the due date (negative = overdue)
 */
export declare function daysUntilDue(date: string | Date): number;
/**
 * Returns true if the date is today
 */
export declare function isToday(date: string | Date): boolean;
/**
 * Returns true if the date is this week (within next 7 days)
 */
export declare function isThisWeek(date: string | Date): boolean;
/**
 * Get the start of the given day (midnight)
 */
export declare function startOfDay(date: string | Date): Date;
/**
 * Format a date for use in <input type="date"> value attribute
 */
export declare function toInputDate(date: string | Date): string;
/**
 * Get today's date as an ISO date string (YYYY-MM-DD)
 */
export declare function todayIso(): string;
