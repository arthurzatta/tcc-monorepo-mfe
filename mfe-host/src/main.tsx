import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("mfe-host")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
