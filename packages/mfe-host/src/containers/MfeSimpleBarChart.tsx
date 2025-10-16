import { mount } from "mfe-dashboard/SimpleBarChart";
import { useLayoutEffect, useRef } from "react";

const MfeSimpleBarChart = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} id="mfe-simple-bar-chart" className="size-full" />;
};

export default MfeSimpleBarChart;
