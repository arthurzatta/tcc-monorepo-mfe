import { BrowserHistory, Update } from "history";
import { mount } from "mfe-auth/Auth";
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Auth = ({
  history,
  basename,
}: {
  history: BrowserHistory;
  basename: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ location: { pathname: nextPathname } }: Update) => {
        const { pathname } = location;
        if (nextPathname && pathname !== nextPathname)
          history.push(nextPathname);
      },
      initialPath: location.pathname,
      basename,
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} id="mfe-auth" className="size-full" />;
};

export default Auth;
