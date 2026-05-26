import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

export function useTheme() {
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return { isDarkMode: darkMode }; 
}