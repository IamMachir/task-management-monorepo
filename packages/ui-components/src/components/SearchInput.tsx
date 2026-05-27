import React from 'react';
import { cn } from '../lib/utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?:  () => void;
  className?: string;
}

export function SearchInput({ onClear, className, value, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      {/* Search icon */}
      <svg
        className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input
        type="search"
        value={value}
        className={cn(
          'w-full pl-9 pr-9 py-2 text-sm bg-white border border-gray-300 rounded-lg',
          'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          'hover:border-gray-400 transition-colors'
        )}
        {...props}
      />

      {/* Clear button */}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
