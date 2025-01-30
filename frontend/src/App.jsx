import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Nav from "./componenets/Nav";
import Footer from "./componenets/Footer";
import Main from "./componenets/Main";
import Product from "./componenets/Products";
import Profile from "./componenets/Profile";
import Login from "./componenets/Login";
import Signup from "./componenets/Signup";
import AuthRoute from "./routes/AuthRoute";
import PrivRoute from "./routes/PrivRoute";
import Notfound from "./componenets/Notfound";
import Dashboard from "./AdminLayouts/Dashboard";
import AdminRoutes from "./routes/AdminRoutes";
import { useSelector } from "react-redux";
import { fetchData } from "./store/slices/productSlice";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const isSignupOrLogin = () => {
    return location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/dashboard";
  };

  return (
    <>
      {!isSignupOrLogin() && <Nav />}
      <Routes>
        <Route index element={<Main />} />
        <Route path="/product" element={<Product />} />
        <Route element={<PrivRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
      {!isSignupOrLogin() && <Footer />}

      <ToastContainer
        position="bottom-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
