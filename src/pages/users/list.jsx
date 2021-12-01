import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";

import {
  Actions,
  Pagination,
  Status,
  TextField,
  Button,
  PageHeader,
  GradientButton,
} from "../../components";
import { Box, InputAdornment, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import UserListTable from "./components/user-table";

const items = [
  {
    _id: 1,
    roleName: "Nizam Mogal",
    email: "ni@gmail.com",
    contactNumber: "07557676723",
    userID: "100000001",
  },
];

const UserList = () => {
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
  const tableRows = items.map(
    ({ _id, roleName, email, contactNumber, userID }) => ({
      onClick: () => rowClickHandler(_id),
      items: [
        roleName,
        email,
        contactNumber,
        userID,
        <Actions
          onDelete={(e) => deleteHandler(e, _id)}
          onEdit={(e) => editHandler(e, _id)}
        />,
      ],
    }),
  );

  const pagination = <Pagination count={3} onChange={pageChangeHandler} />;

  return (
    <>
      <PageHeader title="User" description="Manage users from here" />
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
        <GradientButton
          sx={{
            px: 0,
            minWidth: "170px",
          }}
        >
          Search
        </GradientButton>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,  1fr)",
          columnGap: "10px",
        }}
      >
        <TextField
          select
          sx={{ minWidth: "40%", color: "#000" }}
          label="Operator"
        >
          <option value="Operator">Operator</option>
        </TextField>
        <TextField sx={{ minWidth: "286px", mb: "10px" }} placeholder="Name" />
        <TextField sx={{ minWidth: "286px", mb: "10px" }} placeholder="Email" />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,  1fr)",
          columnGap: "10px",
        }}
      >
        <TextField
          sx={{ minWidth: "286px", mb: "10px" }}
          placeholder="Contact Number"
        />
        <TextField select sx={{ minWidth: "40%" }} label="Status">
          <option value="Operator">Status</option>
        </TextField>
      </Box>
      <UserListTable rows={tableRows} pagination={pagination} />
    </>
  );
};

export default UserList;
