import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Output = ({ title, description, variant = "default", sx }) => {
  return (
    <StyledBox sx={sx}>
      <Typography
        sx={{
          fontSize: "12px",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {title}
      </Typography>

      {typeof description === "string" ? (
        <Typography
          sx={{
            fontSize: variant === "header" ? "16px" : "14px",
            fontWeight: variant === "header" ? "bold" : "normal",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {description}
        </Typography>
      ) : (
        description
      )}
    </StyledBox>
  );
};

export default Output;
