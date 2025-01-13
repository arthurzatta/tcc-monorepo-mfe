import { BrowserHistory, Update } from "history";
import { mount } from "mfe-patients/Patients";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Patients = ({
  history,
  basename,
}: {
  history: BrowserHistory;
  basename: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ location: { pathname: nextPathname } }: Update) => {
        const { pathname } = location;
        if (nextPathname && pathname !== nextPathname)
          history.push(nextPathname);
      },
      initialPath: location,
      basename,
    });

    history.listen(onParentNavigate);
  }, [location]);

  return <div ref={ref} id="mfe-patients" className="size-full" />;
};

export default Patients;
