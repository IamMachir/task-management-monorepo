import type { Task, Project } from './task';
/** Save tasks array to localStorage */
export declare function saveTasks(tasks: Task[]): void;
/** Load tasks array from localStorage */
export declare function loadTasks(): Task[];
/** Save projects array to localStorage */
export declare function saveProjects(projects: Project[]): void;
/** Load projects array from localStorage */
export declare function loadProjects(): Project[];
/** Save arbitrary settings object */
export declare function saveSettings(settings: Record<string, unknown>): void;
/** Load settings object */
export declare function loadSettings(): Record<string, unknown>;
/** Save streak data */
export declare function saveStreak(data: {
    count: number;
    lastDate: string;
}): void;
/** Load streak data */
export declare function loadStreak(): {
    count: number;
    lastDate: string;
};
/** Clear all stored data */
export declare function clearStorage(): void;
