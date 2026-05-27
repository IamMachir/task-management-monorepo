import React from 'react';
import { cn } from '../lib/utils';
import { getPriorityColor, getPriorityLabel, type Priority } from '@task-mono/utils';

export interface PriorityBadgeProps {
  priority:  Priority;
  className?: string;
  showDot?:  boolean;
}

const dotColors: Record<Priority, string> = {
  high:   'bg-red-500',
  medium: 'bg-yellow-500',
  low:    'bg-green-500',
};

export function PriorityBadge({ priority, className, showDot = true }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getPriorityColor(priority),
        className
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[priority])} />
      )}
      {getPriorityLabel(priority)}
    </span>
  );
}
