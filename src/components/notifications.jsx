import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Badge, Box, List, ListItem, Popover, Typography } from "@mui/material";

import IconButton from "./icon-button";
import ImgIcon from "./img-icon";
import notificationsIcon from "../assets/icons/icon-notification.png";

const StyledPopover = styled(Popover)(({ theme }) => ({
  marginTop: theme.spacing(3),
  "& .MuiPaper-root": {
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: theme.shape.borderRadiuses.primary,
    overflow: "visible",
    "&::before": {
      content: '" "',
      position: "absolute",
      bottom: "100%",
      left: "50%",
      transform: "translate(-50%, 0)",
      borderWidth: 18,
      borderStyle: "solid",
      borderColor: `transparent transparent ${theme.palette.text.disabled} transparent`,
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
}));

const Notifications = ({ items = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const hasItems = !!items.length;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "inline-block" }}>
      <Badge
        color="secondary"
        variant="dot"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiBadge-dot": {
            minWidth: "12px",
            height: "12px",
            mt: "2px",
            mr: "2px",
            borderRadius: "50%",
          },
        }}
        invisible={!hasItems}
      >
        <IconButton onClick={handleClick}>
          <ImgIcon>{notificationsIcon}</ImgIcon>
        </IconButton>
      </Badge>
      {hasItems && (
        <StyledPopover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List sx={{ maxHeight: 200, my: 1, overflow: "auto" }}>
            {items.map((item, index) => (
              <ListItem
                sx={{
                  height: "50px",
                  cursor: "default",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.highlight.main,
                  },
                }}
                key={index}
                onClick={handleClose}
              >
                <Typography>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </StyledPopover>
      )}
    </Box>
  );
};

export default Notifications;
