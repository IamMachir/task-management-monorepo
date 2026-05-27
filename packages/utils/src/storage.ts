import type { Task, Project } from './task';

const KEYS = {
  TASKS:    'task-mono:tasks',
  PROJECTS: 'task-mono:projects',
  SETTINGS: 'task-mono:settings',
  STREAK:   'task-mono:streak',
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage write failed for key:', key);
  }
}

/** Save tasks array to localStorage */
export function saveTasks(tasks: Task[]): void {
  safeSet(KEYS.TASKS, tasks);
}

/** Load tasks array from localStorage */
export function loadTasks(): Task[] {
  return safeGet<Task[]>(KEYS.TASKS, []);
}

/** Save projects array to localStorage */
export function saveProjects(projects: Project[]): void {
  safeSet(KEYS.PROJECTS, projects);
}

/** Load projects array from localStorage */
export function loadProjects(): Project[] {
  return safeGet<Project[]>(KEYS.PROJECTS, []);
}

/** Save arbitrary settings object */
export function saveSettings(settings: Record<string, unknown>): void {
  safeSet(KEYS.SETTINGS, settings);
}

/** Load settings object */
export function loadSettings(): Record<string, unknown> {
  return safeGet<Record<string, unknown>>(KEYS.SETTINGS, {});
}

/** Save streak data */
export function saveStreak(data: { count: number; lastDate: string }): void {
  safeSet(KEYS.STREAK, data);
}

/** Load streak data */
export function loadStreak(): { count: number; lastDate: string } {
  return safeGet(KEYS.STREAK, { count: 0, lastDate: '' });
}

/** Clear all stored data */
export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
