import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:       'TeamFlow — Task Management Dashboard',
  description: 'Kanban-style team task management built on the task-management-monorepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
