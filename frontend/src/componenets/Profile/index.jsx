import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";
import { ToastAlert } from "../../config/toast";
import { fetchUser } from "../../store/slices/userSlice";
import { Edit } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const Index = () => {
  const { darkmode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const { CurrUser, loading } = useSelector((state) => state.user);
  const [isDis, setIsDis] = useState(true);
  const [load, setLoad] = useState(false);
  const [imgload, setImgLoad] = useState(false);
  const [updValue, setUpdValue] = useState({ name: "", age: 0, img: "" });
  const [imageSrc, setImageSrc] = useState(""); // State variable for image source

  useEffect(() => {
    setUpdValue({
      name: CurrUser.data?.name,
      age: CurrUser.data?.age,
    });
  }, [CurrUser]);

  const editStart = () => {
    setIsDis(!isDis);
  };

  const handleChange = (key, value) => {
    setUpdValue((prev) => ({ ...prev, [key]: value }));
  };

  const saveHandler = async () => {
    setLoad(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/updateuser/${CurrUser.data._id}`,
        updValue
      );
      if (res.data.status) {
        setUpdValue(res.data.data);
        setImageSrc(res.data.data.img); // Update image source with new URL
        ToastAlert(res.data.message, "default");
        setIsDis(true);
      } else {
        ToastAlert(res.data.message, "error");
        setIsDis(true);
      }
    } catch (error) {
      ToastAlert(error.message || error.code, "error");
    }
    setLoad(false);
  };

  const handleFileChange = async (e) => {
    setImgLoad(true);
    e.preventDefault();
    let file = e.target.files[0]; // Corrected from e.target.file[0] to e.target.files[0]

    if (!file) {
      ToastAlert("Please select a file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("userImg", file); // 'userImg' should match the field name in your multer setup

    try {
      const resp = await axios.post(`${BASE_URL}/imageupload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.data.status) {
        const userImg = resp.data.data.url;
        const imgRes = await axios.put(
          `${BASE_URL}/updateuser/${CurrUser.data._id}`,
          { img: userImg }
        );
        ToastAlert("Image uploaded successfully", "info");
        setImageSrc(imgRes.data.data.img);
        setImgLoad(false);
      } else {
        ToastAlert("Error in uploading", "error");
        setImgLoad(false);
      }
    } catch (error) {
      ToastAlert(error.message, "error");
      setImgLoad(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div
      style={{
        background: darkmode
          ? "linear-gradient(90deg, #0f172a, #334155)"
          : "linear-gradient(90deg, #94a3b8, #f1f5f9)",
        color: darkmode ? "white" : "",
      }}
    >
      <div className="lg:w-[70rem] lg:mx-auto py-[2rem] flex flex-col min-h-screen justify-center">
        <h1
          className="lg:text-7xl text-5xl font-bold ms-[3rem] lg:ms-0"
          style={{
            background: `linear-gradient(90deg, #7e22ce, #ff0c3e)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Profile.
        </h1>
        <div className="border mx-[1rem] relative lg:mx-0 border-slate-700 flex lg:flex-row md:flex-row flex-col  p-[2rem] mt-[2rem] rounded-xl md:gap-x-[1rem] lg:gap-x-[2rem]">
          <div className="relative">
            {!imgload ? (
              <img
                src={imageSrc ? imageSrc : CurrUser.data?.img}
                className={`rounded-full border mb-5 lg:mb-0 ${
                  darkmode ? "border-purple-800" : "border-slate-800"
                } border-[0.4rem]`}
                height={250}
                width={250}
                alt="Profile"
              />
            ) : (
              <div
                className={`rounded-full border mb-5 lg:mb-0 border-slate-800 border-[0.4rem] h-[250px] w-[250px] place-items-center flex justify-center`}
              >
                <CircularProgress />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                disabled={isDis}
                type="file"
                id="fileInput"
                accept=".jpg .png .jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 mb-[5rem] mr-[2.9rem] lg:mr-[0rem]"
              >
                <Edit
                  className={`${
                    darkmode ? "bg-purple-800" : "bg-slate-800"
                  } rounded-full cursor-pointer`}
                  onClick={() =>
                    !isDis
                      ? ""
                      : ToastAlert(
                          "Click Edit to unlock This button",
                          "info"
                        )
                  }
                  sx={{ color: "wheat", padding: "0.3rem" }}
                />
              </label>
            </div>
          </div>
          {!loading ? (
            <div
              className={`lg:grid lg:grid-cols-3 flex flex-col md:flex-row flex-wrap overflow-hidden gap-4 lg:ms-5`}
            >
              <h1 className="col-span-3 flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 justify-between">
                ID : {CurrUser.data?._id}{" "}
                <div>
                  {" "}
                  <div className="flex">
                    <h1>createAt : {CurrUser.data?.createAt.slice(0, 10)}</h1>
                  </div>
                </div>
              </h1>
              <h1 className="lg:flex lg:flex-col">
                <label className="flex gap-x-1">
                  Name{" "}
                  {
                    <span
                      className={
                        darkmode ? `text-slate-300` : `text-purple-800`
                      }
                    >
                      (editable){" "}
                    </span>
                  }
                  :
                </label>
                <input
                  className="bg-slate-200 p-1 border border-slate-400 rounded-lg focus:outline-none focus:ring focus:ring-slate-300 text-black"
                  type="text"
                  defaultValue={CurrUser.data?.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isDis}
                />
              </h1>
              <h1 className="lg:flex lg:flex-col">
                Email :{" "}
                <input
                  className="bg-slate-200 p-1 border border-slate-400 rounded-lg focus:outline-none focus:ring focus:ring-slate-300 text-black"
                  type="text"
                  disabled
                  defaultValue={CurrUser.data?.email}
                />
              </h1>
              <h1 className="lg:flex lg:flex-col">
                <label className="flex gap-x-1">
                  Age{" "}
                  {
                    <span
                      className={
                        darkmode ? `text-slate-300` : `text-purple-800`
                      }
                    >
                      (editable){" "}
                    </span>
                  }
                  :
                </label>
                <input
                  className="bg-slate-200 p-1 border border-slate-400 rounded-lg focus:outline-none focus:ring focus:ring-slate-300 text-black"
                  type="number"
                  defaultValue={CurrUser.data?.age}
                  onChange={(e) =>
                    handleChange("age", parseInt(e.target.value))
                  }
                  disabled={isDis}
                />
              </h1>
              <div>
                <div className="flex gap-4">
                  <button
                    disabled={isDis}
                    onClick={saveHandler}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      {load ? (
                        <CircularProgress size={20} sx={{ color: "#000" }} />
                      ) : (
                        "Save"
                      )}
                    </span>
                  </button>
                  <button
                    onClick={editStart}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <Edit />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center place-items-center w-full">
              <CircularProgress sx={{ color: "purple" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
