import { useState, useMemo } from "react";
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
import { arrowDownIcon, deleteIcon } from "../../../../assets/icons";
import RoleList from "./role-list";

const Roles = ({ roles = [], onAdd, onDelete }) => {
  const [showRoleList, setShowRoleList] = useState(false);

  const tableRows = useMemo(
    () =>
      roles.map(({ _id, name }) => ({
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
    [roles, onDelete],
  );

  const addButtonClickHandler = (e) => {
    e.stopPropagation();
    setShowRoleList(true);
  };

  return (
    <>
      {showRoleList && (
        <RoleList onSelect={onAdd} onClose={() => setShowRoleList(false)} />
      )}
      <Accordion
        sx={{ bgcolor: "#ECEBF0", gridColumnEnd: "span 3" }}
        defaultCollapsed
      >
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Box sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}>
            <Typography sx={{ flex: 1 }}>Roles</Typography>
            <AddButton onClick={addButtonClickHandler} />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Divider />
          <Table
            headers={["Role Name", "Action"]}
            headerCellWidth={"85%"}
            rows={tableRows}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Roles;
