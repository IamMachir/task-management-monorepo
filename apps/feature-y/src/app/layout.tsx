import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:       'PersonalFocus — Daily Productivity Planner',
  description: 'Personal productivity dashboard built on the task-management-monorepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
