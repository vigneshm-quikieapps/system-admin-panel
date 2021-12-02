import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Actions,
  Pagination,
  TextField,
  Button,
  GradientButton,
  WarningDialog,
} from "../../components";

import { Box, InputAdornment, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import UserListTable from "./components/user-table";
import { fetchUserList } from "../../services/list-services";
import { transformError, toPascal } from "../../utils";

const UserList = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    fetchUserList(page, filters);

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

  const deleteHandler = (e, id) => {
    e.stopPropagation();
  };

  const pageChangeHandler = (_, value) => {
    setPage(value);
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
  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const AdvancedSearch = ({
    open,
    setOpen,

    name,
    setName,
  }) => {
    const [status, setStatus] = useState("ACTIVE");
    const [nameOperator, setNameOperator] = useState("STARTS_WITH");
    const [statusOperator, setStatusOperator] = useState("EQUALS");

    const nameChangeHandler = (e) => setName(e.target.value);
    const nameOperatorChangeHandler = (e) => setNameOperator(e.target.value);
    const statusChangeHandler = (e) => setStatus(e.target.value);

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
              bgcolor: (theme) => theme.palette.highlight.main,
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
            onClick={() => setOpen(false)}
          >
            Basic Search
          </Button>

          <TextField
            select
            sx={{ width: "calc(50% - 120px)" }}
            label="Operator"
            value={nameOperator}
            onChange={nameOperatorChangeHandler}
          >
            <option value="EQUALS">Equals to</option>
            <option value="STARTS_WITH">Starts with</option>
          </TextField>

          <TextField
            label="Name"
            onChange={nameChangeHandler}
            value={name}
            sx={{ width: "calc(50% - 120px)" }}
          />

          <TextField sx={{ width: "200px" }} label="Email"></TextField>

          <TextField
            label="Contact Number"
            sx={{ width: "calc(50% - 120px)" }}
          />

          <TextField
            select
            onChange={statusChangeHandler}
            value={status}
            label="Status"
            sx={{ width: "calc(50% - 120px)" }}
            variant="outlined"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">In-Active</option>
          </TextField>

          <GradientButton sx={{ width: "200px !important" }}>
            Search
          </GradientButton>
        </Box>
      )
    );
  };
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
