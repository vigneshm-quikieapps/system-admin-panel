import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  Actions,
  Pagination,
  Button,
  TextField,
  PageHeader,
  WarningDialog,
} from "../../components";
import RoleTable from "./components/role-table";
import { fetchRoleList } from "../../services/list-services";
import { transformError, toPascal } from "../../utils";



// const items = [
//   {
//     _id: 1,
//     roleName: "Business Administration",
//     roleCode: "IA_COMMON_BUSINESS_ADMIN",
//     roleID: "100000001",
//   },
// ];

const RoleList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
  fetchRoleList(page, filters);

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

  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const tableRows = useMemo(
    () =>
  data?.docs?.map(({ _id, name, code, roleID }) => ({
    onClick: () => rowClickHandler(_id),
    items: [
      toPascal(name),
      toPascal(code),
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
      <PageHeader title="Role" description="Manage roles from here" />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
        value={searchValue}
          onChange={searchChangeHandler}
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
      {isError ? (
        <WarningDialog
          open={showError}
          title="Error"
          description={transformError(error)}
          acceptButtonTitle="Discard"
          onAccept={() => setShowError(false)}
        />
      ) : (
      <RoleTable rows={tableRows} pagination={pagination}
      isLoading={isLoading}
      isFetching={isFetching} />
      )}
    </>
  );
};

export default RoleList;
