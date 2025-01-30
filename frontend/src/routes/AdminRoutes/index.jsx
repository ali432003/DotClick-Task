import React from 'react'
import { Outlet , Navigate } from 'react-router-dom';

const index = () => {
    return localStorage.getItem("admin") ? <Outlet /> : <Navigate to={"/"} />;
}

export default index