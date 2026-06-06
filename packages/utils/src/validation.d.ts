import type { Task } from './task';
export interface ValidationError {
    field: string;
    message: string;
}
/**
 * Validate a task object and return a list of validation errors.
 * An empty array means the task is valid.
 */
export declare function validateTask(task: Partial<Task>): ValidationError[];
/**
 * Returns true if the task passes all validations
 */
export declare function isValidTask(task: Partial<Task>): boolean;
/**
 * Validate an email address
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Validate that a date string is a valid date
 */
export declare function isValidDate(dateStr: string): boolean;
/**
 * Validate that a string is not empty after trimming
 */
export declare function isNonEmpty(str: string): boolean;
