import {
  createBrowserHistory,
  createMemoryHistory,
  History,
  InitialEntry,
  Listener,
} from "history";
import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

type MountOptions = Partial<{
  initialPath: InitialEntry;
  basename: string;
  onNavigate: Listener;
  defaultHistory: History;
}>;

const mount = (el: Container, options: MountOptions) => {
  const { defaultHistory, onNavigate, initialPath, basename } = options;
  const history =
    defaultHistory ??
    createMemoryHistory({ initialEntries: [initialPath ?? {}] });
  if (onNavigate) history.listen(onNavigate);
  createRoot(el!).render(<App history={history} basename={basename ?? "/"} />);
  return {
    onParentNavigate({ pathname: nextPathname }: { pathname: string }) {
      const { pathname } = history.location;
      console.log("onParentNavigate", { pathname, nextPathname });
      if (nextPathname && pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("root");
  if (el) mount(el, { defaultHistory: createBrowserHistory() });
}

export { mount };
