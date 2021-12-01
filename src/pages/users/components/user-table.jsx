import { Table, TableHeading, AddButton } from "../../../components";

const heading = (
  <TableHeading title="User List">
    <AddButton />
  </TableHeading>
);

const headers = ["Role Name ", "Email", "Contact Number", "User ID", "Action"];

const UserListTable = ({ rows, pagination }) => {
  return (
    <Table
      heading={heading}
      headers={headers}
      rows={rows}
      pagination={pagination}
    />
  );
};

export default UserListTable;
