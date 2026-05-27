import React from 'react';
import { cn } from '../lib/utils';
import { ALL_STATUSES, ALL_PRIORITIES, type Status, type Priority, getStatusLabel, getPriorityLabel } from '@task-mono/utils';

export interface FilterState {
  status:   Status | 'all';
  priority: Priority | 'all';
}

export interface FilterBarProps {
  filters:   FilterState;
  onChange:  (filters: FilterState) => void;
  className?: string;
}

export function FilterBar({ filters, onChange, className }: FilterBarProps) {
  const setStatus   = (v: string) => onChange({ ...filters, status:   v as Status | 'all' });
  const setPriority = (v: string) => onChange({ ...filters, priority: v as Priority | 'all' });

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>

      {/* Status filter */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 font-medium">Status:</span>
        <div className="flex gap-1">
          {(['all', ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                'px-2.5 py-1 text-xs rounded-full border transition-colors',
                filters.status === s
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              )}
            >
              {s === 'all' ? 'All' : getStatusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Priority filter */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 font-medium">Priority:</span>
        <div className="flex gap-1">
          {(['all', ...ALL_PRIORITIES] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={cn(
                'px-2.5 py-1 text-xs rounded-full border transition-colors',
                filters.priority === p
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              )}
            >
              {p === 'all' ? 'All' : getPriorityLabel(p)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
