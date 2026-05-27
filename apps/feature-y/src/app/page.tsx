'use client';

import React, { useState, useMemo } from 'react';
import {
  TaskCard, TaskModal, SearchInput, StatsCard,
  ProgressBar, ProgressCircle, PriorityBadge, EmptyState,
  ConfirmationDialog, Button,
} from '@task-mono/ui-components';
import {
  type Task, type Status,
  filterTasks, calculateCompletion, countByStatus,
  formatDate, isToday, isOverdue,
  generateId, todayIso, saveTasks, loadStreak, saveStreak,
  pluralize,
} from '@task-mono/utils';
import { MY_TASKS, HABITS } from '../data/mockData';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getWeekDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function PersonalFocusPage() {
  const [tasks,     setTasks]     = useState<Task[]>(MY_TASKS);
  const [habits,    setHabits]    = useState(HABITS);
  const [search,    setSearch]    = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask,  setEditTask]  = useState<Task | null>(null);
  const [deleteId,  setDeleteId]  = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'all'>('today');

  const today = todayIso();
  const weekDates = getWeekDates();
  const todayIndex = new Date().getDay();

  const todayTasks   = useMemo(() => filterTasks(tasks, { search }).filter((t) => t.dueDate === today), [tasks, search, today]);
  const upcomingTasks = useMemo(() => filterTasks(tasks, { search }).filter((t) => t.dueDate && t.dueDate > today), [tasks, search, today]);
  const allTasks     = useMemo(() => filterTasks(tasks, { search }), [tasks, search]);

  const displayTasks = activeTab === 'today' ? todayTasks : activeTab === 'upcoming' ? upcomingTasks : allTasks;

  const counts     = useMemo(() => countByStatus(todayTasks), [todayTasks]);
  const completion = useMemo(() => calculateCompletion(todayTasks), [todayTasks]);

  const completedHabits = habits.filter((h) => h.completed).length;
  const longestStreak   = Math.max(...habits.map((h) => h.streak), 0);

  const saveTask = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      return exists ? prev.map((t) => (t.id === task.id ? task : t)) : [...prev, task];
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  const toggleTaskDone = (task: Task) => {
    const newStatus: Status = task.status === 'done' ? 'todo' : 'done';
    saveTask({ ...task, status: newStatus, updatedAt: new Date().toISOString() });
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1) }
          : h
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🎯</span> PersonalFocus
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Button onClick={() => { setEditTask(null); setModalOpen(true); }} size="sm">
            + New Task
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* Week Calendar Strip */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">This Week</p>
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, i) => {
              const iso     = date.toISOString().split('T')[0];
              const isToday_ = iso === today;
              const hasTasks = tasks.some((t) => t.dueDate === iso);
              return (
                <div key={i}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl cursor-pointer transition-colors ${isToday_ ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xs font-medium">{DAYS[i]}</span>
                  <span className={`text-base font-bold mt-1 ${isToday_ ? 'text-white' : 'text-gray-900'}`}>{date.getDate()}</span>
                  {hasTasks && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isToday_ ? 'bg-indigo-200' : 'bg-indigo-400'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard title="Today's Tasks" value={todayTasks.length} color="indigo"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          />
          <StatsCard title="Completed" value={counts.done} color="green" trend={`${completion}% done`} trendUp={completion > 50}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatsCard title="Habits Done" value={`${completedHabits}/${habits.length}`} color="purple"
            icon={<span className="text-xl">🔥</span>}
          />
          <StatsCard title="Best Streak" value={`${longestStreak} days`} color="yellow"
            icon={<span className="text-xl">⚡</span>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Tasks */}
          <div className="lg:col-span-2 space-y-4">

            {/* Search */}
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder="Search your tasks..."
            />

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {(['today', 'upcoming', 'all'] as const).map((tab) => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'today' ? `Today (${todayTasks.length})` : tab === 'upcoming' ? `Upcoming (${upcomingTasks.length})` : `All (${allTasks.length})`}
                </button>
              ))}
            </div>

            {/* Task list */}
            <div className="space-y-3">
              {displayTasks.length === 0 ? (
                <EmptyState title="No tasks" description="You're all caught up! Add a new task."
                  action={{ label: 'Add Task', onClick: () => setModalOpen(true) }} />
              ) : (
                displayTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 group">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskDone(task)}
                      className={`mt-4 w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-indigo-400'}`}
                    >
                      {task.status === 'done' && (
                        <svg className="w-full h-full p-0.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <TaskCard
                      task={task}
                      onEdit={(t) => { setEditTask(t); setModalOpen(true); }}
                      onDelete={(id) => setDeleteId(id)}
                      className="flex-1"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Habits + Progress */}
          <div className="space-y-4">

            {/* Progress circle */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Today's Progress</p>
              <ProgressCircle value={completion} size={120} color="#6366f1" label="done" />
              <p className="text-xs text-gray-500 mt-3">
                {counts.done} of {todayTasks.length} {pluralize(todayTasks.length, 'task')} completed
              </p>
            </div>

            {/* Habits */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-700">Daily Habits</p>
                <span className="text-xs text-gray-400">{completedHabits}/{habits.length} done</span>
              </div>

              <ProgressBar value={completedHabits} max={habits.length} color="green" showValue={false} size="sm" className="mb-4" />

              <div className="space-y-2.5">
                {habits.map((habit) => (
                  <button key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${habit.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                  >
                    <span className="text-xl">{habit.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${habit.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {habit.name}
                      </p>
                      <p className="text-xs text-gray-400">🔥 {habit.streak} day streak</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${habit.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                      {habit.completed && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-gray-700 mb-4">Priority Breakdown</p>
              {(['high', 'medium', 'low'] as const).map((p) => {
                const count = tasks.filter((t) => t.priority === p).length;
                const pct   = tasks.length ? Math.round((count / tasks.length) * 100) : 0;
                const colors = { high: 'red', medium: 'yellow', low: 'green' } as const;
                return (
                  <div key={p} className="mb-3 last:mb-0">
                    <div className="flex justify-between mb-1">
                      <PriorityBadge priority={p} />
                      <span className="text-xs text-gray-500">{count} tasks</span>
                    </div>
                    <ProgressBar value={pct} color={colors[p]} size="sm" showValue={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
        message="Are you sure you want to delete this task?"
        confirmLabel="Delete"
        onConfirm={() => deleteId && deleteTask(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
