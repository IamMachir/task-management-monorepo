import type { Task, Project, TeamMember } from '@task-mono/utils';

export const MOCK_TEAM: TeamMember[] = [
  { id: 'u1', name: 'Machir Tadesse', email: 'machir@example.com', role: 'Lead Developer' },
  { id: 'u2', name: 'Abel Bekele',    email: 'abel@example.com',   role: 'Frontend Dev' },
  { id: 'u3', name: 'Sara Mengistu',  email: 'sara@example.com',   role: 'UI Designer' },
  { id: 'u4', name: 'Daniel Hailu',   email: 'daniel@example.com', role: 'Backend Dev' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Dashboard v2',     description: 'Redesign the main dashboard', color: '#6366f1', createdAt: '2025-01-01' },
  { id: 'p2', name: 'Mobile App',       description: 'React Native mobile client',  color: '#f97316', createdAt: '2025-01-05' },
  { id: 'p3', name: 'API Refactor',     description: 'Migrate to new API layer',    color: '#22c55e', createdAt: '2025-01-10' },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1',  title: 'Design system setup',    description: 'Configure Tailwind and component library',     priority: 'high',   status: 'done',        projectId: 'p1', assignee: 'u3', dueDate: '2025-01-20', tags: ['design', 'setup'],    createdAt: '2025-01-01', updatedAt: '2025-01-15' },
  { id: 't2',  title: 'Kanban board component', description: 'Build drag-and-drop Kanban columns',           priority: 'high',   status: 'in-progress', projectId: 'p1', assignee: 'u1', dueDate: '2025-02-10', tags: ['frontend'],           createdAt: '2025-01-05', updatedAt: '2025-01-20' },
  { id: 't3',  title: 'User authentication',    description: 'Implement JWT login and signup flow',          priority: 'high',   status: 'in-progress', projectId: 'p3', assignee: 'u4', dueDate: '2025-02-15', tags: ['auth', 'backend'],    createdAt: '2025-01-06', updatedAt: '2025-01-22' },
  { id: 't4',  title: 'Dashboard analytics',    description: 'Add stats cards and charts to main dashboard', priority: 'medium', status: 'todo',        projectId: 'p1', assignee: 'u2', dueDate: '2025-02-20', tags: ['analytics'],          createdAt: '2025-01-07', updatedAt: '2025-01-07' },
  { id: 't5',  title: 'Mobile navigation',      description: 'Implement bottom tab navigation for mobile',   priority: 'medium', status: 'todo',        projectId: 'p2', assignee: 'u2', dueDate: '2025-03-01', tags: ['mobile', 'nav'],      createdAt: '2025-01-08', updatedAt: '2025-01-08' },
  { id: 't6',  title: 'API rate limiting',      description: 'Add rate limiting middleware to Express API',  priority: 'high',   status: 'todo',        projectId: 'p3', assignee: 'u4', dueDate: '2025-02-28', tags: ['backend', 'security'],createdAt: '2025-01-09', updatedAt: '2025-01-09' },
  { id: 't7',  title: 'Write unit tests',       description: 'Add Jest tests for utility functions',         priority: 'low',    status: 'todo',        projectId: 'p1', assignee: 'u1', dueDate: '2025-03-10', tags: ['testing'],            createdAt: '2025-01-10', updatedAt: '2025-01-10' },
  { id: 't8',  title: 'Onboarding flow',        description: 'Design and implement user onboarding screens', priority: 'medium', status: 'done',        projectId: 'p2', assignee: 'u3', dueDate: '2025-01-25', tags: ['ux', 'onboarding'],   createdAt: '2025-01-03', updatedAt: '2025-01-24' },
  { id: 't9',  title: 'Database migrations',    description: 'Write migration scripts for schema changes',   priority: 'high',   status: 'in-progress', projectId: 'p3', assignee: 'u4', dueDate: '2025-02-05', tags: ['database'],           createdAt: '2025-01-11', updatedAt: '2025-01-18' },
  { id: 't10', title: 'Push notifications',     description: 'Integrate Firebase push notifications',        priority: 'low',    status: 'cancelled',   projectId: 'p2', assignee: 'u2', dueDate: '2025-03-15', tags: ['mobile', 'firebase'], createdAt: '2025-01-12', updatedAt: '2025-01-12' },
];
