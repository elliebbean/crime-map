import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export default function useTheme() {
  const theme = useContext(ThemeContext);

  if (theme === null) {
    throw new Error("useTheme should only be used inside ThemeProvider");
  }

  return theme;
}
