import { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

import { useRoleListQuery } from "../../../../services/list-services";
import { toPascal, transformError } from "../../../../utils";
import {
  ElevationScroll,
  Pagination,
  Table,
  TextField,
  WarningDialog,
} from "../../../../components";

const RolesModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const RoleList = ({ onSelect, onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState([]);
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [contentRef, setContentRef] = useState();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useRoleListQuery(page, filters);

  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const tableRows = useMemo(
    () =>
      data?.docs?.map(({ _id, name, code }) => ({
        onClick: () => {
          onSelect(_id, name);
          onClose();
        },
        items: [toPascal(name), toPascal(code)],
      })),
    [data, onSelect, onClose],
  );

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (!searchValue) return setFilters([]);
      setFilters([{ field: "name", type: "STARTS_WITH", value: searchValue }]);
    }, 500);
    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  const pagination = data?.totalPages && data.totalPages > 1 && (
    <Pagination
      count={data.totalPages}
      disabled={isPreviousData}
      onChange={pageChangeHandler}
    />
  );

  return (
    <RolesModal open={true} maxWidth="md">
      <ElevationScroll targetRef={contentRef}>
        <DialogTitle
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          Select a Role
        </DialogTitle>
      </ElevationScroll>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          bgcolor: "ternary.main",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent ref={(e) => setContentRef(e)} sx={{ minWidth: "400px" }}>
        <TextField
          placeholder="Search for a role"
          value={searchValue}
          onChange={searchChangeHandler}
          sx={{ width: 1, mb: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "-10px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
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
          <Table
            headers={["Role Name", "Role Code"]}
            rows={tableRows}
            pagination={pagination}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
      </DialogContent>
    </RolesModal>
  );
};

export default RoleList;
