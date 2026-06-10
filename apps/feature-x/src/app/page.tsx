"use client";
import React, { useState } from 'react';
import { DarkModeToggle, BulkTaskActions } from '@task-mono/ui-components';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design dashboard mockup', status: 'todo', priority: 'high' },
    { id: '2', title: 'Review team feedback', status: 'in-progress', priority: 'medium' },
    { id: '3', title: 'Complete project report', status: 'done', priority: 'high' },
    { id: '4', title: 'Schedule client meeting', status: 'todo', priority: 'low' },
    { id: '5', title: 'Fix login bug', status: 'in-progress', priority: 'high' },
  ]);

  const handleBulkDelete = (ids: string[]) => {
    setTasks(tasks.filter(t => !ids.includes(t.id)));
  };

  const handleBulkComplete = (ids: string[]) => {
    setTasks(tasks.map(t => ids.includes(t.id) ? { ...t, status: 'done' } : t));
  };

  const handleBulkPriorityChange = (ids: string[], priority: 'high' | 'medium' | 'low') => {
    setTasks(tasks.map(t => ids.includes(t.id) ? { ...t, priority } : t));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">TeamFlow</h1>
          <DarkModeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Bulk Operations</h2>
            <BulkTaskActions
              tasks={tasks}
              onBulkDelete={handleBulkDelete}
              onBulkComplete={handleBulkComplete}
              onBulkPriorityChange={handleBulkPriorityChange}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Task Summary</h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'done').length}</p>
              </div>
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.priority === 'high').length}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
