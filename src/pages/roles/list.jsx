import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, MenuItem } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  Actions,
  Pagination,
  Button,
  TextField,
  PageHeader,
  WarningDialog,
  GradientButton,
  Grid,
} from "../../components";
import { useRoleListQuery } from "../../services/list-services";
import { useDeleteRole } from "../../services/mutations";
import { transformError, toPascal } from "../../utils";
import RoleTable from "./components/role-table";

const AdvancedSearch = ({ setOpen, name, setName, setFilters, setPage }) => {
  const [state, setState] = useState({
    name,
    operator: "STARTS_WITH",
    code: "",
  });

  const changeHandler = (e, fieldName) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const filters = useMemo(() => {
    let theFilters = Object.keys(state).map((field) =>
      field !== "operator" && state[field]
        ? {
            field,
            type: state.operator,
            value: state[field],
          }
        : undefined,
    );
    return theFilters.filter((theFilter) => !!theFilter);
  }, [state]);

  const searchHandler = () => {
    setPage(1);
    setFilters(filters);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        "&>*": { marginBottom: "16px !important" },
      }}
    >
      <TextField
        placeholder="Search by role name"
        sx={{
          width: "calc(100% - 220px)",
          mr: "20px",
          backgroundColor: (theme) => theme.palette.highlight.main,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: "-10px" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        disabled
      />
      <Button
        active
        sx={{ width: "200px !important", justifySelf: "flex-end" }}
        onClick={() => {
          setName(state.name);
          setOpen(false);
        }}
      >
        Basic Search
      </Button>
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <Grid sx={{ width: "calc(100% - 220px)" }}>
          <TextField
            select
            label="Operator"
            value={state.operator}
            onChange={(e) => changeHandler(e, "operator")}
          >
            <MenuItem value="EQUALS">Equals to</MenuItem>
            <MenuItem value="STARTS_WITH">Starts with</MenuItem>
          </TextField>
          <TextField
            label="Name"
            value={state.name}
            onChange={(e) => changeHandler(e, "name")}
          />
          <TextField
            label="Role code"
            value={state.code}
            onChange={(e) => changeHandler(e, "code")}
          />
        </Grid>
        <GradientButton
          sx={{ width: "200px !important" }}
          onClick={searchHandler}
        >
          Search
        </GradientButton>
      </Box>
    </Box>
  );
};

const RoleList = () => {
  const navigate = useNavigate();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { isLoading, data, isFetching, isPreviousData } = useRoleListQuery(
    page,
    filters,
    {
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    },
  );

  const { isLoading: isDeleteLoading, mutate: deleteRole } = useDeleteRole({
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
    (e, id) => {
      e.stopPropagation();
      navigate(`add/${id}`);
    },
    [navigate],
  );

  const deleteHandler = useCallback(
    (e, id) => {
      e.stopPropagation();
      deleteRole(id);
    },
    [deleteRole],
  );

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const tableRows = useMemo(
    () =>
      data?.docs?.map(({ _id, name, code, roleID }) => ({
        onClick: () => rowClickHandler(_id),
        items: [
          toPascal(name),
          toPascal(code),
          <Actions
            onDelete={(e) => deleteHandler(e, _id)}
            onEdit={(e) => editHandler(e, _id)}
          />,
        ],
      })),
    [data, editHandler, deleteHandler, rowClickHandler],
  );

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
      <PageHeader title="Role" description="Manage roles here" />
      {!showAdvancedSearch && (
        <Box sx={{ display: "flex", mb: 1 }}>
          <TextField
            value={searchValue}
            onChange={searchChangeHandler}
            placeholder="Search by role name"
            sx={{ flex: 1, mr: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: "-10px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <Button onClick={() => setShowAdvancedSearch(true)} active>
            Advanced Search
          </Button>
        </Box>
      )}
      {showAdvancedSearch && (
        <AdvancedSearch
          setOpen={setShowAdvancedSearch}
          setFilters={setFilters}
          setPage={setPage}
          name={searchValue}
          setName={setSearchValue}
        />
      )}
      {showError ? (
        <WarningDialog
          open={showError}
          title="Error"
          description={transformError(error)}
          acceptButtonTitle="Discard"
          onAccept={() => setShowError(false)}
        />
      ) : (
        <RoleTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading || isDeleteLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default RoleList;
