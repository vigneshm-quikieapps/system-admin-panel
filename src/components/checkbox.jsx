import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";
import { useController } from "react-hook-form";

const StyledCheckIcon = styled(CheckIcon)({
  width: "18px",
  height: "18px",
  color: "#fff",
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => {
  return {
    "&.Mui-checked": {
      backgroundImage: theme.palette.gradients.diagonal,
      borderColor: "transparent !important",
    },
    "&.MuiCheckbox-root": {
      width: "30px",
      height: "28px",
      borderRadius: "8px",
      border: `1px solid ${theme.palette.checkbox.border}`,
      backgroundColor: theme.palette.checkbox.background,
      color: "transparent",
    },
  };
});

StyledCheckbox.defaultProps = {
  checkedIcon: <StyledCheckIcon />,
};

export const FormCheckbox = ({
  name: inputName,
  control,
  defaultValue,
  ...props
}) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: inputName,
    control,
    defaultValue: defaultValue || "",
  });

  return (
    <StyledCheckbox
      {...{ onChange, onBlur, name }}
      checked={value}
      {...props}
      inputRef={ref}
    />
  );
};

export default StyledCheckbox;
