import type { Task } from '@task-mono/utils';
import { todayIso } from '@task-mono/utils';

const today = todayIso();
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const nextWeek  = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

export const MY_TASKS: Task[] = [
  { id: 'p1', title: 'Morning workout',          description: '30 minutes cardio + stretching',                 priority: 'high',   status: 'done',        dueDate: today,    tags: ['health'],     createdAt: today, updatedAt: today },
  { id: 'p2', title: 'Review blockchain notes',  description: 'Go through CSEg5304 lecture slides',            priority: 'high',   status: 'in-progress', dueDate: today,    tags: ['study'],      createdAt: today, updatedAt: today },
  { id: 'p3', title: 'Complete monorepo project', description: 'Finish SEng5306 group project',                priority: 'high',   status: 'in-progress', dueDate: today,    tags: ['project'],    createdAt: today, updatedAt: today },
  { id: 'p4', title: 'Read 20 pages',            description: 'Continue reading "Clean Code"',                 priority: 'medium', status: 'todo',        dueDate: today,    tags: ['reading'],    createdAt: today, updatedAt: today },
  { id: 'p5', title: 'Grocery shopping',         description: 'Buy vegetables, fruits, and essentials',        priority: 'low',    status: 'todo',        dueDate: today,    tags: ['personal'],   createdAt: today, updatedAt: today },
  { id: 'p6', title: 'Write journal entry',      description: 'Reflect on today's progress and learnings',   priority: 'low',    status: 'todo',        dueDate: today,    tags: ['wellbeing'],  createdAt: today, updatedAt: today },
  { id: 'p7', title: 'Study algorithms',         description: 'Practice dynamic programming problems',         priority: 'high',   status: 'todo',        dueDate: tomorrow, tags: ['study', 'cs'],createdAt: today, updatedAt: today },
  { id: 'p8', title: 'Team meeting prep',        description: 'Prepare agenda for group project check-in',    priority: 'medium', status: 'todo',        dueDate: tomorrow, tags: ['work'],       createdAt: today, updatedAt: today },
  { id: 'p9', title: 'Exercise plan for week',   description: 'Plan workout schedule for next 7 days',         priority: 'medium', status: 'todo',        dueDate: nextWeek, tags: ['health'],     createdAt: today, updatedAt: today },
];

export const HABITS = [
  { id: 'h1', name: 'Morning Exercise', streak: 7,  completed: true,  emoji: '🏃' },
  { id: 'h2', name: 'Read 20 Pages',    streak: 12, completed: true,  emoji: '📚' },
  { id: 'h3', name: 'No Social Media',  streak: 3,  completed: false, emoji: '📵' },
  { id: 'h4', name: 'Drink 2L Water',   streak: 5,  completed: true,  emoji: '💧' },
  { id: 'h5', name: 'Meditate 10min',   streak: 0,  completed: false, emoji: '🧘' },
];
