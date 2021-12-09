import { useNavigate } from "react-router-dom";

import { Table, TableHeading, AddButton } from "../../../components";

const Heading = ({ onAdd }) => (
  <TableHeading title="RoleList">
    <AddButton onClick={onAdd} />
  </TableHeading>
);
const headers = ["Role Name ", "Role Code", "Action"];

const RoleTable = ({ rows, pagination, isLoading, isFetching }) => {
  const navigate = useNavigate();

  const addHandler = () => navigate("add");

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

export default RoleTable;
