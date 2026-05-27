import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressCircleProps {
  value:       number;  // 0–100
  size?:       number;  // px
  strokeWidth?: number;
  color?:      string;
  label?:      string;
  className?:  string;
}

export function ProgressCircle({
  value,
  size = 80,
  strokeWidth = 8,
  color = '#6366f1',
  label,
  className,
}: ProgressCircleProps) {
  const radius      = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct         = Math.min(100, Math.max(0, value));
  const offset      = circumference - (pct / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-gray-800">{Math.round(pct)}%</span>
        {label && <span className="text-xs text-gray-500 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
