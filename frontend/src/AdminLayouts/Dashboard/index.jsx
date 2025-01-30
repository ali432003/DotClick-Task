import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import { BarChart } from "@mui/x-charts/BarChart";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LineChart } from "@mui/x-charts/LineChart";
import {  ShoppingCart } from "@mui/icons-material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ProdList from "../ProdList";
import OrderList from "../OrderList";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

export default function index() {
  const nav = useNavigate();
  const [showCharts, setshowCharts] = React.useState(true);
  const [showProd, setshowProd] = React.useState(false);
  const [showorders, setshoworders] = React.useState(false);

  const handleCharts = () => {
    setshowCharts(true);
    setshowProd(false);
    setshoworders(false);
  };
  const handleProducts = () => {
    setshowCharts(false);
    setshowProd(true);
    setshoworders(false);
  };
  const handleOrders = () => {
    setshowCharts(false);
    setshowProd(false);
    setshoworders(true);
  };

  const handleSignout = () => {
    localStorage.removeItem("admin");
    nav("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="flex gap-x-3 ms-2 py-[1rem]" onClick={handleCharts}>
          <img src="/img/logo.svg" width={40} />
          <img src="/img/logotxt.svg" width={60} />
        </div>
        <Divider />
        <List>
          <ListItem disablePadding onClick={handleProducts}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={handleOrders}>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={handleSignout}>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Signout"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {showCharts && (
          <>
            <h1 className="text-4xl font-bold">Welcome To Admin Dasboard</h1>
            <Box className="grid grid-cols-2">
              <Box>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </Box>
              <Box>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      area: true,
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </Box>
              <Box>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["Products", "Orders", "Users"],
                    },
                  ]}
                  series={[
                    { data: [4, 3, 5] },
                    { data: [1, 6, 3] },
                    { data: [2, 5, 6] },
                  ]}
                  width={500}
                  height={300}
                />{" "}
              </Box>

              <Box>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                  series={[
                    {
                      data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                      showMark: ({ index }) => index % 2 === 0,
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </Box>
            </Box>
          </>
        )}

        {/* Products */}

        {showProd && (
          <Box>
            <h1 className="text-4xl font-bold">Total Products Listing</h1>
            <ProdList />
          </Box>
        )}

        {/* Orders */}
        {showorders && (
          <Box>
            <h1 className="text-4xl font-bold">Track Orders History</h1>
            <OrderList />
          </Box>
        )}
      </Box>
    </Box>
  );
}
