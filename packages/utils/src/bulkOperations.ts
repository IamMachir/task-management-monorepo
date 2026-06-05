export const bulkDelete = (tasks: any[], ids: string[]) => {
  return tasks.filter(task => !ids.includes(task.id));
};

export const bulkComplete = (tasks: any[], ids: string[]) => {
  return tasks.map(task =>
    ids.includes(task.id) ? { ...task, status: 'completed' } : task
  );
};

export const bulkChangePriority = (
  tasks: any[],
  ids: string[],
  priority: 'high' | 'medium' | 'low'
) => {
  return tasks.map(task =>
    ids.includes(task.id) ? { ...task, priority } : task
  );
};
