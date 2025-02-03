import { mount } from "mfe-patients/Patients";
import { useEffect, useRef } from "react";

const Patients = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} id="mfe-patients" className="size-full" />;
};

export default Patients;
