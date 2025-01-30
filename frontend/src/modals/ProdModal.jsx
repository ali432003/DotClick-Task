import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { ToastAlert } from "../config/toast";
import axios from "axios";
import { BASE_URL } from "../config";

export default function ProdModal({ open, settings,data }) {
  const [category, setcategory] = React.useState("");
  const [imgSrc , setImageSrc] = React.useState("");

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    let file = e.target.files[0]; 

    if (!file) {
      ToastAlert("Please select a file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("productImg", file); 

    try {
      const resp = await axios.post(`${BASE_URL}/prodImgupload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.data.status) {
        const productImg = resp.data.data.url;
        setImageSrc(productImg);
        
      } else {
        ToastAlert("Error in uploading", "error");
        
      }
    } catch (error) {
      ToastAlert(error.message, "error");
      
    }
  };

  const [Data,setData]= React.useState({
    img:imgSrc,
    category:category,
    name:"",
    description:"",
    price:0
  })

  React.useEffect(() => {
    setData((prevData) => ({ ...prevData, category: category, img: imgSrc }));
  }, [category, imgSrc]);

  const handleSubmit = async()=>{
    try {
        const res = await axios.post(`${BASE_URL}/addproduct`,Data)
        if(res.data.status){
            console.log(res.data)
            ToastAlert(res.data.message,"success")
            data()
            return
        }
        ToastAlert(res.data.message,"info")
    } catch (error) {
        ToastAlert(error.message,"error")
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => settings(false)}>
        <ModalDialog>
          <DialogTitle>Add A New Product</DialogTitle>
          <DialogContent>Fill in the information of the product</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit()
            }}
          >
            <div className="grid grid-cols-2 gap-3 mb-3">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required onChange={(e)=>setData({...Data,name:e.target.value})}/>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required onChange={(e)=>setData({...Data,description:e.target.value})}/>
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input required type="number" onChange={(e)=>setData({...Data,price:parseInt(e.target.value)})}/>
              </FormControl>
              <FormControl>
                <FormLabel>Img</FormLabel>
                <input onChange={handleFileChange} required type="file" accept=".jpg .png .jpeg" />
              </FormControl>
              <Box sx={{ minWidth: 120 }}>
                <FormLabel
                  for="small"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  category
                </FormLabel>
                <select
                  onChange={handleChange}   
                  id="small"
                  class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="mobile">mobile</option>
                  <option value="laptop">laptop</option>
                  <option value="skincare">skincare</option>
                  <option value="perfume">perfume</option>
                  <option value="groceries">groceries</option>
                  <option value="mans-shirt">mans-shirt</option>
                  <option value="mans-shoes">mans-shoes</option>
                  <option value="watches">watches</option>
                  <option value="vehicles">vehicles</option>
                </select>
              </Box>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
