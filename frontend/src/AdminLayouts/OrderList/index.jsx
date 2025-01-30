import { useEffect } from "react";
import React from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const index = () => {
  const [Data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${BASE_URL}/getprod`);
      if (res.data.status) {
        setData(res.data.data);
        setLoad(false);
        return;
      }
      console.log(res.data.message);
    } catch (error) {
      console.log(error.message);
      setLoad(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {!load ? (
        <div className="grid grid-cols-2 gap-2 mt-[2rem]">
          <OrderTrackingCard
            img={Data[1]?.img}
            category={Data[0]?.category}
            desc={Data[0]?.description}
          />
          <OrderTrackingCard
            img={Data[4]?.img}
            category={Data[4]?.category}
            desc={Data[4]?.description}
          />
          <OrderTrackingCard
            img={Data[6]?.img}
            category={Data[6]?.category}
            desc={Data[6]?.description}
          />
          <OrderTrackingCard
            img={Data[12]?.img}
            category={Data[12]?.category}
            desc={Data[12]?.description}
          />
          <OrderTrackingCard
            img={Data[16]?.img}
            category={Data[16]?.category}
            desc={Data[16]?.description}
          />
          <OrderTrackingCard
            img={Data[19]?.img}
            category={Data[19]?.category}
            desc={Data[19]?.description}
          />
          <OrderTrackingCard
            img={Data[23]?.img}
            category={Data[23]?.category}
            desc={Data[23]?.description}
          />
          <OrderTrackingCard
            img={Data[24]?.img}
            category={Data[24]?.category}
            desc={Data[24]?.description}
          />
        </div>
      ) : (
        <div className="min-h-screen flex justify-center place-items-center">
          <CircularProgress size={80} />
        </div>
      )}
    </>
  );
};

const OrderTrackingCard = ({ img, category, desc }) => {
  return (
    <div
      className="flex flex-col p-8 bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="flex flex-col text-white font-bold justify-end w-full bg-black bg-opacity-50 p-4 rounded-lg">
        <h1 className="text-2xl">{category}</h1>
        <h3 className="text-lg">{desc}</h3>
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800">
          Track Order
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-800">
          Get Invoice
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-800">
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default index;
