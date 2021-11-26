import { Box, Typography } from "@mui/material";
import { Outlet, useParams, useNavigate } from "react-router-dom";

import { TabNav, IconButton, ImgIcon } from "../../../components";
import { backIcon } from "../../../assets/icons";

const TopNav = ({ pageTitle }) => {
  const navigate = useNavigate();
  const { id: businessId = "" } = useParams();
  const pathTo = (path) => path + "/" + businessId;

  const items = [
    {
      id: 1,
      title: "Basic Info",
      to: pathTo("details"),
      exact: false,
    },
    {
      id: 2,
      title: "Finance Info",
      to: pathTo("finance-info"),
      exact: false,
    },
    {
      id: 3,
      title: "Other Info",
      to: pathTo("other-info"),
      exact: false,
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <IconButton onClick={() => navigate("../")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "bold" }}>
          {pageTitle}
        </Typography>
      </Box>
      <TabNav items={items} />
      <Outlet />
    </>
  );
};

export default TopNav;
