import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/:year/:month/:search?" element={<Dashboard />} />
        <Route path="/latest/:search?" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
