import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { Card, CardTitle, Outputs } from "../../components";
import { toPascal, transformError } from "../../utils";
import { useGetBusiness } from "../../services/queries";
import { countries } from "../../helper/constants";

const BusinessBasicInfo = ({ setPageTitle }) => {
  useEffect(() => setPageTitle("Basic Info"));
  const { id } = useParams();
  const {
    data = { business: {} },
    isLoading,
    isError,
    error,
  } = useGetBusiness(id);

  const {
    business: {
      name,
      code,
      tradename,
      type,
      status,
      line1,
      line2,
      city,
      country,
      postcode,
      contactName,
      contactEmail,
      primaryMobileNo,
      primaryPhone,
      about,
    },
  } = data;
  const countryName = countries.find(({ code }) => code === country)?.label;
  const items = {
    "Business Registered Name": name,
    "Business Code": code,
    "Business Trade Name": tradename,
    "Business Type": type,
    Status: status,
    Address:
      line1 +
      " ," +
      line2 +
      " , " +
      city +
      " , " +
      countryName +
      " - " +
      postcode,

    "": "",
    " ": "",
    "Primary Contact Name": contactName || "----",
    "Primary Contact Email": contactEmail || "----",
    "Primary Contact Telephone": primaryPhone || "----",
    "Primary Contact Mobile": primaryMobileNo || "----",
    About: about,
  };

  return (
    <Card>
      {isError ? (
        <Typography color="error" component="pre">
          {"Error: " + transformError(error)}
        </Typography>
      ) : isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardTitle>{name}</CardTitle>
          <Outputs items={data.business?.name ? items : []} columnCount={4} />
        </>
      )}
    </Card>
  );
};

export default BusinessBasicInfo;
