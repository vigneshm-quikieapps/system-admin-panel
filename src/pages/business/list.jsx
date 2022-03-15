import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, MenuItem } from "@mui/material";
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
  GradientButton,
} from "../../components";
import BusinessTable from "./components/business-table";
import { transformError, toPascal } from "../../utils";
const operators = {
  STARTS_WITH: "STARTS_WITH",
  EQUALS_TO: "EQUALS_TO",
  NOT_EQUALS: "NOT_EQUALS",
};

const initialValuesState = {
  name: "",
  city: "",
  postcode: "",
};
const startsWith = operators.STARTS_WITH;

const initialOperatorsState = {
  name: startsWith,
  postcode: startsWith,
  city: startsWith,
};
const OperatorField = ({
  area,
  postcode,
  city,
  onChange,
  name,
  ...otherProps
}) => {
  const changeHandler = (e) => {
    onChange(e, name);
    onChange(e, city);
    onChange(e, postcode);
  };
  return (
    <TextField
      select
      sx={{ gridArea: area }}
      label="Operator"
      onChange={changeHandler}
      {...otherProps}
    >
      <MenuItem value="EQUALS">Equals to</MenuItem>
      <MenuItem value="STARTS_WITH">Starts with</MenuItem>
    </TextField>
  );
};
const AdvancedSearch = ({
  open,
  setOpen,
  name,
  setName,
  setFilters,
  setPage,
}) => {
  const [operatorsState, setOperatorsState] = useState(initialOperatorsState);
  const [valuesState, setValuesState] = useState(initialValuesState);

  const [state, setState] = useState({
    name,
    operator: "STARTS_WITH",
    city: "",
    postcode: "",
  });

  const valuesChangeHandler = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    // console.log("e.target.name", e.target.name);
    setValuesState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log("valuesChangeHandler", valuesChangeHandler);
  const operatorsChangeHandler = (e, name) => {
    setOperatorsState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  // const filters = useMemo(() => {
  //   return Object.keys(valuesState).map((field) => ({
  //     field,
  //     type: operatorsState[field],
  //     value: valuesState[field],
  //   }));
  // }, [valuesState, operatorsState]);
  // console.log("valuesState", valuesState);
  const filters = useMemo(() => {
    let theFilters = Object.keys(valuesState).map((field) =>
      field !== "operator" && valuesState[field]
        ? {
            field,
            type: operatorsState[field],
            value: valuesState[field],
          }
        : undefined,
    );
    return theFilters.filter((theFilter) => !!theFilter);
  }, [valuesState]);

  const searchHandler = () => {
    setFilters(filters);
  };

  return (
    open && (
      <Box
        sx={{
          display: open ? "grid" : "none",
          gridTemplateAreas: `"basicInput basicInput  basicSearch"
                              "name       name      nameOp"
                              "city       city       cityOp"
                              "postcode     postcodeOp    advanced"`,
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search by Business name"
          sx={{
            gridArea: "basicInput",
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
          sx={{ gridArea: "basicSearch" }}
          active
          onClick={() => setOpen(false)}
        >
          Basic Search
        </Button>
        <TextField
          sx={{ gridArea: "name" }}
          label="Business Name"
          name="name"
          onChange={valuesChangeHandler}
          value={name}
        />

        <TextField
          sx={{ gridArea: "city" }}
          label="City/Town"
          name="city"
          value={valuesState["city"]}
          onChange={valuesChangeHandler}
        />

        <TextField
          sx={{ gridArea: "postcode" }}
          label="Postcode"
          name="postcode"
          value={valuesState["postcode"]}
          onChange={valuesChangeHandler}
        />
        {Object.keys(operatorsState).map((name) => (
          <OperatorField
            key={name}
            name={name}
            area={name + "Op"}
            value={operatorsState[name]}
            onChange={operatorsChangeHandler}
          />
        ))}
        <GradientButton sx={{ gridArea: "advanced" }} onClick={searchHandler}>
          Search
        </GradientButton>
      </Box>
    )
  );
};
const BusinessList = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
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

  // const searchChangeHandler = (e) => setSearchValue(e.target.value);
  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    // Do not remove, used for pagination of basic and advanced search
    setFilters([{ field: "name", type: "STARTS_WITH", value: e.target.value }]);
  };
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
  // useEffect(() => {
  //   const searchTimer = setTimeout(() => {
  //     if (!searchValue)
  //       return setFilters([
  //         { field: "isParent", type: "NOT_EQUALS", value: true },
  //       ]);
  //     setFilters([
  //       { field: "name", type: "STARTS_WITH", value: searchValue },
  //       { field: "isParent", type: "NOT_EQUALS", value: true },
  //     ]);
  //   }, 500);
  //   return () => clearTimeout(searchTimer);
  // }, [searchValue]);

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
        title="Business"
        description="Manage business information here"
      />
      <Box sx={{ display: showAdvancedSearch ? "none" : "flex", mb: 1 }}>
        <TextField
          onChange={searchValueChangeHandler}
          value={searchValue}
          placeholder="Search by business name"
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
      />
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
