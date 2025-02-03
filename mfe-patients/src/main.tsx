import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const mount = (el: Container) => {
  createRoot(el!).render(<App />);
};

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("root");
  if (el) mount(el);
}

export { mount };
