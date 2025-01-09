import { mount } from "mfe-dashboard/BarChart";
import { useLayoutEffect, useRef } from "react";

const Dashboard = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} id="mfe-dashboard" className="size-1/2" />;
};

export default Dashboard;
