import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Textfield from "./textfield";

export default function BasicDatePicker({
  label = "Select a date",
  date,
  onChange,
  textfieldProps = {},
  ...otherProps
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue) => {
          onChange && onChange(newValue);
        }}
        renderInput={(params) => (
          <Textfield
            variant="filled"
            {...params}
            {...textfieldProps}
            sx={{ width: "100%" }}
          />
        )}
        {...otherProps}
      />
    </LocalizationProvider>
  );
}
