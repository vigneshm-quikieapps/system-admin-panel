import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@mui/material";

import {
  Accordion,
  Table,
  IconButton,
  ImgIcon,
  AddButton,
} from "../../../../components";
import { arrowDownIcon } from "../../../../assets/icons";
import { useGetUser } from "../../../../services/queries";

const DataPrivilege = () => {
  const { id } = useParams();
  const { data = { user: {} }, isLoading, isError, error } = useGetUser(id);
  // console.log("userLiistindex12", data);
  // console.log("roleuserid12", id);
  const tableRows = useMemo(
    () =>
      data?.user?.dataPrivileges?.list?.map(({ _id, name }) => ({
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
            <Typography sx={{ flex: 1 }}>Data Privileges</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Divider />
          <Table headers={["Business Name", "", ""]} rows={tableRows} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DataPrivilege;
