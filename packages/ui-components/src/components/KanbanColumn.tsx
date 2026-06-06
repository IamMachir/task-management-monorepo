import React from 'react';
import { cn } from '../lib/utils';
import { type Task, type Status, getStatusLabel } from '@repo/utils';
import { TaskCard }  from './TaskCard';
import { EmptyState } from './EmptyState';

export interface KanbanColumnProps {
  status:     Status;
  tasks:      Task[];
  onEditTask?:   (task: Task) => void;
  onDeleteTask?: (id: string) => void;
  onAddTask?:    (status: Status) => void;
  assigneeMap?:  Record<string, string>;
  className?:    string;
  accentColor?:  string;
}

const columnColors: Record<Status, string> = {
  'todo':        'border-t-gray-400',
  'in-progress': 'border-t-blue-500',
  'done':        'border-t-emerald-500',
  'cancelled':   'border-t-red-400',
};

const columnHeaderBg: Record<Status, string> = {
  'todo':        'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-50 text-blue-700',
  'done':        'bg-emerald-50 text-emerald-700',
  'cancelled':   'bg-red-50 text-red-500',
};

export function KanbanColumn({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onAddTask,
  assigneeMap = {},
  className,
}: KanbanColumnProps) {
  return (
    <div
      className={cn(
        'flex flex-col bg-gray-50 rounded-xl border-t-4 border border-gray-200 min-w-[280px] w-72',
        columnColors[status],
        className
      )}
    >
      {/* Column header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn('px-2 py-0.5 text-xs font-semibold rounded-full', columnHeaderBg[status])}>
            {getStatusLabel(status)}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
            {tasks.length}
          </span>
        </div>
        {onAddTask && (
          <button
            onClick={() => onAddTask(status)}
            className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            title={`Add task to ${getStatusLabel(status)}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-3 pt-0 flex flex-col gap-3 min-h-[200px] max-h-[600px]">
        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks"
            description={`Add tasks to ${getStatusLabel(status)}`}
            className="py-8"
          />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              assigneeName={task.assignee ? assigneeMap[task.assignee] : undefined}
              compact
            />
          ))
        )}
      </div>
    </div>
  );
}
