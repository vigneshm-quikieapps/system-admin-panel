import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, Typography, MenuItem } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import {
  Actions,
  Pagination,
  TextField,
  Button,
  GradientButton,
  WarningDialog,
} from "../../components";

import UserListTable from "./components/user-table";
import { useUserListQuery } from "../../services/list-services";
import { useDeleteUser } from "../../services/mutations";
import { transformError, toPascal } from "../../utils";

const AdvancedSearch = ({ setOpen, name, setName, setFilters, setPage }) => {
  const [state, setState] = useState({
    name,
    operator: "STARTS_WITH",
    email: "",
    mobileNo: "",
    status: "ACTIVE",
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
    theFilters.push({ field: "isParent", type: "NOT_EQUALS", value: true });
    return theFilters.filter((theFilter) => !!theFilter);
  }, [state]);

  const searchHandler = () => {
    setPage(1);
    setFilters(filters);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"basic-input basic-input basic-button"
                            "name       email      operator"
                            "contact    status     search-button"`,
        gridTemplateColumns: "1fr 1fr 200px",
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        placeholder="Search for a user"
        sx={{ bgcolor: "highlight.main", gridArea: "basic-input" }}
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
        sx={{ gridArea: "basic-button" }}
        onClick={() => {
          setName(state.name);
          setOpen(false);
        }}
      >
        Basic Search
      </Button>
      <TextField
        select
        sx={{ gridArea: "operator" }}
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
        sx={{ gridArea: "name" }}
      />
      <TextField
        label="Email"
        value={state.email}
        onChange={(e) => changeHandler(e, "email")}
        sx={{ gridArea: "email" }}
      />
      <TextField
        label="Contact Number"
        value={state.mobileNo}
        onChange={(e) => changeHandler(e, "mobileNo")}
        sx={{ gridArea: "contact" }}
      />
      <TextField
        label="Status"
        value={state.status}
        onChange={(e) => changeHandler(e, "status")}
        sx={{ gridArea: "status" }}
        select
      >
        <MenuItem value="ACTIVE">Active</MenuItem>
        <MenuItem value="INACTIVE">In-Active</MenuItem>
      </TextField>
      <GradientButton
        sx={{ gridArea: "search-button" }}
        onClick={searchHandler}
      >
        Search
      </GradientButton>
    </Box>
  );
};

const UserList = () => {
  const navigate = useNavigate();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { field: "isParent", type: "NOT_EQUALS", value: true },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { isLoading, data, isFetching, isPreviousData } = useUserListQuery(
    page,
    filters,
    {
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    },
  );

  const { isLoading: isDeleteLoading, mutate: deleteUser } = useDeleteUser({
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
      deleteUser(id);
    },
    [deleteUser],
  );

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const tableRows = useMemo(
    () =>
      data?.docs?.map(({ _id, name, email, mobileNo }) => ({
        onClick: () => rowClickHandler(_id),
        items: [
          toPascal(name),
          toPascal(email),
          mobileNo,
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
      if (!searchValue)
        return setFilters([
          { field: "isParent", type: "NOT_EQUALS", value: true },
        ]);
      setFilters([
        { field: "name", type: "STARTS_WITH", value: searchValue },
        { field: "isParent", type: "NOT_EQUALS", value: true },
      ]);
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
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          User
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage users from here
        </Typography>
      </Box>

      {!showAdvancedSearch && (
        <Box sx={{ display: "flex", mb: 1 }}>
          <TextField
            value={searchValue}
            onChange={searchChangeHandler}
            placeholder="Search for a user"
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
        <UserListTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading || isDeleteLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default UserList;
