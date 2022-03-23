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
import { useDeleteEvaluationScheme } from "../../services/mutations";
import { transformError, toPascal } from "../../utils";

const EvaluationList = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { isLoading, data, isFetching, isPreviousData } =
    useEvaluationSchemesQuery(page, filters, {
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    });
  // console.log("evaldata", data);

  const { isLoading: isDeleteLoading, mutate: deleteScheme } =
    useDeleteEvaluationScheme({
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    });

  const rowClickHandler = useCallback(
    (id) => navigate(`details/${id}`),
    [navigate],
  );

  const editHandler = useCallback(
    (e, id, name, status, levelCount, levels) => {
      e.stopPropagation();
      console.log("MESSAGE");
      navigate(
        `add/${id}`,

        // , { id, name, status, levelCount, levels }
      );
    },
    [navigate],
  );

  const deleteHandler = useCallback(
    (e, id) => {
      e.stopPropagation();
      deleteScheme(id);
    },
    [deleteScheme],
  );

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
    return data?.docs?.map(({ _id, name, status, levelCount, levels }) => ({
      onClick: () => rowClickHandler(_id),
      items: [
        name,
        <Status status={statusColors[status]} title={statusText[status]} />,
        <Actions
          onDelete={(e) => deleteHandler(e, _id)}
          onEdit={(e) => editHandler(e, _id, name, status, levelCount, levels)}
        />,
      ],
    }));
  }, [data, editHandler, deleteHandler, rowClickHandler]);

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
        description="Manage evaluation schemes"
      />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          value={searchValue}
          onChange={searchChangeHandler}
          sx={{ flex: "1" }}
          placeholder="Search by evaluation scheme name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "-10px" }}>
                <SearchIcon sx={{ color: "#0004" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button active>Search</Button>
      </Box>
      {showError ? (
        <WarningDialog
          open={showError}
          title="Error"
          description={transformError(error)}
          acceptButtonTitle="OK"
          onAccept={() => setShowError(false)}
        />
      ) : (
        <EvaluationTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading || isDeleteLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default EvaluationList;
