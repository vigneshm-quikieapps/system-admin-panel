import { Table, TableHeading, AddButton } from "../../../components";
import { useNavigate } from "react-router-dom";

const Heading = ({ onAdd }) => (
  <TableHeading title="User List">
    <AddButton onClick={onAdd} />
  </TableHeading>
);

const headers = ["User Name ", "Email", "Contact Number", "Action"];

const UserListTable = ({ rows, pagination, isLoading, isFetching }) => {
  const addHandler = () => navigate("add");
  const navigate = useNavigate();

  return (
    <Table
      heading={<Heading onAdd={addHandler} />}
      headers={headers}
      rows={rows}
      pagination={pagination}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default UserListTable;
