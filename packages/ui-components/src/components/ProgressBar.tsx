import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressBarProps {
  value:      number;   // 0–100
  max?:       number;
  label?:     string;
  showValue?: boolean;
  color?:     'indigo' | 'green' | 'red' | 'yellow' | 'blue';
  size?:      'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  indigo: 'bg-indigo-500',
  green:  'bg-emerald-500',
  red:    'bg-red-500',
  yellow: 'bg-yellow-500',
  blue:   'bg-blue-500',
};

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'indigo',
  size = 'md',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label   && <span className="text-xs text-gray-600">{label}</span>}
          {showValue && <span className="text-xs font-medium text-gray-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', colorClasses[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
