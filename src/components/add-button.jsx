import { ImgIcon, GradientButton } from ".";
import addIcon from "../assets/icons/icon-add.png";

const AddButton = ({ sx, ...otherProps }) => (
  <GradientButton
    sx={{
      px: 0,
      minWidth: "52px",
      ...sx,
    }}
    {...otherProps}
  >
    <ImgIcon>{addIcon}</ImgIcon>
  </GradientButton>
);
export default AddButton;
