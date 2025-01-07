import { mount } from "mfe-dashboard/SimpleRadarChart";
import { useLayoutEffect, useRef } from "react";

const MfeSimpleRadarChart = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} id="mfe-simple-radar-chart" className="size-full" />;
};

export default MfeSimpleRadarChart;
