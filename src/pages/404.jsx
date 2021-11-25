import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

import { GradientButton } from "../components";

const PageNotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        The requested page not found!
      </Typography>
      <Box>
        <GradientButton LinkComponent={Link} to="/" sx={{ mr: 2 }}>
          Home Page
        </GradientButton>
        <GradientButton LinkComponent={Link} to="/login">
          Login Page
        </GradientButton>
      </Box>
    </Container>
  );
};

export default PageNotFound;
