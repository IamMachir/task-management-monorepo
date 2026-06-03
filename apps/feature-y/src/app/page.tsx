import React, { useState } from 'react';
import DarkModeToggle from '@repo/ui-components/DarkModeToggle';
import BulkTaskActions from '@repo/ui-components/BulkTaskActions';

/**
 * PersonalFocus - Daily Task Planner
 * 
 * Features:
 * - Dark mode toggle (top right)
 * - Bulk task operations
 * - Daily/upcoming/all task views
 * - Habit tracker with streaks
 */
export default function Home() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Morning workout', status: 'completed', priority: 'high' },
    { id: '2', title: 'Write project proposal', status: 'in-progress', priority: 'high' },
    { id: '3', title: 'Review pull requests', status: 'todo', priority: 'medium' },
    { id: '4', title: 'Team standup', status: 'todo', priority: 'medium' },
    { id: '5', title: 'Prepare presentation', status: 'todo', priority: 'high' },
  ]);

  const handleBulkDelete = (ids: string[]) => {
    setTasks(tasks.filter(t => !ids.includes(t.id)));
  };

  const handleBulkComplete = (ids: string[]) => {
    setTasks(tasks.map(t => ids.includes(t.id) ? { ...t, status: 'completed' } : t));
  };

  const handleBulkPriorityChange = (ids: string[], priority: 'high' | 'medium' | 'low') => {
    setTasks(tasks.map(t => ids.includes(t.id) ? { ...t, priority } : t));
  };

  const todayTasks = tasks.filter(t => t.status !== 'completed');
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">PersonalFocus</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Task Planner</p>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <section className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
            <BulkTaskActions
              tasks={todayTasks}
              onBulkDelete={handleBulkDelete}
              onBulkComplete={handleBulkComplete}
              onBulkPriorityChange={handleBulkPriorityChange}
            />
          </section>

          {/* Progress Sidebar */}
          <aside>
            <h3 className="text-xl font-bold mb-4">Progress</h3>
            
            <div className="space-y-4">
              {/* Completion Ratio */}
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Completion Today</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{completedCount}</span>
                  <span className="text-gray-600 dark:text-gray-400">/ {tasks.length}</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Priority Breakdown */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">By Priority</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-red-600 dark:text-red-400">🔴 High</span>
                    <span className="font-bold">{tasks.filter(t => t.priority === 'high').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 dark:text-yellow-400">🟡 Medium</span>
                    <span className="font-bold">{tasks.filter(t => t.priority === 'medium').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400">🟢 Low</span>
                    <span className="font-bold">{tasks.filter(t => t.priority === 'low').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
