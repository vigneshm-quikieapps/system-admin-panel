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
  GradientButton,
} from "../../components";
import { useRoleListQuery } from "../../services/list-services";
import RoleTable from "./components/role-table";
import { transformError, toPascal } from "../../utils";

const RoleList = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useRoleListQuery(page, filters);

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
      setFilters([{ field: "code", type: "STARTS_WITH", value: searchValue }]);
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
  const AdvancedSearch = ({ open, setOpen, name, setName, code, setCode }) => {
    const [nameOperator, setNameOperator] = useState("STARTS_WITH");
    const nameChangeHandler = (e) => setName(e.target.value);
    const codeChangeHandler = (e) => setCode(e.target.value);

    const nameOperatorChangeHandler = (e) => setNameOperator(e.target.value);

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

          <TextField
            label="Role code"
            onChange={codeChangeHandler}
            value={code}
            sx={{ width: "200px" }}
          />

          <GradientButton sx={{ width: "200px !important" }}>
            Search
          </GradientButton>
        </Box>
      )
    );
  };

  return (
    <>
      <PageHeader title="Role" description="Manage roles from here" />
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
        name={searchValue}
        setName={setSearchValue}
        setCode={0}
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
        <RoleTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default RoleList;
