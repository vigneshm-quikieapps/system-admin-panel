import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Divider, Checkbox } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Check as CheckIcon } from "@mui/icons-material";

import { Table } from "../../../components";
import { privilegeTypes } from "../../../helper/constants";
import { useGetRole } from "../../../services/queries";

const tableHeading = (
  <>
    <Box sx={{ p: 2 }}>
      <Typography
        component="h3"
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          mb: 1,
        }}
      >
        Functional Privileges
      </Typography>
    </Box>
    <Divider />
  </>
);
const Privileges = () => {
  const { id } = useParams();
  const { data = { role: {} } } = useGetRole(id);
  console.log("roleData12233", data);
  const check = data.role.functionalPrivileges;
  const StyledCheckIcon = styled(CheckIcon)({
    width: "18px",
    height: "18px",
    color: "#fff",
  });

  const StyledCheckbox = styled(Checkbox)(({ theme }) => {
    return {
      "&.Mui-checked": {
        backgroundImage: theme.palette.gradients.diagonal,
        borderColor: "transparent !important",
      },
      "&.MuiCheckbox-root": {
        width: "30px",
        height: "28px",
        borderRadius: "8px",
        border: `1px solid ${theme.palette.checkbox.border}`,
        backgroundColor: theme.palette.checkbox.background,
        color: "transparent",
      },
    };
  });

  StyledCheckbox.defaultProps = {
    checkedIcon: <StyledCheckIcon />,
  };

  const tableRows = useMemo(() =>
    Object.entries(privilegeTypes).map(([_, label], index) => ({
      items: [
        <Typography sx={{ minWidth: "450px" }}>{label}</Typography>,
        <StyledCheckbox checked={check[index].permission.create} />,
        <StyledCheckbox checked={check[index].permission.read} />,
        <StyledCheckbox checked={check[index].permission.update} />,
        <StyledCheckbox checked={check[index].permission.delete} />,
      ],
    })),
  );

  console.log("TBRo", check);
  return (
    <Box sx={{ gridColumnEnd: "span 2" }}>
      <Table
        headerCellWidth="90px"
        heading={tableHeading}
        headers={["Privilege", "Create", "Read", "Update", "Delete"]}
        rows={tableRows}
      />
    </Box>
  );
};

export default Privileges;
