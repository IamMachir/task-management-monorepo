import React from 'react';
import { cn } from '../lib/utils';
import { getStatusColor, getStatusLabel, type Status } from '@task-mono/utils';

export interface StatusBadgeProps {
  status:    Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusColor(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
