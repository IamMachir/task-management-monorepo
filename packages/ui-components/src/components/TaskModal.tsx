import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import {
  type Task, type Priority, type Status,
  ALL_PRIORITIES, ALL_STATUSES,
  getStatusLabel, getPriorityLabel,
  generateId, todayIso,
} from '@task-mono/utils';
import { Button }   from './Button';
import { Input }    from './Input';
import { Textarea } from './Textarea';
import { Select }   from './Select';

export interface TaskModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  onSave:    (task: Task) => void;
  task?:     Task | null;
  projectId?: string;
}

const PRIORITY_OPTIONS = ALL_PRIORITIES.map((p) => ({ value: p, label: getPriorityLabel(p) }));
const STATUS_OPTIONS   = ALL_STATUSES.map((s)   => ({ value: s, label: getStatusLabel(s)  }));

const EMPTY: Partial<Task> = { title: '', description: '', priority: 'medium', status: 'todo', dueDate: '', tags: [] };

export function TaskModal({ isOpen, onClose, onSave, task, projectId }: TaskModalProps) {
  const [form, setForm] = useState<Partial<Task>>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task)  setForm(task);
    else       setForm({ ...EMPTY, projectId });
    setErrors({});
  }, [task, isOpen, projectId]);

  if (!isOpen) return null;

  const set = (field: keyof Task, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title?.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    const saved: Task = {
      id:          task?.id ?? generateId(),
      title:       form.title!.trim(),
      description: form.description ?? '',
      priority:    (form.priority as Priority) ?? 'medium',
      status:      (form.status   as Status)   ?? 'todo',
      dueDate:     form.dueDate ?? '',
      projectId:   form.projectId ?? projectId,
      assignee:    form.assignee ?? '',
      tags:        form.tags ?? [],
      createdAt:   task?.createdAt ?? now,
      updatedAt:   now,
    };
    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <Input
            label="Title *"
            placeholder="What needs to be done?"
            value={form.title ?? ''}
            onChange={(e) => set('title', e.target.value)}
            error={errors.title}
          />
          <Textarea
            label="Description"
            placeholder="Add more details..."
            value={form.description ?? ''}
            onChange={(e) => set('description', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={PRIORITY_OPTIONS}
              value={form.priority ?? 'medium'}
              onChange={(e) => set('priority', e.target.value)}
            />
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={form.status ?? 'todo'}
              onChange={(e) => set('status', e.target.value)}
            />
          </div>
          <Input
            label="Due Date"
            type="date"
            min={todayIso()}
            value={form.dueDate ?? ''}
            onChange={(e) => set('dueDate', e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{task ? 'Save Changes' : 'Create Task'}</Button>
        </div>
      </div>
    </div>
  );
}
