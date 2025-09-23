import { createContext } from "react";

const ThemeContext = createContext<["light" | "dark", (theme: "light" | "dark") => void] | null>(null);

export default ThemeContext;
