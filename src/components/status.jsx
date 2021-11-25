import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StatusBadge = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  display: "inline-block",
  borderRadius: "50%",
  width: 8,
  height: 8,
  backgroundColor: `${theme.palette[status].main}`,
}));

const colors = { green: "success", red: "error", yellow: "warning" };

const Status = ({ status, title }) => {
  return (
    <Box>
      <StatusBadge status={colors[status]} component="span" />
      <Typography component="span" sx={{ ml: "5px" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Status;
