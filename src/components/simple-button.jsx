import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SimpleButton = styled(Button, {
  shouldForwardProp: (prop) => ["active", "select"].indexOf(prop) === -1,
})(({ theme, active, select }) => ({
  backgroundColor: active ? theme.palette.highlight.main : "#fff",
  height: "48px",
  padding: "0px 25px",
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  border: select
    ? `1px solid  ${theme.palette.secondary.main}`
    : `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadiuses.ternary,
  fontSize: "16px",
  textTransform: "none",
}));

export default SimpleButton;
