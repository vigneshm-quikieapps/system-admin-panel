import { useNavigate } from "react-router-dom";

import { Table, TableHeading, AddButton } from "../../../components";

const Heading = ({ onAdd }) => (
  <TableHeading title="BusinessList">
    <AddButton onClick={onAdd} />
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

export default BusinessTable;
