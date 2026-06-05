/**
 * ID generation utilities
 */
/**
 * Generate a unique ID using crypto.randomUUID (Node 19+ / modern browsers)
 * Falls back to a manual implementation for older environments.
 */
export declare function generateId(): string;
/**
 * Generate a short 8-character alphanumeric ID
 */
export declare function generateShortId(): string;
/**
 * Generate a prefixed ID (e.g. "TASK-ABC12345")
 */
export declare function generatePrefixedId(prefix: string): string;
