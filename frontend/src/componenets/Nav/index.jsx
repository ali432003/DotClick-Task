import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CartModal from "../../modals/CartModal";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import { ChevronRight, Menu, ShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/material";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  enableDarkMode,
  enableLightMode,
} from "../../store/slices/DarkModeSlice.js";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../store/slices/productSlice.js";
import { ToastAlert } from "../../config/toast.js";

const Index = () => {
  const dispatch = useDispatch();
  const [openButton, setOpenButton] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state.product);
  const { count } = useSelector((state) => state.cartCount);

  const categories = Array.from(
    new Set(products.data?.map((obj) => obj.category))
  );

  const nav = useNavigate();



  const { darkmode } = useSelector((state) => state.darkMode);

  

  const [show, setShow] = useState(window.innerWidth > 1152 ? true : false);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth > 1152 ? true : false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [drop, setDrop] = useState(false);

  const handleSignout = () => {
    localStorage.clear();
    setOpen(false);
    nav("/login");
  };

  return (
    <div
      className={`border ${
        darkmode ? "bg-[#0b0d11]" : "bg-white"
      } shadow-md sticky top-0 z-10`}
    >
      {show ? (
        <div className="lg:w-[70rem] lg:mx-auto flex justify-evenly">
          <div className="flex py-[1rem] gap-x-[3rem] ">
            <div
              className="flex gap-x-5 cursor-pointer"
              onClick={() => nav("/")}
            >
              <img
                src={`/img/${darkmode ? "wlogo.svg" : "logo.svg"}`}
                width={50}
                alt=""
              />
              {darkmode ? (
                <img
                  src="/img/logotxt.svg"
                  width={100}
                  className="filter invert brightness-0"
                  alt=""
                />
              ) : (
                <img src="/img/wlogotxt.svg" width={100} alt="" />
              )}
            </div>
            <ul className="flex text-xl gap-x-[2rem] justify-center place-items-center">
              <li
                className={`${
                  darkmode ? "hover:bg-slate-500" : "hover:bg-slate-200"
                } p-2 rounded-lg cursor-pointer ${
                  darkmode ? "text-slate-50" : "text-slate-700"
                }`}
                onClick={() => nav("/product")}
              >
                Products
              </li>
              {localStorage.getItem("uid") && (
                <li
                  className={`${
                    darkmode ? "hover:bg-slate-500" : "hover:bg-slate-200"
                  } p-2 rounded-lg cursor-pointer ${
                    darkmode ? "text-slate-50" : "text-slate-700"
                  }`}
                  onClick={() => nav("/profile")}
                >
                  Profile
                </li>
              )}
              {!localStorage.getItem("uid") ? (
                <li
                  className={`${
                    darkmode ? "hover:bg-slate-500" : "hover:bg-slate-200"
                  } p-2 rounded-lg cursor-pointer ${
                    darkmode ? "text-slate-50" : "text-slate-700"
                  }`}
                  onClick={() => nav("/signup")}
                >
                  Signup
                </li>
              ) : (
                <li
                  className={`${
                    darkmode ? "hover:bg-slate-500" : "hover:bg-slate-200"
                  } p-2 rounded-lg cursor-pointer ${
                    darkmode ? "text-slate-50" : "text-slate-700"
                  }`}
                  onClick={handleSignout}
                >
                  Signout
                </li>
              )}
            </ul>
          </div>
          <div className="relative text-gray-700 flex justify-center place-items-center">
            <SearchIcon
              fontSize="large"
              className="absolute inset-y-9 left-0 flex items-center p-2"
            />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 p-3 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 focus:outline-none focus:ring focus:ring-slate-300"
            />
          </div>
          <div className="flex justify-center place-items-center bg-slate-200 p-2 my-[2rem] rounded-lg cursor-pointer">
            {darkmode ? (
              <div onClick={() => dispatch(enableLightMode())}>
                <LightModeIcon />
              </div>
            ) : (
              <div onClick={() => dispatch(enableDarkMode())}>
                <DarkModeIcon />
              </div>
            )}
          </div>
          {localStorage.getItem("uid") && (
            <div className="relative">
              <div
                className={`flex justify-center place-items-center ${
                  darkmode ? "bg-slate-900" : "bg-purple-700"
                } p-2 my-[2rem] rounded-lg cursor-pointer `}
                onClick={() =>
                  !localStorage.getItem("uid")
                    ? ToastAlert("Login first", "info")
                    : setOpenButton(true)
                }
              >
                <ShoppingCart sx={{ color: "wheat" }} />
              </div>
              <CartModal
                openButton={openButton}
                setOpenButton={setOpenButton}
              />
              <input
                value={count}
                disabled
                className="text-white bg-cyan-700 absolute w-6 text-center top-4 -right-2 rounded-full px-1"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border ${
            darkmode ? "bg-[#0b0d11]" : "bg-white"
          } shadow-md`}
        >
          <div className="mx-[2rem] flex justify-between">
            <div className="flex gap-x-2">
              <img
                src={`/img/${darkmode ? "wlogo.svg" : "logo.svg"}`}
                width={50}
                alt=""
              />
              {darkmode ? (
                <img
                  src="/img/logotxt.svg"
                  width={100}
                  className="filter invert brightness-0"
                  alt=""
                />
              ) : (
                <img src="/img/wlogotxt.svg" width={100} alt="" />
              )}
            </div>
            <div className="flex pt-3 gap-2">
              <div className="flex justify-center place-items-center bg-slate-200 p-2 my-[2rem] rounded-lg cursor-pointer">
                {darkmode ? (
                  <div onClick={() => dispatch(enableLightMode())}>
                    <LightModeIcon />
                  </div>
                ) : (
                  <div onClick={() => dispatch(enableDarkMode())}>
                    <DarkModeIcon />
                  </div>
                )}
              </div>

              <div
                className="flex justify-center place-items-center bg-slate-200 p-2 my-[2rem] rounded-lg cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Menu />
              </div>
              <Drawer
                anchor="right"
                size="lg"
                color={darkmode ? "neutral" : "primary"}
                variant="solid"
                open={open}
                onClose={() => setOpen(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    marginX: 2,
                    marginY: 2,
                  }}
                >
                  <div
                    onClick={() => {
                      nav("/");
                      setOpen(false);
                    }}
                  >
                    <img
                      src={`/img/${darkmode ? "wlogo.svg" : "logo.svg"}`}
                      width={50}
                      alt=""
                    />
                  </div>
                  <Typography
                    component="label"
                    color={`${darkmode ? "#fff" : "#0b0d11"}`}
                    htmlFor="close-icon"
                    fontSize={15}
                    sx={{ cursor: "pointer", display: "flex" }}
                  >
                    <p className="pt-2 font-bold">Close</p>
                    <ModalClose id="close-icon" sx={{ position: "inherit" }} />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    mx: 4,
                  }}
                >
                  <div className="flex justify-between w-full my-4">
                    <div
                      className="flex gap-2 pt-2 text-3xl font-bold"
                      onClick={() => {
                        nav("/product");
                        setOpen(false);
                      }}
                    >
                      <p>Products</p>
                    </div>
                    <div onClick={() => setDrop(!drop)}>
                      {drop ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <ChevronRight fontSize="small" />
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-full shadow-inner ${drop ? "" : "hidden"}`}
                  >
                    <Divider />
                    <ul
                      className={`p-3 gap-y-3 flex flex-col text-slate-300 font-extrabold text-2xl`}
                    >
                      {categories.map((cat, index) => {
                        return (
                          <li key={index} className="hover:underline">
                            {cat}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="h-[0.2px] bg-slate-400 w-full"></div>

                  <div className="h-[0.2px] bg-slate-400 w-full"></div>
                  {localStorage.getItem("uid") && (
                    <div className="flex justify-between w-full my-4">
                      <div
                        className="flex gap-2 pt-2 text-3xl font-bold"
                        onClick={() => {
                          nav("/profile");
                          setOpen(false);
                        }}
                      >
                        <p>Profile</p>
                      </div>
                    </div>
                  )}

                  <div className="h-[0.2px] bg-slate-400 w-full"></div>
                  {!localStorage.getItem("uid") ? (
                    <div className="flex justify-between w-full my-4">
                      <div
                        className="flex gap-2 pt-2 text-3xl font-bold"
                        onClick={() => {
                          nav("/signup");
                          setOpen(false);
                        }}
                      >
                        <p>Signup</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full my-4">
                      <div
                        className="flex gap-2 pt-2 text-3xl font-bold"
                        onClick={handleSignout}
                      >
                        <p>Signout</p>
                      </div>
                    </div>
                  )}
                  <div className="h-[0.2px] bg-slate-400 w-full"></div>
                  {localStorage.getItem("uid") && (
                    <div
                      className="flex justify-between w-full my-4 relative"
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={`flex justify-center place-items-center ${
                          darkmode ? "bg-slate-700" : "bg-purple-700"
                        } p-2 my-[2rem] rounded-lg cursor-pointer `}
                        onClick={() =>
                          !localStorage.getItem("uid")
                            ? ToastAlert("Login first", "warning")
                            : setOpenButton(true)
                        }
                      >
                        <ShoppingCart sx={{ color: "wheat" }} />
                      </div>

                      <CartModal
                        openButton={openButton}
                        setOpenButton={setOpenButton}
                      />
                      <input
                        value={count}
                        disabled
                        className="text-black bg-white absolute w-5 top-4 left-7 rounded-full px-1"
                      />
                    </div>
                  )}
                </Box>
              </Drawer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
