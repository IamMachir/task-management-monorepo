"use client";
import React, { useState } from 'react';
import { Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
}

interface BulkTaskActionsProps {
  tasks: Task[];
  onBulkDelete: (ids: string[]) => void;
  onBulkComplete: (ids: string[]) => void;
  onBulkPriorityChange: (ids: string[], priority: 'high' | 'medium' | 'low') => void;
}

/**
 * BulkTaskActions Component
 * 
 * Allows users to select multiple tasks and perform bulk operations:
 * - Mark as complete
 * - Delete
 * - Change priority
 * 
 * Usage:
 *   <BulkTaskActions 
 *     tasks={allTasks}
 *     onBulkDelete={handleDelete}
 *     onBulkComplete={handleComplete}
 *     onBulkPriorityChange={handlePriorityChange}
 *   />
 */
export function BulkTaskActions({
  tasks,
  onBulkDelete,
  onBulkComplete,
  onBulkPriorityChange,
}: BulkTaskActionsProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const selectAll = () => {
    if (selected.size === tasks.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(tasks.map(t => t.id)));
    }
  };

  const selectedIds = Array.from(selected);
  const hasSelection = selected.size > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <input
            type="checkbox"
            checked={selected.size === tasks.length && tasks.length > 0}
            onChange={selectAll}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {selected.size > 0 ? `${selected.size} selected` : 'Select tasks'}
          </span>
        </div>

        {tasks.map((task: Task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={selected.has(task.id)}
              onChange={() => toggleSelect(task.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{task.priority} priority</p>
            </div>
          </div>
        ))}
      </div>

      {hasSelection && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex flex-wrap gap-2">
          <button
            onClick={() => {
              onBulkComplete(selectedIds);
              setSelected(new Set());
            }}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Mark Done
          </button>

          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const priority = e.target.value as 'high' | 'medium' | 'low';
              onBulkPriorityChange(selectedIds, priority);
              e.target.value = '';
            }}
            defaultValue=""
            className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition text-sm cursor-pointer border-0"
          >
            <option value="">Set Priority...</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <button
            onClick={() => {
              if (confirm(`Delete ${selectedIds.length} task(s)?`)) {
                onBulkDelete(selectedIds);
                setSelected(new Set());
              }
            }}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No tasks to select</p>
        </div>
      )}
    </div>
  );
}
