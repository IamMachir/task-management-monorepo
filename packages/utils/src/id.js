/**
 * ID generation utilities
 */
/**
 * Generate a unique ID using crypto.randomUUID (Node 19+ / modern browsers)
 * Falls back to a manual implementation for older environments.
 */
export function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/**
 * Generate a short 8-character alphanumeric ID
 */
export function generateShortId() {
    return Math.random().toString(36).slice(2, 10).toUpperCase();
}
/**
 * Generate a prefixed ID (e.g. "TASK-ABC12345")
 */
export function generatePrefixedId(prefix) {
    return `${prefix.toUpperCase()}-${generateShortId()}`;
}
