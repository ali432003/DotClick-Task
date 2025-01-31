import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const index = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to={"/login"} />
};

export default index;