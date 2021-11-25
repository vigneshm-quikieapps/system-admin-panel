import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "./textfield";
import { TimePicker } from "@mui/lab";

export default function BasicTimePicker({
  label = "Select a time",
  date,
  onChange,
  inputProps = {},
  ...otherProps
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={label}
        value={date}
        onChange={(newValue) => {
          onChange && onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField variant="filled" {...params} {...inputProps} />
        )}
        {...otherProps}
      />
    </LocalizationProvider>
  );
}
