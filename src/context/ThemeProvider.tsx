import { useState } from "react";
import ThemeContext from "./ThemeContext";

const localStorageKey = "theme";
let savedTheme: string | null = null;

try {
  savedTheme = localStorage.getItem(localStorageKey);
} catch (e) {
  console.error("Error loading theme from localStorage", e);
}

let defaultTheme: "light" | "dark";

if (savedTheme == "dark") {
  defaultTheme = "dark";
} else if (savedTheme == "light") {
  defaultTheme = "light";
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  defaultTheme = "dark";
} else {
  defaultTheme = "light";
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeState, setThemeState] = useState(defaultTheme);

  const setTheme = (theme: "light" | "dark") => {
    try {
      localStorage.setItem(localStorageKey, theme);
    } catch (e) {
      console.error("Error loading theme from localStorage", e);
    }

    setThemeState(theme);
  };

  return <ThemeContext value={[themeState, setTheme]}>{children}</ThemeContext>;
}
