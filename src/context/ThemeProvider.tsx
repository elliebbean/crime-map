import { useState } from "react";
import ThemeContext from "./ThemeContext";

const localStorageKey = "theme";
const savedTheme = localStorage.getItem(localStorageKey);

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
    localStorage.setItem(localStorageKey, theme);
    setThemeState(theme);
  };
  return <ThemeContext value={[themeState, setTheme]}>{children}</ThemeContext>;
}
