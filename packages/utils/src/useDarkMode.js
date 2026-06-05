import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem('darkMode') === 'true';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = saved || prefersDark;
        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        }
        setMounted(true);
    }, []);
    const toggleDark = () => {
        const newState = !isDark;
        setIsDark(newState);
        localStorage.setItem('darkMode', String(newState));
        if (newState) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    };
    return [isDark, toggleDark];
};
