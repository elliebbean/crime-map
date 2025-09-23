import { BrowserRouter, Route, Routes } from "react-router";
import useTheme from "./context/useTheme";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [theme] = useTheme();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/:year/:month/:search?" element={<Dashboard />} />
          <Route path="/latest/:search?" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
