import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Actions,
  Pagination,
  Status,
  TextField,
  Button,
  PageHeader,
  WarningDialog,
} from "../../components";
import EvaluationTable from "./components/evaluation-table";
import { Box, InputAdornment } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import { useEvaluationSchemesQuery } from "../../services/list-services";
import { transformError, toPascal } from "../../utils";

const EvaluationList = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState();
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useEvaluationSchemesQuery(page, filters);
  const rowClickHandler = useCallback(
    (id) => navigate(`details/${id}`),
    [navigate],
  );

  const editHandler = useCallback(
    (e, id) => {
      e.stopPropagation();
      navigate(`add/${id}`);
    },
    [navigate],
  );

  const deleteHandler = useCallback((e, id) => {
    e.stopPropagation();
  }, []);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const tableRows = useMemo(() => {
    const statusColors = { ACTIVE: "green", INACTIVE: "red" };
    const statusText = {
      ACTIVE: "Active",
      INACTIVE: "Inactive",
    };
    return data?.docs?.map(({ _id, name, status }) => ({
      onClick: () => rowClickHandler(_id),
      items: [
        toPascal(name),
        <Status status={statusColors[status]} title={statusText[status]} />,
        <Actions
          onDelete={(e) => deleteHandler(e, _id)}
          onEdit={(e) => editHandler(e, _id)}
        />,
      ],
    }));
  }, [data, editHandler, deleteHandler, rowClickHandler]);

  useEffect(() => setShowError(isError), [isError]);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (!searchValue) return setFilters([]);
      setFilters([{ field: "name", type: "STARTS_WITH", value: searchValue }]);
    }, 500);
    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  const pagination = (
    <Pagination
      count={data?.totalPages || 0}
      disabled={isPreviousData}
      onChange={pageChangeHandler}
    />
  );

  return (
    <>
      <PageHeader
        title="Evaluation Schemes"
        description="Manage your evaluation here"
      />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          value={searchValue}
          onChange={searchChangeHandler}
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
      {isError ? (
        <WarningDialog
          open={showError}
          title="Error"
          description={transformError(error)}
          acceptButtonTitle="Discard"
          onAccept={() => setShowError(false)}
        />
      ) : (
        <EvaluationTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default EvaluationList;
