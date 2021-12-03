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
import { transformError, toPascal } from "../../utils";

const AdvancedSearch = ({
  open,
  setOpen,
  name,
  setName,
  setFilters,
  setPage,
}) => {
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
      field !== "operator"
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
    open && (
      <Box
        sx={{
          display: open ? "flex" : "none",
          flexWrap: "wrap",
          justifyContent: "space-between",
          "&>*": { width: "30%", marginBottom: "16px !important" },
        }}
      >
        <TextField
          placeholder="Search for a role"
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
        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
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
          sx={{ width: "calc(50% - 120px)" }}
        />
        <TextField
          label="Email"
          value={state.email}
          onChange={(e) => changeHandler(e, "email")}
          sx={{ width: "200px" }}
        />
        <TextField
          label="Contact Number"
          value={state.mobileNo}
          onChange={(e) => changeHandler(e, "mobileNo")}
          sx={{ width: "calc(50% - 120px)" }}
        />
        <TextField
          label="Status"
          value={state.status}
          onChange={(e) => changeHandler(e, "status")}
          sx={{ width: "calc(50% - 120px)" }}
          select
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">In-Active</MenuItem>
        </TextField>
        <GradientButton
          sx={{ width: "200px !important" }}
          onClick={searchHandler}
        >
          Search
        </GradientButton>
      </Box>
    )
  );
};

const UserList = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useUserListQuery(page, filters);

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
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    // setFilters([{ field: "name", type: "STARTS_WITH", value: e.target.value }]);
    // setFilters([
    //   { field: "mobileNo", type: "STARTS_WITH", value: e.target.value },
    // ]);
  };

  const tableRows = useMemo(
    () =>
      data?.docs?.map(({ _id, name, email, mobileNo, userID }) => ({
        onClick: () => rowClickHandler(_id),
        items: [
          toPascal(name),
          toPascal(email),
          mobileNo,
          _id,
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

      <Box sx={{ display: showAdvancedSearch ? "none" : "flex", mb: 1 }}>
        <TextField
          value={searchValue}
          onChange={searchChangeHandler}
          placeholder="Search for a role"
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
      <AdvancedSearch
        open={showAdvancedSearch}
        setOpen={setShowAdvancedSearch}
        setFilters={setFilters}
        setPage={setPage}
        name={searchValue}
        setName={setSearchValue}
      />

      {isError ? (
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
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default UserList;
