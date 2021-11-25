import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& ul": {
    justifyContent: "center",
    "& .MuiButtonBase-root": {
      width: 48,
      height: 48,
      borderRadius: theme.shape.borderRadiuses.primary,
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.darkIndigo.main,
      color: "#fff",
    },
  },
}));

export default StyledPagination;
