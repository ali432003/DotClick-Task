import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { BASE_URL } from "../../config";
import { ToastAlert } from "../../config/toast.js";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { increment } from "../../store/slices/cartCountSlice.js";


export default function index({ name, img, price, desc, category, id }) {
  const dispatch = useDispatch()
  const uid = localStorage.getItem("uid");
  const cartData = {
    uid: uid,
    name: name,
    img: img,
    category: category,
    price: price,
  };
  const [load, setLoad] = useState(false);
  const addToCart = async () => {
    setLoad(true);
    if (!localStorage.getItem("uid")) {
      ToastAlert("Login First", "warning");
      setLoad(false);
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/addToCart`, cartData);
      if (res.data.status) {
        console.log(res.data);
        const resOfCart = await axios.get(`${BASE_URL}/getcartitem/${uid}`)
        if (resOfCart.data.status) {
          dispatch(increment(resOfCart.data.data))
        }
        ToastAlert(res.data.message, "success");
        setLoad(false);

        return;
      }
      ToastAlert("Not added", "error");
      setLoad(false);
    } catch (error) {
      ToastAlert(error.message, "error");
      setLoad(false);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }} key={id}>
      <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          lineHeight={2}
          fontWeight={800}
        >
          {price + "$"}
        </Typography>
      </CardContent>
      <CardActions>
        <button
          onClick={addToCart}
          className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {load ? <CircularProgress size={20} /> : "Order"}
          </span>
        </button>
      </CardActions>
    </Card>
  );
}
