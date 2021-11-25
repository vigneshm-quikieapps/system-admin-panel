# CustomTable component

## props

- heading: A react node that comes above the table as heading (exp: Table title + Add Row button)
- headers: An array of header titles for each column
- rows: An array of `row` items, each row is an object with the onClick handler, an `id` key and an `item` key
- pagination: A react node to handle pagination

### prop examples

heading:

```jsx
const heading = "Users List";
```

or

```jsx
const heading = (
  <Box>
    <Typography component="span">Users List</Typography>
    <Button>Add row</Button>
  </Box>
);
```

headers:

```js
const headers = ["FIRST NAME", "LAST NAME", "CITY", "PHONE"];
```

rows:

```js
const rows = [
  {
    id: 1,
    onClick: () => console.log(1),
    items: ["John", "Doe", "Bangalore", "+91-123-456-7890"],
  },
  {
    id: 2,
    onClick: () => console.log(2),
    items: ["Jane", "Doe", "New York", "+1-123-456-7890"],
  },
];
```

or

```jsx
const rows = [
  {
    id: 1,
    onClick: () => console.log(1),
    items: ["John", "Doe", "Bangalore", <Phone>+911234567890</Phone>],
  },
  {
    id: 2,
    onClick: () => console.log(2),
    items: ["Jane", "Doe", "New York", <Phone>+11234567890</Phone>],
  },
];
```

pagination:

```jsx
const pagination = (
  <Pagination count={5} page={2} onChange={pageChangeHandler} />
);
```

## Example

```jsx
const heading = (
  <Box>
    <Typography component="span">Users List</Typography>
    <Button>Add row</Button>
  </Box>
);

const headers = ["FIRST NAME", "LAST NAME", "CITY", "PHONE"];

const rows = [
  {
    id: 1,
    onClick: () => console.log(1),
    items: ["John", "Doe", "Bangalore", <Phone>+911234567890</Phone>],
  },
  {
    id: 2,
    onClick: () => console.log(1),
    items: ["Jane", "Doe", "New York", <Phone>+11234567890</Phone>],
  },
];

const pagination = (
  <Pagination count={5} page={2} onChange={pageChangeHandler} />
);

const UsersTable = () => {
  return (
    <CustomTable
      heading={heading}
      headers={headers}
      rows={rows}
      pagination={pagination}
    />
  );
};
```
