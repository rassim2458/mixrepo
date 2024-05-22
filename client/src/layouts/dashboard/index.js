import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";





const isLoggedIn = true;


const DashboardLayout = () => {

  



  
  if (!isLoggedIn) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <Stack direction='row'>
      {/* SideBar */}
<Sidebar/>
      <Outlet />
    </Stack>

  );
};

export default DashboardLayout;
