import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="sticky top-0 bg-background-800 text-text-100 flex justify-between px-2 py-2 border-b border-border"
      id="navbar"
      ref={ref}
    >
      <div className="flex gap-4">
        <Link to="/">Logo</Link>
        <Link to="patients/list">Patients List</Link>
      </div>
      <div className="flex gap-4">
        <Link to="doc">Documentation</Link>
        <Link to="login">Login</Link>
      </div>
    </div>
  );
});

const Template = () => {
  return (
    <>
      <Navbar />
      <div className="size-full bg-background">
        <Outlet />
      </div>
    </>
  );
};

export default Template;
