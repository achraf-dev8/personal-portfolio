import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lang, setLang]   = useState(() => localStorage.getItem('lang')  || 'en');

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply RTL / LTR direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', next);
    window.location.reload();
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t: translations[lang] }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
