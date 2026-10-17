import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import "./styles/ui.css"
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import { Analytics } from "@vercel/analytics/react";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <CompareProvider>
        <App />
        <Analytics />
      </CompareProvider>
    </FavoritesProvider>
  </React.StrictMode>
);