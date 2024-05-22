import { Navigate, Outlet } from "react-router-dom";
import { Container, Stack } from '@mui/material';

import { useSelector } from "react-redux";

import Logo from "../../assets/Images/logo.ico";



const AuthLayout = () => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return <Navigate to={"/home"} />;
  }


  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
    
  );
};

export default AuthLayout;