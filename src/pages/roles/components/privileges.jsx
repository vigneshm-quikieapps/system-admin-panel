import { useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";

import { FormCheckbox as Checkbox, Table } from "../../../components";
import { privilegeTypes } from "../../../helper/constants";

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
const Privileges = ({ control }) => {
  const tableRows = useMemo(
    () =>
      Object.entries(privilegeTypes).map(([_, label], index) => ({
        items: [
          <Typography sx={{ flex: 1 }}>{label}</Typography>,
          <Checkbox
            name={`functionalPrivileges.${index}.permission.create`}
            control={control}
          />,
          <Checkbox
            name={`functionalPrivileges.${index}.permission.read`}
            control={control}
          />,
          <Checkbox
            name={`functionalPrivileges.${index}.permission.update`}
            control={control}
          />,
          <Checkbox
            name={`functionalPrivileges.${index}.permission.delete`}
            control={control}
          />,
        ],
      })),
    [control],
  );
  return (
    <Box sx={{ gridColumnEnd: "span 2" }}>
      <Table
        heading={tableHeading}
        headers={["Privilege", "Create", "Read", "Update", "Delete"]}
        rows={tableRows}
      />
    </Box>
  );
};

export default Privileges;
