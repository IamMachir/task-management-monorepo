export const lightColors = {
  bg: '#ffffff',
  text: '#000000',
  border: '#e5e7eb',
  card: '#f9fafb',
  hover: '#f3f4f6',
};

export const darkColors = {
  bg: '#1f2937',
  text: '#f3f4f6',
  border: '#374151',
  card: '#111827',
  hover: '#1f2937',
};

export const priorities = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

export const isDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};
