import { useMemo } from "react";
import { Box, Typography, Divider, Checkbox } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

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
  //   const tableRows = useMemo(
  //     () =>
  //       Object.keys(privilegeTypes).map(([_, label], index) => ({
  //         items: [
  //           <Typography sx={{ minWidth: "450px" }}>{label}</Typography>,
  //           <Checkbox name={`functionalPrivileges.${index}.permission.create`} />,
  //           <Checkbox name={`functionalPrivileges.${index}.permission.read`} />,
  //           <Checkbox name={`functionalPrivileges.${index}.permission.update`} />,
  //           <Checkbox name={`functionalPrivileges.${index}.permission.delete`} />,
  //         ],
  //       })),
  //     [],
  //   );
  const tableRows = useMemo(() =>
    Object.entries(privilegeTypes).map(([_, label], index) => ({
      items: [
        <Typography sx={{ minWidth: "450px" }}>{label}</Typography>,
        <Checkbox name={`check.${index}.permission.create`} />,
        <Checkbox name={`check.${index}.permission.rows`} />,
        <Checkbox name={`check.${index}.permission.update`} />,
        <Checkbox name={`check.${index}.permission.delete`} />,
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
