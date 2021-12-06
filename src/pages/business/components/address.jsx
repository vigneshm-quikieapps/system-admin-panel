import { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";
import { Box, Typography, MenuItem, Autocomplete } from "@mui/material";

import { Grid, TextField, GradientButton } from "../../../components";

const Address = ({ register, errors, setValue }) => {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const previousPostcode = useRef("");

  const postcodeChangeHandler = (e) => setPostcode(e.target.value);

  const addressChangeHandler = (e, newValue) => setAddress(newValue);

  const addressFocusHandler = async () => {
    console.log("[address focus handler] 1");
    if (previousPostcode.current === postcode || !postcode) return;
    console.log("[address focus handler] 2");
    try {
      const response = await axios.get(
        `https://ws.postcoder.com/pcw/${process.env.REACT_APP_POSTCODER_API_KEY}/address/uk/${postcode}?format=json&lines=2&addtags=latitude,longitude,country`,
      );
      const addressList = response.data;
      setAddresses(addressList);
      previousPostcode.current = postcode;
    } catch (e) {
      console.log(e);
    }
  };

  const addressOptions = useMemo(() => {
    return addresses.map(({ summaryline }) => summaryline);
  }, [addresses]);

  const currentAddress = useMemo(
    () => addresses.find(({ summaryline }) => summaryline === address),
    [addresses, address],
  );

  useEffect(() => {
    if (!currentAddress) return;
    // postcode,
    // line1,
    // city,
    // country
    setValue("postcode", currentAddress?.postcode || "");
    setValue("city", currentAddress?.posttown || "");
    setValue("country", currentAddress?.country || "UK");
    setValue("line1", currentAddress?.addressline1 || "");
    setValue("line2", currentAddress?.addressline2 || "");
    setValue(
      "geo",
      currentAddress?.latitude && currentAddress?.longitude
        ? `${currentAddress?.latitude}, ${currentAddress?.longitude}`
        : "",
    );
  }, [setValue, currentAddress]);
  console.log(currentAddress);

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
        error={!!errors?.line1?.message}
        variant="filled"
        label="Address Line 1*"
      />
      <TextField
        {...register("line2")}
        variant="filled"
        label="Address Line 2"
      />
      <TextField
        {...register("city")}
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
        defaultValue="UK"
      >
        <MenuItem value="UK">United Kingdom</MenuItem>
      </TextField>
      <TextField {...register("geo")} variant="filled" label="Geo Location" />
    </Grid>
  );
};

export default Address;
