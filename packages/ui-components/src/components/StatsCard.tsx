import React from 'react';
import { cn } from '../lib/utils';

export interface StatsCardProps {
  title:       string;
  value:       string | number;
  trend?:      string;
  trendUp?:    boolean;
  icon?:       React.ReactNode;
  color?:      'indigo' | 'green' | 'red' | 'yellow' | 'blue' | 'purple';
  className?:  string;
}

const colorClasses = {
  indigo: 'bg-indigo-50  text-indigo-600',
  green:  'bg-emerald-50 text-emerald-600',
  red:    'bg-red-50     text-red-600',
  yellow: 'bg-yellow-50  text-yellow-600',
  blue:   'bg-blue-50    text-blue-600',
  purple: 'bg-purple-50  text-purple-600',
};

export function StatsCard({ title, value, trend, trendUp, icon, color = 'indigo', className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4',
        'hover:shadow-md transition-shadow',
        className
      )}
    >
      {icon && (
        <div className={cn('p-2.5 rounded-lg shrink-0', colorClasses[color])}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {trend && (
          <p className={cn('text-xs mt-1', trendUp ? 'text-emerald-600' : 'text-gray-400')}>
            {trendUp ? '↑' : '→'} {trend}
          </p>
        )}
      </div>
    </div>
  );
}
