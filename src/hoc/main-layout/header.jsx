import { cloneElement, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import { useLogoutMutation } from "../../services/mutations";
import { transformError } from "../../utils";
import {
  IconButton,
  ImgIcon,
  Notifications,
  WarningDialog,
} from "../../components";
import { menuIcon, homeIcon, userIcon } from "../../assets/icons";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    ["drawerOpen", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, drawerOpen, drawerWidth }) => ({
  paddingRight: "70px",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = ({
  handleDrawerOpen,
  drawerOpen,
  drawerWidth,
  userRole,
  userName,
  setIsLoggingOut,
  ...otherProps
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { isLoading, mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      localStorage.clear();
      navigate("/login");
    },
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => setIsLoggingOut(isLoading), [setIsLoggingOut, isLoading]);

  return (
    <>
      <ElevationScroll {...otherProps}>
        <AppBar
          position="fixed"
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          color="background"
        >
          <Toolbar disableGutters>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  mx: "70px",
                }}
              >
                <IconButton color="inherit" onClick={handleDrawerOpen}>
                  <ImgIcon>{menuIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }} />
            <IconButton sx={{ mr: "20px" }} LinkComponent={Link} to="/">
              <ImgIcon>{homeIcon}</ImgIcon>
            </IconButton>
            <Notifications
              show={true}
              items={[
                "notification 1",
                "notification 2",
                "notification 3",
                "notification 4",
                "notification 5",
                "notification 6",
              ]}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                ml: "20px",
                mr: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {userRole}
              </Typography>
              <Typography>{userName}</Typography>
            </Box>
            <IconButton onClick={handleAvatarClick}>
              <ImgIcon>{userIcon}</ImgIcon>
            </IconButton>
            <Menu
              open={open}
              onClose={handleUserMenuClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                mt: 3,
                "& .MuiPaper-root": {
                  border: (theme) => `1px solid ${theme.palette.text.disabled}`,
                  borderRadius: (theme) => theme.shape.borderRadiuses.primary,
                  overflow: "visible",
                  "&::before": {
                    content: '" "',
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    borderWidth: 18,
                    borderStyle: "solid",
                    borderColor: (theme) =>
                      `transparent transparent ${theme.palette.text.disabled} transparent`,
                  },
                  "&::after": {
                    content: '" "',
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    borderWidth: 16,
                    borderStyle: "solid",
                    borderColor: "transparent transparent #fff transparent",
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {
        <WarningDialog
          open={showError}
          title="Logout Error"
          description={transformError(error)}
          acceptButtonTitle="OK"
          onAccept={() => setShowError(false)}
        />
      }
    </>
  );
};

export default Header;
