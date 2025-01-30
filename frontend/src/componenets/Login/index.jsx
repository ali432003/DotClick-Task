import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { ToastAlert } from "../../config/toast";
import { Button, CircularProgress } from "@mui/material";
import AdminModal from "../../modals/AdminModal";

const index = () => {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await axios.post(`${BASE_URL}/login`, FormData);
      const data = res.data;
      if (data.status) {
        const uid = data.data._id;
        localStorage.setItem("uid", uid);
        setFormData({ name: "", password: "" });
        setLoad(false);
        ToastAlert(data.message, "success");
        nav("/");
        return;
      }
      ToastAlert(data.message, "error");
      setLoad(false);
      nav("/login");
    } catch (error) {
      setLoad(false);
      ToastAlert(error.message, "error");
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-end p-[1rem] ">
          <button
            className="bg-blue-400 text-white p-1 rounded-lg"
            onClick={() => {
              setOpen(true);
            }}
          >
            Admin
          </button>
          <AdminModal open={open} settings={setOpen} />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 mt-5">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="/img/logo.svg" alt="logo" />D E N
            O
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-xl">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...FormData, email: e.target.value })
                    }
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...FormData, password: e.target.value })
                    }
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {load ? (
                    <CircularProgress size={20} sx={{ color: "wheat" }} />
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont't have an account?{" "}
                  <a
                    onClick={() => nav("/signup")}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Signup here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
