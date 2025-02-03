import React, { Suspense } from "react";
// import Dashboard from "./page/Dashboard/page";

const Patients = React.lazy(() =>
  import("./page/Patients/page").catch(() => ({
    default: () => <div>Failed to load patients</div>,
  }))
);

function App() {
  return (
    <div className="flex flex-col gap-2 size-full border-2 border-red-500 p-4 text-sm">
      <nav className="flex items-center justify-center border border-red-500 py-1">
        <div>Barra de navegação</div>
      </nav>
      <Suspense fallback="Loading Auth...">
        <Patients />
      </Suspense>
    </div>
  );
}

export default App;
