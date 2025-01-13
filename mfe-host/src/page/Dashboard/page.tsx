import { mount as mountBarChart } from "mfe-dashboard/BarChart";
import { mount as mountLineChart } from "mfe-dashboard/LineChart";
import { mount as mountServicesTable } from "mfe-dashboard/ServicesTable";
import { useLayoutEffect, useRef } from "react";
import "./style.css";

const Dashboard = () => {
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const barChartRef = useRef<HTMLDivElement | null>(null);
  const barChartRef2 = useRef<HTMLDivElement | null>(null);
  const servicesTableRef = useRef<HTMLDivElement | null>(null);
  const rendered = useRef(false);

  useLayoutEffect(() => {
    if (rendered.current) return;
    mountLineChart(lineChartRef.current);
    mountBarChart(barChartRef.current);
    mountBarChart(barChartRef2.current);
    mountServicesTable(servicesTableRef.current);
    rendered.current = true;
  }, []);

  return (
    <div>
      <div id="mfe-dashboard" className="size-full flex gap-2 p-4">
        <div
          id="mfe-line-chart"
          // className="rounded-md shadow-md size-1/2"
          ref={lineChartRef}
        />
        <div
          id="mfe-bar-chart"
          // className="rounded-md shadow-md size-1/2"
          ref={barChartRef}
        />
        <div
          id="mfe-bar-chart-2"
          // className="rounded-md shadow-md size-1/2"
          ref={barChartRef2}
        />
        <div
          id="mfe-services-table"
          // className="rounded-md shadow-md size-1/2"
          ref={servicesTableRef}
        />
      </div>
    </div>
  );
};

export default Dashboard;
