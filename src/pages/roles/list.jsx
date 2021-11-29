import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  Actions,
  Pagination,
  Button,
  TextField,
  PageHeader,
} from "../../components";
import RoleTable from "./components/role-table";

const items = [
  {
    _id: 1,
    roleName: "Business Administration",
    roleCode: "IA_COMMON_BUSINESS_ADMIN",
    roleID: "100000001",
  },
];

const RoleList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const rowClickHandler = (id) => navigate(`details/${id}`);

  const editHandler = (e, id) => {
    e.stopPropagation();
    navigate(`add/${id}`);
  };

  const deleteHandler = (e, id) => {
    e.stopPropagation();
  };

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const tableRows = items.map(({ _id, roleName, roleCode, roleID }) => ({
    onClick: () => rowClickHandler(_id),
    items: [
      roleName,
      roleCode,
      roleID,
      <Actions
        onDelete={(e) => deleteHandler(e, _id)}
        onEdit={(e) => editHandler(e, _id)}
      />,
    ],
  }));

  const pagination = <Pagination count={3} onChange={pageChangeHandler} />;

  return (
    <>
      <PageHeader title="Role" description="Manage roles from here" />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          sx={{ flex: "1" }}
          placeholder="Search for a role"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "-10px" }}>
                <SearchIcon sx={{ color: "#0004" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button active>Advanced Search</Button>
      </Box>
      <RoleTable rows={tableRows} pagination={pagination} />
    </>
  );
};

export default RoleList;
