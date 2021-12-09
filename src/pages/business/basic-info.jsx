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
    "Business Registered Name": toPascal(name),
    "Business Code": code,
    "Business Trade Name": toPascal(tradename),
    "Business Type": toPascal(type),
    Status: status,
    "Primary Contact Name": toPascal(contactName),
    "Primary Contact Email": toPascal(contactEmail),
    "Primary Contact Telephone": primaryPhone,
    "Primary Contact Mobile": primaryMobileNo,
    About: toPascal(about),
    Address: toPascal(
      postcode +
        "  / " +
        line1 +
        " " +
        line2 +
        " / " +
        city +
        " / " +
        countryName,
    ),
  };

  return (
    <Card>
      {isError ? (
        <Typography color="error" component="pre">
          {"Something went wrong: " + transformError(error)}
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
          <CardTitle>{toPascal(name)}</CardTitle>
          <Outputs items={data.business?.name ? items : []} columnCount={4} />
        </>
      )}
    </Card>
  );
};

export default BusinessBasicInfo;
