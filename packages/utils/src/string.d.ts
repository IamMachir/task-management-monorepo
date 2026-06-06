/**
 * String utility functions for the Task Management Dashboard
 */
/**
 * Truncate a string to the given length, appending "..." if truncated
 */
export declare function truncate(str: string, maxLength: number): string;
/**
 * Capitalize the first letter of a string
 */
export declare function capitalize(str: string): string;
/**
 * Convert a string to Title Case
 */
export declare function toTitleCase(str: string): string;
/**
 * Convert a string to a URL-friendly slug
 */
export declare function slugify(str: string): string;
/**
 * Get initials from a full name (e.g. "Machir Tadesse" -> "MT")
 */
export declare function getInitials(name: string, maxLength?: number): string;
/**
 * Pluralize a word based on a count
 * pluralize(1, "task")  -> "1 task"
 * pluralize(3, "task")  -> "3 tasks"
 */
export declare function pluralize(count: number, word: string, plural?: string): string;
/**
 * Check if a string contains another string (case-insensitive)
 */
export declare function containsIgnoreCase(haystack: string, needle: string): boolean;
/**
 * Generate a random pastel color from a string (for user avatars)
 */
export declare function stringToColor(str: string): string;
