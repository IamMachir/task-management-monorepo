/**
 * Validate a task object and return a list of validation errors.
 * An empty array means the task is valid.
 */
export function validateTask(task) {
    const errors = [];
    if (!task.title || task.title.trim().length === 0) {
        errors.push({ field: 'title', message: 'Title is required' });
    }
    else if (task.title.trim().length > 200) {
        errors.push({ field: 'title', message: 'Title must be 200 characters or fewer' });
    }
    if (task.description && task.description.length > 2000) {
        errors.push({ field: 'description', message: 'Description must be 2000 characters or fewer' });
    }
    if (!task.priority) {
        errors.push({ field: 'priority', message: 'Priority is required' });
    }
    if (!task.status) {
        errors.push({ field: 'status', message: 'Status is required' });
    }
    if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
        errors.push({ field: 'dueDate', message: 'Due date is not a valid date' });
    }
    return errors;
}
/**
 * Returns true if the task passes all validations
 */
export function isValidTask(task) {
    return validateTask(task).length === 0;
}
/**
 * Validate an email address
 */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
/**
 * Validate that a date string is a valid date
 */
export function isValidDate(dateStr) {
    if (!dateStr)
        return false;
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
}
/**
 * Validate that a string is not empty after trimming
 */
export function isNonEmpty(str) {
    return typeof str === 'string' && str.trim().length > 0;
}
