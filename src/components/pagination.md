# CustomPagination component

## props

- count: total count of pages (integer)
- page: currently active page (integer)
- onChange: page change event handler

### prop examples

count:

```jsx
const count = pages.length;
```

page:

```js
const page = pageState;
```

onChange:

```js
const onChange = (event, value) => setPage(value);
```

## Example

```jsx
export default function PaginationControlled() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <CustomPagination
      variant="outlined"
      count={10}
      page={page}
      onChange={handleChange}
    />
  );
}
```
