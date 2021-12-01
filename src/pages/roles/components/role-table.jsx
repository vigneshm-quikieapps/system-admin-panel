import { useNavigate } from "react-router-dom";

import { Table, TableHeading, AddButton } from "../../../components";

const Heading = ({ onAdd }) => (
  <TableHeading title="RoleList">
    <AddButton onClick={onAdd} />
  </TableHeading>
);
const headers = ["Role Name ", "Role Code", "Role ID", "Action"];

const RoleTable = ({ rows, pagination }) => {
  const navigate = useNavigate();

  const addHandler = () => navigate("add");

  return (
    <Table
      heading={<Heading onAdd={addHandler} />}
      headers={headers}
      rows={rows}
      pagination={pagination}
    />
  );
};

export default RoleTable;
