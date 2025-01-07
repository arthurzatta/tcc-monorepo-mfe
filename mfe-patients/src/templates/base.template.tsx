import { Outlet } from "react-router-dom";

const BaseTemplate = () => {
  return (
    <div className="size-full p-4">
      <Outlet />
    </div>
  );
};

export default BaseTemplate;
