import { Popover } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPopover = styled(Popover, {
  shouldForwardProp: (propName) => propName !== "pointer",
})(({ theme, pointer = false }) => ({
  marginTop: pointer ? theme.spacing(3) : theme.spacing(1),
  "& .MuiPaper-root": {
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: theme.shape.borderRadiuses.primary,
    overflow: "visible",
    "&::before": pointer
      ? {
          content: '" "',
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translate(-50%, 0)",
          borderWidth: 14,
          borderStyle: "solid",
          borderColor: `transparent transparent ${theme.palette.text.disabled} transparent`,
        }
      : {},
    "&::after": pointer
      ? {
          content: '" "',
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translate(-50%, 0)",
          borderWidth: 12,
          borderStyle: "solid",
          borderColor: "transparent transparent #fff transparent",
        }
      : {},
  },
}));

export default StyledPopover;
