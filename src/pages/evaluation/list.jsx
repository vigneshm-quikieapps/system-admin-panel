import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Actions,
  Pagination,
  Status,
  TextField,
  Button,
  PageHeader,
} from "../../components";
import EvaluationTable from "./components/evaluation-table";
import { Box, InputAdornment, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

const items = [
  {
    _id: 1,
    evaluationScheme: "Scottish Gymnastics Award Scheme",
    status: Status,
    schemeID: "100000001",
  },
];

const EvaluationList = () => {
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
    ({ _id, evaluationScheme, status, schemeID }) => ({
      onClick: () => rowClickHandler(_id),
      items: [
        evaluationScheme,
        <Status status="green" title="Active" />,
        schemeID,
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
      <PageHeader
        title="Evaluation Schemes"
        description="Manage your evaluation here"
      />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          sx={{ flex: "1" }}
          placeholder="Search"
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
      <EvaluationTable rows={tableRows} pagination={pagination} />
    </>
  );
};

export default EvaluationList;
