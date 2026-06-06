/**
 * String utility functions for the Task Management Dashboard
 */
/**
 * Truncate a string to the given length, appending "..." if truncated
 */
export function truncate(str, maxLength) {
    if (str.length <= maxLength)
        return str;
    return str.slice(0, maxLength - 3) + '...';
}
/**
 * Capitalize the first letter of a string
 */
export function capitalize(str) {
    if (!str)
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
 * Convert a string to Title Case
 */
export function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => capitalize(word))
        .join(' ');
}
/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
/**
 * Get initials from a full name (e.g. "Machir Tadesse" -> "MT")
 */
export function getInitials(name, maxLength = 2) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, maxLength)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}
/**
 * Pluralize a word based on a count
 * pluralize(1, "task")  -> "1 task"
 * pluralize(3, "task")  -> "3 tasks"
 */
export function pluralize(count, word, plural) {
    const pluralForm = plural || `${word}s`;
    return `${count} ${count === 1 ? word : pluralForm}`;
}
/**
 * Check if a string contains another string (case-insensitive)
 */
export function containsIgnoreCase(haystack, needle) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}
/**
 * Generate a random pastel color from a string (for user avatars)
 */
export function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
        '#f97316', '#eab308', '#22c55e', '#14b8a6',
        '#06b6d4', '#3b82f6',
    ];
    return colors[Math.abs(hash) % colors.length];
}
