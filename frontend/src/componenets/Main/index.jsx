import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const { darkmode } = useSelector((state) => state.darkMode);
  return (
    <>
      <div className="relative w-full lg:h-[80vh] h-[40rem]">
        <img
          src="/img/main.gif"
          alt="E-commerce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center ${
              darkmode
                ? "bg-slate-900 text-slate-200"
                : "bg-slate-200 text-slate-700"
            }  lg:p-[4rem] p-[2rem] rounded-lg shadow-custom-inner border mx-3`} // Tailwind classes for styling
          >
            <p className="lg:text-5xl text-3xl mb-2">
              Your Ultimate E-commerce Solution
            </p>
            <p className="lg:text-2xl text-xl">
              Take your e-commerce buisness to{" "}
              <span className="font-bold text-blue-500">Next Level</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={` py-[5rem] ${
          darkmode
            ? "bg-slate-900 text-slate-200"
            : "bg-slate-100 text-slate-700"
        } `}
      >
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-y-0 gap-y-[2rem] lg:gap-x-[2rem] lg:w-[70rem] lg:mx-auto mx-[2rem]">
          <div className="lg:col-span-3 border border-slate-300 p-[2rem]">
            <p
              className={`border p-1 w-[3.5rem] rounded font-bold ${
                darkmode
                  ? "text-green-400 border-green-400"
                  : "text-purple-400 border-purple-400"
              } mb-3`}
            >
              About
            </p>

            <p className="lg:text-4xl text-xl font-bold lg:leading-10 mt-[2rem]">
              Discover the future of online shopping with DENO, your premier
              destination for all things retail.{" "}
              <span className="text-slate-400">
                Engineered to provide a seamless shopping experience, DENO
                leverages cutting-edge technology and user-friendly design to
                bring you a vast selection of products at unbeatable prices.
                With intuitive search tools, secure payment solutions, and an
                easy-to-navigate interface, DENO makes shopping effortless and
                enjoyable.
              </span>
              
            </p>
          </div>
          <div className="grid gap-y-4">
            <div className={`border border-slate-300 p-[2rem]`}>
              <p
                className={`border p-1 w-[4.7rem] rounded font-bold ${
                  darkmode
                    ? "text-green-400 border-green-400"
                    : "text-purple-400 border-purple-400"
                } mb-3`}
              >
                Products
              </p>
              <p className="flex flex-col">
                <span>100k+</span>Elegant Products
              </p>
            </div>
            <div className={`border border-slate-300 p-[2rem]`}>
              <p
                className={`border p-1 w-[3.8rem] rounded font-bold ${
                  darkmode
                    ? "text-green-400 border-green-400"
                    : "text-purple-400 border-purple-400"
                } mb-3`}
              >
                Orders
              </p>
              <p className="flex flex-col">
                <span>90k+</span>Completed Orders
              </p>
            </div>
            <div className={`border border-slate-300 p-[2rem]`}>
              <p
                className={`border p-1 w-[6rem] rounded font-bold ${
                  darkmode
                    ? "text-green-400 border-green-400"
                    : "text-purple-400 border-purple-400"
                } mb-3`}
              >
                Community
              </p>
              <p className="flex flex-col">
                <span>2M+</span> Active Users
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
