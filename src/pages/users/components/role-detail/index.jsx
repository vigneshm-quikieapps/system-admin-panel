import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@mui/material";

import { Accordion, Table, ImgIcon } from "../../../../components";
import { arrowDownIcon } from "../../../../assets/icons";
import { useGetUser } from "../../../../services/queries";

const Roles = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetUser(id);
  console.log("userLiistindex", data);
  console.log("roleuserid", id);
  const tableRows = useMemo(
    () =>
      data?.user?.roles?.map(({ _id, name }) => ({
        items: [<Typography sx={{ minWidth: "700px" }}>{name}</Typography>],
      })),
    [data],
  );

  return (
    <>
      <Accordion
        sx={{ bgcolor: "#ECEBF0", gridColumnEnd: "span 3" }}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Box sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}>
            <Typography sx={{ flex: 1 }}>Roles</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Divider />
          <Table headers={["Role Name", ""]} rows={tableRows} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Roles;
