/**
 * Bulk Operations Utilities
 * 
 * Helper functions for selecting and bulk-editing tasks.
 */

export interface SelectionState {
  selected: Set<string>;
  toggleSelect: (id: string) => void;
  selectAll: (taskIds: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
  selectedCount: () => number;
}

export const createSelectionState = (): SelectionState => {
  let selected = new Set<string>();

  return {
    selected,
    toggleSelect: (id: string) => {
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }
    },
    selectAll: (taskIds: string[]) => {
      selected = new Set(taskIds);
    },
    clearSelection: () => {
      selected.clear();
    },
    isSelected: (id: string) => selected.has(id),
    selectedCount: () => selected.size,
  };
};

/**
 * Bulk delete tasks
 */
export const bulkDelete = (tasks: any[], ids: string[]) => {
  return tasks.filter(task => !ids.includes(task.id));
};

/**
 * Bulk mark as complete
 */
export const bulkComplete = (tasks: any[], ids: string[]) => {
  return tasks.map(task =>
    ids.includes(task.id) ? { ...task, status: 'completed' } : task
  );
};

/**
 * Bulk change priority
 */
export const bulkChangePriority = (
  tasks: any[],
  ids: string[],
  priority: 'high' | 'medium' | 'low'
) => {
  return tasks.map(task =>
    ids.includes(task.id) ? { ...task, priority } : task
  );
};
