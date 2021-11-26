import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, description }) => (
  <>
    <Box sx={{ mb: 1.5 }}>
      <Typography component="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
        {description}
      </Typography>
    </Box>
  </>
);

export default PageHeader;
