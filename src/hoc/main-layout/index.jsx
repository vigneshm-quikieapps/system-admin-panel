import { useState } from "react";
import { Navigate, useLocation, Link, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

import Header from "./header";
import Footer from "./footer";
import SideNav from "./side-nav";
import Main from "./main";
import { logo } from "../../assets/images";
import { navItems } from "../../helper/constants";

const drawerWidth = 270;

const DrawerHeader = styled(Link)(({ theme }) => ({
  margin: "0 auto 60px 16px",
  display: "flex",
  padding: theme.spacing(2, 1),
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-end",
  textDecoration: "none",
}));

const NavHeader = (
  <>
    <DrawerHeader to="/">
      <img
        src={logo}
        alt="Rising Starts Logo - Go to home page"
        width="133"
        height="32"
      />
      <Typography
        sx={{
          color: "#fff8",
          textDecoration: "none",
          fontSize: "11px",
        }}
      >
        Rising Stars
      </Typography>
    </DrawerHeader>
  </>
);

const MainLayout = () => {
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const toggleNav = () => setNavOpen((open) => !open);

  const userName = localStorage.getItem("userName");
  if (!userName) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
      {
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoggingOut}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <Header
        drawerOpen={navOpen}
        drawerWidth={drawerWidth}
        userRole="System Admin"
        userName={localStorage.getItem("userName") || "Static Name"}
        handleDrawerOpen={toggleNav}
        setIsLoggingOut={setIsLoggingOut}
      />
      <SideNav
        header={NavHeader}
        open={navOpen}
        handleDrawerOpen={setNavOpen}
        items={navItems}
        width={drawerWidth}
      />
      <Main drawerWidth={drawerWidth} drawerOpen={navOpen}>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default MainLayout;
