import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";

const getSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const readStoredTheme = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (error) {
    void error;
    return null;
  }
};

const writeStoredTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    void error;
  }
};

export function useTheme() {
  const initialTheme = useMemo(() => readStoredTheme() || getSystemTheme(), []);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme };
}

