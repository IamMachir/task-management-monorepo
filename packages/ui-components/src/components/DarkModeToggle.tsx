import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * DarkModeToggle Component
 * 
 * A reusable button that toggles dark mode on/off.
 * Persists user preference to localStorage.
 * 
 * Usage:
 *   <DarkModeToggle />
 * 
 * The component:
 * - Shows a moon icon in light mode
 * - Shows a sun icon in dark mode
 * - Adds 'dark' class to the <html> element when active
 * - Saves preference so it remembers on page reload
 */
export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage on component mount (client-side only)
    const saved = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved || prefersDark;
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    localStorage.setItem('darkMode', String(newState));
    
    if (newState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
