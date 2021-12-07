import { useState, useRef, useMemo, useEffect } from "react";
import { Box, Typography, MenuItem, Autocomplete } from "@mui/material";

import { useAddressQuery } from "../../../services/address-services";
import { Grid, TextField, GradientButton } from "../../../components";
import { countries } from "../../../helper/constants";

const Address = ({ register, errors, setValue }) => {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState(null);
  const previousPostcode = useRef("");

  const {
    data: addresses = [],
    isLoading,
    isError,
    refetch,
  } = useAddressQuery(postcode);

  const postcodeChangeHandler = (e) => setPostcode(e.target.value);

  const addressChangeHandler = (e, newValue) => setAddress(newValue);

  const addressFocusHandler = async () => {
    if (previousPostcode.current === postcode || !postcode) return;
    refetch();
    previousPostcode.current = postcode;
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
    currentAddress?.postcode && setValue("postcode", currentAddress.postcode);
    setValue("city", currentAddress?.posttown || "");
    setValue("line1", currentAddress?.addressline1 || "");
    setValue("line2", currentAddress?.addressline2 || "");
    setValue(
      "geo",
      currentAddress?.latitude && currentAddress?.longitude
        ? `${currentAddress?.latitude}, ${currentAddress?.longitude}`
        : "",
    );
  }, [setValue, currentAddress]);

  return (
    <Grid
      columnCount={2}
      sx={{
        bgcolor: "#ECEBF0",
        p: 2,
        borderRadius: 2,
        gridColumnEnd: "span 3",
      }}
    >
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
        <GradientButton>Enter Address Manually</GradientButton>
      </Box>
      <TextField
        {...register("postcode", { onChange: postcodeChangeHandler })}
        error={!!errors?.postcode?.message}
        variant="filled"
        label="Enter a postcode*"
      />
      <Autocomplete
        disablePortal
        options={addressOptions}
        onFocus={addressFocusHandler}
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
        {...register("line1")}
        value={currentAddress?.addressline1 || ""}
        error={!!errors?.line1?.message}
        variant="filled"
        label="Address Line 1*"
      />
      <TextField
        value={currentAddress?.addressline2 || ""}
        variant="filled"
        label="Address Line 2"
      />
      <TextField
        {...register("city")}
        value={currentAddress?.posttown || ""}
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
        {...register("geo")}
        value={geo}
        variant="filled"
        label="Geo Location"
      />
    </Grid>
  );
};

export default Address;
