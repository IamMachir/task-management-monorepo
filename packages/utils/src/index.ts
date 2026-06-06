// Date utilities
export { formatDate, formatDateShort, formatDateRelative, isToday, getTodayISO } from './date';

// String utilities
export { capitalize, truncate, slugify, containsIgnoreCase } from './string';

// Task types and utilities
export {
  type Task,
  type Priority,
  type Status,
  type Project,
  type TeamMember,
  getPriorityColor,
  getPriorityDotColor,
  getPriorityOrder,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
  ALL_STATUSES,
  ALL_PRIORITIES,
  calculateCompletion,
  groupByStatus,
  groupByPriority,
  countByStatus,
  countByPriority,
  getInitials,
  stringToColor,
  isValidEmail,
  validateTask,
  todayIso,
} from './task';

// Filter utilities
export { filterByKey, filterByStatus, filterByPriority, filterByDate, getUniqueValues } from './filter';

// Storage utilities
export { getTasks, saveTasks, getProjects, saveProjects, getTeamMembers, saveTeamMembers, clearAllStorage } from './storage';

// ID utilities
export { generateId } from './id';

// Validation utilities
export { isValidEmail, validateTask } from './validation';

// Dark mode utilities
export { isDarkMode, lightColors, darkColors, priorities } from './theme';

// Bulk operations
export { bulkDelete, bulkComplete, bulkChangePriority } from './bulkOperations';
