import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .Mui-disabled": {
    color: `${theme.palette.text.secondary} !important`,
    WebkitTextFillColor: `${theme.palette.text.secondary} !important`,
  },
  justifyContent: "center",
  // applied to label of all variants
  "& label": {
    color: theme.palette.text.secondary,
    lineHeight: 1.3,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
      background: "#fff",
    },
  },
  // applied to label of outlined variant
  "& .MuiInputLabel-outlined": {
    backgroundColor: "#f4f4f4",
    padding: theme.spacing(0, 1),
  },
  // applied to InputBase (FormControl) of all variants
  "& .MuiInputBase-root": {
    height: "48px",
    borderRadius: "8px",
    border: "1px solid #b3b3b3",
    backgroundColor: "#f4f4f4",
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.main,
      border: "1px solid transparent",
      backgroundImage: `linear-gradient(${theme.palette.background.main}, ${theme.palette.background.main}), ${theme.palette.gradients.horizontalLinear}`,
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
    },
    "& .MuiOutlinedInput-input": { padding: "13px 16px" },
  },
  // applied to InputBase (FormControl) of filled variant
  "& .MuiFilledInput-root": {
    backgroundColor: "#f4f4f4",
    "&::after ,::before": { display: "none" },
    "& .MuiFilledInput-input": {
      "&:focus": { backgroundColor: "transparent" },
    },
  },
  // applied to InputBase (FormControl) of outlined variant
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
  },
}));

export const menuSX = {
  mt: "10px",
  "& .MuiMenu-paper": {
    border: (theme) => `1px solid ${theme.palette.ternary.main}`,
    borderRadius: "10px",
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.08)",
  },
  "& ul": {
    py: "10px",
    "& .MuiMenuItem-root": {
      p: "16px 20px",
      bgcolor: (theme) => theme.palette.background.main,
      "&:hover": {
        color: (theme) => theme.palette.secondary.main,
      },
      "&.Mui-selected": {
        bgcolor: (theme) => theme.palette.highlight.main,
      },
    },
  },
};

StyledTextField.defaultProps = {
  // InputProps: { disableUnderline: true },
  SelectProps: {
    MenuProps: {
      sx: menuSX,
    },
  },
};

// Used with react-hook-form
export const Input = ({ name: inputName, control, defaultValue, ...props }) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: inputName,
    control,
    defaultValue: defaultValue || "",
  });

  return (
    <StyledTextField
      {...{ onChange, onBlur, name, value }}
      {...props}
      inputRef={ref}
    />
  );
};

export default StyledTextField;
