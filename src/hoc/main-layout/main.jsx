import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Main = styled("main", {
  shouldForwardProp: (prop) =>
    ["drawerOpen", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, drawerOpen, drawerWidth }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: theme.spacing(2),
  marginLeft: 0,
  ...(drawerOpen && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const MainRoot = ({ children, drawerWidth, drawerOpen }) => (
  <Main drawerWidth={drawerWidth} drawerOpen={drawerOpen}>
    <Box
      sx={{
        maxWidth: "100%",
        mx: "70px",
      }}
    >
      {children}
    </Box>
  </Main>
);

export default MainRoot;
