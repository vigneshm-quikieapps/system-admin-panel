import { useState, useMemo } from "react";
import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  FormControlLabel,
} from "@mui/material";

import {
  Accordion,
  Table,
  IconButton,
  ImgIcon,
  AddButton,
  FormCheckbox,
} from "../../../../components";
import { arrowDownIcon, deleteIcon } from "../../../../assets/icons";
import BusinessList from "./business-list";

const DataPrivileges = ({ businesses = [], onAdd, onDelete, control }) => {
  const [showBusinessList, setShowBusinessList] = useState(false);

  const tableRows = useMemo(
    () =>
      businesses.map(({ _id, name }) => ({
        items: [
          <Typography sx={{ minWidth: "700px" }}>{name}</Typography>,
          <IconButton
            onClick={() => onDelete(_id)}
            sx={{ borderRadius: "50%" }}
          >
            <ImgIcon>{deleteIcon}</ImgIcon>
          </IconButton>,
        ],
      })),
    [businesses, onDelete],
  );

  const addButtonClickHandler = (e) => {
    e.stopPropagation();
    setShowBusinessList(true);
  };

  return (
    <>
      {showBusinessList && (
        <BusinessList
          onSelect={onAdd}
          onClose={() => setShowBusinessList(false)}
        />
      )}
      <Accordion
        sx={{ bgcolor: "#ECEBF0", gridColumnEnd: "span 3" }}
        defaultCollapsed
      >
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Box sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}>
            <Typography sx={{ flex: 1 }}>Data Privileges</Typography>
            <AddButton onClick={addButtonClickHandler} />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <FormControlLabel
            label="All Businesses"
            sx={{ ml: 2 }}
            control={
              <FormCheckbox
                name="dataPrivileges.all"
                control={control}
                sx={{ mr: 1 }}
              />
            }
          />
          <Divider sx={{ mt: "5px" }} />
          <Table
            headers={["Business Name", "Action"]}
            headerCellWidth={"85%"}
            rows={tableRows}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DataPrivileges;
