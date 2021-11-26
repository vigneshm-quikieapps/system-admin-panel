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
import BusinessTable from "./components/business-table";

const items = [
  {
    _id: 1,
    name: "Business 1",
    city: "Bangalore",
    postCode: "1234567890",
    primaryContact: "contact",
  },
];

const BusinessList = () => {
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
    ({ _id, name, city, postCode, primaryContact }) => ({
      onClick: () => rowClickHandler(_id),
      items: [
        name,
        city,
        postCode,
        primaryContact,
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
      <PageHeader title="Business" description="Manage your Business here" />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          sx={{ flex: "1" }}
          placeholder="Search business by name"
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
      <BusinessTable rows={tableRows} pagination={pagination} />
    </>
  );
};

export default BusinessList;
