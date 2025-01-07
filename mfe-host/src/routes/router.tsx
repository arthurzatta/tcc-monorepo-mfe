import { BrowserHistory, createBrowserHistory } from "history";
import React, { useLayoutEffect } from "react";
import { Router } from "react-router-dom";

type CustomRouterProps = {
  history?: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
};

export default function CustomRouter({
  history = createBrowserHistory(),
  basename = "/",
  children,
}: CustomRouterProps) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), []);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
}
