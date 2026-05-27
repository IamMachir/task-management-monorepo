import React from 'react';
import { cn } from '../lib/utils';
import { type Project } from '@task-mono/utils';
import { UserAvatar }  from './UserAvatar';

export interface SidebarProps {
  projects:       Project[];
  activeProjectId?: string;
  onProjectSelect?: (id: string) => void;
  activeNav?:     string;
  onNavChange?:   (nav: string) => void;
  userName?:      string;
  className?:     string;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'tasks',     label: 'All Tasks',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'team',      label: 'Team',       icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
];

export function Sidebar({ projects, activeProjectId, onProjectSelect, activeNav = 'dashboard', onNavChange, userName = 'Machir Tadesse', className }: SidebarProps) {
  return (
    <aside className={cn('w-60 bg-gray-900 text-white flex flex-col h-full', className)}>

      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-bold">T</span>
          TeamFlow
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavChange?.(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                activeNav === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </div>

        {/* Projects section */}
        {projects.length > 0 && (
          <div className="mt-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</p>
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onProjectSelect?.(project.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    activeProjectId === project.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="px-4 py-3 border-t border-gray-700 flex items-center gap-3">
        <UserAvatar name={userName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-gray-400">Member</p>
        </div>
      </div>
    </aside>
  );
}
