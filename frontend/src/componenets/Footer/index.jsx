import React from "react";
import "./styles.css";
import { Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";

const index = () => {
  const { darkmode } = useSelector((state) => state.darkMode);
  return (
    <footer className={`site-footer border-top ${darkmode?'bg-[#0b0d11] text-white':'bg-slate-200'} lg:px-0 px-2`}>
      <div>
        <div className="flex justify-center text-center">
          <div className="col-md-12">
            <p>
              Copyright &copy; All rights reserved | This website is made with{" "}
              <Favorite />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default index;
