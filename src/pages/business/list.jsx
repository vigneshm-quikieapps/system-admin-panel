import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { useBusinessListQuery } from "../../services/list-services";
import { useDeleteBusiness } from "../../services/mutations";

import {
  Actions,
  Pagination,
  Button,
  TextField,
  PageHeader,
  WarningDialog,
} from "../../components";
import BusinessTable from "./components/business-table";
import { transformError, toPascal } from "../../utils";

const BusinessList = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const { isLoading, data, isFetching, isPreviousData } = useBusinessListQuery(
    page,
    filters,
    {
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    },
  );

  const { isLoading: isDeleteLoading, mutate: deleteBusiness } =
    useDeleteBusiness({
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
      deleteBusiness(id);
    },
    [deleteBusiness],
  );

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const tableRows = useMemo(
    () =>
      data?.docs?.map(({ _id, name, city, postcode, contactName }) => ({
        onClick: () => rowClickHandler(_id),
        items: [
          toPascal(name),
          toPascal(city),
          postcode,
          toPascal(contactName),
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
      <PageHeader title="Business" description="Manage your Business here" />
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField
          value={searchValue}
          onChange={searchChangeHandler}
          sx={{ flex: "1" }}
          placeholder="Search business by name"
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
      {showError ? (
        <WarningDialog
          open={showError}
          title="Error"
          description={transformError(error)}
          acceptButtonTitle="Discard"
          onAccept={() => setShowError(false)}
        />
      ) : (
        <BusinessTable
          rows={tableRows}
          pagination={pagination}
          isLoading={isLoading || isDeleteLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default BusinessList;
