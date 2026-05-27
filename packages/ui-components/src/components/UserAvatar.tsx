import React from 'react';
import { cn } from '../lib/utils';
import { getInitials, stringToColor } from '@task-mono/utils';

export interface UserAvatarProps {
  name:      string;
  imageUrl?: string;
  size?:     'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export function UserAvatar({ name, imageUrl, size = 'md', className }: UserAvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={cn('rounded-full object-cover ring-2 ring-white', sizeClasses[size], className)}
      />
    );
  }

  const bg       = stringToColor(name);
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white shrink-0',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: bg }}
      title={name}
    >
      {initials}
    </div>
  );
}
