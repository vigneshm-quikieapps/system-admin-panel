import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const sizes = { normal: "16px", large: "20px" };
const heights = { normal: "48px", large: "60px" };
const paddings = { normal: "0px 25px", large: "18px 50px" };
const fontWeights = { normal: "normal", large: "600" };
const borderRadiuses = {
  normal: (theme) => theme.shape.borderRadiuses.ternary,
  large: (theme) => theme.shape.borderRadiuses.primary,
};

const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => ["invert", "size"].indexOf(prop) === -1,
})(({ theme, invert, size = "normal" }) => ({
  backgroundImage: invert ? "#fff" : theme.palette.gradients.horizontalLinear,
  color: invert ? "#ff2c60" : "#fff",
  height: heights[size],
  padding: paddings[size],
  fontSize: sizes[size],
  fontWeight: fontWeights[size],
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: borderRadiuses[size](theme),
  textTransform: "none",
}));

export default GradientButton;
