import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const Card = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadiuses.secondary,
  borderColor: theme.palette.highlight.main,
  borderStyle: "solid",
  borderWidth: "1px",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.main,
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

CardTitle.defaultProps = { component: "h2" };

export const CardActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: "flex",
  gap: theme.spacing(1),
}));

export default Card;
