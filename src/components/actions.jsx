import { IconButton } from "@mui/material";

import ImgIcon from "./img-icon";
import editIcon from "../assets/icons/icon-edit.png";
import deleteIcon from "../assets/icons/icon-delete.png";

const Actions = ({
  onEdit,
  onDelete,
  editIcon: editIconProp,
  deleteIcon: deleteIconProp,
}) => (
  <div>
    <IconButton onClick={onEdit}>
      {editIconProp || <ImgIcon>{editIcon}</ImgIcon>}
    </IconButton>
    <IconButton onClick={onDelete} color="secondary">
      {deleteIconProp || <ImgIcon>{deleteIcon}</ImgIcon>}
    </IconButton>
  </div>
);

export default Actions;
