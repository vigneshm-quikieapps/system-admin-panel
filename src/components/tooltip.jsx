import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.highlight.main,
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    borderRadius: theme.spacing(1),
  },

  // [`& .${tooltipClasses.tooltip}::before`]: {
  //   // backgroundColor: theme.palette.common.white,
  //   // color: "rgba(0, 0, 0, 0.87)",
  //   // boxShadow: theme.shadows[1],
  //   // fontSize: 11,
  //   // borderRadius: theme.spacing(1),
  //   content: '""',
  //   position: "absolute",
  //   width: "20px",
  //   height: "20px",
  //   borderBottom: "0px",
  //   borderRight: "0px",
  //   // bottom: "100%",
  //   top: "1px",
  //   left: "50%",
  //   // marginLeft: "-25px",
  //   transform: "rotate(45deg)",
  //   backgroundColor: "white",
  //   // marginBottom: "-40px",
  //   borderRadius: "10px",
  // },
}));

export default LightTooltip;
