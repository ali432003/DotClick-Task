import React, { useState, useEffect } from "react";
import Cards from "../Cards";
import { ShoppingCart } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../store/slices/productSlice";
import Pagination from "@mui/material/Pagination";

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state.product);
  const { darkmode } = useSelector((state) => state.darkMode);
  const headStyle = {
    background: "linear-gradient(90deg, #7e22ce, #ff0c3e)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10

  

  const totalPages = Math.ceil(products.data?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.data?.length);
  const realData = products.data?.slice(startIndex, endIndex);

  const handleChangePage = (event, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        background: darkmode
          ? "linear-gradient(90deg, #0f172a, #334155)"
          : "linear-gradient(90deg, #94a3b8, #f1f5f9)",
      }}
    >
      <div className="lg:w-[70rem] lg:mx-auto mx-[2rem] py-[2rem] flex flex-col min-h-screen justify-center place-items-center">
        <h1
          style={headStyle}
          className="lg:text-7xl text-5xl text-start font-bold py-[2rem]"
        >
          Products.
        </h1>

        {!loading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-[2rem] lg:gap-4 mt-[2rem]">
            {realData?.map((obj, index) => {
              return (
                <Cards
                  key={index}
                  name={obj.name}
                  category={obj.category}
                  img={obj.img}
                  price={obj.price}
                  desc={obj.description}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center place-items-center min-h-screen">
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
      <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ display: "flex", justifyContent: "center", paddingY: "2rem",color:"white" }}
          shape="rounded"
          color={darkmode?'secondary':'primary'}
        />
    </div>
  );
};

export default index;
