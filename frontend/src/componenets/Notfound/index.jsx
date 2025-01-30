import React from "react";
import { useSelector } from "react-redux";
const index = () => {
  const { darkmode } = useSelector((state) => state.darkMode);
  return (
    <div
      className={`flex justify-center place-items-center min-h-screen text-4xl tracking-wider ${
        darkmode ? "bg-slate-900 text-white" : ""
      }`}
    >
      404 | Not Found
    </div>
  );
};

export default index;
