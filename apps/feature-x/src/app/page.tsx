'use client';

import React, { useState, useMemo } from 'react';
import {
  Sidebar, KanbanColumn, SearchInput, FilterBar, StatsCard,
  TaskModal, ConfirmationDialog, UserAvatar, ProgressBar,
  type FilterState,
} from '@task-mono/ui-components';
import {
  type Task, type Status,
  groupByStatus, filterTasks, countByStatus, calculateCompletion,
  saveTasks, loadTasks, ALL_STATUSES, getStatusLabel,
} from '@task-mono/utils';
import { MOCK_TASKS, MOCK_PROJECTS, MOCK_TEAM } from '../data/mockData';

const ASSIGNEE_MAP = Object.fromEntries(MOCK_TEAM.map((m) => [m.id, m.name]));

export default function TeamFlowPage() {
  const [tasks,     setTasks]     = useState<Task[]>(MOCK_TASKS);
  const [filters,   setFilters]   = useState<FilterState>({ status: 'all', priority: 'all' });
  const [search,    setSearch]    = useState('');
  const [activeNav, setActiveNav] = useState('tasks');
  const [activeProject, setActiveProject] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask,  setEditTask]  = useState<Task | null>(null);
  const [deleteId,  setDeleteId]  = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Status>('todo');

  const filtered = useMemo(() => {
    let t = filterTasks(tasks, {
      ...filters,
      search,
      projectId: activeProject,
    });
    return t;
  }, [tasks, filters, search, activeProject]);

  const grouped = useMemo(() => groupByStatus(filtered), [filtered]);
  const counts  = useMemo(() => countByStatus(tasks), [tasks]);
  const pct     = useMemo(() => calculateCompletion(tasks), [tasks]);

  const saveTask = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      const next   = exists ? prev.map((t) => (t.id === task.id ? task : t)) : [...prev, task];
      saveTasks(next);
      return next;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveTasks(next);
      return next;
    });
    setDeleteId(null);
  };

  const openCreate = (status: Status) => {
    setNewStatus(status);
    setEditTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        projects={MOCK_PROJECTS}
        activeProjectId={activeProject}
        onProjectSelect={(id) => setActiveProject((prev) => (prev === id ? undefined : id))}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {activeProject
                ? MOCK_PROJECTS.find((p) => p.id === activeProject)?.name ?? 'Project'
                : 'All Tasks'}
            </h2>
            <p className="text-xs text-gray-500">{filtered.length} tasks</p>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder="Search tasks..."
              className="flex-1"
            />
          </div>

          {/* Team avatars */}
          <div className="flex -space-x-2">
            {MOCK_TEAM.slice(0, 4).map((m) => (
              <UserAvatar key={m.id} name={m.name} size="sm"
                className="ring-2 ring-white" />
            ))}
          </div>

          <button
            onClick={() => openCreate('todo')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </header>

        {/* Stats row */}
        <div className="px-6 py-4 grid grid-cols-4 gap-4 shrink-0 bg-white border-b border-gray-200">
          <StatsCard title="Total Tasks"  value={tasks.length} color="indigo"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          />
          <StatsCard title="In Progress"  value={counts['in-progress']} color="blue"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <StatsCard title="Completed"    value={counts['done']} color="green" trend={`${pct}% done`} trendUp={pct > 50}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-2">Overall Progress</p>
            <ProgressBar value={pct} color="indigo" />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 shrink-0 border-b border-gray-100 bg-white">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-5 h-full">
            {ALL_STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={grouped[status]}
                onEditTask={openEdit}
                onDeleteTask={(id) => setDeleteId(id)}
                onAddTask={openCreate}
                assigneeMap={ASSIGNEE_MAP}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null); }}
        onSave={saveTask}
        task={editTask}
      />

      {/* Confirm Delete */}
      <ConfirmationDialog
        isOpen={!!deleteId}
        title="Delete Task"
        message="This action cannot be undone. Are you sure you want to delete this task?"
        confirmLabel="Delete"
        onConfirm={() => deleteId && deleteTask(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
