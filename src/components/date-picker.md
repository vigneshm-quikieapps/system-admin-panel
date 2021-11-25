# DatePicker component

## props

- label: label for DatePicker input
- onChange: onChange event Handler

## Example

```jsx
import DatePicker from "./components/date-picker";

const DateContainer = () => {
  const [date, setDate] = useState(null);

  return (
    <DatePicker
      label="Example DatePicker"
      date={date}
      onChange={(newDate) => setDate(newDate)}
    />
  );
};
```
