import { Table, TableHeading, AddButton } from "../../../components";

const heading = (
  <TableHeading title="BusinessList">
    <AddButton />
  </TableHeading>
);
const headers = [
  "Business Name",
  "City / Town",
  "Post Code",
  "Primary Contact",
  "Action",
];

const BusinessTable = ({ rows, pagination }) => {
  return (
    <Table
      heading={heading}
      headers={headers}
      rows={rows}
      pagination={pagination}
    />
  );
};

export default BusinessTable;
