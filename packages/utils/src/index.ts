// Date utilities
export {
  formatDate,
  formatDateShort,
  formatRelative,
  isToday,
  isOverdue,
  daysUntilDue,
  isThisWeek,
  startOfDay,
  toInputDate,
  todayIso,
} from './date';

// String utilities
export {
  capitalize,
  truncate,
  slugify,
  containsIgnoreCase,
  getInitials,
  stringToColor,
} from './string';

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
} from './task';

// Filter utilities
export {
  filterTasks,
  sortTasks,
  searchTasks,
  type FilterOptions,
  type SortField,
  type SortDir,
} from './filter';

// Storage utilities
export {
  loadTasks,
  saveTasks,
  loadProjects,
  saveProjects,
  loadSettings,
  saveSettings,
  loadStreak,
  saveStreak,
  clearStorage,
} from './storage';

// ID utilities
export { generateId } from './id';

// Validation utilities
export {
  isValidEmail,
  validateTask,
  isValidTask,
  isValidDate,
  isNonEmpty,
  type ValidationError,
} from './validation';

// Dark mode utilities
export { isDarkMode, lightColors, darkColors, priorities } from './theme';

// Bulk operations
export { bulkDelete, bulkComplete, bulkChangePriority } from './bulkOperations';
