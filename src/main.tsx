import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ThemeProvider from "./context/ThemeProvider";

import "leaflet/dist/leaflet.css";
// @ts-expect-error - Typescript cannot find the styles export, but it works correctly - it's just a CSS file
import "react-leaflet-markercluster/styles";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // All the data we're fetching should never change, so safe to cache it forever
      staleTime: Infinity,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
