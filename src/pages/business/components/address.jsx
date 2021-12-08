import { useState, useRef, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Autocomplete,
  LinearProgress,
} from "@mui/material";

import { useAddressQuery } from "../../../services/address-services";
import { Grid, TextField, GradientButton } from "../../../components";
import { countries } from "../../../helper/constants";

const Address = ({ register, errors, setValue }) => {
  const postcodeRef = useRef();
  const [manual, setManual] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState(null);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const previousPostcode = useRef("");
  const {
    data: addresses = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useAddressQuery(postcode);

  const postcodeChangeHandler = (e) => setPostcode(e.target.value);
  const addressChangeHandler = (e, newValue) => setAddress(newValue);
  const postcodeBlurHandler = () => {
    if (manual || previousPostcode.current === postcode || !postcode) return;
    refetch();
    previousPostcode.current = postcode;
  };
  const manualClickHandler = () => {
    setManual((value) => !value);
    postcodeRef.current.focus();
    setPostcode(currentAddress?.postcode || postcode);
    setLine1(currentAddress?.addressline1 || "");
    setLine2(currentAddress?.addressline2 || "");
    setCity(currentAddress?.posttown || "");
    setLocation(geo);
    setValue("postcode", currentAddress?.postcode || postcode);
    setValue("city", currentAddress?.posttown || "");
    setValue("line1", currentAddress?.addressline1 || "");
    setValue("line2", currentAddress?.addressline2 || "");
    setValue("geo", geo);
  };

  const addressOptions = useMemo(() => {
    return addresses.map(({ summaryline }) => summaryline);
  }, [addresses]);
  const currentAddress = useMemo(
    () => addresses.find(({ summaryline }) => summaryline === address) || {},
    [addresses, address],
  );
  const geo = useMemo(
    () =>
      currentAddress?.latitude && currentAddress?.longitude
        ? `${currentAddress?.latitude}, ${currentAddress?.longitude}`
        : "",
    [currentAddress],
  );

  useEffect(() => {
    if (currentAddress?.postcode) {
      setValue("postcode", currentAddress.postcode);
      setPostcode(currentAddress.postcode);
    }
    setValue("city", currentAddress?.posttown || "");
    setValue("line1", currentAddress?.addressline1 || "");
    setValue("line2", currentAddress?.addressline2 || "");
    setValue("geo", geo);
  }, [setValue, currentAddress, geo]);

  const { inputRef, ...postcodeRegister } = register("postcode", {
    onChange: postcodeChangeHandler,
  });
  return (
    <Grid
      columnCount={2}
      sx={{
        bgcolor: "#ECEBF0",
        p: 2,
        borderRadius: 2,
        gridColumnEnd: "span 3",
        position: "relative",
      }}
    >
      {isError && (
        <Typography
          color="error"
          sx={{ position: "absolute", top: "20px", right: "20px" }}
        >
          Something went wrong while getting the address list!
        </Typography>
      )}
      {(isLoading || isFetching) && (
        <LinearProgress
          sx={{ position: "absolute", top: 0, right: 0, width: "100%" }}
        />
      )}
      <Typography
        component="h3"
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          gridColumnEnd: "span 2",
        }}
      >
        Address
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridRow: "2 / span 7",
          gridColumnStart: "2",
        }}
      >
        <GradientButton onClick={manualClickHandler}>
          {manual ? "Enter Address Automatically" : "Enter Address Manually"}
        </GradientButton>
      </Box>
      <TextField
        {...postcodeRegister}
        inputRef={(e) => {
          inputRef(e);
          postcodeRef.current = e;
        }}
        value={postcode}
        onBlur={postcodeBlurHandler}
        error={!!errors?.postcode?.message}
        variant="filled"
        label="Enter a postcode*"
      />
      <Autocomplete
        disablePortal
        disabled={manual}
        options={addressOptions}
        value={address}
        onChange={addressChangeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Start typing an address"
          />
        )}
      />
      <TextField
        {...register("line1", { onChange: (e) => setLine1(e.target.value) })}
        value={(manual ? line1 : currentAddress?.addressline1) || ""}
        error={!!errors?.line1?.message}
        variant="filled"
        label="Address Line 1*"
      />
      <TextField
        {...register("line2", { onChange: (e) => setLine2(e.target.value) })}
        value={(manual ? line2 : currentAddress?.addressline2) || ""}
        variant="filled"
        label="Address Line 2"
      />
      <TextField
        {...register("city", { onChange: (e) => setCity(e.target.value) })}
        value={(manual ? city : currentAddress?.posttown) || ""}
        error={!!errors?.city?.message}
        variant="filled"
        label="City / Town*"
      />
      <TextField
        {...register("country")}
        error={!!errors?.country?.message}
        variant="filled"
        label="Country*"
        select
        defaultValue="GB"
      >
        {countries
          .sort(({ label: labelA }, { label: labelB }) =>
            labelA > labelB ? 1 : -1,
          )
          .map(({ code, label }) => (
            <MenuItem key={code} value={code}>
              {label}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        {...register("geo", { onChange: (e) => setLocation(e.target.value) })}
        value={manual ? location : geo}
        variant="filled"
        label="Geo Location"
      />
    </Grid>
  );
};

export default Address;
