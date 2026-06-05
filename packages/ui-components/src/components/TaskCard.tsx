import React from 'react';
import { cn } from '../lib/utils';
import { type Task, formatDate, isOverdue, daysUntilDue } from '@repo/utils';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge }   from './StatusBadge';
import { UserAvatar }    from './UserAvatar';

export interface TaskCardProps {
  task:      Task;
  onEdit?:   (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
  assigneeName?: string;
  className?:    string;
  compact?:      boolean;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  assigneeName,
  className,
  compact = false,
}: TaskCardProps) {
  const overdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'done';
  const days    = task.dueDate ? daysUntilDue(task.dueDate) : null;

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-4 group',
        'hover:shadow-md hover:border-indigo-200 transition-all duration-150 cursor-pointer',
        task.status === 'done'  && 'opacity-60',
        overdue                 && 'border-l-4 border-l-red-400',
        className
      )}
      onClick={() => onEdit?.(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={cn(
            'text-sm font-semibold text-gray-900 leading-snug flex-1',
            task.status === 'done' && 'line-through text-gray-400'
          )}
        >
          {task.title}
        </h3>

        {/* Actions */}
        {(onEdit || onDelete) && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="p-1 text-gray-400 hover:text-indigo-600 rounded"
                title="Edit task"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                title="Delete task"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {!compact && task.description && (
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        <PriorityBadge priority={task.priority} />
        <StatusBadge   status={task.status} />
        {task.tags?.map((tag) => (
          <span key={tag}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        {task.dueDate ? (
          <span className={cn('text-xs flex items-center gap-1', overdue ? 'text-red-500 font-medium' : 'text-gray-400')}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {overdue && days !== null
              ? `${Math.abs(days)}d overdue`
              : formatDate(task.dueDate)}
          </span>
        ) : (
          <span />
        )}

        {assigneeName && (
          <UserAvatar name={assigneeName} size="sm" />
        )}
      </div>
    </div>
  );
}
