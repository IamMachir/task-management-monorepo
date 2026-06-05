const KEYS = {
    TASKS: 'task-mono:tasks',
    PROJECTS: 'task-mono:projects',
    SETTINGS: 'task-mono:settings',
    STREAK: 'task-mono:streak',
};
function safeGet(key, fallback) {
    if (typeof window === 'undefined')
        return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    }
    catch (_a) {
        return fallback;
    }
}
function safeSet(key, value) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (_a) {
        console.warn('localStorage write failed for key:', key);
    }
}
/** Save tasks array to localStorage */
export function saveTasks(tasks) {
    safeSet(KEYS.TASKS, tasks);
}
/** Load tasks array from localStorage */
export function loadTasks() {
    return safeGet(KEYS.TASKS, []);
}
/** Save projects array to localStorage */
export function saveProjects(projects) {
    safeSet(KEYS.PROJECTS, projects);
}
/** Load projects array from localStorage */
export function loadProjects() {
    return safeGet(KEYS.PROJECTS, []);
}
/** Save arbitrary settings object */
export function saveSettings(settings) {
    safeSet(KEYS.SETTINGS, settings);
}
/** Load settings object */
export function loadSettings() {
    return safeGet(KEYS.SETTINGS, {});
}
/** Save streak data */
export function saveStreak(data) {
    safeSet(KEYS.STREAK, data);
}
/** Load streak data */
export function loadStreak() {
    return safeGet(KEYS.STREAK, { count: 0, lastDate: '' });
}
/** Clear all stored data */
export function clearStorage() {
    if (typeof window === 'undefined')
        return;
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
