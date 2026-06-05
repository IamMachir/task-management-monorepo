export const bulkDelete = (tasks, ids) => {
    return tasks.filter(task => !ids.includes(task.id));
};
export const bulkComplete = (tasks, ids) => {
    return tasks.map(task => ids.includes(task.id) ? Object.assign(Object.assign({}, task), { status: 'completed' }) : task);
};
export const bulkChangePriority = (tasks, ids, priority) => {
    return tasks.map(task => ids.includes(task.id) ? Object.assign(Object.assign({}, task), { priority }) : task);
};
