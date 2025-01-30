import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import axios from "axios";
import { BASE_URL } from "../config";
import { ToastAlert } from "../config/toast";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Close, CloseRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { increment } from "../store/slices/cartCountSlice";

export default function CartModal({ openButton, setOpenButton }) {
  const handleClose = () => {
    setOpenButton(false);
  };
  const dispatch = useDispatch()
  const [CartItem, setCartItem] = useState([]);

  const fetchData = async () => {
    const uid = localStorage.getItem("uid");
    try {
      const res = await axios.get(`${BASE_URL}/getcartitem/${uid}`);
      if (res.data.status) {
        console.log(res.data.data);
        dispatch(increment(res.data.data))
        setCartItem(res.data.data);
        return;
      }
      ToastAlert("Cart not Found", "error");
    } catch (error) {
      ToastAlert(error.message, "error");
    }
  };

  useEffect(() => {
    if (openButton) {
      fetchData();
    }
  }, [openButton]);

  const Sum = (prices) => {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }
    return sum;
  };

  const totalSum = Sum(CartItem.map((item) => item.price));
  
  const handleDelete = async (id, uid) => {
    try {
      const resOfDelete = await axios.delete(
        `${BASE_URL}/deletecartitem/${id}`,
        { data: { uid: uid } }
      );
      if (resOfDelete.data.status) {
        fetchData()
        ToastAlert(resOfDelete.data.message, "info")

      }
    } catch (error) {
      ToastAlert(error.message, "error");
    }
  };

  return (
    <Modal open={openButton} onClose={handleClose}>
      <ModalDialog>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Your Cart
          <Close onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CartItem.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CloseRounded
                        onClick={() => handleDelete(item._id, item.uid)}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.img}
                        alt={item.name}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.category}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>Total : {"$" + totalSum}</strong>
                  </TableCell>
                  <TableCell>
                    <Button size="small" color="secondary" variant="contained">
                      Proceed
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
